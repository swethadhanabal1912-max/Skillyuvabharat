import React from 'react';

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

        .sv-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
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

        .sv-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .sv-badge--orange { background: rgba(232,101,10,0.08); color: #E8650A; }
        .sv-badge--green { background: rgba(26,122,46,0.08); color: #1A7A2E; }

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

        @media (max-width: 768px) {
          .sv-grid { grid-template-columns: 1fr; }
          .sv-heading { font-size: 26px; }
          .sv-wrap { padding: 60px 20px; }
        }
      `}</style>

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
            <div className={`sv-badge sv-badge--${s.accent}`}>{s.icon}</div>
            <h3 className="sv-title">{s.title}</h3>
            <p className="sv-text">{s.text}</p>
          </div>
        ))}
      </div>

      <a href="/services" className="sv-cta">
        Explore all services
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}