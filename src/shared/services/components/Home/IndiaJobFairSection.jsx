import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Users, Building2, Plane } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import CountUpStat from "../../../utils/CountUpStat";

const BASE_SIZE = 440;
const BASE_PADDING = 100;

const CITIES = [
  { name: "Chandigarh", venue: "Parade Ground, Sector 17", fairs: 78, color: "#111111", bg: "rgba(17,17,17,.05)", note: "Anchoring the north, drawing youth from across Punjab and Haryana.", coords: [76.7794, 30.7333] },
  { name: "Delhi", venue: "Pragati Maidan, Delhi", fairs: 212, color: "#111111", bg: "rgba(17,17,17,.05)", note: "Our busiest hub, the largest single-city turnout on record.", coords: [77.2090, 28.6139] },
  { name: "Mumbai", venue: "NESCO, Goregaon", fairs: 156, color: "#E8650A", bg: "rgba(232,101,10,.08)", note: "Strong industrial and services-sector participation each cycle.", coords: [72.8777, 19.0760] },
  { name: "Kolkata", venue: "Biswa Bangla Mela Prangan", fairs: 95, color: "#E8650A", bg: "rgba(232,101,10,.08)", note: "Steady eastern presence, growing every quarter.", coords: [88.3639, 22.5726] },
  { name: "Bengaluru", venue: "KTPO Convention Centre", fairs: 142, color: "#1A7A2E", bg: "rgba(26,122,46,.08)", note: "Tech and BPO employers make up most of the hiring here.", coords: [77.5946, 12.9716] },
  { name: "Chennai", venue: "Chennai Trade Centre", fairs: 118, color: "#1A7A2E", bg: "rgba(26,122,46,.08)", note: "A reliable southern anchor for manufacturing and auto-sector roles.", coords: [80.2707, 13.0827] },
];

const stats = [
  { icon: CalendarDays, value: "1,248+", label: "Job Fairs Conducted", bg: "rgba(17,17,17,.05)", color: "#111111" },
  { icon: MapPin, value: "28", label: "States / UTs", bg: "rgba(232,101,10,.08)", color: "#E8650A" },
  { icon: Users, value: "2.5 L+", label: "Youth Participated", bg: "rgba(26,122,46,.08)", color: "#1A7A2E" },
  { icon: Building2, value: "5,200+", label: "Companies Joined", bg: "rgba(17,17,17,.05)", color: "#111111" },
];

function useResponsiveMapSize() {
  const [size, setSize] = useState(BASE_SIZE);
  useEffect(function () {
    function update() {
      const w = window.innerWidth;
      if (w < 400) setSize(220);
      else if (w < 640) setSize(260);
      else if (w < 1024) setSize(340);
      else setSize(BASE_SIZE);
    }
    update();
    window.addEventListener("resize", update);
    return function () { window.removeEventListener("resize", update); };
  }, []);
  return size;
}

function useIndiaProjection(mapSize) {
  const [state, setState] = useState({ pathD: null, points: null, loading: true });
  useEffect(function () {
    let cancelled = false;
    const padding = mapSize * (BASE_PADDING / BASE_SIZE);
    fetch("/data/india-states.json")
      .then(function (res) { return res.json(); })
      .then(function (topo) {
        if (cancelled) return;
        const geojson = feature(topo, topo.objects.states);
        const projection = geoMercator().fitExtent(
          [[padding, padding], [mapSize - padding, mapSize - padding]],
          geojson
        );
        const pathGenerator = geoPath(projection);
        const points = CITIES.map(function (city) {
          const coords = projection(city.coords);
          return Object.assign({}, city, { x: coords[0], y: coords[1] });
        });
        setState({ pathD: pathGenerator(geojson), points: points, loading: false });
      })
      .catch(function (err) {
        console.error("India map failed to load:", err);
        setState(function (s) { return Object.assign({}, s, { loading: false }); });
      });
    return function () { cancelled = true; };
  }, [mapSize]);
  return state;
}

function useScrollActiveCity(cityNames) {
  const [active, setActive] = useState(cityNames[0]);
  const refs = useRef({});
  const ticking = useRef(false);

  useEffect(function () {
    function updateActive() {
      const viewportCenter = window.innerHeight / 2;
      let closestName = null;
      let closestDist = Infinity;

      for (let i = 0; i < cityNames.length; i++) {
        const name = cityNames[i];
        const el = refs.current[name];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestName = name;
        }
      }

      if (closestName) setActive(closestName);
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateActive);
      }
    }

    updateActive();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cityNames]);

  const setRef = function (name) {
    return function (el) {
      refs.current[name] = el;
    };
  };

  const scrollToCity = function (name) {
    const el = refs.current[name];
    if (!el) return;
    setActive(name);
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return { active: active, setRef: setRef, scrollToCity: scrollToCity };
}

