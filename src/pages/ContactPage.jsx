import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Building2, HelpCircle, ChevronDown } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);
const FacebookIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const XIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5675 21H20.8122L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { icon: <XIcon />, label: "X", href: "https://x.com/skillyuvabharat" },
  { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com/skillyuvabharat" },
  { icon: <YoutubeIcon />, label: "YouTube", href: "https://youtube.com/@skillyuvabharat" },
  { icon: <LinkedinIcon />, label: "LinkedIn", href: "https://linkedin.com/company/skillyuvabharat" },
  { icon: <FacebookIcon />, label: "Facebook", href: "https://facebook.com/skillyuvabharat" },
];

const QUICK_CONTACTS = [
  {
    icon: <Phone size={22} />,
    title: "Call Our Helpline",
    detail: "+91 98765 43210",
    sub: "Mon–Sat, 9 AM – 7 PM",
    accent: "#E8650A",
  },
  {
    icon: <Mail size={22} />,
    title: "Email Support",
    detail: "info@skillyuvabharat.com",
    detail2: "contact@skillyuvabharat.com",
    sub: "We reply within 24 hours",
    accent: "#1A7A2E",
  },
  {
    icon: <MessageCircle size={22} />,
    title: "WhatsApp Us",
    detail: "+91 98765 43210",
    sub: "Fastest way to reach us",
    accent: "#111",
  },
  {
    icon: <Building2 size={22} />,
    title: "Visit an Office",
    detail: "Chennai, Tamil Nadu",
    sub: "See address below",
    accent: "#E8650A",
  },
];

const OFFICES = [
  { city: "Chennai", tag: "Head Office", address: "31/15, Morrison 4th St, Ramapuram, Hudco Colony Layout, Pazhavanthangal, Chennai, St. Thomas Mount, Tamil Nadu 600016" },
];

