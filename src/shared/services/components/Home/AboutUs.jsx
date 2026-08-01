import React from 'react';
import CountUpStat from '../../../utils/CountUpStat';

const JOURNEY = [
  {
    year: "2019",
    title: "The idea takes shape",
    text: "Founded on a simple observation: India's youth weren't short of skill, they were short of a door in.",
    tag: "Founded",
    stat: "Day 1",
    statLabel: "The beginning",
    icon: "bulb"
  },
  {
    year: "2020",
    title: "First fair, first offers",
    text: "Our first job fair ran out of a single hall in Ahmedabad. 40 companies, 900 youth, offers signed on the spot.",
    tag: "Ahmedabad",
    stat: "900",
    statLabel: "Youth attended",
    icon: "building"
  },
  {
    year: "2021",
    title: "The caravan starts moving",
    text: "One city became ten states. We built a travelling fair model with local partners and a fast setup playbook.",
    tag: "10 states",
    stat: "10",
    statLabel: "States reached",
    icon: "pin"
  },
  {
    year: "2023",
    title: "100,000 youth placed",
    text: "We crossed our first major milestone as manufacturing, retail, logistics and healthcare employers kept returning.",
    tag: "Milestone",
    stat: "100K+",
    statLabel: "Youth placed",
    icon: "users"
  },
  {
    year: "2025",
    title: "28 states, 800+ companies",
    text: "What started in one hall now runs nationwide, backed by partnerships with NSDC, CII and ASDC.",
    tag: "Nationwide",
    stat: "800+",
    statLabel: "Companies onboarded",
    icon: "handshake"
  },
  {
    year: "2026",
    title: "Still on the road",
    text: "Fairs scheduled in every region this year. The goal hasn't changed: zero cost, zero barriers, just careers.",
    tag: "Ongoing",
    stat: "28",
    statLabel: "States, and counting",
    icon: "flag"
  },
];

function StopIcon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "bulb": return <svg {...common}><path d="M9 18h6m-3 3h0M12 3a6 6 0 0 0-3.4 10.9c.5.4.9 1.1.9 1.8V16h5v-.3c0-.7.3-1.4.9-1.8A6 6 0 0 0 12 3Z" /></svg>;
    case "building": return <svg {...common}><rect x="5" y="3" width="10" height="18" rx="1" /><path d="M15 21h4v-9l-4-3M8 7h1M11 7h1M8 11h1M11 11h1" /></svg>;
    case "pin": return <svg {...common}><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" /></svg>;
    case "users": return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="8.5" r="2.4" /><path d="M15.5 13.2A5.5 5.5 0 0 1 20.8 20" /></svg>;
    case "handshake": return <svg {...common}><path d="M2.5 12.5 6 9l3 2.5m13 1L18 9l-3 2.5" /><path d="M9 11.5l2.3 2.1a1.4 1.4 0 0 0 2-2" /></svg>;
    case "flag": return <svg {...common}><path d="M5 21V4h13l-3 4 3 4H5" /></svg>;
    default: return null;
  }
}

