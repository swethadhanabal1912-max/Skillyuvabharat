import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ft-mirror">
      <style>{`
        .ft-mirror {
          background: #ffffff; 
          padding: 60px 0 30px;
          font-family: 'Raleway', sans-serif;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .ft-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* --- Top Row: Navigation Mirror --- */
        .ft-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
        }

        .ft-logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .ft-logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
        }

        .ft-logo-text { display: flex; flex-direction: column; }
        .ft-logo-main { 
          font-size: 19px; 
          font-weight: 900; 
          color: #111; 
          line-height: 1;
        }
        
        .txt-ora { color: #E8650A; }
        .txt-gre { color: #1A7A2E; }

        .ft-logo-sub { 
          font-size: 10px; 
          font-weight: 700; 
          color: #444; /* Brighter/Darker than before */
          margin-top: 4px;
          letter-spacing: 0.02em;
        }

        .ft-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
        }
        .ft-nav-links a {
          text-decoration: none;
          font-size: 14px;
          font-weight: 700; /* Increased weight for visibility */
          color: #222; /* High contrast black */
          transition: color 0.2s;
        }
        .ft-nav-links a:hover { color: #E8650A; }

        .ft-login-btn {
          background: transparent;
          color: #111;
          border: 2px solid #111;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .ft-login-btn:hover { background: #111; color: #fff; }

        .ft-signup-btn {
          background: #111;
          color: #fff;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 800;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ft-signup-btn:hover { background: #E8650A; }

        .ft-auth-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* --- Middle Row: Brighter Grid Letters --- */
        .ft-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .ft-col-head {
          font-size: 11px;
          font-weight: 800; /* Extra bold */
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #222; /* Changed from #999 to #222 for brightness/legibility */
          margin-bottom: 20px;
        }

        .ft-list { list-style: none; padding: 0; margin: 0; }
        .ft-list li { margin-bottom: 12px; }
        .ft-list a {
          font-size: 14px;
          color: #444; /* Changed from #666 to #444 for high contrast */
          text-decoration: none;
          font-weight: 600; /* Slightly bolder */
          transition: color 0.2s;
        }
        .ft-list a:hover { color: #1A7A2E; }

        /* --- Bottom Row: Social & Legal --- */
        .ft-bottom {
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ft-copy { 
          font-size: 12px; 
          color: #666; /* Darker than before */
          font-weight: 700; 
        }
        .ft-socials { display: flex; gap: 20px; }
        .ft-social-link { color: #444; transition: color 0.2s, transform 0.2s; }
        .ft-social-link:hover { transform: translateY(-2px); }
        .ft-social-x:hover { color: #000; }
        .ft-social-instagram:hover { color: #E1306C; }
        .ft-social-youtube:hover { color: #FF0000; }
        .ft-social-linkedin:hover { color: #0A66C2; }
        .ft-social-facebook:hover { color: #1877F2; }

        @media (max-width: 900px) {
          .ft-nav-row { flex-direction: column; gap: 30px; }
          .ft-nav-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 14px 28px;
          }
          .ft-nav-links a { white-space: nowrap; }
          .ft-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .ft-grid { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; gap: 20px; text-align: center; }
        }
      `}</style>

      <div className="ft-container">
        <div className="ft-nav-row">
          <Link to="/" className="ft-logo-wrap">
             <img
                src="/images/logo.png"
                alt="Skill Yuva Bharat"
                className="ft-logo-img"
             />
             <div className="ft-logo-text">
                <span className="ft-logo-main">
                  <span className="txt-ora">Skill</span> Yuva <span className="txt-gre">Bharat</span>
                </span>
                <span className="ft-logo-sub">India's Largest Private Job Fair Network</span>
             </div>
          </Link>

          <ul className="ft-nav-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/jobfair">Job Fair</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>

          <div className="ft-auth-actions">
            <Link to="/login" className="ft-login-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Login</Link>
            <Link to="/signup" className="ft-signup-btn">Sign Up</Link>
          </div>
        </div>

        <div className="ft-grid">
          <div>
            <div className="ft-col-head">Job Seekers</div>
            <ul className="ft-list">
              <li><a href="#fairs">Find a Fair</a></li>
              <li><a href="#services">Skill Training</a></li>
              <li><a href="#services">Resume Builder</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-head">Employers</div>
            <ul className="ft-list">
              <li><a href="#contact">Post a Vacancy</a></li>
              <li><a href="#contact">Partner with Us</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Employer Login</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-head">Legal</div>
            <ul className="ft-list">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Guidelines</a></li>
            </ul>
          </div>
          <div>
            <div className="ft-col-head">Support</div>
            <ul className="ft-list">
              <li><a href="#contact">Help Center</a></li>
              <li><a href="tel:+911800123456">+91 1800 123 456</a></li>
              <li><a href="mailto:info@skillyuvabharat.com">info@skillyuvabharat.com</a></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">
            © {currentYear} SKILLYUVABHARAT. INDIA'S LARGEST PRIVATE JOB FAIR NETWORK.
          </div>
          <div className="ft-socials">
            <a href="#" className="ft-social-link ft-social-x" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>
            </a>
            <a href="#" className="ft-social-link ft-social-instagram" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="ft-social-link ft-social-youtube" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="ft-social-link ft-social-linkedin" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="ft-social-link ft-social-facebook" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}