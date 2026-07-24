import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft, CheckCircle2, Clock } from "lucide-react";

const PREVIOUS_FAIRS = [
  { city: "Chennai", venue: "YMCA Grounds, Nandanam", date: "12 - 14 Mar 2026", jobs: 118, youth: "6,400+" },
  { city: "Kolkata", venue: "Biswa Bangla Mela Prangan", date: "22 - 23 Feb 2026", jobs: 95, youth: "5,100+" },
  { city: "Ahmedabad", venue: "GMDC Exhibition Ground", date: "05 - 06 Feb 2026", jobs: 132, youth: "7,800+" },
  { city: "Pune", venue: "Ground No. 4, Balewadi", date: "18 - 19 Jan 2026", jobs: 87, youth: "4,900+" },
  { city: "Jaipur", venue: "Birla Auditorium Grounds", date: "22 - 23 Dec 2025", jobs: 74, youth: "3,600+" },
  { city: "Bhubaneswar", venue: "Janata Maidan", date: "08 - 09 Dec 2025", jobs: 61, youth: "3,100+" },
];

const UPCOMING_FAIRS = [
  { city: "Guwahati", venue: "Khanapara Veterinary Ground", date: "02 - 03 Aug 2026", jobs: 70, youth: "3,500+ expected" },
  { city: "Lucknow", venue: "Smriti Upvan Ground", date: "16 - 17 Aug 2026", jobs: 105, youth: "5,800+ expected" },
  { city: "Indore", venue: "Nehru Stadium Grounds", date: "29 - 30 Aug 2026", jobs: 92, youth: "4,700+ expected" },
  { city: "Coimbatore", venue: "Codissia Trade Fair Complex", date: "12 - 13 Sep 2026", jobs: 68, youth: "3,300+ expected" },
  { city: "Patna", venue: "Gandhi Maidan", date: "26 - 27 Sep 2026", jobs: 84, youth: "4,200+ expected" },
  { city: "Nagpur", venue: "Reshimbagh Ground", date: "10 - 11 Oct 2026", jobs: 76, youth: "3,900+ expected" },
];