function useSectionSize(sectionRef) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(function () {
    const el = sectionRef.current;
    if (!el) return;
    function update() {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return function () {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);
  return size;
}

function buildFlightPath(width, height) {
  if (!width || !height) return null;
  const p1x = width * 0.04, p1y = height * 0.05;
  const c1x = width * 0.38, c1y = height * -0.02;
  const p2x = width * 0.52, p2y = height * 0.32;
  const c2x = width * 0.68, c2y = height * 0.62;
  const p3x = width * 0.96, p3y = height * 0.94;
  return "M " + p1x + "," + p1y + " Q " + c1x + "," + c1y + " " + p2x + "," + p2y + " Q " + c2x + "," + c2y + " " + p3x + "," + p3y;
}

export default function IndiaJobFairSection() {
  const mapSize = useResponsiveMapSize();
  const projectionState = useIndiaProjection(mapSize);
  const pathD = projectionState.pathD;
  const points = projectionState.points;
  const loading = projectionState.loading;
  const cityNames = CITIES.map(function (c) { return c.name; });
  const scrollState = useScrollActiveCity(cityNames);
  const active = scrollState.active;
  const setRef = scrollState.setRef;
  const scrollToCity = scrollState.scrollToCity;

  const activeCity = CITIES.find(function (c) { return c.name === active; }) || CITIES[0];

  const sectionRef = useRef(null);
  const sectionSize = useSectionSize(sectionRef);
  const flightPathD = buildFlightPath(sectionSize.width, sectionSize.height);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600;700;900&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        html{ scroll-behavior: smooth; }
        .jfmap-flight-plane{
          position:absolute; top:0; left:0;
          offset-rotate: auto;
          -webkit-offset-rotate: auto;
          animation: jf-fly 22s linear infinite;
        }
        @keyframes jf-fly{
          from{ offset-distance: 0%; opacity: 0; }
          6%{ opacity: 1; }
          94%{ opacity: 1; }
          to{ offset-distance: 100%; opacity: 0; }
        }
        .jfmap-eyebrow{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:22px}
        .jfmap-eyebrow-line{height:1px;width:40px;background:rgba(0,0,0,.2)}
        .jfmap-eyebrow-txt{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.35)}
        .jfmap-heading{font-family:'Raleway',sans-serif;font-size:28px;font-weight:800;color:#111;line-height:1.2;margin:0 0 .4rem}
        .jfmap-heading em{font-family:'Lora',serif;font-style:italic;font-weight:600;color:#E8650A}
      `}</style>

      <section
        id="fairs"
        ref={sectionRef}
        className="relative isolate bg-[#F8F4EF] py-14 sm:py-20 lg:py-24"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >

        <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          {flightPathD && (
            <svg
              width={sectionSize.width}
              height={sectionSize.height}
              viewBox={"0 0 " + sectionSize.width + " " + sectionSize.height}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <path
                d={flightPathD}
                fill="none"
                stroke="#111"
                strokeOpacity="0.22"
                strokeWidth="2"
                strokeDasharray="4 9"
                strokeLinecap="round"
              />
            </svg>
          )}
          {flightPathD && (
            <div
              className="jfmap-flight-plane"
              style={{
                offsetPath: 'path("' + flightPathD + '")',
                WebkitOffsetPath: 'path("' + flightPathD + '")',
              }}
            >
              <Plane size={26} color="#E8650A" style={{ opacity: 0.8 }} />
            </div>
          )}
        </div>

        <div className="relative max-w-300 mx-auto px-4 sm:px-6" style={{ zIndex: 1 }}>

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="jfmap-eyebrow">
              <div className="jfmap-eyebrow-line" />
              <span className="jfmap-eyebrow-txt">Job fair across India</span>
              <div className="jfmap-eyebrow-line" />
            </div>

            <h2 className="jfmap-heading">
              Job Fairs <em>Across India</em>
            </h2>

            <p className="mt-3 text-sm sm:text-base font-normal" style={{ color: "rgba(0,0,0,.72)" }}>
              Scroll through our reach, the map follows along.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 sm:gap-10 mt-10 sm:mt-12">

            <div>
              <div className="lg:sticky lg:top-24 self-start">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center"
                  style={{
                    border: "1px solid rgba(0,0,0,.07)",
                    boxShadow: "0 10px 30px rgba(0,0,0,.04)",
                  }}
                >
                  <div className="relative" style={{ width: mapSize, height: mapSize }}>

                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm animate-pulse" style={{ color: "rgba(0,0,0,.7)" }}>
                        Loading...
                      </div>
                    )}

                    {pathD && (
                      <svg width={mapSize} height={mapSize} className="absolute inset-0 overflow-visible">
                        <path d={pathD} fill="#F0EAE0" stroke="#C9BCA0" strokeWidth="0.7" />
                      </svg>
                    )}

                    {points && points.map(function (p) {
                      const isActive = p.name === active;
                      return (
                        <button
                          type="button"
                          key={p.name}
                          onClick={function () { scrollToCity(p.name); }}
                          aria-label={"Jump to " + p.name}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 bg-transparent border-0 p-2 -m-2 cursor-pointer touch-manipulation"
                          style={{ left: p.x, top: p.y }}
                        >
                          <span className="relative flex items-center justify-center">
                            {isActive && (
                              <motion.span
                                className="absolute rounded-full"
                                style={{ background: p.color, width: 26, height: 26 }}
                                animate={{ opacity: [0.35, 0], scale: [1, 2.2] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                            <motion.span
                              className="rounded-full border-2 border-white shadow"
                              animate={{ width: isActive ? 16 : 10, height: isActive ? 16 : 10 }}
                              style={{ backgroundColor: p.color }}
                              transition={{ duration: 0.25 }}
                            />
                          </span>
                          <span
                            className="text-[10px] px-1.5 rounded bg-white/80 whitespace-nowrap"
                            style={{ color: isActive ? p.color : "rgba(0,0,0,.72)", fontWeight: isActive ? 700 : 500 }}
                          >
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-full mt-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCity.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-extrabold text-[#111] text-base">{activeCity.name}</p>
                          <p className="text-xs font-normal" style={{ color: "rgba(0,0,0,.7)" }}>{activeCity.venue}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black" style={{ color: activeCity.color }}>{activeCity.fairs}</span>
                          <p className="text-[10px] -mt-0.5" style={{ color: "rgba(0,0,0,.72)" }}>fairs run</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col" style={{ background: "#F8F4EF" }}>
              {CITIES.map(function (city, index) {
                const isActive = city.name === active;
                return (
                  <div
                    key={city.name}
                    ref={setRef(city.name)}
                    data-city={city.name}
                    className="min-h-42.5 sm:min-h-55 flex items-center"
                  >
                    <motion.button
                      type="button"
                      onClick={function () { scrollToCity(city.name); }}
                      animate={{
                        opacity: isActive ? 1 : 0.4,
                        x: isActive ? 0 : -8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-full text-left rounded-2xl p-5 sm:p-6 cursor-pointer border-0"
                      style={{
                        background: isActive ? "#FFFFFF" : "transparent",
                        borderLeft: "4px solid " + (isActive ? city.color : "rgba(0,0,0,.08)"),
                        boxShadow: isActive ? "0 10px 30px rgba(0,0,0,.04)" : "none",
                      }}
                    >
                      <p className="text-xs font-bold tracking-wide" style={{ color: "rgba(0,0,0,.7)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-extrabold mt-1" style={{ color: isActive ? city.color : "#111" }}>
                        {city.name}
                      </h3>
                      <p className="text-sm font-normal mt-1" style={{ color: "rgba(0,0,0,.72)" }}>{city.venue}</p>
                      <p className="text-sm font-normal mt-3 leading-relaxed" style={{ color: "rgba(0,0,0,.72)" }}>{city.note}</p>
                      <div className="flex items-baseline gap-1.5 mt-4">
                        <span className="text-2xl font-black" style={{ color: city.color }}>{city.fairs}</span>
                        <span className="text-xs font-normal" style={{ color: "rgba(0,0,0,.72)" }}>fairs run to date</span>
                      </div>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
            {stats.map(function (item, index) {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4"
                  style={{
                    border: "1px solid rgba(0,0,0,.07)",
                    boxShadow: "0 10px 30px rgba(0,0,0,.04)",
                  }}
                >
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="mt-2.5 sm:mt-3 text-base sm:text-xl font-black" style={{ color: item.color }}>
                    <CountUpStat value={item.value} />
                  </h3>
                  <p className="text-[11px] sm:text-xs font-normal mt-0.5 sm:mt-1" style={{ color: "rgba(0,0,0,.72)" }}>{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}