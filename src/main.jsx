import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import coachImage from './assets/martleys-coach-live.jpg';
import roadImage from './assets/martleys-road-live.jpg';
import coachDetailImage from './assets/martleys-detail-live.jpg';
import passengerImage from './assets/martleys-passengers-live.png';
import countrysideCoachImage from './assets/martleys-hero-concept.png';

const routes = [
  ['821', 'Newbridge — Sallins Rail Station'], ['834', 'Portlaoise — Roscrea'], ['880', 'Carlow — Naas'],
  ['883', 'Athy — Newbridge'], ['892', 'Dunlavin — Newbridge'], ['2343', 'Borris-in-Ossory — Mount Lucas'],
];

function Arrow() { return <span className="arrow" aria-hidden="true">→</span>; }

function Mark({ light = false }) {
  return <a className={`mark ${light ? 'mark--light' : ''}`} href="#top" aria-label="Martley's home"><strong>Martley’s</strong><span>Portlaoise · Coach Hire</span></a>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); } }, { threshold: .18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ '--reveal-delay': `${delay}ms` }} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [journey, setJourney] = useState('Private hire');
  const openQuote = (type = journey) => { setJourney(type); setMenuOpen(false); setQuoteOpen(true); };

  const services = [
    { title: 'School & college', copy: 'Licensed, dependable daily travel for students and families.', image: roadImage, pos: 'center 58%', href: '#school' },
    { title: 'Private hire', copy: 'Your group, your plans, one easy journey.', image: countrysideCoachImage, pos: 'center', href: '#private' },
    { title: 'Concerts & events', copy: 'The right way to get the whole crowd there.', image: passengerImage, pos: '50% center', href: 'https://martleys.com/festivals-concerts/' },
    { title: 'Accessible travel', copy: 'More people can go further, comfortably.', image: coachDetailImage, pos: '75% center', href: 'https://martleys.com/accessible-transport/' },
  ];

  return <>
    <div className="notice"><div className="shell notice__inside"><span>School registrations for the new term are now open.</span><a href="https://martleys.com/schools-colleges/">Register now <Arrow /></a></div></div>
    <header className="header"><div className="shell header__inside"><Mark /><nav className="nav" aria-label="Primary navigation"><a href="#services">Services</a><a href="#school">School travel</a><a href="#routes">Timetables</a><a href="#fleet">Our fleet</a><a href="#contact">Contact</a></nav><a className="header__phone" href="tel:+353578620888"><small>Call us</small>057 862 0888</a><button className="button button--compact" onClick={() => openQuote()}>Get a quote <Arrow /></button><button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button></div>{menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#school" onClick={() => setMenuOpen(false)}>School travel</a><a href="#routes" onClick={() => setMenuOpen(false)}>Timetables</a><a href="#fleet" onClick={() => setMenuOpen(false)}>Our fleet</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><button className="button" onClick={() => openQuote()}>Get a quote <Arrow /></button></nav>}</header>

    <main id="top">
      <section className="hero">
        <img className="hero__image" src={countrysideCoachImage} alt="A coach travelling through the Irish countryside" />
        <div className="hero__scrim" />
        <div className="shell hero__content"><div className="hero__copy"><p>Family-run transport · serving the Midlands for 60+ years</p><h1>Get there<br /><em>together.</em></h1><div className="hero__actions"><button className="button button--sky" onClick={() => openQuote('Private hire')}>Plan a journey <Arrow /></button><a className="hero__text-action" href="https://martleys.com/tickets/">Buy school tickets <Arrow /></a></div></div><div className="hero__proof"><strong>16–63</strong><span>seats, buses &amp;<br />coaches for every group</span></div></div>
        <a className="hero__scroll" href="#services" aria-label="Explore Martley's services"><span>Scroll to explore</span><i /></a>
      </section>

      <section id="services" className="services"><div className="shell"><Reveal className="services__intro"><p className="eyebrow">Choose your journey</p><h2>There’s more than<br />one way to go.</h2><p>From daily routines to the big occasion, our team knows the road—and what makes the journey feel easy.</p></Reveal><div className="service-grid">{services.map((service, index) => <Reveal key={service.title} delay={index * 70} className="service-card"><a href={service.href}><img src={service.image} alt="" style={{ objectPosition: service.pos }} /><span className="service-card__shade" /><span className="service-card__content"><small>0{index + 1}</small><strong>{service.title}</strong><em>{service.copy}</em><b>Explore <Arrow /></b></span></a></Reveal>)}</div></div></section>

      <section id="school" className="school"><div className="shell school__grid"><Reveal className="school__image"><img src={roadImage} alt="A Martley's coach travelling across the Midlands" /></Reveal><Reveal className="school__copy" delay={90}><p className="eyebrow eyebrow--blue">School &amp; college travel</p><h2>Every school day starts <em>well.</em></h2><p>For generations of local families, Martley’s has made the school journey safer, calmer and more reliable.</p><ul><li>Licensed National Transport Authority services</li><li>Garda-vetted drivers and selected bus escorts</li><li>Daily, weekly and annual ticket options</li></ul><div className="school__actions"><a className="button" href="https://martleys.com/schools-colleges/">Register a student <Arrow /></a><a className="inline-link" href="https://martleys.com/tickets/">Buy school tickets <Arrow /></a></div></Reveal></div></section>

      <section id="routes" className="routes"><div className="shell routes__grid"><Reveal><p className="eyebrow eyebrow--blue">Public service routes</p><h2>Right on<br />your route.</h2><p>Comfortable connections for work, education, appointments and days out across Laois and Kildare.</p><a className="button button--outline" href="https://martleys.com/public-service-routes/">See all timetables <Arrow /></a></Reveal><Reveal className="route-board" delay={90}><p>Current services</p>{routes.map(([number, name]) => <a key={number} href="https://martleys.com/public-service-routes/"><strong>{number}</strong><span>{name}</span><Arrow /></a>)}</Reveal></div></section>

      <section id="fleet" className="fleet"><div className="fleet__image"><img src={roadImage} alt="A Martley's coach travelling through the Irish countryside" /></div><div className="shell fleet__overlay"><Reveal className="fleet__message"><p>Our fleet</p><h2>Comfort that keeps<br />the day moving.</h2><span>Modern, well-maintained vehicles, with the space and flexibility every group needs.</span><button className="text-button" onClick={() => openQuote('Private hire')}>Meet the fleet <Arrow /></button></Reveal><Reveal className="fleet__stats" delay={90}><div><strong>60+</strong><span>years of local<br />experience</span></div><div><strong>11</strong><span>wheelchair passengers<br />on adapted coaches</span></div><div><strong>100%</strong><span>focused on a safe,<br />comfortable journey</span></div></Reveal></div></section>

      <section id="private" className="story"><div className="shell story__grid"><Reveal><p className="eyebrow eyebrow--blue">Private hire</p><h2>Big days.<br />Small details.<br /><em>One good journey.</em></h2></Reveal><Reveal className="story__copy" delay={100}><p>Corporate travel, weddings, sports clubs, airport transfers, concerts and local festivals—we’ll help you get the plan right before anyone gets on board.</p><button className="button" onClick={() => openQuote('Private hire')}>Start a private hire quote <Arrow /></button></Reveal></div></section>

      <section className="trust"><div className="shell trust__inner"><Reveal><blockquote>“Martley’s are punctual, reliable, efficient, competitive and most importantly of all safe.”</blockquote><cite>Gaelscoil Phortlaoise</cite></Reveal><Reveal className="trust__facts" delay={100}><p>Every journey is built on trust.</p><div><span>Family-run</span><span>RSA compliant</span><span>Garda-vetted school drivers</span></div></Reveal></div></section>

      <section id="contact" className="contact"><div className="shell contact__inner"><Reveal><p>Start with a simple hello.</p><h2>Where can we take you?</h2></Reveal><Reveal className="contact__actions" delay={90}><p>Tell us your destination, group size and dates. We’ll come back with a clear, tailored plan.</p><button className="button button--sky" onClick={() => openQuote()}>Request a quote <Arrow /></button><a href="tel:+353578620888">Or call <strong>057 862 0888</strong></a></Reveal></div></section>
    </main>

    <footer className="footer"><div className="shell footer__grid"><Mark light /><div><p>Contact</p><a href="tel:+353578620888">057 862 0888</a><a href="mailto:info@martleys.com">info@martleys.com</a></div><div><p>Find us</p><span>Kilminchy, Dublin Road<br />Portlaoise, Co. Laois, R32 CPA4</span></div><div><p>Useful links</p><a href="https://martleys.com/tickets/">Buy tickets</a><a href="https://martleys.com/public-service-routes/">Timetables</a></div></div><div className="shell footer__bottom">© {new Date().getFullYear()} Martley’s of Portlaoise <span>Family-run transport for the Midlands and beyond.</span></div></footer>

    {quoteOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setQuoteOpen(false)}><section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close quote form">×</button><p className="eyebrow eyebrow--blue">Request a quote</p><h2 id="quote-title">Let’s plan your journey.</h2><p>Give us a few details and our local team will be in touch.</p><form onSubmit={(event) => { event.preventDefault(); setQuoteOpen(false); }}><label>Journey type<select value={journey} onChange={(event) => setJourney(event.target.value)}><option>Private hire</option><option>School travel</option><option>An event</option><option>Accessible transport</option></select></label><label>Your name<input required placeholder="Name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Tell us about the journey<textarea required rows="3" placeholder="Dates, group size, destination…" /></label><button className="button" type="submit">Send enquiry <Arrow /></button></form></section></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
