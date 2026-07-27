import React from 'react';
import { Link } from 'react-router-dom';
import { Cog } from 'lucide-react';

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    accent: "orange",
    title: "Job Fairs",
    text: "Large-scale hiring events in your city. Walk in, meet 40+ employers, and interview on the spot.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
      </svg>
    ),
    accent: "green",
    title: "Skill Training",
    text: "Short, impactful courses designed to sharpen your interview skills and workplace basics for free.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 9h1M14 9h1M9 13h1M14 13h1" />
      </svg>
    ),
    accent: "orange",
    title: "Direct Connect",
    text: "Talk directly to recruiters. We eliminate agents, middlemen, and hidden application fees.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15h6M9 18h4" />
      </svg>
    ),
    accent: "green",
    title: "Career Support",
    text: "Resume building, mock interviews, and personalized guidance from dedicated placement officers.",
  },
];

export default function Services() {
  return (
    <section className="sv-wrap" id="services">
      <style>{`
        .sv-wrap {
          background: #F8F4EF; /* Matching About Us Background */
          padding: 80px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Raleway', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .sv-gear-wrap {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          color: #111;
        }
        .sv-gear-tl {
          top: 24px;
          left: 24px;
        }
        .sv-gear-tl .sv-gear-big {
          width: 200px;
          height: 200px;
          opacity: 0.14;
          animation: sv-gear-spin 30s linear infinite;
        }
        .sv-gear-tl .sv-gear-small {
          width: 100px;
          height: 100px;
          opacity: 0.17;
          position: absolute;
          top: 150px;
          left: 165px;
          animation: sv-gear-spin-rev 22s linear infinite;
        }

        .sv-gear-br {
          bottom: 24px;
          right: 24px;
        }
        .sv-gear-br .sv-gear-big {
          width: 220px;
          height: 220px;
          opacity: 0.14;
          animation: sv-gear-spin-rev 34s linear infinite;
        }
        .sv-gear-br .sv-gear-small {
          width: 110px;
          height: 110px;
          opacity: 0.17;
          position: absolute;
          bottom: 170px;
          right: 175px;
          animation: sv-gear-spin 24s linear infinite;
        }

        @keyframes sv-gear-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sv-gear-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        .sv-wrap > *:not(.sv-gear-wrap) {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .sv-gear-wrap { display: none; }
        }

        .sv-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .sv-eyebrow-line { height: 1px; width: 32px; background: rgba(0,0,0,.15); }
        .sv-label { 
          font-size: 11px; 
          font-weight: 700; 
          letter-spacing: .2em; 
          text-transform: uppercase; 
          color: rgba(0,0,0,.4); 
        }

        .sv-heading {
          font-size: clamp(26px, 3.2vw, 34px);
          font-weight: 900;
          color: #111;
          line-height: 1.2;
          margin: 0 0 12px;
          max-width: 600px;
          text-align: center;
          letter-spacing: -0.5px;
        }
        .sv-heading em {
          font-family: 'Lora', serif;
          font-style: italic;
          color: #E8650A;
          font-weight: 600;
        }

        .sv-subtitle {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(0,0,0,0.6);
          margin: 0 0 48px;
          max-width: 480px;
          text-align: center;
        }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 900px;
          width: 100%;
        }

        /* --- Staggered entrance --- */
        .sv-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.14);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: sv-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sv-card:nth-child(1) { animation-delay: 0.1s; }
        .sv-card:nth-child(2) { animation-delay: 0.4s; }
        .sv-card:nth-child(3) { animation-delay: 0.7s; }
        .sv-card:nth-child(4) { animation-delay: 1.0s; }

        @keyframes sv-rise {
          from { opacity: 0; transform: translateY(60px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .sv-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        /* Subtle Accent Line on Top */
        .sv-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }
        .sv-card--orange::after { background: #E8650A; }
        .sv-card--green::after { background: #1A7A2E; }

        /* --- Badge with rotating dashed ring --- */
        .sv-badge-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sv-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2.5px dashed rgba(0,0,0,0.25);
          animation: sv-spin 6s linear infinite;
        }
        .sv-badge-wrap--orange .sv-ring { border-color: #E8650A; }
        .sv-badge-wrap--green .sv-ring { border-color: #1A7A2E; }

        @keyframes sv-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .sv-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .sv-badge--orange {
          background: rgba(232,101,10,0.08);
          color: #E8650A;
        }
        .sv-badge--green {
          background: rgba(26,122,46,0.08);
          color: #1A7A2E;
        }

        .sv-title {
          font-size: 17px;
          font-weight: 800;
          color: #111;
          margin: 0 0 8px;
        }

        .sv-text {
          font-size: 13.5px;
          color: rgba(0,0,0,0.6);
          line-height: 1.6;
          margin: 0;
        }

        .sv-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #111;
          color: #fff;
          padding: 12px 28px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          margin-top: 40px;
          transition: background 0.2s;
        }
        .sv-cta:hover { background: #E8650A; }

        /* --- CTA arrow micro-bounce --- */
        .sv-cta-arrow {
          display: inline-flex;
          animation: sv-arrow-bounce 1s ease-in-out infinite;
        }
        @keyframes sv-arrow-bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(8px); }
        }

        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-heading { font-size: 26px; }
          .sv-wrap { padding: 60px 20px; }
        }
      `}</style>

      <div className="sv-gear-wrap sv-gear-tl">
        <Cog className="sv-gear-big" strokeWidth={1.5} />
        <Cog className="sv-gear-small" strokeWidth={1.5} />
      </div>

      <div className="sv-gear-wrap sv-gear-br">
        <Cog className="sv-gear-big" strokeWidth={1.5} />
        <Cog className="sv-gear-small" strokeWidth={1.5} />
      </div>

      <div className="sv-eyebrow">
        <div className="sv-eyebrow-line" />
        <span className="sv-label">What we offer</span>
        <div className="sv-eyebrow-line" />
      </div>

      <h2 className="sv-heading">
        Everything you need to find <em>real work</em>, in one place.
      </h2>

      <p className="sv-subtitle">
        From your first walk-in interview to your first paycheck, we're with you at every step of your professional journey.
      </p>

      <div className="sv-grid">
        {services.map((s) => (
          <div className={`sv-card sv-card--${s.accent}`} key={s.title}>
            <div className={`sv-badge-wrap sv-badge-wrap--${s.accent}`}>
              <div className="sv-ring" />
              <div className={`sv-badge sv-badge--${s.accent}`}>{s.icon}</div>
            </div>
            <h3 className="sv-title">{s.title}</h3>
            <p className="sv-text">{s.text}</p>
          </div>
        ))}
      </div>

      <Link to="/services" className="sv-cta">
        Explore all services
        <span className="sv-cta-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </section>
  );
}