export default function AboutUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700;800;900&family=Lora:ital,wght@0,600;1,600&display=swap');

        .a-wrap { font-family: 'Raleway', sans-serif; background: #F8F4EF; width: 100%; position: relative; overflow: hidden; }

        /* ---------- Who we are Section ---------- */
        .a-mission-bg { width: 100%; background: #EADFC9; position: relative; z-index: 1; }
        .a-mission { max-width: 1120px; margin: 0 auto; padding: 100px 52px 80px; position: relative; }
        
        .a-eyebrow { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 32px; }
        .a-eyebrow-line { height: 1px; width: 40px; background: rgba(0,0,0,.15); }
        .a-eyebrow-txt { font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(0,0,0,.4); }

        .a-mission-grid { display: grid; grid-template-columns: 0.85fr 1fr; gap: 48px; align-items: center; text-align: left; }
        .a-headline { font-size: clamp(28px, 3.6vw, 42px); font-weight: 900; letter-spacing: -1px; line-height: 1.2; color: #111; }
        .a-headline em { font-family: 'Lora', serif; font-style: italic; color: #E8650A; font-weight: 600; }
        
        .a-body { font-size: 16px; font-weight: 400; line-height: 1.8; color: rgba(0,0,0,.7); }
        .a-body strong { font-weight: 700; color: #111; }

        /* Decorative Elements (Glows & Rings) */
        .a-glow { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .a-glow-1 { width: 380px; height: 380px; top: 20px; right: 20px; background: radial-gradient(circle,rgba(255,153,51,.15),transparent 70%); }
        .a-glow-2 { width: 400px; height: 400px; top: 500px; left: -100px; background: radial-gradient(circle,rgba(19,136,8,.12),transparent 70%); }
        
        .a-ring { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; border: 1.5px dashed rgba(0,0,0,.1); animation: a-spin 40s linear infinite; }
        .a-ring-1 { width: 120px; height: 120px; top: 60px; left: 60px; }
        @keyframes a-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* ---------- Roadmap Section ---------- */
        .a-journey-section { max-width: 1000px; margin: 0 auto; padding: 80px 52px; position: relative; }
        .a-j-head { text-align: center; margin-bottom: 60px; }
        .a-j-title { font-size: 32px; font-weight: 900; color: #111; letter-spacing: -1px; }
        .a-j-title em { font-family: 'Lora', serif; font-style: italic; color: #1A7A2E; font-weight: 600; }

        /* --- Large faint watermark behind the timeline --- */
        .a-journey-deco { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .a-journey-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Raleway', sans-serif;
          font-weight: 900;
          font-size: clamp(50px, 9vw, 120px);
          letter-spacing: -3px;
          color: rgba(0,0,0,.035);
          white-space: nowrap;
          text-transform: uppercase;
          user-select: none;
        }

        .a-journey-section > *:not(.a-journey-deco) { position: relative; z-index: 1; }

        .a-road { position: relative; }

        /* --- Road line "draws" itself top to bottom --- */
        .a-road-line {
          position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
          background: #DED6C5; transform: translateX(-50%);
          overflow: hidden;
        }
        .a-road-line::after {
          content: '';
          position: absolute;
          left: 0; top: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, #1A7A2E, #E8650A);
          transform: scaleY(0);
          transform-origin: top;
          animation: a-road-draw 2.4s ease forwards 0.2s;
        }
        @keyframes a-road-draw {
          to { transform: scaleY(1); }
        }

        /* --- Staggered stop entrance --- */
        .a-stop {
          display: grid; grid-template-columns: 1fr 60px 1fr;
          align-items: center; margin-bottom: 50px; position: relative;
          opacity: 0;
          animation: a-stop-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .a-stop-left { animation-name: a-stop-in-left; }
        .a-stop-right { animation-name: a-stop-in-right; }
        @keyframes a-stop-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes a-stop-in-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .a-stop:nth-child(2) { animation-delay: 0.15s; }
        .a-stop:nth-child(3) { animation-delay: 0.45s; }
        .a-stop:nth-child(4) { animation-delay: 0.75s; }
        .a-stop:nth-child(5) { animation-delay: 1.05s; }
        .a-stop:nth-child(6) { animation-delay: 1.35s; }
        .a-stop:nth-child(7) { animation-delay: 1.65s; }

        .a-stop-marker {
          grid-column: 2; display: flex; flex-direction: column;
          align-items: center; position: relative; z-index: 2;
        }
        .a-stop-year {
          font-family: 'Lora', serif; font-style: italic; font-weight: 700;
          font-size: 13px; color: #111; margin-bottom: 6px; background: #F8F4EF; padding: 0 4px;
        }

        /* --- Pin pulse --- */
        .a-stop-pin {
          width: 14px; height: 14px; border-radius: 50%; background: #fff;
          border: 3px solid var(--accent); box-shadow: 0 0 0 4px #F8F4EF;
          position: relative;
        }
        .a-stop-pin::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          animation: a-pin-pulse 2.2s ease-out infinite;
        }
        @keyframes a-pin-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        .a-stop-card {
          background: #fff; border-radius: 14px; padding: 20px 22px;
          border: 1px solid rgba(0,0,0,0.06); border-left: 4px solid var(--accent);
          box-shadow: 0 6px 20px rgba(0,0,0,0.03); position: relative;
        }

        .a-stop-left .a-stop-card { grid-column: 1; justify-self: end; text-align: right; margin-right: 20px; }
        .a-stop-right .a-stop-card { grid-column: 3; justify-self: start; text-align: left; margin-left: 20px; }

        .a-stop-icon {
          width: 38px; height: 38px; background: var(--accent-bg); color: var(--accent);
          border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;
        }

        .a-stop-tag { font-size: 9px; font-weight: 800; text-transform: uppercase; color: var(--accent); display: block; margin-bottom: 6px; letter-spacing: 0.1em;}
        .a-stop-title { font-size: 17px; font-weight: 800; color: #111; margin-bottom: 6px; }
        .a-stop-text { font-size: 13.5px; color: rgba(0,0,0,0.6); line-height: 1.5; }

        .a-stop-stat { display: flex; flex-direction: column; }
        .a-stop-left .a-stop-stat { grid-column: 3; align-items: flex-start; margin-left: 20px; }
        .a-stop-right .a-stop-stat { grid-column: 1; align-items: flex-end; text-align: right; margin-right: 20px; }

        .a-stat-num { font-size: 30px; font-weight: 900; color: var(--accent); line-height: 1; }
        .a-stat-lab { font-size: 10px; font-weight: 700; color: #999; text-transform: uppercase; margin-top: 4px; }

        @media(max-width: 768px) {
          .a-journey-deco { display: none; }
          .a-mission-grid { grid-template-columns: 1fr; gap: 30px; text-align: center; }
          .a-road-line { left: 20px; transform: none; }
          .a-stop { grid-template-columns: 40px 1fr; gap: 0; }
          .a-stop-marker { grid-column: 1; align-items: center; }
          .a-stop-left .a-stop-card, .a-stop-right .a-stop-card { grid-column: 2; margin: 0 0 20px 20px; text-align: left; }
          .a-stop-stat { display: none; }
        }
      `}</style>

      <div className="a-wrap" id="about">
        <div className="a-glow a-glow-1"/>
        <div className="a-glow a-glow-2"/>
        <div className="a-ring a-ring-1"/>

        {/* --- Who We Are Section --- */}
        <section className="a-mission-bg">
          <div className="a-mission">
            <div className="a-eyebrow">
              <div className="a-eyebrow-line"/>
              <span className="a-eyebrow-txt">Who we are</span>
              <div className="a-eyebrow-line"/>
            </div>
            <div className="a-mission-grid">
              <h1 className="a-headline">
                Built to close the gap between <em>Bharat's youth</em> and Bharat's employers.
              </h1>
              <p className="a-body">
                <strong>Skill Yuva Bharat</strong> exists because the hardest part of getting hired was 
                never a lack of skill — it was never being in the same room as someone hiring. 
                We organise large-scale job fairs across India that bring employers and job-seekers 
                face to face, <strong>at zero cost</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* --- Roadmap Section --- */}
        <section className="a-journey-section">
          <div className="a-journey-deco">
            <span className="a-journey-watermark">Our Journey</span>
          </div>

          <div className="a-j-head">
            <h2 className="a-j-title">Our <em>Roadmap</em> across India</h2>
          </div>

          <div className="a-road">
            <div className="a-road-line" />
            {JOURNEY.map((stop, i) => {
              const isLeft = i % 2 === 0;
              const accent = isLeft ? "#1A7A2E" : "#E8650A";
              const accentBg = isLeft ? "rgba(26,122,46,.1)" : "rgba(232,101,10,.1)";

              return (
                <div key={i} className={`a-stop ${isLeft ? 'a-stop-left' : 'a-stop-right'}`}
                  style={{ '--accent': accent, '--accent-bg': accentBg }}>
                  
                  {/* Years and Center Marker */}
                  <div className="a-stop-marker">
                    <span className="a-stop-year">{stop.year}</span>
                    <div className="a-stop-pin" />
                  </div>

                  {/* The Card */}
                  <div className="a-stop-card">
                    <div className="a-stop-icon">
                      <StopIcon type={stop.icon} />
                    </div>
                    <span className="a-stop-tag">{stop.tag}</span>
                    <h3 className="a-stop-title">{stop.title}</h3>
                    <p className="a-stop-text">{stop.text}</p>
                  </div>

                  {/* External Floating Side Stats */}
                  <div className="a-stop-stat">
                    <span className="a-stat-num"><CountUpStat value={stop.stat} /></span>
                    <span className="a-stat-lab">{stop.statLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}