import { Link } from "react-router-dom";
import { Factory, Cpu, HeartPulse, Truck, Landmark, HardHat, ShoppingBag, ConciergeBell, Car } from "lucide-react";

const SECTORS = ["Manufacturing", "IT & Tech", "Healthcare", "Logistics", "Banking", "Construction", "Retail", "Hospitality", "Automotive"];
const SECTOR_ICONS = {
  "Manufacturing": Factory,
  "IT & Tech": Cpu,
  "Healthcare": HeartPulse,
  "Logistics": Truck,
  "Banking": Landmark,
  "Construction": HardHat,
  "Retail": ShoppingBag,
  "Hospitality": ConciergeBell,
  "Automotive": Car,
};
const PARTNERS = ["NSDC", "CII", "ASDC", "TNSKILL", "NCS"];

export default function HeroSection() {
  return (
    <>
    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;600;700;900&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        .h{font-family:'Raleway',sans-serif;background:#F8F4EF;width:100%;min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;position:relative}
        @keyframes hld{0%,100%{opacity:1}50%{opacity:.2}}
        .h-ldot{width:6px;height:6px;border-radius:50%;background:#fff;animation:hld 1.6s ease-in-out infinite}
        .h-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:90px 52px 28px;position:relative;text-align:center;overflow:hidden}

        .h-glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
        .h-glow-1{width:340px;height:340px;top:20px;left:20px;background:radial-gradient(circle,rgba(255,153,51,.28) 0%,rgba(255,153,51,.12) 40%,transparent 70%);animation:hglowpulse 8s ease-in-out infinite}
        .h-glow-2{width:360px;height:360px;bottom:20px;right:20px;background:radial-gradient(circle,rgba(19,136,8,.26) 0%,rgba(19,136,8,.11) 40%,transparent 70%);animation:hglowpulse 8s ease-in-out 3s infinite}
        @keyframes hglowpulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.75;transform:scale(1.08)}}

        .h-bgw-wrap{position:relative;width:min(1200px,96vw);margin:0px auto 6px;pointer-events:none;user-select:none;z-index:1}
        .h-bgw-svg{width:100%;height:auto;display:block}
        .h-bgw-base{font-family:'Raleway',sans-serif}
        .h-bgw-sweep{font-family:'Raleway',sans-serif;mix-blend-mode:normal}

        .h-ey{display:flex;align-items:center;gap:14px;margin-bottom:16px}
        .h-ey-line{height:1px;width:48px;background:rgba(0,0,0,.2)}
        .h-ey-txt{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(0,0,0,.55)}
        .h-hl{max-width:900px;margin-bottom:6px;position:relative;z-index:1}
        .h-hl-row{display:block;line-height:1.05}
        .h-sans{font-family:'Raleway',sans-serif;font-size:clamp(36px,7.2vw,88px);font-weight:900;letter-spacing:-2px;color:#111;text-transform:uppercase}
        .h-serif{font-family:'Lora',serif;font-size:clamp(40px,7.8vw,96px);font-weight:400;font-style:italic;letter-spacing:-.5px;color:#E8650A}
        .h-serif-gr{font-family:'Lora',serif;font-size:clamp(40px,7.8vw,96px);font-weight:600;font-style:italic;letter-spacing:-.5px;color:#1A7A2E}
        .h-div{display:flex;align-items:center;gap:16px;margin-bottom:6px;position:relative;z-index:1}
        .h-dline{flex:1;height:1px;background:rgba(0,0,0,.1);max-width:140px}
        .h-sub{font-size:14.5px;font-weight:400;color:rgba(0,0,0,.82);line-height:1.55;max-width:480px;margin-bottom:20px;position:relative;z-index:1}
        .h-sub strong{font-weight:700;color:#111}
        .h-ctas{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;margin-bottom:20px;position:relative;z-index:1}
        .h-ca{font-size:13px;font-weight:700;letter-spacing:.04em;color:#fff;background:#111;padding:14px 32px;border-radius:99px;text-decoration:none;display:flex;align-items:center;gap:8px;transition:background .18s}
        .h-ca:hover{background:#E8650A}
        .h-cb{font-size:13px;font-weight:600;color:rgba(0,0,0,.5);padding:14px 22px;border-radius:99px;text-decoration:none;border:1.5px solid rgba(0,0,0,.14);transition:all .18s}
        .h-cb:hover{border-color:#1A7A2E;color:#1A7A2E}
        .h-stats{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:16px;overflow:hidden;position:relative;z-index:1}
        .h-st{padding:16px 28px;display:flex;flex-direction:column;align-items:center;gap:2px;border-right:1px solid rgba(0,0,0,.06)}
        .h-st:last-child{border-right:none}
        .h-sv{font-size:24px;font-weight:900;letter-spacing:-1px;line-height:1}
        .h-sl{font-size:10px;font-weight:600;color:rgba(0,0,0,.38);text-transform:uppercase;letter-spacing:.1em;margin-top:2px}

        /* ---------- Bottom marquee bar (enlarged) ---------- */
        .h-bot{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:24px 52px;overflow:hidden;position:relative;z-index:1;background:#FFFFFF;border-top:1px solid rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.06)}
        .h-blbl{font-size:13px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#111;white-space:nowrap}
        .h-tape-wrap{overflow:hidden;flex:1;margin:0 40px}
        .h-tape{display:inline-flex;white-space:nowrap;animation:htape 26s linear infinite}
        @keyframes htape{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .h-ti{display:inline-flex;align-items:center;gap:14px;padding:0 26px;font-size:15px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(0,0,0,.65)}
        .h-ti-dot{color:#E8650A;font-size:10px}
        .h-ptags{display:flex;gap:9px;flex-shrink:0}
        .h-ptag{font-size:13px;font-weight:700;color:rgba(0,0,0,.45);padding:7px 16px;border-radius:8px;border:1.5px solid rgba(0,0,0,.12)}

        @keyframes hfu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .ha1{animation:hfu .65s cubic-bezier(.22,1,.36,1) .05s both}
        .ha2{animation:hfu .65s cubic-bezier(.22,1,.36,1) .17s both}
        .ha3{animation:hfu .65s cubic-bezier(.22,1,.36,1) .29s both}
        .ha4{animation:hfu .65s cubic-bezier(.22,1,.36,1) .41s both}
        .ha5{animation:hfu .65s cubic-bezier(.22,1,.36,1) .52s both}
        .ha6{animation:hfu .55s cubic-bezier(.22,1,.36,1) .62s both}

        @media(prefers-reduced-motion:reduce){
          .h-glow-1,.h-glow-2,.h-ldot,.h-tape,.ha1,.ha2,.ha3,.ha4,.ha5,.ha6{animation:none!important}
          .h-bgw-sweep{display:none}
        }

        .h-bgw-mobile{display:none}
        .h-bgw-mobile-svg{width:100%;height:auto;display:block}

        @media(max-width:760px){
          .h-hero{padding:100px 24px 24px}
          .h-bgw-wrap{width:100%;margin:0 auto 8px}
          .h-stats{width:100%;border-radius:14px}
          .h-st{flex:1 1 33%;padding:14px 10px}
          .h-sv{font-size:19px}
          .h-bot{padding:16px 20px;gap:14px}
          .h-blbl{font-size:11px;flex-shrink:0}
          .h-ti{font-size:12.5px;padding:0 18px}
          .h-tape-wrap{margin:0}
          .h-ptags{display:none}
        }
      `}</style>

      <div className="h">
        <div className="h-hero">
          <div className="h-glow h-glow-1"/>
          <div className="h-glow h-glow-2"/>

          <div className="h-ey ha1"></div>
          <div className="h-hl ha2">
            <span className="h-hl-row"><span className="h-sans">One fair.</span></span>
            <span className="h-hl-row"><span className="h-sans">Thousands of</span></span>
            <span className="h-hl-row"><span className="h-serif-gr">first jobs.</span></span>
          </div>

          <div className="h-bgw-wrap ha3">
            <svg className="h-bgw-svg" viewBox="0 0 1300 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <linearGradient id="hFlagGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9933"/>
                  <stop offset="33%" stopColor="#FF9933"/>
                  <stop offset="33%" stopColor="#FFFFFF"/>
                  <stop offset="66%" stopColor="#FFFFFF"/>
                  <stop offset="66%" stopColor="#138808"/>
                  <stop offset="100%" stopColor="#138808"/>
                </linearGradient>
                <filter id="hFlagWave" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="4" result="hTurb">
                    <animate attributeName="baseFrequency" dur="9s" values="0.012 0.05;0.017 0.06;0.012 0.05" repeatCount="indefinite"/>
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="hTurb" scale="10" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
              </defs>
              <text className="h-bgw-base" x="50%" y="60%" textAnchor="middle" fontWeight="900" letterSpacing="-7" fontSize="135" textLength="1250" lengthAdjust="spacingAndGlyphs" fill="rgba(0,0,0,.05)">SKILL YUVA BHARAT</text>
              <text className="h-bgw-sweep" x="50%" y="60%" textAnchor="middle" fontWeight="900" letterSpacing="-7" fontSize="135" textLength="1250" lengthAdjust="spacingAndGlyphs" fill="url(#hFlagGrad)" opacity="0.4" filter="url(#hFlagWave)">SKILL YUVA BHARAT</text>
            </svg>
          </div>

          <div className="h-div ha3"><div className="h-dline"/><div className="h-dline"/></div>

          <p className="h-sub ha4"><strong>Skill Yuva Bharat</strong> organises India's largest job fairs, where first-generation earners meet real employers, face-to-face. Zero cost. Zero middlemen.</p>
          <div className="h-ctas ha5">
            <Link to="/about" className="h-ca">Who we are <svg width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
            <Link to="/jobfair" className="h-cb">Our job fairs</Link>
          </div>
          <div className="h-stats ha6">
            <div className="h-st"><span className="h-sv" style={{color:"#E8650A"}}>1.2L+</span><span className="h-sl">Youth</span></div>
            <div className="h-st"><span className="h-sv" style={{color:"#1A7A2E"}}>70K+</span><span className="h-sl">Placed</span></div>
            <div className="h-st"><span className="h-sv">28</span><span className="h-sl">States</span></div>
            <div className="h-st"><span className="h-sv">800+</span><span className="h-sl">Companies</span></div>
            <div className="h-st" style={{background:"#E8650A"}}>
              <span className="h-ldot" style={{marginBottom:4}}/>
              <span style={{fontSize:11,fontWeight:700,color:"#fff",letterSpacing:".04em"}}>Fair Live</span>
              <span style={{fontSize:9.5,color:"rgba(255,255,255,.7)",letterSpacing:".06em",textTransform:"uppercase"}}>Porbandar</span>
            </div>
          </div>
        </div>

        <div className="h-bot">
          <span className="h-blbl">Sectors</span>
          <div className="h-tape-wrap">
            <div className="h-tape">{[...SECTORS,...SECTORS].map(function(s,i){const Icon=SECTOR_ICONS[s];return <span key={i} className="h-ti"><Icon size={15} className="h-ti-dot"/>{s}</span>;})}</div>
          </div>
          <div className="h-ptags">{PARTNERS.map(function(p){return <span key={p} className="h-ptag">{p}</span>;})}</div>
        </div>
      </div>
    </>
  );
}