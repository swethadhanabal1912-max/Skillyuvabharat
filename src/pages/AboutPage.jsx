import React, { useEffect, useState } from 'react';
import { Target, Users2, Rocket, Heart, ShieldCheck, Globe } from 'lucide-react';

const PILLARS = [
  {
    icon: <Target size={24} />,
    title: "Radical Accessibility",
    text: "We believe a job interview shouldn't cost a day's wage. Our fairs are 100% free for every candidate, forever.",
    color: "#E8650A"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Verified Employers",
    text: "No agents, no middlemen. We only partner with direct employers to ensure the safety and dignity of our youth.",
    color: "#1A7A2E"
  },
  {
    icon: <Globe size={24} />,
    title: "Pan-India Reach",
    text: "From Tier-1 capitals to Tier-4 rural clusters, we bring the boardroom to the doorstep of Bharat.",
    color: "#111"
  }
];

const EVENT_IMAGES = [
  '/images/image1.jpeg', '/images/image2.jpeg', '/images/image3.jpeg', '/images/image4.jpeg', '/images/image5.jpeg',
  '/images/image6.jpeg', '/images/image7.jpeg', '/images/image8.jpeg', '/images/image9.jpeg', '/images/image10.jpeg',
  '/images/image11.jpeg', '/images/image12.jpeg', '/images/image13.jpeg', '/images/image14.jpeg', '/images/image15.jpeg'
];

const PARTNERS = [
  {
    short: "NSDC",
    name: "National Skill Development Corporation",
    text: "The public-private body under the Ministry of Skill Development & Entrepreneurship that drives India's skilling ecosystem nationwide."
  },
  {
    short: "CII",
    name: "Confederation of Indian Industry",
    text: "India's premier industry body, driving the national skills agenda since 1987 and instrumental in setting up NSDC itself."
  },
  {
    short: "ASDC",
    name: "Automotive Skills Development Council",
    text: "The sector skill council for the automotive industry, backed by NSDC and India's leading auto industry associations."
  },
  {
    short: "PWD",
    name: "Persons with Disabilities Inclusion",
    text: "Supporting inclusive hiring and skilling initiatives that create equal opportunities for persons with disabilities."
  },
  {
    short: "NCS",
    name: "National Career Service",
    text: "The Ministry of Labour & Employment's nationwide portal connecting job seekers directly with employers."
  }
];

