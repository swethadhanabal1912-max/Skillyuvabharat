import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2, User } from 'lucide-react';

export default function Contactus() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="cu-wrap" id="contact">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700;800;900&family=Lora:ital,wght@0,600;1,600&display=swap');

        .cu-wrap {
          font-family: 'Raleway', sans-serif;
          background: #F8F4EF;
          padding: 80px 24px;
          color: #111;
          position: relative;
          overflow: hidden;
        }

        .cu-deco-wrap {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          color: #111;
        }
        .cu-deco-tl {
          top: 40px;
          left: 40px;
        }
        .cu-deco-tl .cu-deco-big {
          width: 150px;
          height: 150px;
          opacity: 0.1;
          animation: cu-deco-float 6s ease-in-out infinite;
        }
        .cu-deco-tl .cu-deco-small {
          width: 60px;
          height: 60px;
          opacity: 0.15;
          position: absolute;
          top: 120px;
          left: 130px;
          animation: cu-deco-float 5s ease-in-out infinite 1s;
        }

        .cu-deco-br {
          bottom: 40px;
          right: 40px;
        }
        .cu-deco-br .cu-deco-big {
          width: 160px;
          height: 160px;
          opacity: 0.1;
          animation: cu-deco-float 7s ease-in-out infinite .5s;
        }
        .cu-deco-br .cu-deco-small {
          width: 56px;
          height: 56px;
          opacity: 0.15;
          position: absolute;
          bottom: 130px;
          right: 145px;
          animation: cu-deco-float 5.5s ease-in-out infinite 1.5s;
        }

        @keyframes cu-deco-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        .cu-wrap > *:not(.cu-deco-wrap) {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .cu-deco-wrap { display: none; }
        }

        .cu-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        /* --- Header --- */
        .cu-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .cu-eyebrow-line { height: 1px; width: 32px; background: rgba(0,0,0,.15); }
        .cu-label { font-size: 11px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: rgba(0,0,0,.4); }

        .cu-heading {
          font-size: clamp(28px, 4vw, 36px);
          font-weight: 900;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: -1px;
        }
        .cu-heading em {
          font-family: 'Lora', serif;
          font-style: italic;
          color: #E8650A;
          font-weight: 600;
        }

        .cu-sub {
          font-size: 14px;
          color: #666;
          text-align: center;
          max-width: 500px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        /* --- NEW: Typing effect line --- */
        .cu-typing-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 56px;
        }
        .cu-typing-text {
          position: relative;
          display: inline-block;
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 14px;
          color: #1A7A2E;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid #1A7A2E;
          animation:
            cu-type 6s steps(34, end) infinite,
            cu-blink 0.7s step-end infinite;
        }
        @keyframes cu-type {
          0%   { width: 0; }
          35%  { width: 34ch; }
          75%  { width: 34ch; }
          100% { width: 0; }
        }
        @keyframes cu-blink {
          0%, 100% { border-color: #1A7A2E; }
          50% { border-color: transparent; }
        }

        /* --- Grid Layout --- */
        .cu-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 40px;
          align-items: start;
        }

        /* --- Info Cards (Signature Left Border Style) --- */
        .cu-info-card {
          background: #fff;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(0,0,0,0.06);
          border-left: 4px solid #1A7A2E; /* Brand Green */
          margin-bottom: 20px;
          display: flex;
          gap: 16px;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .cu-info-card:nth-child(2) { border-left-color: #E8650A; } /* Brand Orange */
        .cu-info-card:nth-child(3) { border-left-color: #111; }

        .cu-info-card:hover { transform: translateX(8px); }

        .cu-icon-box {
          width: 40px;
          height: 40px;
          background: #F8F4EF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
          flex-shrink: 0;
        }

        .cu-info-content h4 { font-size: 15px; font-weight: 800; margin-bottom: 4px; }
        .cu-info-content p { font-size: 13.5px; color: #666; line-height: 1.5; margin: 0; }

        /* --- Form Styling --- */
        .cu-form-col {
          position: relative;
        }

        .cu-form-box {
          position: relative;
          z-index: 1;
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .cu-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .cu-input-group { margin-bottom: 16px; }
        .cu-input-group label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #999;
          margin-bottom: 8px;
        }

        .cu-field {
          width: 100%;
          background: #F9F9F9;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .cu-field:focus { border-color: #E8650A; background: #fff; }

        .cu-btn {
          width: 100%;
          background: #111;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .cu-btn:hover { background: #E8650A; }

        @media (max-width: 850px) {
          .cu-grid { grid-template-columns: 1fr; }
          .cu-form-grid { grid-template-columns: 1fr; }
          .cu-wrap { padding: 60px 20px; }
        }
      `}</style>

      <div className="cu-deco-wrap cu-deco-tl">
        <Mail className="cu-deco-big" strokeWidth={1.2} />
        <MessageSquare className="cu-deco-small" strokeWidth={1.2} />
      </div>

      <div className="cu-deco-wrap cu-deco-br">
        <Phone className="cu-deco-big" strokeWidth={1.2} />
        <Send className="cu-deco-small" strokeWidth={1.2} />
      </div>

      <div className="cu-container">
        {/* Hero Section */}
        <div className="cu-eyebrow">
          <div className="cu-eyebrow-line" />
          <span className="cu-label">Get in Touch</span>
          <div className="cu-eyebrow-line" />
        </div>
        <h2 className="cu-heading">Let's Start a <em>Conversation</em></h2>
        <p className="cu-sub">
          Have questions about our job fairs or skill training? Our team is here to help you navigate your career journey.
        </p>

        {/* Typing effect line */}
        <div className="cu-typing-wrap">
          <span className="cu-typing-text">We usually reply within a few hours</span>
        </div>

        <div className="cu-grid">
          {/* Contact Information */}
          <div className="cu-info-col">
            <div className="cu-info-card">
              <div className="cu-icon-box"><MapPin size={18}/></div>
              <div className="cu-info-content">
                <h4>Main Office</h4>
                <p>SkillYuvaBharat Pvt. Ltd., Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002</p>
              </div>
            </div>

            <div className="cu-info-card">
              <div className="cu-icon-box"><Mail size={18}/></div>
              <div className="cu-info-content">
                <h4>Email Support</h4>
                <p>info@skillyuvabharat.com<br/>contact@skillyuvabharat.com</p>
              </div>
            </div>

            <div className="cu-info-card">
              <div className="cu-icon-box"><Clock size={18}/></div>
              <div className="cu-info-content">
                <h4>Working Hours</h4>
                <p>Monday — Friday<br/>09:00 AM — 06:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="cu-form-col">
            <form className="cu-form-box" onSubmit={handleSubmit}>
              <div className="cu-form-grid">
                <div className="cu-input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="cu-field" 
                    placeholder="Enter name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="cu-input-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="cu-field" 
                    placeholder="Enter email"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="cu-input-group">
                <label>Inquiry Type</label>
                <select className="cu-field">
                  <option>I am a Job Seeker</option>
                  <option>I am an Employer</option>
                  <option>Partnership Inquiry</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className="cu-input-group">
                <label>Your Message</label>
                <textarea 
                  className="cu-field" 
                  rows="4" 
                  placeholder="How can we help you?"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="cu-btn">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}