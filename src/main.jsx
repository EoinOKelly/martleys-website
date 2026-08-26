import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import roadImage from './assets/martleys-road-live.jpg';
import coachDetailImage from './assets/martleys-detail-live.jpg';
import passengerImage from './assets/martleys-passengers-live.png';
import countrysideCoachImage from './assets/martleys-hero-concept.png';
import interiorImage from './assets/martleys-interior-concept.png';
import coachImage from './assets/martleys-coach-live.jpg';
import martleysLogo from './assets/martleys-logo.png';

const routes = [
  ['821', 'Newbridge — Sallins Rail Station'],
  ['834', 'Portlaoise — Roscrea'],
  ['880', 'Carlow — Naas'],
  ['883', 'Athy — Newbridge'],
  ['892', 'Dunlavin — Newbridge'],
  ['2343', 'Borris-in-Ossory — Mount Lucas'],
];

const services = [
  { title: 'School transport', copy: 'Safe, trusted daily school runs around Portlaoise and Mountrath.', image: roadImage, pos: 'center 58%', href: '#school' },
  { title: 'College commute', copy: 'Reliable travel to Carlow colleges for students and commuters.', image: passengerImage, pos: '50% center', href: '#college' },
  { title: 'Tours', copy: 'Tours within Ireland, or travel with us to Europe and the UK.', image: coachDetailImage, pos: '60% center', href: '#tours' },
  { title: 'Public routes', copy: 'Comfortable local connections in partnership with NTA and TFI Local Link.', image: countrysideCoachImage, pos: 'center', href: '#routes' },
  { title: 'Private hire', copy: 'Your group, your plan—from minibuses to a full coach.', image: coachImage, pos: 'center', href: '#private' },
  { title: 'Concerts & events', copy: 'Easy rides to Aviva, Croke Park, 3Arena and more.', image: passengerImage, pos: '70% center', href: 'https://martleys.com/festivals-concerts/' },
  { title: 'Festival shuttles', copy: 'To and from Electric Picnic, Forest Fest and local festivals.', image: countrysideCoachImage, pos: '70% center', href: 'https://martleys.com/festivals-concerts/' },
  { title: 'Accessible travel', copy: 'Wheelchair-adapted coaches so more people can go further.', image: interiorImage, pos: 'center', href: 'https://martleys.com/accessible-transport/' },
];

const facilities = [
  'Fully air-conditioned',
  'Free Wi‑Fi on selected coaches',
  'Wheelchair access',
  'Device charging points',
  'Seat belts across the fleet',
  '16–63 seat options',
  'Fully RSA compliant buses and drivers',
];

const hireTypes = [
  ['Weddings & special occasions', 'Guest transport for weddings, gatherings and special events, timed with care.'],
  ['Corporate', 'Meetings, conferences and airport transfers'],
  ['Sports clubs', 'Away days and tournament weekends'],
  ['Hen & stag', 'Group travel without the stress'],
];

const reviews = [
  { quote: 'Martley’s are punctual, reliable, efficient, competitive and most importantly of all safe.', name: 'Gaelscoil Phortlaoise' },
  { quote: 'Professional drivers, spotless coaches and a team that actually answers the phone. Exactly what you want for school and private hire.', name: 'Local parent, Portlaoise' },
];

// Switch this off, or update its copy and link, between major events.
const activeEventNotice = {
  enabled: true,
  label: 'Festival travel',
  message: 'Electric Picnic and Forest Fest travel updates',
  href: '#travel-updates',
};

function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