// Leadership profiles
const LEADERS = [
  {
    photo: "/images/founder.png",
    tag: "Meet the Founder",
    name: "Dr G Satheesh Reddy",
    subtitle: "Former Secretary, Dept of Defence R&D & Chairman, DRDO",
    accent: "#1A7A2E",
    paraIntro:
      "Dr G Satheesh Reddy is a defence and aerospace scientist with over four decades of experience in technology leadership. A graduate in Electronics & Communication Engineering from JNTU Anantapur, with an MS and PhD from JNTU Hyderabad, he joined the Defence Research and Development Laboratory in 1986 and went on to lead some of India's most significant national technology programmes.",
    paraClose:
      "He has held several senior positions in the Government of India, including Secretary, Department of Defence R&D, Chairman of DRDO, and Scientific Adviser to the Raksha Mantri. He currently serves as a Member of the National Security Advisory Board, Honorary Adviser (Cabinet Rank) to the Government of Andhra Pradesh, and President of the Aeronautical Society of India. At Skill Yuva Bharat, he brings this experience in building large-scale, mission-driven national systems to the goal of connecting India's youth with real employment opportunities.",
    quoteType: "descriptive", // avoid inventing a fabricated first-person quote for a real public figure
    quoteText: "A career defined by building indigenous capability at national scale — now channelled into building opportunity for India's youth."
  },
  {
    photo: "/images/md.jpeg",
    tag: "Meet the Co-Founder",
    name: "Srinivasan N",
    subtitle: "Co-Founder & CEO · Established 2019",
    accent: "#E8650A",
    paraIntro:
      "A short introduction paragraph about the co-founder goes here — their background, what led them to start Skill Yuva Bharat, and the mission that drives them today.",
    paraClose:
      "A closing paragraph about their vision for the company, the scale of impact so far, and what's next for the platform and the youth it serves.",
    quoteType: "quote",
    quoteText: "Skill was never the problem in India. Access was."
  }
];

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [start, setStart] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStart((prev) => (prev + 1) % EVENT_IMAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    EVENT_IMAGES[start % EVENT_IMAGES.length],
    EVENT_IMAGES[(start + 1) % EVENT_IMAGES.length],
    EVENT_IMAGES[(start + 2) % EVENT_IMAGES.length]
  ];

  return (
    <div className="ap-wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700;800;900&family=Lora:ital,wght@0,600;1,500&display=swap');

        .ap-wrap { font-family: 'Raleway', sans-serif; background: #F8F4EF; color: #111; overflow-x: hidden; }
        
        /* --- 1. Editorial Hero --- */
        .ap-hero {
          padding: 120px 24px 80px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }
        .ap-hero-content { position: relative; }
        .ap-hero-tag {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em;
          color: #1A7A2E; margin-bottom: 20px; display: block;
        }
        .ap-hero-title {
          font-size: clamp(40px, 6vw, 72px); font-weight: 900; line-height: 1; letter-spacing: -2px; margin-bottom: 30px;
        }
        .ap-hero-title em { font-family: 'Lora', serif; font-style: italic; color: #E8650A; font-weight: 500; }
        
        .ap-hero-quote {
          font-family: 'Lora', serif; font-size: 20px; font-style: italic; color: #666;
          border-left: 3px solid #EADFC9; padding-left: 24px; line-height: 1.6;
        }

        /* --- Hero Visual: two overlapping boxes + rotated circle badge --- */
        .ap-hero-visual {
          position: relative;
          height: 420px;
        }
        .ap-hero-box {
          position: absolute;
          border-radius: 28px;
        }
        .ap-hero-box-1 {
          left: 0;
          top: 10px;
          width: 58%;
          height: 300px;
          background: #EADFC9;
        }
        .ap-hero-box-2 {
          right: 0;
          top: 100px;
          width: 54%;
          height: 340px;
          background: #1A7A2E;
        }
        .ap-hero-circle-outer {
          position: absolute;
          left: 50%;
          top: 42%;
          margin-left: -100px;
          margin-top: -100px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: #F8F4EF;
          border: 4px dashed #111;
          box-shadow: 0 10px 30px rgba(0,0,0,0.18);
          z-index: 2;
          animation: ap-circle-spin 6s linear infinite;
        }
        .ap-hero-circle-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ap-circle-spin-reverse 6s linear infinite;
        }
        @keyframes ap-circle-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ap-circle-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .ap-hero-circle-inner span {
          font-weight: 900;
          font-size: 19px;
          line-height: 1.35;
          text-align: center;
          letter-spacing: -0.5px;
        }
        .ap-hero-circle-inner span .accent-orange { color: #E8650A; }
        .ap-hero-circle-inner span .accent-green { color: #1A7A2E; }
        .ap-hero-circle-logo {
          width: 62%;
          height: 62%;
          object-fit: contain;
        }

        /* --- 2. Leadership Section (editorial profile spread, no cards, no bg numerals) --- */
        .fs-wrap {
          padding: 80px 0 10px;
        }
        .fs-section-head {
          max-width: 1100px;
          margin: 0 auto 50px;
          text-align: center;
          padding: 0 24px;
        }
        .fs-section-head h2 {
          font-size: 32px; font-weight: 900; letter-spacing: -0.5px; margin-bottom: 10px;
        }
        .fs-section-head p { color: #666; }

        .fs-profile {
          position: relative;
          padding: 56px 24px;
          background: #FFFFFF;
        }

        .fs-body {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 56px;
          align-items: center;
        }
        .fs-profile-l .fs-body { grid-template-columns: 1fr 300px; }
        .fs-profile-l .fs-photo-col { order: 2; }
        .fs-profile-l .fs-text-col { order: 1; }

        .fs-photo-col { position: relative; max-width: 300px; }
        
        .fs-photo {
          position: relative;
          z-index: 1;
          aspect-ratio: 3/4;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 16px 32px rgba(0,0,0,0.1);
        }
        .fs-photo img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .fs-tag {
          font-size: 12.5px; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 10px; display: block;
        }
        .fs-name {
          font-family: 'Raleway', sans-serif;
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 900;
          letter-spacing: -1px;
          color: #111;
          margin-bottom: 5px;
          line-height: 1.1;
        }
        .fs-date {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .fs-para {
          font-size: 14.5px; line-height: 1.8; color: #2A2A2A; margin-bottom: 18px;
        }

        .fs-pullquote {
          position: relative;
          margin: 24px 0;
          padding-left: 34px;
        }
        .fs-pullquote::before {
          content: '“';
          position: absolute;
          left: -4px;
          top: -22px;
          font-family: 'Lora', serif;
          font-size: 70px;
          font-weight: 700;
          color: var(--accent);
          opacity: 0.35;
          line-height: 1;
        }
        .fs-pullquote p {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 17px;
          line-height: 1.6;
          color: var(--accent);
          font-weight: 500;
          margin: 0;
        }

        @media (max-width: 900px) {
          .fs-body, .fs-profile-l .fs-body { grid-template-columns: 1fr; gap: 28px; }
          .fs-profile-l .fs-photo-col, .fs-profile-l .fs-text-col { order: initial; }
          .fs-photo-col { max-width: 220px; margin: 0 auto; }
          .fs-pullquote { padding-left: 26px; }
          .fs-pullquote::before { font-size: 56px; top: -14px; }
        }

        /* --- 3. Event Gallery Section (fanned photo stack) --- */
        .eg-wrap {
          background: #F8F4EF;
          padding: 100px 24px;
        }
        .eg-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }
        .eg-tag {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em;
          color: #1A7A2E; margin-bottom: 20px; display: block;
        }
        .eg-title {
          font-size: clamp(32px, 4vw, 48px); font-weight: 900; line-height: 1.1;
          letter-spacing: -1px; margin-bottom: 24px; color: #111;
        }
        .eg-title em { font-family: 'Lora', serif; font-style: italic; color: #E8650A; font-weight: 500; }
        .eg-text {
          font-size: 16px; line-height: 1.8; color: #444; max-width: 420px;
        }
        .eg-stack {
          position: relative;
          width: 100%;
          height: 520px;
        }
        .eg-card {
          position: absolute;
          top: 40px;
          width: 300px;
          height: 420px;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 24px 50px rgba(0,0,0,0.25);
          border: 6px solid #fff;
          animation: eg-fade-in 0.6s ease;
        }
        .eg-card-0 { left: 0%; transform: rotate(-10deg); z-index: 1; }
        .eg-card-1 { left: 50%; top: 10px; transform: translateX(-50%) rotate(0deg); z-index: 2; }
        .eg-card-2 { right: 0%; transform: rotate(10deg); z-index: 1; }
        @keyframes eg-fade-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; }
        }
        .eg-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* --- 4. The Vision Section (The "Why") --- */
        .ap-vision { background: #fff; padding: 100px 24px; border-top: 1px solid rgba(0,0,0,0.05); }
        .ap-vision-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        
        .ap-vision-text h2 { font-size: 32px; font-weight: 900; margin-bottom: 24px; letter-spacing: -0.5px; }
        .ap-vision-text p { font-size: 16.5px; line-height: 1.8; color: #444; margin-bottom: 20px; }

        .ap-stat-highlight {
           background: #F8F4EF; padding: 40px; border-radius: 20px; display: flex; flex-direction: column; justify-content: center;
        }
        .ap-stat-num { font-size: 64px; font-weight: 900; color: #1A7A2E; line-height: 1; margin-bottom: 10px; }
        .ap-stat-label { font-size: 14px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 1px; }

        /* --- 5. The Pillars (Cards with Thick Left Border) --- */
        .ap-pillars { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
        .ap-pillar-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 50px; }
        
        .ap-pillar-card {
          background: #fff; padding: 40px 32px; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05); border-left: 6px solid var(--accent);
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          transition: transform 0.3s ease;
        }
        .ap-pillar-card:hover { transform: translateY(-10px); }
        .ap-pillar-icon { color: var(--accent); margin-bottom: 24px; }
        .ap-pillar-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 16px; }
        .ap-pillar-card p { font-size: 14px; color: #666; line-height: 1.6; }

        /* --- 6. The Impact Numbers --- */
        .ap-impact { background: #111; color: #fff; padding: 80px 24px; text-align: center; }
        .ap-impact-grid { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .ap-impact-item h4 { font-size: 32px; font-weight: 900; margin-bottom: 5px; color: #E8650A; }
        .ap-impact-item p { font-size: 11px; font-weight: 700; opacity: 0.5; text-transform: uppercase; letter-spacing: 1px; }

        /* --- 7. Partners Section (orbiting satellite diagram) --- */
        .pt-wrap { background: #F8F4EF; padding: 100px 24px; }
        .pt-tag {
          font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em;
          color: #1A7A2E; margin-bottom: 16px; display: block; text-align: center;
        }
        .pt-inner h2 {
          font-size: 32px; font-weight: 900; margin-bottom: 60px; color: #111; text-align: center;
        }
        .pt-orbit-wrap {
          position: relative;
          width: 460px;
          height: 460px;
          margin: 0 auto 40px;
          --orbit-r: 200px;
        }
        .pt-hub {
          position: absolute;
          top: 50%; left: 50%;
          width: 110px; height: 110px;
          margin: -55px 0 0 -55px;
          border-radius: 50%;
          background: #111;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          font-weight: 900;
          font-size: 15px;
          line-height: 1.3;
          z-index: 3;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .pt-ring {
          position: absolute;
          inset: 0;
          border: 2px dashed rgba(0,0,0,0.15);
          border-radius: 50%;
        }
        .pt-orbit {
          position: absolute;
          inset: 0;
          animation: pt-spin 30s linear infinite;
        }
        .pt-sat {
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
        }
        .pt-sat-inner {
          position: absolute;
          width: 92px; height: 92px;
          margin: -46px 0 0 -46px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--c);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px;
          font-weight: 900;
          font-size: 11px;
          color: var(--c);
          animation: pt-spin-reverse 30s linear infinite;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .pt-sat-inner img {
          width: 36px; height: 36px; object-fit: contain;
        }
        @keyframes pt-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pt-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .pt-caption {
          text-align: center;
          font-size: 15px;
          color: #666;
          max-width: 560px;
          margin: 0 auto;
        }
        .pt-caption strong { color: #E8650A; }

        /* --- 8. Closing CTA --- */
        .ap-cta { padding: 120px 24px; text-align: center; background: #EADFC9; }
        .ap-cta h2 { font-size: 42px; font-weight: 900; margin-bottom: 30px; letter-spacing: -1px; }
        .ap-cta-btn { 
          background: #111; color: #fff; padding: 18px 48px; border-radius: 99px; 
          font-weight: 800; text-decoration: none; display: inline-block; transition: 0.2s;
        }
        .ap-cta-btn:hover { background: #E8650A; transform: scale(1.05); }

        @media (max-width: 900px) {
          .ap-hero, .ap-vision-grid, .ap-pillar-grid, .eg-grid { grid-template-columns: 1fr; gap: 40px; }
          .ap-impact-grid { grid-template-columns: 1fr 1fr; }
          .eg-stack { height: 340px; }
          .eg-card { width: 150px; height: 210px; }

          .pt-wrap { overflow-x: hidden; }
          .pt-orbit-wrap {
            width: 300px;
            height: 300px;
            --orbit-r: 118px;
          }
          .pt-hub { width: 84px; height: 84px; margin: -42px 0 0 -42px; font-size: 11px; }
          .pt-sat-inner { width: 66px; height: 66px; margin: -33px 0 0 -33px; font-size: 8.5px; gap: 2px; }
          .pt-sat-inner img { width: 24px; height: 24px; }
        }

        @media (max-width: 420px) {
          .pt-orbit-wrap {
            width: 260px;
            height: 260px;
            --orbit-r: 98px;
          }
          .pt-hub { width: 74px; height: 74px; margin: -37px 0 0 -37px; font-size: 10px; }
          .pt-sat-inner { width: 56px; height: 56px; margin: -28px 0 0 -28px; font-size: 7.5px; }
          .pt-sat-inner img { width: 20px; height: 20px; }
        }
      `}</style>

      {/* 1. Header Section */}
      <section className="ap-hero">
        <div className="ap-hero-content">
          <span className="ap-hero-tag">Established 2019</span>
          <h1 className="ap-hero-title">Beyond the Resume. <em>Building Bharat.</em></h1>
          <p className="ap-hero-quote">
            "Skill was never the problem in India. Access was. We decided to fix the distance between a village classroom and a corporate boardroom."
          </p>
        </div>
        <div className="ap-hero-visual">
          <div className="ap-hero-box ap-hero-box-1"></div>
          <div className="ap-hero-box ap-hero-box-2"></div>
          <div className="ap-hero-circle-outer">
            <div className="ap-hero-circle-inner">
              <img src="/images/logo.png" alt="Skill Yuva Bharat" className="ap-hero-circle-logo" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Leadership Section (Founder + Co-Founder) */}
      <section className="fs-wrap">
        <div className="fs-section-head">
          <h2>Our Leadership</h2>
          <p>The people behind Skill Yuva Bharat's mission.</p>
        </div>

        {LEADERS.map((leader, i) => (
          <div
            key={leader.name}
            className={`fs-profile ${i % 2 === 0 ? 'fs-profile-r' : 'fs-profile-l'}`}
            style={{ '--accent': leader.accent }}
          >
            <div className="fs-body">
              <div className="fs-photo-col">
                <div className="fs-photo">
                  <img src={leader.photo} alt={leader.name} />
                </div>
              </div>
              <div className="fs-text-col">
                <span className="fs-tag">{leader.tag}</span>
                <h2 className="fs-name">{leader.name}</h2>
                <p className="fs-date">{leader.subtitle}</p>
                <p className="fs-para">{leader.paraIntro}</p>
                <div className="fs-pullquote">
                  <p>{leader.quoteText}</p>
                </div>
                <p className="fs-para">{leader.paraClose}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Event Gallery Section */}
      <section className="eg-wrap">
        <div className="eg-grid">
          <div>
            <span className="eg-tag">Moments that matter</span>
            <h2 className="eg-title">Every fair tells <em>a story</em>.</h2>
            <p className="eg-text">
              From packed convention halls to the first handshake between a candidate and a recruiter, these are the moments that define Skill Yuva Bharat's fairs across the country.
            </p>
          </div>

          <div className="eg-stack">
            {visible.map((img, i) => (
              <div key={img} className={`eg-card eg-card-${i}`}>
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Vision Section */}
      <section className="ap-vision">
        <div className="ap-vision-grid">
          <div className="ap-stat-highlight">
            <span className="ap-stat-num">1.2M+</span>
            <span className="ap-stat-label">Lives Touched Nationwide</span>
            <p style={{ marginTop: '20px', color: '#666' }}>We measure success not in registrations, but in the number of first-generation earners we help create.</p>
          </div>
          <div className="ap-vision-text">
            <h2>The "Skill Yuva" Philosophy</h2>
            <p>
              In the heart of every district in India lies a powerhouse of potential. Yet, for decades, this talent remained hidden behind digital barriers and expensive recruitment agencies.
            </p>
            <p>
              <strong>Skill Yuva Bharat</strong> was founded to dismantle these walls. By creating a physical, high-energy environment where recruiters meet candidates face-to-face, we remove the bias of the algorithm and the cost of the agent.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Pillars Section */}
      <section className="ap-pillars">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900 }}>What we stand for</h2>
          <p style={{ color: '#666' }}>Our work is guided by three non-negotiable principles that ensure every job fair is a win for Bharat.</p>
        </div>
        <div className="ap-pillar-grid">
          {PILLARS.map((p, i) => (
            <div key={i} className="ap-pillar-card" style={{ '--accent': p.color }}>
              <div className="ap-pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Impact Numbers Section */}
      <section className="ap-impact">
        <div className="ap-impact-grid">
          <div className="ap-impact-item"><h4>28+</h4><p>States Covered</p></div>
          <div className="ap-impact-item"><h4>800+</h4><p>Partner Companies</p></div>
          <div className="ap-impact-item"><h4>100K+</h4><p>Placements Made</p></div>
          <div className="ap-impact-item"><h4>0</h4><p>Cost to Candidates</p></div>
        </div>
      </section>

      {/* 7. Partners Section */}
      <section className="pt-wrap">
        <div className="pt-inner">
          <span className="pt-tag">Backed by</span>
          <h2>Trusted by the institutions building Bharat</h2>
        </div>

        <div className="pt-orbit-wrap">
          <div className="pt-ring"></div>
          <div className="pt-hub">
            <span style={{ color: "#E8650A" }}>SKILL</span>
            <span>YUVA</span>
            <span style={{ color: "#3FCB6B" }}>BHARAT</span>
          </div>
          <div className="pt-orbit">
            {[
              { short: 'NSDC', angle: 0, color: '#E8650A', logo: '/images/nsdc.png' },
              { short: 'CII', angle: 72, color: '#1A7A2E', logo: '/images/cii.jpg' },
              { short: 'ASDC', angle: 144, color: '#111', logo: '/images/asdc.png' },
              { short: 'TNSkill', angle: 216, color: '#E8650A', logo: '/images/tnskill.jpg' },
              { short: 'NCS', angle: 288, color: '#1A7A2E', logo: '/images/ncs.jpg' }
            ].map((s) => (
              <div key={s.short} className="pt-sat" style={{ transform: `rotate(${s.angle}deg) translate(var(--orbit-r, 200px)) rotate(-${s.angle}deg)` }}>
                <div className="pt-sat-inner" style={{ '--c': s.color }}>
                  <img src={s.logo} alt={s.short} />
                  <span>{s.short}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="pt-caption">
          We work with <strong>NSDC</strong>, <strong>CII</strong>, <strong>ASDC</strong>, <strong>TNSKILL</strong> inclusion programs, and <strong>NCS</strong> to keep every fair credible, accessible, and connected to real employers.
        </p>
      </section>

      {/* 8. Call to Action */}
      <section className="ap-cta">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Be part of the next <br/><em>hiring revolution</em>.</h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="/jobfair" className="ap-cta-btn" style={{ background: 'transparent', border: '2px solid #111', color: '#111' }}>Find a Job Fair</a>
          </div>
        </div>
      </section>
    </div>
  );
}