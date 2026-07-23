import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import {
  Search, MapPin, Calendar, Users, Briefcase, ArrowRight, X,
  ChevronDown, Quote, Building2, Ticket, CheckCircle2, Clock, HelpCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const REGIONS = ["All Regions", "North", "South", "East", "West", "Central", "Northeast"];

const CITY_COORDS = {
  Chandigarh: [76.7794, 30.7333], Delhi: [77.2090, 28.6139], Jaipur: [75.7873, 26.9124],
  Lucknow: [80.9462, 26.8467], Chennai: [80.2707, 13.0827], Bengaluru: [77.5946, 12.9716],
  Hyderabad: [78.4867, 17.3850], Coimbatore: [76.9558, 11.0168], Kolkata: [88.3639, 22.5726],
  Bhubaneswar: [85.8245, 20.2961], Patna: [85.1376, 25.5941], Mumbai: [72.8777, 19.0760],
  Ahmedabad: [72.5714, 23.0225], Pune: [73.8567, 18.5204], Indore: [75.8577, 22.7196],
  Nagpur: [79.0882, 21.1458], Guwahati: [91.7362, 26.1445],
};

const CITY_REGION = {
  Chandigarh: "North", Delhi: "North", Jaipur: "North", Lucknow: "North",
  Chennai: "South", Bengaluru: "South", Hyderabad: "South", Coimbatore: "South",
  Kolkata: "East", Bhubaneswar: "East", Patna: "East",
  Mumbai: "West", Ahmedabad: "West", Pune: "West",
  Indore: "Central", Nagpur: "Central",
  Guwahati: "Northeast",
};

const FAIRS = [
  { code: "JF-CHN-0326", city: "Chennai", venue: "YMCA Grounds, Nandanam", date: "12 – 14 Mar 2026", status: "previous", openings: 3200, youth: "6,400+", sector: "Manufacturing & Auto" },
  { code: "JF-DEL-1125", city: "Delhi", venue: "Pragati Maidan", date: "14 – 16 Nov 2025", status: "previous", openings: 5200, youth: "12,000+", sector: "All Sectors" },
  { code: "JF-MUM-1025", city: "Mumbai", venue: "NESCO, Goregaon", date: "05 – 07 Oct 2025", status: "previous", openings: 4600, youth: "9,800+", sector: "Banking & Finance" },
  { code: "JF-BLR-1025", city: "Bengaluru", venue: "KTPO Convention Centre", date: "24 – 25 Oct 2025", status: "previous", openings: 3900, youth: "8,200+", sector: "IT & BPO" },
  { code: "JF-KOL-0826", city: "Kolkata", venue: "Biswa Bangla Mela Prangan", date: "08 – 09 Aug 2026", status: "upcoming", openings: 2600, youth: "5,100+ expected", sector: "Retail & BPO" },
  { code: "JF-JAI-0826", city: "Jaipur", venue: "Birla Auditorium Grounds", date: "22 – 23 Aug 2026", status: "upcoming", openings: 1800, youth: "3,600+ expected", sector: "Tourism & Retail" },
  { code: "JF-GAU-0926", city: "Guwahati", venue: "Khanapara Veterinary Ground", date: "05 – 06 Sep 2026", status: "upcoming", openings: 1600, youth: "3,500+ expected", sector: "Tea, Tourism & Retail" },
  { code: "JF-PUN-0926", city: "Pune", venue: "Ground No. 4, Balewadi", date: "19 – 20 Sep 2026", status: "upcoming", openings: 2200, youth: "4,900+ expected", sector: "IT & Auto Ancillary" },
].map((f) => Object.assign({}, f, { region: CITY_REGION[f.city], coords: CITY_COORDS[f.city] }));

const QUICK_STATS = [
  { icon: <Ticket size={20} />, value: "1,248+", label: "Fairs conducted", accent: "#E8650A" },
  { icon: <MapPin size={20} />, value: "28", label: "States & UTs covered", accent: "#1A7A2E" },
  { icon: <Briefcase size={20} />, value: "5,200+", label: "Companies onboarded", accent: "#111" },
  { icon: <Users size={20} />, value: "2.5 L+", label: "Youth placed in interviews", accent: "#E8650A" },
];

const TESTIMONIALS = [
  { name: "Sunita R.", role: "Hired as Machine Operator, Pune fair", quote: "I walked in with a resume and no expectations, and walked out with an interview call for the same afternoon. Three weeks later I had an offer letter." },
  { name: "Rahul Verma", role: "Hired as Billing Associate, Lucknow fair", quote: "The stall map at the entrance saved me hours. I could go straight to the retail and logistics companies instead of wandering the whole ground." },
  { name: "Divya K.", role: "Talent Partner, recruiting at 4 fairs", quote: "We closed more shortlists in one weekend fair than in a month of listings online. The walk-in volume from smaller towns is what keeps us coming back." },
];

const FAQS = [
  { q: "Who can attend a job fair?", a: "Any job seeker aged 18 or above with a valid photo ID can attend. Both freshers and experienced candidates are welcome, and there is no pre-registration required to walk in." },
  { q: "What should I bring with me?", a: "Carry multiple printed copies of your resume, an original and photocopy of your ID proof, your educational and experience certificates, and a couple of passport-size photographs." },
  { q: "Is there an entry fee?", a: "No. Entry is completely free for every job seeker at every fair, for every edition." },
  { q: "Can my company set up a recruiting stall?", a: "Yes. Employers can apply through the partner form on this page. A coordinator confirms your stall, sector category, and setup timing within 3 working days." },
  { q: "Will I get hired on the spot?", a: "Many employers conduct first-round interviews and shortlist candidates on the same day. A formal offer usually follows a short document and background verification step after the fair." },
];

/* ------------------------------------------------------------------ */
/*  Map hooks                                                          */
/* ------------------------------------------------------------------ */

function useResponsiveMapSize() {
  const [size, setSize] = useState(380);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 400) setSize(230);
      else if (w < 640) setSize(280);
      else if (w < 1024) setSize(330);
      else setSize(380);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

function useIndiaProjection(mapSize, points) {
  const [state, setState] = useState({ pathD: null, plotted: null, loading: true });
  useEffect(() => {
    let cancelled = false;
    const padding = mapSize * (100 / 440);
    fetch('/data/india-states.json')
      .then((res) => res.json())
      .then((topo) => {
        if (cancelled) return;
        const geojson = feature(topo, topo.objects.states);
        const projection = geoMercator().fitExtent(
          [[padding, padding], [mapSize - padding, mapSize - padding]],
          geojson
        );
        const pathGenerator = geoPath(projection);
        const plotted = points.map((p) => {
          const xy = projection(p.coords);
          return Object.assign({}, p, { x: xy[0], y: xy[1] });
        });
        setState({ pathD: pathGenerator(geojson), plotted, loading: false });
      })
      .catch((err) => {
        console.error('India map failed to load:', err);
        setState((s) => Object.assign({}, s, { loading: false }));
      });
    return () => { cancelled = true; };
  }, [mapSize, points]);
  return state;
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function JobFairsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [status, setStatus] = useState('upcoming');
  const [openFaq, setOpenFaq] = useState(0);
  const [drawerFair, setDrawerFair] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toolbarRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAIRS.filter((f) => {
      if (f.status !== status) return false;
      if (region !== 'All Regions' && f.region !== region) return false;
      if (q && !(f.city.toLowerCase().indexOf(q) > -1 || f.venue.toLowerCase().indexOf(q) > -1)) return false;
      return true;
    });
  }, [query, region, status]);

  const mapPoints = useMemo(() => {
    const counts = {};
    FAIRS.forEach((f) => { counts[f.city] = (counts[f.city] || 0) + 1; });
    return Object.keys(counts).map((city) => ({
      city,
      coords: CITY_COORDS[city],
      count: counts[city],
    }));
  }, []);

  const mapSize = useResponsiveMapSize();
  const { pathD, plotted, loading: mapLoading } = useIndiaProjection(mapSize, mapPoints);

  const topCities = useMemo(() => {
    return mapPoints.slice().sort((a, b) => b.count - a.count);
  }, [mapPoints]);

  function scrollToToolbar() {
    if (toolbarRef.current) toolbarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goToCity(city) {
    setQuery(city);
    setRegion('All Regions');
    scrollToToolbar();
  }

  function openDrawer(fair) {
    setDrawerFair(fair);
    setDrawerOpen(true);
  }
  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setDrawerFair(null), 300);
  }

  return (
    <div style={{ background: '#F8F4EF', minHeight: '100vh', fontFamily: "'Raleway', sans-serif", color: '#111' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800;900&family=Lora:ital,wght@0,600;1,600&family=IBM+Plex+Mono:wght@500&display=swap');

        .jfp-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* HERO */
        .jfp-hero { background: #EADFC9; padding: 130px 0 110px; text-align: center; position: relative; overflow: hidden; }
        .jfp-hero-curve { position: absolute; bottom: -1px; left: 0; width: 100%; height: 90px; display: block; }
        .jfp-crumb { font-size: 11px; font-weight: 800; color: rgba(0,0,0,.4); letter-spacing: 2px; text-transform: uppercase; }
        .jfp-crumb span { color: #E8650A; }
        .jfp-hero h1 { font-size: 44px; font-weight: 900; margin: 15px 0; letter-spacing: -1px; line-height: 1.15; }
        .jfp-hero h1 em { color: #E8650A; font-style: italic; font-family: 'Lora', serif; font-weight: 600; }
        .jfp-hero p { max-width: 560px; margin: 0 auto; color: #666; font-size: 15.5px; line-height: 1.7; }
        .jfp-hero-actions { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 30px; flex-wrap: wrap; }
        .jfp-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #E8650A; color: #fff; border: none; padding: 14px 28px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer; text-decoration: none; transition: background .2s; }
        .jfp-btn-primary:hover { background: #c9550a; }
        .jfp-btn-outline { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #111; border: 2px solid #111; padding: 12px 26px; border-radius: 10px; font-weight: 800; font-size: 14px; cursor: pointer; text-decoration: none; transition: background .2s, color .2s; }
        .jfp-btn-outline:hover { background: #111; color: #fff; }

        /* QUICK STATS */
        .jfp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 56px 0 20px; }
        .jfp-stat-card { background: #fff; border-radius: 12px; padding: 24px 20px; border: 1px solid rgba(0,0,0,0.06); transition: transform .25s ease, box-shadow .25s ease; }
        .jfp-stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .jfp-stat-icon { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; background: rgba(0,0,0,0.04); }
        .jfp-stat-card h4 { font-size: 22px; font-weight: 900; margin: 0 0 4px; }
        .jfp-stat-card p { font-size: 12.5px; color: #888; margin: 0; }

        .jfp-section-label { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: rgba(0,0,0,.4); margin-bottom: 10px; }
        .jfp-section-title { font-size: 24px; font-weight: 900; margin: 0 0 20px; letter-spacing: -0.5px; }
        .jfp-section-title em { font-family: 'Lora', serif; font-style: italic; color: #E8650A; font-weight: 600; }

        /* TOOLBAR */
        .jfp-toolbar { position: sticky; top: 0; z-index: 20; background: rgba(248,244,239,.97); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 16px 0; }
        .jfp-toolbar-inner { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
        .jfp-search { flex: 1; min-width: 220px; display: flex; align-items: center; gap: 10px; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 11px 16px; }
        .jfp-search input { flex: 1; border: none; background: transparent; outline: none; font-size: 14px; font-family: inherit; color: #111; }
        .jfp-select { background: #F9F9F9; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 11px 16px; font-size: 13.5px; font-weight: 700; font-family: inherit; color: #111; outline: none; }
        .jfp-tabs { display: flex; gap: 4px; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 4px; }
        .jfp-tab { display: flex; align-items: center; gap: 6px; border: none; background: transparent; padding: 9px 16px; border-radius: 7px; font-size: 12.5px; font-weight: 800; text-transform: capitalize; cursor: pointer; color: #888; transition: background .2s, color .2s; }
        .jfp-tab.active { color: #fff; }
        .jfp-tab.active.upcoming { background: #E8650A; }
        .jfp-tab.active.previous { background: #1A7A2E; }
        .jfp-result-count { font-size: 12.5px; color: #888; margin-top: 10px; }

        /* FAIR CARDS (ticket style) */
        .jfp-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 40px 0; }
        .jfp-card { text-align: left; width: 100%; background: #fff; border-radius: 12px; padding: 20px 22px; border: 1px solid rgba(0,0,0,0.06); border-left: 4px solid #1A7A2E; cursor: pointer; transition: transform .25s ease, box-shadow .25s ease; font-family: inherit; }
        .jfp-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .jfp-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .jfp-card-code { font-size: 10.5px; font-weight: 700; color: #999; font-family: 'IBM Plex Mono', monospace; letter-spacing: .04em; }
        .jfp-card-badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 3px 10px; border-radius: 99px; letter-spacing: .04em; }
        .jfp-card h4 { font-size: 17px; font-weight: 800; margin: 0 0 4px; }
        .jfp-card .venue { font-size: 13px; color: #666; margin: 0 0 10px; line-height: 1.5; }
        .jfp-card .date-row { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; color: #444; margin-bottom: 14px; }
        .jfp-card-divider { border: none; border-top: 1.5px dashed rgba(0,0,0,0.12); margin: 0 0 14px; }
        .jfp-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .jfp-card-label { font-size: 10px; text-transform: uppercase; font-weight: 800; color: #999; letter-spacing: .04em; margin: 0 0 2px; }
        .jfp-card-value { font-size: 13.5px; font-weight: 800; margin: 0; }
        .jfp-empty { text-align: center; padding: 60px 0; color: #888; font-size: 14px; }
        .jfp-empty strong { display: block; color: #111; font-size: 15px; margin-bottom: 6px; }

        /* DRAWER */
        .jfp-drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; opacity: 0; pointer-events: none; transition: opacity .3s ease; }
        .jfp-drawer-backdrop.open { opacity: 1; pointer-events: auto; }
        .jfp-drawer { position: fixed; top: 0; right: 0; height: 100%; width: 100%; max-width: 420px; background: #fff; z-index: 50; overflow-y: auto; transform: translateX(100%); transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .jfp-drawer.open { transform: translateX(0); }
        .jfp-drawer-top { height: 6px; }
        .jfp-drawer-body { padding: 30px 30px 40px; }
        .jfp-drawer-close { background: none; border: none; cursor: pointer; margin-bottom: 20px; padding: 0; }
        .jfp-drawer-badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 99px; }
        .jfp-drawer h2 { font-size: 26px; font-weight: 900; margin: 14px 0 4px; }
        .jfp-drawer .venue { font-size: 14px; color: #666; margin: 0; }
        .jfp-drawer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 22px 0; }
        .jfp-drawer-item { background: #F8F4EF; border-radius: 10px; padding: 13px 14px; }
        .jfp-drawer-item p:first-child { font-size: 10px; text-transform: uppercase; font-weight: 800; color: #999; margin: 0 0 4px; }
        .jfp-drawer-item p:last-child { font-size: 13.5px; font-weight: 800; margin: 0; }
        .jfp-drawer-carry { margin-top: 6px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.06); }
        .jfp-drawer-carry p { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em; color: #999; margin-bottom: 10px; }
        .jfp-drawer-carry ul { margin: 0; padding: 0; list-style: none; font-size: 13.5px; color: #666; line-height: 2; }
        .jfp-drawer-cta { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 26px; padding: 15px; border-radius: 10px; color: #fff; font-weight: 800; font-size: 14px; text-decoration: none; }

        /* MAP */
        .jfp-map-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px; align-items: center; padding: 60px 0; }
        .jfp-map-card { background: #fff; border-radius: 16px; padding: 26px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 30px rgba(0,0,0,0.03); display: flex; justify-content: center; }
        .jfp-map-dot { cursor: pointer; transition: transform .15s ease; }
        .jfp-map-dot:hover { transform: translate(-50%,-50%) scale(1.15); }
        .jfp-map-label { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; font-size: 10px; font-weight: 700; color: #111; white-space: nowrap; background: rgba(255,255,255,.85); padding: 1px 5px; border-radius: 4px; pointer-events: none; }
        .jfp-city-chip-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; max-width: 420px; }
        .jfp-city-chip { display: inline-flex; align-items: center; gap: 6px; background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 99px; padding: 8px 14px; font-size: 12.5px; font-weight: 700; color: #111; cursor: pointer; transition: border-color .2s, background .2s; }
        .jfp-city-chip:hover { border-color: #E8650A; background: #FFF6EF; }
        .jfp-city-chip span { font-weight: 900; color: #1A7A2E; }

        /* TESTIMONIALS */
        .jfp-testi-wrap { padding: 20px 0 70px; }
        .jfp-testi-card { background: #fff; border-radius: 12px; padding: 26px; border: 1px solid rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; box-sizing: border-box; }
        .jfp-testi-card p.quote { font-size: 14px; color: #555; line-height: 1.7; flex: 1; margin: 14px 0 20px; }
        .jfp-testi-card .who { padding-top: 14px; border-top: 1px solid rgba(0,0,0,0.06); }
        .jfp-testi-card .who p:first-child { font-weight: 800; font-size: 14px; margin: 0 0 2px; }
        .jfp-testi-card .who p:last-child { font-size: 12px; color: #888; margin: 0; }

        /* FAQ (mirrors ContactPage) */
        .jfp-faq-wrap { padding: 20px 0 90px; max-width: 760px; margin: 0 auto; }
        .jfp-faq-head { text-align: center; margin-bottom: 36px; }
        .jfp-faq-item { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
        .jfp-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; cursor: pointer; font-weight: 700; font-size: 14.5px; }
        .jfp-faq-q svg.chev { flex-shrink: 0; transition: transform 0.25s; color: #E8650A; }
        .jfp-faq-a { padding: 0 22px; max-height: 0; overflow: hidden; transition: all 0.3s ease; color: #666; font-size: 13.5px; line-height: 1.7; }
        .jfp-faq-item.open .jfp-faq-a { padding: 0 22px 20px; max-height: 240px; }
        .jfp-faq-item.open .jfp-faq-q svg.chev { transform: rotate(180deg); }

        /* CLOSING CTA */
        .jfp-cta-wrap { padding: 10px 0 90px; }
        .jfp-cta-card { background: #fff; border: 2px solid #111; border-radius: 16px; padding: 46px 30px; text-align: center; }
        .jfp-cta-card h2 { font-size: 26px; font-weight: 900; margin: 0 0 10px; }
        .jfp-cta-card p { color: #666; font-size: 14.5px; max-width: 480px; margin: 0 auto; }
        .jfp-cta-actions { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 26px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .jfp-stats-grid { grid-template-columns: 1fr 1fr; }
          .jfp-cards-grid { grid-template-columns: 1fr 1fr; }
          .jfp-map-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .jfp-stats-grid { grid-template-columns: 1fr; }
          .jfp-cards-grid { grid-template-columns: 1fr; }
          .jfp-hero h1 { font-size: 30px; }
          .jfp-hero { padding: 100px 0 60px; }
          .jfp-toolbar-inner { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      {/* HERO */}
      <section className="jfp-hero">
        <div className="jfp-container">
          
          <h1>Every fair is a <em>boarding pass</em> to work</h1>
          <p>No boarding gate, no ticket price. Walk into any ground we set up, resume in hand, and leave with an interview lined up. Browse every fair we've run and every one coming next.</p>
          <div className="jfp-hero-actions">
            <button type="button" className="jfp-btn-primary" onClick={scrollToToolbar}>
              Find a fair near you <ArrowRight size={16} />
            </button>
            <a href="#partner" className="jfp-btn-outline">
              <Building2 size={16} /> Register as an employer
            </a>
          </div>
        </div>
        <svg className="jfp-hero-curve" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C300,90 900,90 1200,0 L1200,90 L0,90 Z" fill="#F8F4EF" />
        </svg>
      </section>

      <div className="jfp-container">
        {/* QUICK STATS */}
        <div className="jfp-stats-grid">
          {QUICK_STATS.map((s) => (
            <div className="jfp-stat-card" key={s.label}>
              <div className="jfp-stat-icon" style={{ color: s.accent }}>{s.icon}</div>
              <h4>{s.value}</h4>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLBAR */}
      <div ref={toolbarRef} className="jfp-toolbar">
        <div className="jfp-container">
          <div className="jfp-toolbar-inner">
            <div className="jfp-search">
              <Search size={16} color="#999" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city or venue…"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={14} color="#999" />
                </button>
              )}
            </div>

            <select className="jfp-select" value={region} onChange={(e) => setRegion(e.target.value)}>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>

            <div className="jfp-tabs">
              <button
                type="button"
                className={"jfp-tab upcoming" + (status === 'upcoming' ? ' active' : '')}
                onClick={() => setStatus('upcoming')}
              >
                <Clock size={13} /> Upcoming
              </button>
              <button
                type="button"
                className={"jfp-tab previous" + (status === 'previous' ? ' active' : '')}
                onClick={() => setStatus('previous')}
              >
                <CheckCircle2 size={13} /> Previous
              </button>
            </div>
          </div>
          <p className="jfp-result-count">{filtered.length} {filtered.length === 1 ? 'fair' : 'fairs'} found</p>
        </div>
      </div>

      {/* FAIR CARDS */}
      <div className="jfp-container">
        {filtered.length === 0 ? (
          <div className="jfp-empty">
            <strong>No fairs match those filters yet.</strong>
            Try a different region or clear the search.
          </div>
        ) : (
          <div className="jfp-cards-grid">
            {filtered.map((fair) => {
              const accent = fair.status === 'upcoming' ? '#E8650A' : '#1A7A2E';
              return (
                <button
                  type="button"
                  key={fair.code}
                  className="jfp-card"
                  style={{ borderLeftColor: accent }}
                  onClick={() => openDrawer(fair)}
                >
                  <div className="jfp-card-top">
                    <span className="jfp-card-code">{fair.code}</span>
                    <span className="jfp-card-badge" style={{ background: accent + '1A', color: accent }}>{fair.status}</span>
                  </div>
                  <h4>{fair.city}</h4>
                  <p className="venue">{fair.venue}</p>
                  <div className="date-row">
                    <Calendar size={13} color={accent} /> {fair.date}
                  </div>
                  <hr className="jfp-card-divider" />
                  <div className="jfp-card-footer">
                    <div>
                      <p className="jfp-card-label">Sector</p>
                      <p className="jfp-card-value">{fair.sector}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="jfp-card-label">Openings</p>
                      <p className="jfp-card-value" style={{ color: accent }}>{fair.openings.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="jfp-container">
        <div className="jfp-map-grid">
          <div className="jfp-map-card">
            <div style={{ position: 'relative', width: mapSize, height: mapSize }}>
              {mapLoading && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#888' }}>Loading…</div>}
              {pathD && (
                <svg width={mapSize} height={mapSize} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                  <path d={pathD} fill="#F0EAE0" stroke="#C9BCA0" strokeWidth="0.7" />
                </svg>
              )}
              {plotted && plotted.map((p) => {
                const r = 5 + Math.min(p.count, 5) * 1.6;
                return (
                  <div
                    key={p.city}
                    className="jfp-map-dot"
                    role="button"
                    tabIndex={0}
                    onClick={() => goToCity(p.city)}
                    onKeyDown={(e) => { if (e.key === 'Enter') goToCity(p.city); }}
                    title={p.city + ' — ' + p.count + ' fair' + (p.count === 1 ? '' : 's')}
                    style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)' }}
                  >
                    <div style={{ width: r * 2, height: r * 2, borderRadius: '50%', background: '#E8650A', opacity: 0.85, border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,.15)' }} />
                    <span className="jfp-map-label">{p.city}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="jfp-section-label">Reach map</div>
            <h2 className="jfp-section-title">Find your city, <em>see its fairs</em></h2>
            <p style={{ fontSize: 14, color: '#666', maxWidth: 420, lineHeight: 1.7 }}>
              Every marker is a city we've run fairs in — bigger dot, more editions. Click a city on the map or in the list below to jump straight to its fairs.
            </p>
            <div className="jfp-city-chip-list">
              {topCities.map((c) => (
                <button type="button" className="jfp-city-chip" key={c.city} onClick={() => goToCity(c.city)}>
                  {c.city} <span>{c.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="jfp-container jfp-testi-wrap">
        <div className="jfp-faq-head">
          <div className="jfp-section-label" style={{ justifyContent: 'center', display: 'flex' }}>In their words</div>
          <h2 className="jfp-section-title">Stories from the <em>ground</em></h2>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} style={{ height: 'auto' }}>
              <div className="jfp-testi-card">
                <Quote size={20} color="#E8650A" />
                <p className="quote">{t.quote}</p>
                <div className="who">
                  <p>{t.name}</p>
                  <p>{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FAQ */}
      <div className="jfp-faq-wrap">
        <div className="jfp-faq-head">
          <div className="jfp-section-label" style={{ justifyContent: 'center', display: 'flex' }}>Before You Register</div>
          <h2 className="jfp-section-title">Quick <em>answers</em></h2>
        </div>
        {FAQS.map((f, i) => (
          <div className={"jfp-faq-item" + (openFaq === i ? ' open' : '')} key={f.q}>
            <div className="jfp-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HelpCircle size={17} color="#1A7A2E" />
                {f.q}
              </span>
              <ChevronDown size={18} className="chev" />
            </div>
            <div className="jfp-faq-a">{f.a}</div>
          </div>
        ))}
      </div>

      {/* CLOSING CTA */}
      <div id="partner" className="jfp-container jfp-cta-wrap">
        <div className="jfp-cta-card">
          <h2>Want a fair set up in your city?</h2>
          <p>Local bodies, industry associations, and employers can request a fair or reserve a recruiting stall.</p>
          <div className="jfp-cta-actions">
            <a href="/jobfair/request" className="jfp-btn-primary">Request a fair <ArrowRight size={16} /></a>
            <a href="/jobfair/partner" className="jfp-btn-outline"><Building2 size={16} /> Partner as an employer</a>
          </div>
        </div>
      </div>

      {/* DETAIL DRAWER */}
      <div className={"jfp-drawer-backdrop" + (drawerOpen ? ' open' : '')} onClick={closeDrawer} />
      <div className={"jfp-drawer" + (drawerOpen ? ' open' : '')}>
        {drawerFair && (
          <>
            <div className="jfp-drawer-top" style={{ background: drawerFair.status === 'upcoming' ? '#E8650A' : '#1A7A2E' }} />
            <div className="jfp-drawer-body">
              <button type="button" className="jfp-drawer-close" onClick={closeDrawer} aria-label="Close details">
                <X size={20} color="#111" />
              </button>

              <span
                className="jfp-drawer-badge"
                style={{
                  background: (drawerFair.status === 'upcoming' ? '#E8650A' : '#1A7A2E') + '1A',
                  color: drawerFair.status === 'upcoming' ? '#E8650A' : '#1A7A2E',
                }}
              >
                {drawerFair.status}
              </span>
              <h2>{drawerFair.city}</h2>
              <p className="venue">{drawerFair.venue}</p>

              <div className="jfp-drawer-grid">
                <div className="jfp-drawer-item"><p>Dates</p><p>{drawerFair.date}</p></div>
                <div className="jfp-drawer-item"><p>Region</p><p>{drawerFair.region} India</p></div>
                <div className="jfp-drawer-item"><p>Openings</p><p style={{ color: drawerFair.status === 'upcoming' ? '#E8650A' : '#1A7A2E' }}>{drawerFair.openings.toLocaleString('en-IN')}</p></div>
                <div className="jfp-drawer-item"><p>Expected footfall</p><p>{drawerFair.youth}</p></div>
              </div>

              <div className="jfp-drawer-item" style={{ marginBottom: 4 }}>
                <p>Hiring focus</p>
                <p>{drawerFair.sector}</p>
              </div>

              <div className="jfp-drawer-carry">
                <p>What to carry</p>
                <ul>
                  <li>• Printed resumes and a valid photo ID</li>
                  <li>• Educational and experience certificates</li>
                  <li>• Two passport-size photographs</li>
                </ul>
              </div>

              <a
                href={"/jobfair/register?fair=" + drawerFair.code}
                className="jfp-drawer-cta"
                style={{ background: drawerFair.status === 'upcoming' ? '#E8650A' : '#1A7A2E' }}
              >
                {drawerFair.status === 'upcoming' ? 'Register interest' : 'Notify me of the next edition'} <ArrowRight size={15} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}