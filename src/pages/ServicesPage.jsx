import React, { useEffect, useRef, useState } from 'react';
import {
  Users2, Handshake, UsersRound, FileText, Megaphone, LifeBuoy,
  Factory, Cpu, HeartPulse, Truck, Landmark, HardHat, ShoppingBag, ConciergeBell, Car, ChevronDown,
  UserSearch
} from 'lucide-react';

const RunIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.49,5.48c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S12.39,5.48,13.49,5.48z M9.89,19.38l1-4.4l2.1,2v6h2v-7.5l-2.1-2 l0.6-3c1.3,1.5,3.3,2.5,5.5,2.5v-2c-1.9,0-3.5-1-4.3-2.4l-1-1.6c-0.4-0.6-1-1-1.7-1c-0.3,0-0.5,0.1-0.8,0.1L6,8.3V13h2V9.6l1.8-0.7 l-1.6,8.1l-4.9-1l-0.4,2L9.89,19.38z"/>
  </svg>
);

const SECTOR_LIST = [
  { name: "Manufacturing", icon: <Factory size={22} />, color: "#E8650A", desc: "Assembly line roles, machine operators, and quality control positions across factories and production units." },
  { name: "IT & Tech", icon: <Cpu size={22} />, color: "#1A7A2E", desc: "Technical support, helpdesk, and entry-level IT roles with leading technology and software employers." },
  { name: "Healthcare", icon: <HeartPulse size={22} />, color: "#111111", desc: "Nursing assistants, lab technicians, and hospital support staff roles with verified healthcare providers." },
  { name: "Logistics", icon: <Truck size={22} />, color: "#E8650A", desc: "Warehouse operations, delivery, and supply chain roles with e-commerce and freight companies." },
  { name: "Banking", icon: <Landmark size={22} />, color: "#1A7A2E", desc: "Teller, customer service, and back-office roles with banks, NBFCs, and financial institutions." },
  { name: "Construction", icon: <HardHat size={22} />, color: "#111111", desc: "Site supervisors, skilled labour, and safety roles with infrastructure and real estate developers." },
  { name: "Retail", icon: <ShoppingBag size={22} />, color: "#E8650A", desc: "Store associates, cashiers, and inventory roles with retail chains and shopping outlets." },
  { name: "Hospitality", icon: <ConciergeBell size={22} />, color: "#1A7A2E", desc: "Front desk, housekeeping, and food & beverage service roles with hotels and restaurants." },
  { name: "Automotive", icon: <Car size={22} />, color: "#111111", desc: "Assembly technicians, service advisors, and dealership roles with auto manufacturers and service centers." },
];

const SERVICES = [
  {
    title: "Job Fair Organization",
    tag: "For Everyone",
    icon: <Users2 size={20} />,
    desc: "We organize engaging online and offline job fairs that bring talented job seekers and leading employers together under one platform.",
    points: ["Online & offline formats", "Multiple employers, one venue", "Open to every job seeker"],
    accent: "#E8650A"
  },
  {
    title: "Recruitment & Talent Acquisition",
    tag: "For Employers",
    icon: <Handshake size={20} />,
    desc: "We help companies find and connect with the right candidates through efficient recruitment and talent acquisition solutions.",
    points: ["Candidate sourcing", "Skill-based matching", "Faster hiring cycles"],
    accent: "#1A7A2E"
  },
  {
    title: "Candidate Connections",
    tag: "For Job Seekers",
    icon: <UsersRound size={20} />,
    desc: "We create opportunities for job seekers to meet recruiters, explore suitable job openings, and participate in direct interviews.",
    points: ["Direct recruiter meetings", "Explore live openings", "On-the-spot interviews"],
    accent: "#111"
  },
  {
    title: "Resume & Candidate Support",
    tag: "For Job Seekers",
    icon: <FileText size={20} />,
    desc: "We help job seekers present themselves effectively and connect their skills and experience with relevant career opportunities.",
    points: ["Resume guidance", "Skill highlighting", "Career-fit matching"],
    accent: "#E8650A"
  },
  {
    title: "Employer Branding & Candidate Screening",
    tag: "For Employers",
    icon: <Megaphone size={20} />,
    desc: "We help companies promote their brand while identifying and connecting with suitable candidates from a diverse talent pool.",
    points: ["Company brand visibility", "Pre-screened candidates", "Access to diverse talent"],
    accent: "#1A7A2E"
  },
  {
    title: "Post-Event Hiring Support",
    tag: "For Everyone",
    icon: <LifeBuoy size={20} />,
    desc: "Our support continues beyond the job fair with interview coordination, candidate follow-ups, and assistance throughout the hiring process.",
    points: ["Interview coordination", "Candidate follow-ups", "End-to-end hiring support"],
    accent: "#111"
  }
];