const FAQS = [
  { q: "How do I register for a job fair?", a: "Click 'Register Free' on the homepage, fill in your details, and you'll get a confirmation for the nearest upcoming fair." },
  { q: "Is there any cost to attend?", a: "No. All job fairs, skill training, and support services are completely free for job seekers." },
  { q: "How can employers participate?", a: "Reach out through the form below or call our helpline — our employer relations team will guide you through onboarding." },
];

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' });
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div style={{ background: '#F8F4EF', minHeight: '100vh', fontFamily: "'Raleway', sans-serif", color: '#111' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;800;900&family=Lora:ital,wght@0,600;1,600&display=swap');

        .cp-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        .cp-hero { background: #EADFC9; padding: 120px 0 80px; text-align: center; position: relative; overflow: hidden; }
        .cp-hero-curve { position: absolute; bottom: -1px; left: 0; width: 100%; height: 90px; display: block; }
        .cp-eyebrow { font-size: 11px; font-weight: 800; color: #1A7A2E; letter-spacing: 2px; text-transform: uppercase; }
        .cp-hero h1 { font-size: 44px; font-weight: 900; margin: 15px 0; letter-spacing: -1px; }
        .cp-hero h1 em { color: #E8650A; font-style: italic; font-family: 'Lora', serif; font-weight: 600; }
        .cp-hero p { max-width: 560px; margin: 0 auto; color: #666; font-size: 15.5px; line-height: 1.7; }

        .cp-quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 60px 0 20px; }
        .cp-quick-card {
          background: #fff; border-radius: 12px; padding: 26px 22px; border: 1px solid rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cp-quick-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .cp-quick-icon {
          width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; background: rgba(0,0,0,0.04);
        }
        .cp-quick-card h4 { font-size: 15px; font-weight: 800; margin: 0 0 4px; }
        .cp-quick-card .detail { font-size: 14px; font-weight: 700; margin: 0 0 2px; }
        .cp-quick-card .sub { font-size: 12.5px; color: #888; margin: 0; }

        .cp-main-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; padding: 60px 0; align-items: start; }

        .cp-section-label { font-size: 11px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: rgba(0,0,0,.4); margin-bottom: 10px; }
        .cp-section-title { font-size: 24px; font-weight: 900; margin: 0 0 20px; letter-spacing: -0.5px; }

        .cp-office-card {
          background: #fff; border-radius: 12px; padding: 20px 22px; border: 1px solid rgba(0,0,0,0.06);
          border-left: 4px solid #1A7A2E; margin-bottom: 16px;
        }
        .cp-office-card:nth-child(2) { border-left-color: #111; }
        .cp-office-tag { font-size: 10.5px; font-weight: 800; text-transform: uppercase; color: #1A7A2E; letter-spacing: .05em; }
        .cp-office-card h4 { font-size: 16px; font-weight: 800; margin: 6px 0 6px; }
        .cp-office-card p { font-size: 13.5px; color: #666; line-height: 1.6; margin: 0; }

        .cp-form-box { background: #fff; border-radius: 16px; padding: 34px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        .cp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .cp-input-group { margin-bottom: 16px; }
        .cp-input-group label { display: block; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 8px; }
        .cp-field { width: 100%; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 12px 14px; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .cp-field:focus { border-color: #E8650A; background: #fff; }
        .cp-btn { width: 100%; background: #111; color: #fff; border: none; padding: 15px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s; }
        .cp-btn:hover { background: #E8650A; }

        .cp-map-full { padding: 0 0 60px; margin-top: -20px; }
        .cp-map-wrap { border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); margin-bottom: 16px; }
        .cp-map-wrap iframe { display: block; width: 100%; height: 220px; border: 0; }
        .cp-map-full .cp-map-wrap iframe { height: 380px; }

        .cp-social-card { background: #fff; border-radius: 12px; padding: 22px; border: 1px solid rgba(0,0,0,0.06); border-left: 4px solid #111; }
        .cp-social-card h4 { font-size: 14.5px; font-weight: 800; margin: 0 0 4px; }
        .cp-social-card p { font-size: 13px; color: #888; margin: 0 0 16px; }
        .cp-social-row { display: flex; gap: 10px; }
        .cp-social-icon {
          width: 40px; height: 40px; border-radius: 8px; background: #F9F9F9; border: 1px solid rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: center; color: #111; text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .cp-social-icon:hover { background: #E8650A; color: #fff; transform: translateY(-3px); }

        .cp-faq-wrap { padding: 20px 0 90px; max-width: 760px; margin: 0 auto; }
        .cp-faq-head { text-align: center; margin-bottom: 36px; }
        .cp-faq-item { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; margin-bottom: 12px; overflow: hidden; }
        .cp-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; cursor: pointer; font-weight: 700; font-size: 14.5px; }
        .cp-faq-q svg { flex-shrink: 0; transition: transform 0.25s; color: #E8650A; }
        .cp-faq-a { padding: 0 22px; max-height: 0; overflow: hidden; transition: all 0.3s ease; color: #666; font-size: 13.5px; line-height: 1.7; }
        .cp-faq-item.open .cp-faq-a { padding: 0 22px 20px; max-height: 200px; }
        .cp-faq-item.open .cp-faq-q svg { transform: rotate(180deg); }

        @media (max-width: 900px) {
          .cp-quick-grid { grid-template-columns: 1fr 1fr; }
          .cp-main-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cp-quick-grid { grid-template-columns: 1fr; }
          .cp-form-row { grid-template-columns: 1fr; }
          .cp-hero h1 { font-size: 32px; }
          .cp-hero { padding: 90px 0 60px; }
        }
      `}</style>

      {/* HERO */}
      <section className="cp-hero">
        <div className="cp-container">
          <span className="cp-eyebrow">Get in Touch</span>
          <h1>We're here to help <em>every step of the way</em></h1>
          <p>Whether you're a job seeker, an employer, or just have a question about our fairs — reach out. Our team responds fast, and every channel is free to use.</p>
        </div>
        <svg className="cp-hero-curve" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C300,90 900,90 1200,0 L1200,90 L0,90 Z" fill="#F8F4EF" />
        </svg>
      </section>

      {/* QUICK CONTACT CARDS */}
      <div className="cp-container">
        <div className="cp-quick-grid">
          {QUICK_CONTACTS.map((c, i) => (
            <div className="cp-quick-card" key={i}>
              <div className="cp-quick-icon" style={{ color: c.accent }}>{c.icon}</div>
              <h4>{c.title}</h4>
              <p className="detail" style={{ color: c.accent }}>{c.detail}</p>
              {c.detail2 && <p className="detail" style={{ color: c.accent, marginTop: -2 }}>{c.detail2}</p>}
              <p className="sub">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* OFFICES + FORM */}
        <div className="cp-main-grid">
          <div>
            <div className="cp-section-label">Our Offices</div>
            <h2 className="cp-section-title">Find us <em style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#E8650A', fontWeight: 600 }}>near you</em></h2>

            <div className="cp-office-card">
              <span className="cp-office-tag" style={{ color: '#111' }}>Working Hours</span>
              <h4>Monday – Saturday</h4>
              <p>09:00 AM – 06:00 PM IST (Closed on national holidays)</p>
            </div>

            {OFFICES.map((o, i) => (
              <div className="cp-office-card" key={i}>
                <span className="cp-office-tag">{o.tag}</span>
                <h4>{o.city}</h4>
                <p>{o.address}</p>
              </div>
            ))}

            <div className="cp-social-card">
              <h4>Follow us</h4>
              <p>Job fair updates, hiring tips & success stories</p>
              <div className="cp-social-row">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={i} className="cp-social-icon" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="cp-section-label">Send a Message</div>
            <h2 className="cp-section-title">Let's start a <em style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#E8650A', fontWeight: 600 }}>conversation</em></h2>
            <form className="cp-form-box" onSubmit={handleSubmit}>
              <div className="cp-form-row">
                <div className="cp-input-group">
                  <label>Full Name</label>
                  <input type="text" className="cp-field" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="cp-input-group">
                  <label>Phone Number</label>
                  <input type="tel" className="cp-field" placeholder="Enter your phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>

              <div className="cp-input-group">
                <label>Email Address</label>
                <input type="email" className="cp-field" placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="cp-input-group">
                <label>I am a...</label>
                <select className="cp-field" onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option>Job Seeker</option>
                  <option>Employer</option>
                  <option>Training Partner</option>
                  <option>Media / Press</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="cp-input-group">
                <label>Your Message</label>
                <textarea className="cp-field" rows="4" placeholder="How can we help you?" onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
              </div>

              <button type="submit" className="cp-btn">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="cp-map-full">
          <div className="cp-section-label">Location</div>
          <h2 className="cp-section-title">Our office <em style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#E8650A', fontWeight: 600 }}>on the map</em></h2>
          <div className="cp-map-wrap">
            <iframe
              title="Skill Yuva Bharat office location"
              src="https://maps.google.com/maps?q=31%2F15%2C%20Morrison%204th%20St%2C%20Ramapuram%2C%20Hudco%20Colony%20Layout%2C%20Pazhavanthangal%2C%20Chennai%2C%20St.%20Thomas%20Mount%2C%20Tamil%20Nadu%20600016&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="cp-faq-wrap">
        <div className="cp-faq-head">
          <div className="cp-section-label" style={{ justifyContent: 'center', display: 'flex' }}>Before You Write to Us</div>
          <h2 className="cp-section-title">Quick <em style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#E8650A', fontWeight: 600 }}>answers</em></h2>
        </div>
        {FAQS.map((f, i) => (
          <div className={`cp-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
            <div className="cp-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HelpCircle size={17} color="#1A7A2E" />
                {f.q}
              </span>
              <ChevronDown size={18} />
            </div>
            <div className="cp-faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}