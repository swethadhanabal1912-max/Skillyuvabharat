import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronRight } from "lucide-react";

const links = [
  { title: "Home", href: "/", isPage: true },
  { title: "About Us", href: "/about", isPage: true },
  { title: "Services", href: "/services", isPage: true },
  { title: "Job Fair", href: "/jobfair", isPage: true },
  { title: "Contact Us", href: "/contact", isPage: true },
];

export default function Navpage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveTitle = () => {
    if (location.pathname === "/about") return "About Us";
    if (location.pathname === "/services") return "Services";
    if (location.pathname === "/jobfair") return "Job Fair";
    if (location.pathname === "/contact") return "Contact Us";
    return "Home";
  };

  const active = getActiveTitle();

  const handleNavClick = (e, item) => {
    setMobileOpen(false);

    // ONLY prevent default for hash sections (none currently use this)
    if (!item.isPage) {
      e.preventDefault();
      const id = item.href.replace("/#", "");

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For page routes (isPage: true), the browser will naturally redirect.
  };

  return (
    <>
      <style>{`
        .nav-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          font-family: 'Raleway', sans-serif; transition: all 0.3s ease;
        }
        .nav-container {
          max-width: 1300px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between; height: 80px;
        }
        .nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .nav-logo-img { height: 38px; width: auto; object-fit: contain; }
        .nav-logo-main { font-size: 20px; font-weight: 900; color: #111; }
        .nav-logo-sub { font-size: 10px; font-weight: 700; color: #999; text-transform: uppercase; margin-top: 2px; display: block; }
        .nav-menu { display: flex; align-items: center; gap: 32px; position: absolute; left: 50%; transform: translateX(-50%); }
        .nav-link { text-decoration: none; font-size: 14.5px; font-weight: 700; color: rgba(0,0,0,0.5); position: relative; padding: 8px 0; }
        .nav-link.active { color: #111; }
        .nav-active-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #E8650A; border-radius: 10px; }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .btn-login { padding: 10px 24px; border-radius: 10px; border: 2px solid #111; font-weight: 800; font-size: 13.5px; background: transparent; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; text-decoration: none; color: #111; display: inline-flex; align-items: center; }
        .btn-login:hover { background: #111; color: #fff; }
        .btn-signup { padding: 11px 26px; border-radius: 10px; background: #111; color: #fff; font-weight: 800; font-size: 13.5px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-decoration: none; display: inline-flex; align-items: center; transition: background 0.2s ease; }
        .btn-signup:hover { background: #E8650A; }
        .nav-mobile-toggle { display: none; background: none; border: none; cursor: pointer; }
        @media (max-width: 1100px) { .nav-menu, .nav-actions { display: none; } .nav-mobile-toggle { display: block; } }
        .mobile-drawer { position: absolute; top: 80px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #eee; padding: 24px; }
      `}</style>

      <header className="nav-header" style={{
          background: scroll ? "rgba(248, 244, 239, 0.98)" : "transparent",
          backdropFilter: scroll ? "blur(12px)" : "none",
          borderBottom: scroll ? "1px solid rgba(0,0,0,0.06)" : "none"
      }}>
        <div className="nav-container">
          <Link to="/" className="nav-brand" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img
              src="/images/logo.png"
              alt="Skill Yuva Bharat logo"
              className="nav-logo-img"
            />
            <div>
              <span className="nav-logo-main">
                <span style={{ color: "#E8650A" }}>Skill</span> Yuva <span style={{ color: "#1A7A2E" }}>Bharat</span>
              </span>
              <span className="nav-logo-sub">India's Largest Private Job Fair Network</span>
            </div>
          </Link>

          <nav className="nav-menu">
            {links.map((item) => (
              <Link key={item.title} to={item.href} onClick={(e) => handleNavClick(e, item)} className={`nav-link ${active === item.title ? 'active' : ''}`}>
                {item.title}
                {active === item.title && <motion.div layoutId="underline" className="nav-active-bar" />}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/signup" className="btn-signup">Sign Up</Link>
          </div>

          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mobile-drawer">
              {links.map((item) => (
                <Link key={item.title} to={item.href} onClick={(e) => handleNavClick(e, item)} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', fontWeight: 800, textDecoration: 'none', color: '#111' }}>
                  {item.title} <ChevronRight size={18} />
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}