const SEEKER_STEPS = [
  { title: "Register", desc: "Create your account and register for the job fair." },
  { title: "Create Your Profile", desc: "Build your profile and upload your resume to showcase your skills and experience." },
  { title: "Explore Opportunities", desc: "Discover job openings that match your skills, qualifications, and career goals." },
  { title: "Meet Recruiters", desc: "Connect directly with employers and learn more about available opportunities." },
  { title: "Attend Interviews", desc: "Interact with recruiters and participate in the interview process." },
  { title: "Get Hired", desc: "Take the next step in your career and secure the right opportunity." },
];

const EMPLOYER_STEPS = [
  { title: "Register as an Employer", desc: "Join our platform and register your company for the job fair." },
  { title: "Create Your Company Profile", desc: "Showcase your organization, culture, and career opportunities." },
  { title: "Post Job Openings", desc: "Share your available positions and define your hiring requirements." },
  { title: "Meet Candidates", desc: "Connect with a diverse pool of talented and qualified job seekers." },
  { title: "Conduct Interviews", desc: "Evaluate candidates and identify the best fit for your organization." },
  { title: "Hire the Right Talent", desc: "Select and hire suitable candidates to strengthen your team." },
];

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openSector, setOpenSector] = useState(null);

  const seekerTrackRef = useRef(null);
  const employerTrackRef = useRef(null);
  const [seekerInView, setSeekerInView] = useState(false);
  const [employerInView, setEmployerInView] = useState(false);

  useEffect(() => {
    const makeObserver = (ref, setter) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { setter(entry.isIntersecting); },
        { threshold: 0.35 }
      );
      obs.observe(ref.current);
      return obs;
    };
    const o1 = makeObserver(seekerTrackRef, setSeekerInView);
    const o2 = makeObserver(employerTrackRef, setEmployerInView);
    return () => { if (o1) o1.disconnect(); if (o2) o2.disconnect(); };
  }, []);

  return (
    <div style={{ background: '#F8F4EF', minHeight: '100vh', fontFamily: 'Raleway, sans-serif' }}>
      <style>{`
        .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        .hero { background: #EADFC9; padding: 120px 0 110px; text-align: center; position: relative; overflow: hidden; }
        .hero-curve { position: absolute; bottom: -1px; left: 0; width: 100%; height: 90px; display: block; }

        .svc-head, .sec-head { text-align: center; max-width: 620px; margin: 0 auto 10px; }
        .svc-head .label { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #E8650A; }
        .sec-head .label { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #1A7A2E; }
        .svc-head h2, .sec-head h2 { font-size: 30px; font-weight: 900; margin: 12px 0 10px; letter-spacing: -0.5px; }
        .svc-head p, .sec-head p { color: #666; font-size: 14.5px; line-height: 1.6; margin-bottom: 50px; }

        /* ---------- SERVICES: numbered editorial list inside a lifted white card ---------- */
        .svc-list {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 20px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.05);
          padding: 10px 36px;
        }
        .svc-row {
          display: grid; grid-template-columns: 70px 1fr; gap: 24px;
          padding: 34px 0; border-bottom: 1px solid rgba(0,0,0,0.08);
          position: relative; transition: padding-left 0.25s ease;
        }
        .svc-row:last-child { border-bottom: none; }
        .svc-row::before {
          content: ''; position: absolute; left: -20px; top: 0; bottom: 0; width: 3px;
          background: var(--accent); transform: scaleY(0); transform-origin: center;
          transition: transform 0.25s ease;
        }
        .svc-row:hover { padding-left: 20px; }
        .svc-row:hover::before { transform: scaleY(1); }
        .svc-num { font-size: 40px; font-weight: 900; color: rgba(0,0,0,0.1); line-height: 1; transition: color 0.25s ease; }
        .svc-row:hover .svc-num { color: var(--accent); }
        .svc-body-top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
        .svc-icon { color: var(--accent); display: flex; }
        .svc-title { font-size: 19px; font-weight: 800; margin: 0; }
        .svc-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 3px 9px; border-radius: 5px; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
        .svc-desc { font-size: 14.5px; color: #666; line-height: 1.65; margin: 0 0 14px; max-width: 560px; }
        .svc-points { display: flex; flex-wrap: wrap; gap: 8px; }
        .svc-point { font-size: 12px; font-weight: 700; color: #444; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.08); padding: 5px 12px; border-radius: 99px; }

        /* ---------- SECTORS: boxed card grid ---------- */
        .sec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding-bottom: 100px; align-items: start; }
        .sec-card {
          background: #fff; border: 1px solid rgba(0,0,0,0.06); border-left: 4px solid var(--accent);
          border-radius: 4px 14px 14px 4px;
          padding: 20px 20px 20px 22px; cursor: pointer; transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .sec-card:hover { box-shadow: 0 10px 26px rgba(0,0,0,0.06); }
        .sec-card-top { display: flex; align-items: center; gap: 16px; }
        .sec-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sec-card h4 { font-size: 15px; font-weight: 800; margin: 0; line-height: 1.3; flex: 1; }
        .sec-chev { color: #ccc; flex-shrink: 0; transition: transform 0.25s ease; }
        .sec-card.open .sec-chev { transform: rotate(180deg); color: #E8650A; }
        .sec-desc { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, margin-top 0.3s ease; margin-top: 0; }
        .sec-card.open .sec-desc { max-height: 120px; margin-top: 14px; }
        .sec-desc p { font-size: 13px; color: #666; line-height: 1.6; margin: 0; padding-left: 62px; }

        @media (max-width: 900px) { .sec-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .sec-grid { grid-template-columns: 1fr; } }

        @media (max-width: 640px) {
          .svc-list { padding: 6px 20px; border-radius: 16px; }
          .svc-row { grid-template-columns: 44px 1fr; gap: 14px; padding: 26px 0; }
          .svc-num { font-size: 26px; }
          .svc-title { font-size: 17px; }
        }

        /* ---------- HOW IT WORKS: horizontal animated timeline ---------- */
        .hiw-wrap { padding: 40px 0 110px; }
        .hiw-block { margin-bottom: 70px; }
        .hiw-block:last-child { margin-bottom: 0; }
        .hiw-block-head { display: flex; align-items: center; gap: 12px; margin-bottom: 34px; }
        .hiw-block-icon {
          width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .hiw-block-head h3 { font-size: 19px; font-weight: 900; margin: 0; }
        .hiw-block-head span { font-size: 13px; color: #888; font-weight: 500; }

        .hiw-h-track { position: relative; overflow-x: auto; overflow-y: hidden; padding-bottom: 6px; }
        .hiw-h-steps { display: flex; position: relative; min-width: 780px; padding-top: 22px; }
        .hiw-h-line-bg {
          position: absolute; top: 22px; left: calc(100% / 12); right: calc(100% / 12);
          height: 3px; background: rgba(0,0,0,0.08); border-radius: 3px;
        }
        .hiw-h-line-fill {
          position: absolute; top: 22px; left: calc(100% / 12); height: 3px; width: 0;
          background: var(--accent); border-radius: 3px;
          transition: width 5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hiw-h-line-fill.animate { width: calc(100% - (100% / 6)); }

        .hiw-h-runner {
          position: absolute; top: 22px; width: 36px; height: 36px; margin-top: -18px;
          left: calc((100% / 12) - 18px);
          border-radius: 50%; background: #fff; color: var(--accent);
          border: 3px solid var(--accent); display: flex; align-items: center; justify-content: center;
          z-index: 3; box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          transition: left 5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hiw-h-runner.animate { left: calc((100% - (100% / 12)) - 18px); }
        .hiw-h-runner svg { animation: hiw-bob 0.6s ease-in-out infinite alternate; }
        .hiw-h-runner:not(.animate) svg { animation: none; }

        @keyframes hiw-bob {
          from { transform: translateY(0); }
          to { transform: translateY(-2px); }
        }

        .hiw-h-step {
          position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column;
          align-items: center; text-align: center; padding: 0 12px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .hiw-h-step.animate { opacity: 1; transform: translateY(0); }
        .hiw-h-num {
          width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 13.5px; font-weight: 800; color: #fff;
          background: var(--accent); border: 4px solid #F8F4EF; flex-shrink: 0;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
        }
        .hiw-h-step h4 { font-size: 13.5px; font-weight: 800; margin: 14px 0 6px; }
        .hiw-h-step p { font-size: 12px; color: #666; line-height: 1.55; margin: 0; }

        @media (max-width: 800px) {
          .hiw-h-steps { min-width: 620px; }
          .hiw-h-step h4 { font-size: 12.5px; }
          .hiw-h-step p { font-size: 11.5px; }
        }
      `}</style>

      <section className="hero">
        <div className="container">
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A7A2E', letterSpacing: '2px' }}>OUR CAPABILITIES</span>
          <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '15px 0' }}>Everything you need for <span style={{ color: '#E8650A', fontStyle: 'italic', fontFamily: 'Lora' }}>Bulk Hiring.</span></h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>We build the physical and operational bridge between Bharat's youth and the nation's biggest employers.</p>
        </div>
        <svg className="hero-curve" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C300,90 900,90 1200,0 L1200,90 L0,90 Z" fill="#F8F4EF" />
        </svg>
      </section>

      <div className="container" style={{ paddingTop: 70 }}>
        <div className="svc-head">
          <span className="label">Our Services</span>
          <h2>Covering both sides of <span style={{ color: '#1A7A2E', fontStyle: 'italic', fontFamily: 'Lora' }}>the hiring journey.</span></h2>
          <p>From the first job fair to the final offer letter — six services that support job seekers and employers at every step.</p>
        </div>

        <div className="svc-list">
          {SERVICES.map((s, i) => (
            <div key={i} className="svc-row" style={{ '--accent': s.accent }}>
              <div className="svc-num">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="svc-body-top">
                  <span className="svc-icon">{s.icon}</span>
                  <h3 className="svc-title">{s.title}</h3>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-points">
                  {s.points.map((p, idx) => <span key={idx} className="svc-point">{p}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 90 }}>
          <div className="sec-head">
            <span className="label">Sectors We Cover</span>
            <h2>Every industry, <span style={{ color: '#E8650A', fontStyle: 'italic', fontFamily: 'Lora' }}>one platform.</span></h2>
            <p>Tap a sector to see the kinds of roles typically available.</p>
          </div>

          <div className="sec-grid">
            {SECTOR_LIST.map((s, i) => {
              const isOpen = openSector === i;
              return (
                <div
                  className={`sec-card ${isOpen ? 'open' : ''}`}
                  key={i}
                  style={{ '--accent': s.color }}
                  onClick={() => setOpenSector(isOpen ? null : i)}
                >
                  <div className="sec-card-top">
                    <div className="sec-icon" style={{ background: `${s.color}1A`, color: s.color }}>
                      {s.icon}
                    </div>
                    <h4>{s.name}</h4>
                    <ChevronDown size={18} className="sec-chev" />
                  </div>
                  <div className="sec-desc">
                    <p>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hiw-wrap">
          <div className="sec-head">
            <span className="label" style={{ color: '#E8650A' }}>How It Works</span>
            <h2>How our services <span style={{ color: '#1A7A2E', fontStyle: 'italic', fontFamily: 'Lora' }}>work.</span></h2>
            <p>A simple step-by-step journey, whether you're looking for a job or looking to hire.</p>
          </div>

          <div className="hiw-block">
            <div className="hiw-block-head">
              <div className="hiw-block-icon" style={{ background: '#E8650A1A', color: '#E8650A' }}>
                <UsersRound size={20} />
              </div>
              <h3>For Job Seekers</h3>
              <span>From registration to getting hired</span>
            </div>
            <div className="hiw-h-track" ref={seekerTrackRef}>
              <div className="hiw-h-steps" style={{ '--accent': '#E8650A' }}>
                <div className="hiw-h-line-bg" />
                <div className={`hiw-h-line-fill ${seekerInView ? 'animate' : ''}`} />
                <div className={`hiw-h-runner ${seekerInView ? 'animate' : ''}`}>
                  <RunIcon size={18} />
                </div>
                {SEEKER_STEPS.map((s, i) => (
                  <div
                    className={`hiw-h-step ${seekerInView ? 'animate' : ''}`}
                    style={{ transitionDelay: `${i * 0.5 + 0.3}s` }}
                    key={i}
                  >
                    <div className="hiw-h-num">{String(i + 1).padStart(2, '0')}</div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hiw-block">
            <div className="hiw-block-head">
              <div className="hiw-block-icon" style={{ background: '#1A7A2E1A', color: '#1A7A2E' }}>
                <Handshake size={20} />
              </div>
              <h3>For Employers</h3>
              <span>From registration to hiring the right talent</span>
            </div>
            <div className="hiw-h-track" ref={employerTrackRef}>
              <div className="hiw-h-steps" style={{ '--accent': '#1A7A2E' }}>
                <div className="hiw-h-line-bg" />
                <div className={`hiw-h-line-fill ${employerInView ? 'animate' : ''}`} />
                <div className={`hiw-h-runner ${employerInView ? 'animate' : ''}`}>
                  <UserSearch size={18} />
                </div>
                {EMPLOYER_STEPS.map((s, i) => (
                  <div
                    className={`hiw-h-step ${employerInView ? 'animate' : ''}`}
                    style={{ transitionDelay: `${i * 0.5 + 0.3}s` }}
                    key={i}
                  >
                    <div className="hiw-h-num">{String(i + 1).padStart(2, '0')}</div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}