function Mark({ light = false }) {
  return (
    <a className={`mark ${light ? 'mark--light' : ''}`} href="#top" aria-label="Martley's home">
      {light ? (
        <>
          <strong>Martley’s</strong>
          <span>Portlaoise · Coach Hire</span>
        </>
      ) : (
        <img className="mark__logo" src={martleysLogo} alt="Martley's" />
      )}
    </a>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.16 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ '--reveal-delay': `${delay}ms` }} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [journey, setJourney] = useState('Private hire');
  const [fleetIndex, setFleetIndex] = useState(0);

  const fleetImages = [
    { src: countrysideCoachImage, alt: 'Martley’s coach on a countryside road', label: 'Full-size coaches' },
    { src: coachImage, alt: 'Martley’s coach ready for hire', label: 'Modern fleet' },
    { src: interiorImage, alt: 'Comfortable Martley’s coach interior', label: 'Comfortable interiors' },
    { src: roadImage, alt: 'Martley’s coach travelling through the Midlands', label: 'Midlands specialists' },
  ];

  const openQuote = (type = journey) => {
    setJourney(type);
    setMenuOpen(false);
    setQuoteOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen || quoteOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, quoteOpen]);

  return (
    <>
      {activeEventNotice.enabled && (
        <div className="notice notice--event">
          <div className="shell notice__inside">
            <span><strong>{activeEventNotice.label}:</strong> {activeEventNotice.message}</span>
            <a href={activeEventNotice.href}>View travel updates <Arrow /></a>
          </div>
        </div>
      )}
      <div className="notice">
        <div className="shell notice__inside">
          <strong>Highlights</strong>
          <span>School registrations for the new term are now open.</span>
          <a href="https://martleys.com/schools-colleges/">Register now <Arrow /></a>
        </div>
      </div>

      <header className="header">
        <div className="shell header__inside">
          <Mark />
          <nav className="nav" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#school">Schools &amp; colleges</a>
            <a href="#routes">Public routes</a>
            <a href="#fleet">Fleet</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header__actions">
            <a className="header__phone" href="tel:+353578620888">
              <small>Call us</small>
              057 862 0888
            </a>
            <a className="header__tickets" href="https://martleys.com/tickets/">Buy tickets</a>
            <button className="button button--compact" onClick={() => openQuote()}>Get a quote <Arrow /></button>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i /><i />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="drawer-backdrop" onClick={closeMenu}>
          <nav className="drawer" aria-label="Mobile navigation" onClick={(event) => event.stopPropagation()}>
            <div className="drawer__top">
              <Mark light />
              <button type="button" className="drawer__close" onClick={closeMenu} aria-label="Close menu">×</button>
            </div>
            <div className="drawer__links">
              <details className="drawer__services">
                <summary>Services</summary>
                <div className="drawer__service-links">
                  <a href="#school" onClick={closeMenu}>School transport</a>
                  <a href="#college" onClick={closeMenu}>College commute</a>
                  <a href="#tours" onClick={closeMenu}>Tours</a>
                  <a href="#routes" onClick={closeMenu}>Public routes</a>
                  <a href="#private" onClick={closeMenu}>Private hire</a>
                  <a href="https://martleys.com/festivals-concerts/" onClick={closeMenu}>Concerts &amp; events</a>
                  <a href="https://martleys.com/accessible-transport/" onClick={closeMenu}>Accessible transport</a>
                </div>
              </details>
              <a href="#fleet" onClick={closeMenu}>Our fleet</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#travel-updates" onClick={closeMenu}>Travel updates</a>
              <a href="https://martleys.com/tickets/" onClick={closeMenu}>Buy tickets</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
            </div>
            <button className="button button--sky" onClick={() => openQuote()}>Get a quote <Arrow /></button>
            <a className="drawer__phone" href="tel:+353578620888">057 862 0888</a>
          </nav>
        </div>
      )}

      <main id="top">
        <section className="hero">
          <img className="hero__image" src={countrysideCoachImage} alt="A Martley's coach travelling through the Irish countryside" />
          <div className="hero__scrim" />
          <div className="shell hero__content">
            <div className="hero__copy">
              <p className="hero__brand">Martley’s of Portlaoise</p>
              <h1>Reliable coaches.<br /><em>Friendly service.</em></h1>
              <p className="hero__lead">The trusted local travel partner for the Midlands and beyond.</p>
              <div className="hero__actions">
                <a className="button button--sky" href="https://martleys.com/tickets/">All tickets <Arrow /></a>
                <a className="hero__text-action" href="https://martleys.com/tickets/">Buy school tickets <Arrow /></a>
                <a className="hero__text-action" href="https://martleys.com/tickets/">Buy college commute tickets <Arrow /></a>
              </div>
            </div>
          </div>
          <a className="hero__scroll" href="#services" aria-label="Explore Martley's services">
            <span>Explore</span>
            <i />
          </a>
        </section>

        <section className="intro">
          <div className="shell intro__grid">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Welcome</p>
              <h2>The trusted local travel partner for the Midlands and beyond.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Martley’s of Portlaoise is a family-run transport business, established and serving the Midlands for over 60 years.
                From licensed school routes to private hire, concerts, festivals and accessible coaches—we keep every journey clear, calm and on time.
              </p>
              <a className="inline-link" href="#about">Our story <Arrow /></a>
            </Reveal>
          </div>
        </section>

        <section id="services" className="services">
          <div className="shell">
            <Reveal className="services__intro">
              <div>
                <p className="eyebrow">What we do</p>
                <h2>Every kind of journey,<br />handled with care.</h2>
              </div>
              <p>School mornings, daily commutes, tours, match days, celebrations and weekend festivals. Choose the service that fits, then leave the road to us.</p>
            </Reveal>
            <div className="service-grid">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 45} className="service-tile">
                  <a id={service.title === 'Tours' ? 'tours' : undefined} href={service.href}>
                    <img src={service.image} alt="" style={{ objectPosition: service.pos }} />
                    <span className="service-tile__shade" />
                    <span className="service-tile__content">
                      <strong>{service.title}</strong>
                      <em>{service.copy}</em>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="school" className="school">
          <div className="shell school__grid">
            <Reveal className="school__image">
              <img src={roadImage} alt="A Martley's coach travelling across the Midlands" />
            </Reveal>
            <Reveal className="school__copy" delay={90}>
              <p className="eyebrow eyebrow--blue">School transport</p>
              <h2>Every school day starts <em>well.</em></h2>
              <p>
                For generations, local families and schools have trusted Martley’s to transport their children safely. We operate daily school runs around Portlaoise and Mountrath, and work directly with teachers and coordinators to tailor transport for school tours and outings, giving parents, teachers and students peace of mind, every day.
              </p>
              <ul>
                <li>All Portlaoise schools and Mountrath Community School</li>
                <li>School runs serving all Portlaoise housing estates</li>
                <li>Licensed National Transport Authority school services</li>
                <li>Fully RSA compliant buses and drivers</li>
                <li>Garda-vetted drivers and escorts</li>
                <li>Comfortable, clean and regularly serviced vehicles</li>
                <li>Seatbelts across the fleet</li>
                <li>Daily, weekly, term and annual ticket options, with sibling discounts</li>
              </ul>
              <div className="school__actions">
                <a className="button" href="https://martleys.com/schools-colleges/">Register a student <Arrow /></a>
                <a className="inline-link" href="https://martleys.com/tickets/">Buy school tickets <Arrow /></a>
              </div>
            </Reveal>
          </div>
          <div className="shell school__reasons">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Why families choose us</p>
              <h3>Trusted by schools and parents across the Midlands.</h3>
            </Reveal>
            <div className="review-grid">
              {reviews.map((review, index) => (
                <Reveal key={review.name} delay={index * 70} className="review">
                  <div className="review__stars" aria-label="5 star review">★★★★★</div>
                  <blockquote>“{review.quote}”</blockquote>
                  <cite>{review.name}</cite>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="college" className="school">
          <div className="shell school__grid">
            <Reveal className="school__image">
              <img src={passengerImage} alt="Passengers travelling comfortably with Martley's" />
            </Reveal>
            <Reveal className="school__copy" delay={90}>
              <p className="eyebrow eyebrow--blue">College commute</p>
              <h2>A better start to <em>your day.</em></h2>
              <p>We provide a comfortable, reliable and affordable daily commuter service to South East Technological University (SETU), Carlow Institute (CIT) and Carlow College St Patrick’s, with convenient pick-up and drop-off points to suit your schedule. Designed with students and commuters in mind, our service makes the journey stress-free.</p>
              <ul>
                <li>50% off for Young Adult Leap Card (YAC) holders</li>
                <li>Single, return and weekly ticket options</li>
                <li>Fully RSA compliant buses and drivers</li>
                <li>Comfortable, clean and regularly serviced vehicles</li>
              </ul>
              <div className="school__actions">
                <a className="button" href="https://martleys.com/schools-colleges/">View timetable <Arrow /></a>
                <a className="inline-link" href="https://martleys.com/schools-colleges/">Register a student <Arrow /></a>
                <a className="inline-link" href="https://martleys.com/tickets/">Buy college commute tickets <Arrow /></a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="routes" className="routes">
          <div className="shell routes__grid">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Public service routes</p>
              <h2>Right on<br />your route.</h2>
              <p>We proudly operate a network of public service routes in partnership with the National Transport Authority (NTA) and TFI Local Link.</p>
              <a className="button button--outline" href="https://martleys.com/public-service-routes/">See all timetables <Arrow /></a>
            </Reveal>
            <Reveal className="route-board" delay={90}>
              <p>Current services</p>
              {routes.map(([number, name]) => (
                <a key={number} href="https://martleys.com/public-service-routes/">
                  <strong>{number}</strong>
                  <span>{name}</span>
                  <Arrow />
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="fleet" className="fleet">
          <div className="shell fleet__top">
            <Reveal>
              <p className="eyebrow">Our fleet</p>
              <h2>A bus for everyone,<br />however you travel.</h2>
              <p>Clean, comfortable and well maintained—whatever the occasion, we’ve got a vehicle that fits. From cosy minibuses for small groups to spacious premium coaches for bigger crowds, along with specially adapted wheelchair-accessible buses carrying up to 11 wheelchair passengers each, everyone can travel together.</p>
            </Reveal>
            <Reveal className="fleet__facilities" delay={80}>
              <p>Onboard facilities</p>
              <ul>
                {facilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Reveal>
          </div>
          <div className="shell fleet__showcase">
            <Reveal className="fleet__stage">
              <img src={fleetImages[fleetIndex].src} alt={fleetImages[fleetIndex].alt} />
              <div className="fleet__stage-bar">
                <span>{fleetImages[fleetIndex].label}</span>
                <div className="fleet__controls">
                  <button
                    type="button"
                    aria-label="Previous fleet image"
                    onClick={() => setFleetIndex((current) => (current - 1 + fleetImages.length) % fleetImages.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next fleet image"
                    onClick={() => setFleetIndex((current) => (current + 1) % fleetImages.length)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </Reveal>
            <Reveal className="fleet__stats" delay={70}>
              <div><strong>60+</strong><span>years of local experience</span></div>
              <div><strong>16–63</strong><span>seats for every group size</span></div>
              <div><strong>11</strong><span>wheelchair passengers on adapted coaches</span></div>
            </Reveal>
          </div>
          <div className="shell fleet__cta">
            <button className="button" onClick={() => openQuote('Private hire')}>Enquire about the fleet <Arrow /></button>
          </div>
        </section>

        <section id="private" className="story">
          <div className="shell story__grid">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Private hire</p>
              <h2>Big days.<br />Small details.<br /><em>One good journey.</em></h2>
            </Reveal>
            <Reveal className="story__copy" delay={100}>
              <p>
                Corporate travel, weddings, sports clubs, airport transfers, concerts and local festivals—
                tell us the destination, dates and numbers, and we’ll shape a clear plan before anyone boards.
              </p>
              <div className="hire-grid">
                {hireTypes.map(([title, copy]) => (
                  <div key={title}>
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                ))}
              </div>
              <button className="button" onClick={() => openQuote('Private hire')}>Start a private hire quote <Arrow /></button>
            </Reveal>
          </div>
        </section>

        <section id="about" className="about">
          <div className="about__visual">
            <img src={coachDetailImage} alt="Detail of a Martley's coach" />
            <div className="about__visual-shade" />
            <div className="shell about__visual-copy">
              <p>About Martley’s</p>
              <h2>Connecting people has been at the heart of what we do for over 60 years.</h2>
            </div>
          </div>
          <div className="shell about__body">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Our story</p>
              <h3>Proudly local, proudly family run—but it’s our team that gets you there.</h3>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Martley’s is a family business at heart, but it’s our team that makes every journey happen. Experienced drivers know the roads and routes inside out. Skilled mechanics keep every coach in top condition, day in and day out. Friendly staff are on the other end of the phone, ready to answer your questions.
              </p>
              <p>
                Whether it’s a daily school run or a once-in-a-lifetime celebration, that team treats every journey with the same care: safe vehicles, trusted drivers, and people who know exactly what they’re doing.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="travel-updates" className="intro">
          <div className="shell intro__grid">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Travel updates</p>
              <h2>Concerts, festivals and service news.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p>Find ticket links, pickup points, times and important travel information for upcoming events.</p>
              <a className="button" href="https://martleys.com/festivals-concerts/">View latest updates <Arrow /></a>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="shell contact__inner">
            <Reveal>
              <p>Start with a simple hello.</p>
              <h2>Where can we take you?</h2>
            </Reveal>
            <Reveal className="contact__actions" delay={90}>
              <p>Tell us your destination, group size and dates. We’ll come back with a clear, tailored plan.</p>
              <button className="button button--sky" onClick={() => openQuote()}>Request a quote <Arrow /></button>
              <a href="tel:+353578620888">Or call <strong>057 862 0888</strong></a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__grid">
          <div className="footer__brand">
            <Mark light />
            <p>A large range of excellently maintained buses and coaches, driven by experienced, capable and responsible drivers.</p>
          </div>
          <div>
            <p>Contact</p>
            <a href="tel:+353578620888">057 862 0888</a>
            <a href="mailto:info@martleys.com">info@martleys.com</a>
          </div>
          <div>
            <p>Find us</p>
            <span>Kilminchy, Dublin Road<br />Portlaoise, Co. Laois<br />R32 CPA4</span>
          </div>
          <div>
            <p>Explore</p>
            <a href="https://martleys.com/tickets/">Buy tickets</a>
            <a href="https://martleys.com/public-service-routes/">Timetables</a>
            <a href="https://martleys.com/schools-colleges/">Schools &amp; colleges</a>
            <a href="https://martleys.com/accessible-transport/">Accessible transport</a>
          </div>
        </div>
        <div className="shell footer__bottom">
          <span>© {new Date().getFullYear()} Martley’s of Portlaoise</span>
          <span>Family-run transport for the Midlands and beyond.</span>
        </div>
      </footer>

      {quoteOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setQuoteOpen(false)}>
          <section
            className="quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close quote form">×</button>
            <p className="eyebrow eyebrow--blue">Request a quote</p>
            <h2 id="quote-title">Let’s plan your journey.</h2>
            <p>Give us a few details and our local team will be in touch.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setQuoteOpen(false);
              }}
            >
              <label>
                Journey type
                <select value={journey} onChange={(event) => setJourney(event.target.value)}>
                  <option>Private hire</option>
                  <option>School travel</option>
                  <option>College commute</option>
                  <option>Wedding</option>
                  <option>Sports / event</option>
                  <option>Accessible transport</option>
                </select>
              </label>
              <label>
                Your name
                <input required placeholder="Name" />
              </label>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
              <label>
                Tell us about the journey
                <textarea required rows="3" placeholder="Dates, group size, destination…" />
              </label>
              <button className="button" type="submit">Send enquiry <Arrow /></button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