export default function PreviousUpcomingSection() {
  const [tab, setTab] = useState("previous");
  const fairs = tab === "previous" ? PREVIOUS_FAIRS : UPCOMING_FAIRS;

  const handleTab = function (value) {
    setTab(value);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600;700;900&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .jf{font-family:'Raleway',sans-serif;background:#F8F4EF;width:100%;position:relative;overflow:hidden;padding:110px 52px 130px}

        .jf-texture{position:absolute;inset:0;pointer-events:none;z-index:0;
          background-image:radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px);
          background-size:26px 26px;
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 90%);
          mask-image:radial-gradient(ellipse 80% 70% at 50% 40%, #000 40%, transparent 90%)}

        .jf-orbit{position:absolute;border-radius:50%;pointer-events:none;z-index:0;display:flex;align-items:center;justify-content:center}
        .jf-orbit-1{width:220px;height:220px;top:80px;right:-110px;border:1.5px solid rgba(255,153,51,.28)}
        .jf-orbit-2{width:170px;height:170px;bottom:0;left:-85px;border:1.5px solid rgba(19,136,8,.28)}
        .jf-orbit-dot-wrap{position:absolute;inset:0;animation:jforbitspin 7s linear infinite}
        .jf-orbit-dot{position:absolute;top:-6px;left:50%;width:12px;height:12px;border-radius:50%;transform:translateX(-50%);box-shadow:0 0 0 5px #F8F4EF}
        .jf-orbit-dot-a{background:#E8650A}
        .jf-orbit-dot-b{background:#1A7A2E}
        @keyframes jforbitspin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(max-width:900px){.jf-orbit{display:none}}
        .jf-dot{position:absolute;border-radius:50%;pointer-events:none;z-index:0}
        .jf-dot-1{width:7px;height:7px;top:180px;left:90px;background:#E8650A;opacity:.3}
        .jf-dot-2{width:6px;height:6px;bottom:60px;right:110px;background:#1A7A2E;opacity:.3}
        @media(max-width:900px){.jf-dot{width:5px!important;height:5px!important}}

        .jf-inner{max-width:1180px;margin:0 auto;position:relative;z-index:1}

        .jf-head{text-align:center;margin-bottom:48px}

        .jfprev-eyebrow{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:22px}
        .jfprev-eyebrow-line{height:1px;width:40px;background:rgba(0,0,0,.2)}
        .jfprev-eyebrow-txt{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.35)}

        .jf-title{font-family:'Raleway',sans-serif;font-size:28px;font-weight:800;letter-spacing:-.5px;color:#111;margin-bottom:16px}
        .jf-title em{font-family:'Lora',serif;font-style:italic;font-weight:600;color:#E8650A}
        .jf-sub{font-size:15.5px;font-weight:400;color:rgba(0,0,0,.72);max-width:560px;margin:0 auto;line-height:1.7}

        .jf-tabs{display:flex;align-items:center;justify-content:center;gap:10px;margin:40px auto 46px;position:relative;width:fit-content;background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:99px;padding:6px}
        .jf-tab{position:relative;display:flex;align-items:center;gap:8px;padding:11px 22px;border-radius:99px;font-size:13.5px;font-weight:700;background:transparent;border:none;cursor:pointer;z-index:1;transition:color .25s}
        .jf-tab-pill{position:absolute;inset:0;border-radius:99px;z-index:-1}

        .jf-tab-pulse{position:relative;display:inline-flex;width:7px;height:7px;border-radius:50%;background:#fff}
        .jf-tab-pulse::after{content:'';position:absolute;inset:0;border-radius:50%;background:#fff;animation:jfpulse 1.6s ease-out infinite}
        @keyframes jfpulse{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(2.6)}}

        .jf-carousel{position:relative;padding:6px 0 30px}
        .jf-swiper{overflow:hidden}
        .jf-swiper .swiper-wrapper{align-items:stretch}
        .jf-swiper .swiper-slide{height:auto;display:flex;width:auto}

        .jf-card{
          position:relative;
          width:100%;
          background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;padding:26px;
          box-shadow:0 10px 30px rgba(0,0,0,.04);display:flex;flex-direction:column;gap:16px;
          transition:transform .25s,box-shadow .25s;
          overflow:hidden
        }
        .jf-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.08)}
        .jf-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px}
        .jf-card--previous{background:linear-gradient(180deg, rgba(26,122,46,.05), #fff 90px)}
        .jf-card--previous::before{background:#1A7A2E}
        .jf-card--upcoming{background:linear-gradient(180deg, rgba(232,101,10,.06), #fff 90px)}
        .jf-card--upcoming::before{background:#E8650A}

        .jf-icon-badge{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:7px;flex-shrink:0}

        .jf-card-date{display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:700;letter-spacing:.04em;color:rgba(0,0,0,.6)}
        .jf-card-city{font-size:21px;font-weight:800;letter-spacing:-.3px;color:#111}
        .jf-card-venue{display:flex;align-items:flex-start;gap:7px;font-size:13.5px;font-weight:400;color:rgba(0,0,0,.72);line-height:1.5}
        .jf-card-venue svg{flex-shrink:0;margin-top:2px}

        .jf-card-meta{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid rgba(0,0,0,.06)}
        .jf-card-stat{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:rgba(0,0,0,.65)}
        .jf-card-jobs{font-size:12.5px;font-weight:800;color:#1A7A2E;background:rgba(26,122,46,.08);padding:4px 10px;border-radius:6px}

        .jf-card-link{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#111;text-decoration:none;align-self:flex-start;transition:gap .2s,color .2s;background:none;border:none;padding:0;font-family:inherit;cursor:pointer}
        .jf-card-link:hover{gap:10px;color:#E8650A}

        .jf-nav{
          width:44px;height:44px;border-radius:50%;
          background:#fff;border:1px solid rgba(0,0,0,.08);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.08);
          transition:background .2s,color .2s,box-shadow .2s;color:#111
        }
        .jf[data-tab="previous"] .jf-nav{box-shadow:0 8px 22px rgba(26,122,46,.18)}
        .jf[data-tab="upcoming"] .jf-nav{box-shadow:0 8px 22px rgba(232,101,10,.2)}
        .jf-nav:hover{background:#111;color:#fff}
        .jf-nav.swiper-button-disabled{opacity:.35;cursor:default;pointer-events:none}

        .jf-nav-row{display:flex;justify-content:center;gap:14px;margin-top:32px}

        .jf-cta{display:flex;justify-content:center;margin-top:24px}
        .jf-viewall{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;letter-spacing:.02em;color:#fff;background:#111;padding:15px 34px;border-radius:99px;text-decoration:none;transition:background .2s}
        .jf-viewall:hover{background:#E8650A}

        @keyframes jffu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .jfa{animation:jffu .5s cubic-bezier(.22,1,.36,1) both}

        @media(prefers-reduced-motion:reduce){.jfa{animation:none!important}}

        @media(max-width:760px){
          .jf{padding:70px 24px 90px}
          .jf-head{margin-bottom:32px}
          .jf-tabs{flex-wrap:wrap;gap:8px;padding:5px;margin:28px auto 34px}
          .jf-tab{padding:9px 16px;font-size:12.5px}
          .jf-card{padding:20px}
          .jf-card-city{font-size:19px}
          .jf-viewall{padding:13px 26px;font-size:12.5px}
        }
      `}</style>

      <section className="jf" id="fairs" data-tab={tab}>
        <div className="jf-texture"/>
        <div className="jf-orbit jf-orbit-1">
          <div className="jf-orbit-dot-wrap">
            <span className="jf-orbit-dot jf-orbit-dot-a"/>
          </div>
        </div>
        <div className="jf-orbit jf-orbit-2">
          <div className="jf-orbit-dot-wrap">
            <span className="jf-orbit-dot jf-orbit-dot-b"/>
          </div>
        </div>
        <div className="jf-dot jf-dot-1"/>
        <div className="jf-dot jf-dot-2"/>

        <div className="jf-inner">
          <div className="jf-head">
            <div className="jfprev-eyebrow">
              <div className="jfprev-eyebrow-line" />
              <span className="jfprev-eyebrow-txt">Job fair events</span>
              <div className="jfprev-eyebrow-line" />
            </div>

            <h2 className="jf-title">
              Previous &amp; <em>Upcoming</em> Job Fairs
            </h2>
            <p className="jf-sub">
              Explore our successful recruitment drives and discover upcoming opportunities to connect with leading employers across India.
            </p>
          </div>

          <div className="jf-tabs">
            <button
              type="button"
              className="jf-tab"
              aria-pressed={tab === "previous"}
              style={{ color: tab === "previous" ? "#fff" : "rgba(0,0,0,.65)" }}
              onClick={function () { handleTab("previous"); }}
            >
              {tab === "previous" && (
                <motion.div
                  layoutId="jf-tab-bg"
                  className="jf-tab-pill"
                  style={{ background: "#1A7A2E" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <CheckCircle2 size={15} />
              Previous Job Fairs
            </button>
            <button
              type="button"
              className="jf-tab"
              aria-pressed={tab === "upcoming"}
              style={{ color: tab === "upcoming" ? "#fff" : "rgba(0,0,0,.65)" }}
              onClick={function () { handleTab("upcoming"); }}
            >
              {tab === "upcoming" && (
                <motion.div
                  layoutId="jf-tab-bg"
                  className="jf-tab-pill"
                  style={{ background: "#E8650A" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Clock size={15} />
              Upcoming Job Fairs
              <span className="jf-tab-pulse" aria-hidden="true"/>
            </button>
          </div>

          <div className="jf-carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Swiper
                  className="jf-swiper"
                  modules={[Navigation, Autoplay]}
                  autoplay={{
                    delay: 2800,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  spaceBetween={22}
                  slidesPerView={1}
                  navigation={{
                    prevEl: ".jf-nav-prev",
                    nextEl: ".jf-nav-next",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {fairs.map(function (fair, i) {
                    return (
                      <SwiperSlide key={fair.city}>
                        <div
                          className={"jf-card jfa jf-card--" + tab}
                          style={{ animationDelay: (0.05 * i) + "s" }}
                        >
                          <div className="jf-card-date">
                            <span className="jf-icon-badge" style={{ background: tab === "previous" ? "rgba(26,122,46,.1)" : "rgba(232,101,10,.1)" }}>
                              <Calendar size={12} style={{ color: tab === "previous" ? "#1A7A2E" : "#E8650A" }} />
                            </span>
                            {fair.date}
                          </div>
                          <div className="jf-card-city">{fair.city}</div>
                          <div className="jf-card-venue">
                            <span className="jf-icon-badge" style={{ background: "rgba(232,101,10,.1)" }}>
                              <MapPin size={12} color="#E8650A" />
                            </span>
                            <span>{fair.venue}</span>
                          </div>
                          <div className="jf-card-meta">
                            <div className="jf-card-stat">
                              <span className="jf-icon-badge" style={{ background: "rgba(0,0,0,.05)" }}>
                                <Users size={12} />
                              </span>
                              {fair.youth}
                            </div>
                            <span className="jf-card-jobs">{fair.jobs} Job Fairs</span>
                          </div>
                          <button type="button" className="jf-card-link">
                            View details <ArrowRight size={14} />
                          </button>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </motion.div>
            </AnimatePresence>

            <div className="jf-nav-row">
              <button type="button" className="jf-nav jf-nav-prev" aria-label="Previous">
                <ArrowLeft size={18} />
              </button>
              <button type="button" className="jf-nav jf-nav-next" aria-label="Next">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="jf-cta">
            <Link to="/jobfair" className="jf-viewall">
              View All Job Fairs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}