import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './ticket-shell.css';
import TicketPage from './TicketPage';
import Icon from './TicketIcon';
import coachDetailImage from './assets/martleys-detail-live.jpg';
import passengerImage from './assets/martleys-passengers-live.webp';
import collegeCommuteImage from './assets/martleys-college-commute.webp';
import concertsEventsImage from './assets/martleys-concerts-events.webp';
import festivalShuttlesImage from './assets/martleys-festival-shuttles.webp';
import countrysideCoachImage from './assets/martleys-hero.webp';
import accessibleTravelImage from './assets/martleys-accessible-travel.webp';
import coachImage from './assets/martleys-coach-live.jpg';
import martleysLogo from './assets/martleys-logo.png';
import homeVideo from './assets/martleys-hero-1080.mp4';
import homeVideoSmall from './assets/martleys-hero-720.mp4';
import schoolBusImage from './assets/martleys-school-bus.webp';
import publicRoutesImage from './assets/martleys-public-routes.webp';
import heathImage from './assets/martleys-the-heath-tour.webp';
import fleetImage1 from './assets/martleys-fleet-01.webp';
import fleetImage2 from './assets/martleys-fleet-02.webp';
import fleetImage3 from './assets/martleys-fleet-03.webp';
import fleetImage4 from './assets/martleys-fleet-04.webp';
import fleetImage5 from './assets/martleys-fleet-05.webp';
import fleetImage6 from './assets/martleys-fleet-06.webp';
import fleetImage7 from './assets/martleys-fleet-07.webp';

const routes = [
  ['821', 'Newbridge — Sallins Rail Station'],
  ['834', 'Portlaoise — Roscrea'],
  ['880', 'Carlow — Naas'],
  ['883', 'Athy — Newbridge'],
  ['892', 'Dunlavin — Newbridge'],
  ['2343', 'Borris-in-Ossory — Mount Lucas'],
];

const routeTimetables = {
  '821': 'https://www.transportforireland.ie/wp-content/uploads/2024/08/TFI-LL-KSD-R821-V1.pdf',
  '834': 'https://martleys.com/wp-content/uploads/834-Portlaoise-to-Roscrea-4pp-10Feb25-ONLINE.pdf',
  '883': 'https://www.transportforireland.ie/wp-content/uploads/2020/10/newbridgetoathyjune18.pdf',
  '892': 'https://martleys.com/wp-content/uploads/TFI-LL-DSL-R892-FA2-WEB.pdf',
  '2343': 'https://martleys.com/wp-content/uploads/2343-Borris-In-Ossory-to-Mount-Lucas-ONLINE.pdf',
};

const services = [
  { title: 'School transport', copy: 'Safe, trusted daily school runs around Portlaoise and Mountrath.', image: schoolBusImage, pos: 'center 58%', href: '#school' },
  { title: 'College commute', copy: 'Reliable travel to Carlow colleges for students and commuters.', image: passengerImage, pos: '50% center', href: '#college' },
  { title: 'Tours', copy: 'Tours within Ireland, or travel with us to Europe and the UK.', image: heathImage, pos: '60% center', href: '#tours' },
  { title: 'Public routes', copy: 'Comfortable local connections in partnership with NTA and TFI Local Link.', image: publicRoutesImage, pos: 'center', href: '#routes' },
  { title: 'Private hire', copy: 'Your group, your plan—from minibuses to a full coach.', image: coachImage, pos: 'center', href: '#private' },
  { title: 'Concerts & events', copy: 'Easy rides to Aviva, Croke Park, 3Arena and more.', image: concertsEventsImage, pos: '60% center', href: 'https://martleys.com/festivals-concerts/' },
  { title: 'Festival shuttles', copy: 'To and from Electric Picnic, Forest Fest and local festivals.', image: festivalShuttlesImage, pos: '80% center', href: 'https://martleys.com/festivals-concerts/' },
  { title: 'Accessible travel', copy: 'Wheelchair-adapted coaches so more people can go further.', image: accessibleTravelImage, pos: 'center', href: 'https://martleys.com/accessible-transport/' },
];

const serviceGroups = [
  { title: 'Everyday travel', services: ['School transport', 'College commute', 'Public routes', 'Accessible travel'] },
  { title: 'Trips & occasions', services: ['Private hire', 'Tours', 'Concerts & events', 'Festival shuttles'] },
].map((group) => ({ ...group, services: group.services.map((title) => services.find((service) => service.title === title)) }));

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
  {
    quote: 'We booked Martleys for a late night event here, where we needed a shuttle service for corporate guests and friends from our countryside location. We wanted a little flexibility for time and were unsure of seat numbers. From our early conversations in arranging this we felt at ease in Martley’s hands. Our driver arrived early, fully prepared for the unknowns. He waited until the seats were filled and drove everyone to their preferred stop. It was a perfect ending to a great night here for all our guests. Huge thanks Martleys - you took away our concerns and serviced with a simile.',
    name: 'Gillian Reidy, Director, Designer — Penhouse',
  },
  {
    quote: 'HUGE THANK YOU for another fabulous EP experience with your service! Your driver truly is such a gem to work with, and so accommodating. Please pass on our gratitude for taking such great care of the group across the weekend! We had some new additions at the festival this year, and having such a reliable service made the experience seamless for everyone.',
    name: 'Kaitlin Chandler, Sponsorship and Brand Activation Specialist — Three Ireland',
  },
  {
    quote: 'On behalf of the Electric Picnic Residents Committee, I just wanted to say a massive thank you to everyone at Martley’s for your incredible help with our Residents’ Social Night. We had originally arranged two buses, but we were absolutely inundated with people on the night and quickly realised we needed another one. When we called looking for help, a third bus arrived within ten minutes, which was absolutely brilliant and very much appreciated. The whole night was a huge success, and having the buses available made such a difference. Your flexibility and willingness to help us at such short notice really helped everything run smoothly. Please pass on our thanks to everyone involved, particularly the drivers. We genuinely appreciate your support and everything you did to help make the night such a success. A massive thank you from all of us!',
    name: 'Kellie Kearney, Public Relations Officer — Electric Picnic Residents Committee',
  },
  {
    quote: 'Martleys buses provide an excellent friendly and reliable service. I could not recommend them enough.',
    name: "St. Mary’s C.B.S. Portlaoise",
  },
  {
    quote: 'We use Martleys of Portlaoise for all our school transportation needs. Martleys are punctual, reliable, efficient, competitive and most importantly of all safe.',
    name: 'Gaelscoil Phortlaoise',
  },
];

// Switch this off, or update its copy and link, between major events.
const activeEventNotice = {
  enabled: true,
  label: 'Festival travel',
  message: 'Electric Picnic and Forest Fest updates',
  href: '#travel-updates',
};

const highlightNotice = {
  label: 'School registrations',
  message: 'Now open for the new term',
  href: 'https://martleys.com/schools-colleges/',
};

const schoolReviews = reviews.filter((review) => /St\. Mary|Gaelscoil Phortlaoise|school transportation needs/i.test(review.name + review.quote));
const otherReviews = reviews.filter((review) => !schoolReviews.includes(review));

function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

function Mark({ light = false }) {
  return (
    <a className={`mark ${light ? 'mark--light' : ''}`} href="/#top" aria-label="Martley's home">
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

function Reveal({ children, className = '' }) {
  return <div className={`reveal is-visible ${className}`}>{children}</div>;
}

function Review({ review }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const quote = useRef(null);

  // Only offer "Read full story" when the quote is actually cut off at this width.
  useEffect(() => {
    const element = quote.current;
    const measure = () => {
      if (!element.classList.contains('is-expanded')) setClamped(element.scrollHeight > element.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <blockquote ref={quote} className={expanded ? 'is-expanded' : ''}>“{review.quote}”</blockquote>
      {(clamped || expanded) && (
        <button className="review__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Read full story'}
        </button>
      )}
      <figcaption>{review.name}</figcaption>
    </>
  );
}

function containDialogFocus(event) {
  if (event.key !== 'Tab') return;
  const controls = [...event.currentTarget.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select, textarea, summary')]
    .filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}

const sitePages = /^\/(?:(?:tickets|careers)\/?)?$/;
const isSamePage = (a, b) => a.pathname === b.pathname && a.search === b.search;

function scrollToLocation(url, savedScroll, behavior) {
  const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (savedScroll != null) window.scrollTo({ top: savedScroll, behavior });
  else if (target) target.scrollIntoView({ behavior });
  else window.scrollTo({ top: 0, behavior });
}

// Moves between the homepage, tickets and careers without reloading, so the header
// stays in place while the page beneath it cross-fades.
function useSiteLocation(beforeChange) {
  const [location, setLocation] = useState(() => ({ pathname: window.location.pathname, search: window.location.search }));

  useEffect(() => {
    history.scrollRestoration = 'manual';
    let shown = new URL(window.location.href);
    const saveScroll = () => history.replaceState({ ...history.state, scroll: window.scrollY }, '');

    const show = (url, savedScroll) => {
      if (isSamePage(url, shown)) {
        scrollToLocation(url, savedScroll);
        return;
      }
      shown = url;
      const update = () => {
        flushSync(() => {
          beforeChange();
          setLocation({ pathname: url.pathname, search: url.search });
        });
        scrollToLocation(url, savedScroll, 'instant');
      };
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(update);
      } else {
        update();
      }
    };

    const onClick = (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || !sitePages.test(url.pathname)) return;
      saveScroll();
      if (isSamePage(url, window.location)) return;
      event.preventDefault();
      history.pushState(null, '', url);
      show(url);
    };
    const onPopState = (event) => show(new URL(window.location.href), event.state?.scroll);

    // Capture, so links inside dialogs that stop propagation are still handled.
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pagehide', saveScroll);
    if (history.state?.scroll != null) scrollToLocation(shown, history.state.scroll, 'instant');
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pagehide', saveScroll);
    };
  }, []);

  return location;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesShown, setServicesShown] = useState(false);
  const location = useSiteLocation(() => {
    setMenuOpen(false);
    setQuoteOpen(false);
    setServicesOpen(false);
  });
  const isTicketPage = /^\/tickets\/?$/.test(location.pathname);
  const isCareersPage = /^\/careers\/?$/.test(location.pathname);
  const isHomePage = !isTicketPage && !isCareersPage;
  const homeLink = (anchor) => isTicketPage || isCareersPage ? `/${anchor}` : anchor;
  const [journey, setJourney] = useState('Private hire');
  const [fleetIndex, setFleetIndex] = useState(0);
  const [showActionBar, setShowActionBar] = useState(false);
  const [quoteSent, setQuoteSent] = useState(null);
  const heroActions = useRef(null);
  const menuDialog = useRef(null);
  const quoteDialog = useRef(null);
  const servicesMenu = useRef(null);
  const servicesTimer = useRef();
  const servicesHoveredOpen = useRef(0);

  const fleetImages = [
    { src: fleetImage1, alt: 'Martley’s accessible coach with passenger lift', label: 'Accessible travel' },
    { src: fleetImage2, alt: 'Comfortable seats inside a Martley’s coach', label: 'Coach interiors' },
    { src: fleetImage3, alt: 'A Martley’s coach viewed from the front', label: 'Modern coaches' },
    { src: fleetImage4, alt: 'A Martley’s coach interior with rows of seats', label: 'Comfortable interiors' },
    { src: fleetImage5, alt: 'A Martley’s coach interior viewed from the rear', label: 'Room for your group' },
    { src: fleetImage6, alt: 'A Martley’s coach viewed through a passenger window', label: 'Fleet details' },
    { src: fleetImage7, alt: 'A Martley’s coach outside the depot', label: 'Our fleet' },

  ];

  const openQuote = (type = journey) => {
    setJourney(type);
    setQuoteSent(null);
    setMenuOpen(false);
    setQuoteOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const serviceLink = (href) => href.startsWith('#') ? homeLink(href) : href;

  // The services menu opens on hover for mouse users and on click or keyboard for everyone.
  const hoverServices = (event, open) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(servicesTimer.current);
    servicesTimer.current = setTimeout(() => {
      if (open) servicesHoveredOpen.current = Date.now();
      setServicesOpen(open);
    }, open ? 90 : 200);
  };
  const toggleServices = () => {
    clearTimeout(servicesTimer.current);
    // A click straight after hover-opening shouldn't snap the menu shut again.
    if (servicesOpen && Date.now() - servicesHoveredOpen.current < 600) return;
    setServicesOpen(!servicesOpen);
  };
  const closeServices = () => {
    clearTimeout(servicesTimer.current);
    setServicesOpen(false);
  };

  useEffect(() => {
    if (!servicesOpen) return undefined;
    setServicesShown(true);
    const onPointerDown = (event) => {
      if (!servicesMenu.current.contains(event.target)) setServicesOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (servicesMenu.current.contains(document.activeElement)) servicesMenu.current.querySelector('button').focus();
      setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  // On phones, keep quote and call actions in reach once the hero's own buttons scroll away.
  useEffect(() => {
    if (!isHomePage || !heroActions.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setShowActionBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(heroActions.current);
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || quoteOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, quoteOpen]);

  useEffect(() => {
    for (const [dialog, open] of [[menuDialog.current, menuOpen], [quoteDialog.current, quoteOpen]]) {
      if (open && !dialog.open) dialog.showModal();
      if (!open && dialog.open) dialog.close();
    }
  }, [menuOpen, quoteOpen]);

  return (
    <>
      <a className="skip-link" href="#top">Skip to main content</a>
      <div className="topbar">
        <div className="shell topbar__inside">
          <div className="topbar__notices">
            {[activeEventNotice.enabled && activeEventNotice, highlightNotice].filter(Boolean).map((notice) => (
              <a key={notice.label} className="topbar__notice" href={serviceLink(notice.href)}>
                <strong>{notice.label}</strong>
                <span className="topbar__notice-text">{notice.message}</span>
                <Arrow />
              </a>
            ))}
          </div>
          <a className="topbar__phone" href="tel:+353578620888">
            <Icon name="phone" />
            <small>Call us</small> 057 862 0888
          </a>
        </div>
      </div>

      <header className="header">
        <div className="shell header__inside">
          <Mark />
          <nav className="nav" aria-label="Primary navigation">
            <div className="nav__services" ref={servicesMenu}
              onPointerEnter={(event) => hoverServices(event, true)}
              onPointerLeave={(event) => hoverServices(event, false)}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeServices(); }}>
              <button type="button" className="nav__link" aria-expanded={servicesOpen} aria-controls="services-menu"
                onClick={toggleServices}>
                Services <Icon name="chevron" className="nav__chevron" />
              </button>
              <div id="services-menu" className="mega" data-open={servicesOpen || undefined} inert={!servicesOpen}>
                <div className="shell mega__inside">
                  {serviceGroups.map((group) => (
                    <div key={group.title} className="mega__group">
                      <p>{group.title}</p>
                      <ul>
                        {group.services.map((service) => (
                          <li key={service.title}>
                            <a href={serviceLink(service.href)} onClick={closeServices}>
                              <strong>{service.title}</strong>
                              <span>{service.copy}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <aside className="mega__feature" aria-labelledby="mega-feature-title">
                    {servicesShown && <img className="mega__feature-image" src={coachImage} alt="A Martley’s coach ready for a private hire" />}
                    <p id="mega-feature-title" className="mega__feature-title">Planning a group trip?</p>
                    <p>Weddings, clubs, corporate days and airport runs, planned with you by our Portlaoise team.</p>
                    <div className="mega__feature-actions">
                      <button className="button" type="button" onClick={() => { closeServices(); openQuote('Private hire'); }}>Get a quote <Arrow /></button>
                      <a className="mega__all" href={homeLink('#services')} onClick={closeServices}>All services <Arrow /></a>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
            <a className="nav__link" href={homeLink('#school')}>Schools &amp; colleges</a>
            <a className="nav__link" href={homeLink('#routes')}>Public routes</a>
            <a className="nav__link" href={homeLink('#fleet')}>Fleet</a>
            <a className="nav__link" href={homeLink('#about')}>About</a>
            <a className="nav__link" href="/careers/" aria-current={isCareersPage ? 'page' : undefined}>Careers</a>
            <a className="nav__link" href={homeLink('#contact')}>Contact</a>
          </nav>
          <div className="header__actions">
            <a className="header__tickets" href="/tickets/" aria-current={isTicketPage ? 'page' : undefined}>
              <Icon name="event" /> Buy tickets
            </a>
            <button className="header__quote" type="button" onClick={() => openQuote()}>Get a quote <Arrow /></button>
          </div>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i /><i />
          </button>
        </div>
      </header>

      <dialog ref={menuDialog} id="mobile-navigation" className="drawer-backdrop"
        onKeyDown={containDialogFocus}
        aria-label="Site navigation" onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClose={closeMenu} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
          <nav className="drawer" aria-label="Mobile navigation" onClick={(event) => event.stopPropagation()}>
            <div className="drawer__top">
              <Mark light />
              <button type="button" className="drawer__close" onClick={closeMenu} aria-label="Close menu">×</button>
            </div>
            <div className="drawer__links">
              <details className="drawer__services">
                <summary>Services</summary>
                <div className="drawer__service-links">
                  <a href={homeLink('#school')} onClick={closeMenu}>School transport</a>
                  <a href={homeLink('#college')} onClick={closeMenu}>College commute</a>
                  <a href={homeLink('#tours')} onClick={closeMenu}>Tours</a>
                  <a href={homeLink('#routes')} onClick={closeMenu}>Public routes</a>
                  <a href={homeLink('#private')} onClick={closeMenu}>Private hire</a>
                  <a href="https://martleys.com/festivals-concerts/" onClick={closeMenu}>Concerts &amp; events</a>
                  <a href="https://martleys.com/accessible-transport/" onClick={closeMenu}>Accessible transport</a>
                </div>
              </details>
              <a href={homeLink('#fleet')} onClick={closeMenu}>Our fleet</a>
              <a href={homeLink('#about')} onClick={closeMenu}>About</a>
              <a href="/careers/" onClick={closeMenu}>Careers</a>
              <a href={homeLink('#travel-updates')} onClick={closeMenu}>Travel updates</a>
              <a href="/tickets/" onClick={closeMenu}>Buy tickets</a>
              <a href={homeLink('#contact')} onClick={closeMenu}>Contact</a>
            </div>
            <button className="button button--sky" onClick={() => openQuote()}>Get a quote <Arrow /></button>
            <a className="drawer__phone" href="tel:+353578620888">057 862 0888</a>
          </nav>
      </dialog>

      <div className={isTicketPage ? 'ticket-site' : isHomePage ? 'home-site' : undefined}>
      {isTicketPage ? <TicketPage key={location.search} /> : isCareersPage ? <main id="top" tabIndex="-1" className="careers-page">
        <section className="intro">
          <div className="shell intro__grid">
            <Reveal>
              <p className="eyebrow eyebrow--blue">Careers</p>
              <h1>Come work with Martley’s.</h1>
            </Reveal>
            <Reveal delay={80}>
              <p>Interested in joining our team? Send us a note with a little about yourself and the kind of work you’re looking for.</p>
              <a className="button" href="mailto:info@martleys.com?subject=Careers%20enquiry">Make a careers enquiry <Arrow /></a>
            </Reveal>
          </div>
        </section>
      </main> : <main id="top" tabIndex="-1" className="home">
        <section className="hero">
          <video className="hero__image" poster={countrysideCoachImage} autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src={homeVideoSmall} type="video/mp4" media="(max-width: 740px)" />
            <source src={homeVideo} type="video/mp4" />
          </video>
          <div className="hero__scrim" />
          <div className="shell hero__content">
            <div className="hero__copy">
              <p className="hero__brand">Martley’s of Portlaoise</p>
              <h1>Reliable coaches.<br /><em>Friendly service.</em></h1>
              <p className="hero__lead">The trusted local travel partner for the Midlands and beyond.</p>
              <div className="hero__actions" ref={heroActions}>
                <button className="button button--sky" type="button" onClick={() => openQuote()}>Get a quote <Arrow /></button>
                <a className="hero__text-action" href="/tickets/?service=school">Buy school tickets <Arrow /></a>
                <a className="hero__text-action" href="/tickets/?service=college">Buy college commute tickets <Arrow /></a>
              </div>
            </div>
          </div>
          <a className="hero__scroll" href="#services" aria-label="Explore Martley's services">
            <span>Explore</span>
            <i />
          </a>
        </section>

        <section id="services" className="services">
          <div className="shell">
            <div className="section-head">
              <h2 className="h-tier1">Every kind of journey,<br />handled with care.</h2>
              <p>School mornings, daily commutes, tours, match days, celebrations and weekend festivals. Choose the service that fits, then leave the road to us.</p>
            </div>
            <ul className="service-grid">
              {services.map((service) => (
                <li key={service.title} className="service-tile">
                  <a id={service.title === 'Tours' ? 'tours' : undefined} href={service.href}>
                    <img src={service.image} loading="lazy" alt="" style={{ objectPosition: service.pos }} />
                    <span className="service-tile__shade" />
                    <span className="service-tile__content">
                      <strong>{service.title}</strong>
                      <em>{service.copy}</em>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="school" className="school">
          <div className="shell school__grid">
            <div className="school__image">
              <img src={schoolBusImage} alt="Red school bus outside a school" loading="lazy" />
            </div>
            <div className="school__copy">
              <h2 className="h-tier1">Every school day starts <em>well.</em></h2>
              <p>
                For generations, local families and schools have trusted Martley’s to transport their children safely. We operate daily school runs around Portlaoise and Mountrath, and work directly with teachers and coordinators to tailor transport for school tours and outings, giving parents, teachers and students peace of mind, every day.
              </p>
              <ul className="checklist">
                <li>All Portlaoise schools and Mountrath Community School</li>
                <li>School runs serving all Portlaoise housing estates</li>
                <li>Licensed National Transport Authority school services</li>
                <li>Fully RSA compliant buses and drivers</li>
                <li>Garda-vetted drivers and escorts</li>
                <li>Comfortable, clean and regularly serviced vehicles</li>
                <li>Seatbelts across the fleet</li>
                <li>Daily, weekly, term and annual ticket options, with sibling discounts</li>
              </ul>
              <div className="actions">
                <a className="button" href="https://martleys.com/schools-colleges/">Register a student <Arrow /></a>
                <a className="inline-link" href="/tickets/?service=school">Buy school tickets <Arrow /></a>
              </div>
            </div>
          </div>
          <div className="shell school__reasons">
            <h3 className="h-tier3">Trusted by schools and parents across the Midlands.</h3>
            <div className="review-grid review-grid--pair">
              {schoolReviews.map((review) => (
                <figure key={review.name} className="review"><Review review={review} /></figure>
              ))}
            </div>
          </div>
        </section>

        <section id="college" className="college">
          <div className="shell college__grid">
            <div className="college__copy">
              <h2 className="h-tier2">A better start to <em>your day.</em></h2>
              <p>We provide a comfortable, reliable and affordable daily commuter service to South East Technological University (SETU), Carlow Institute (CIT) and Carlow College St Patrick’s, with convenient pick-up and drop-off points to suit your schedule. Designed with students and commuters in mind, our service makes the journey stress-free.</p>
              <ul className="checklist checklist--single">
                <li>50% off for Young Adult Leap Card (YAC) holders</li>
                <li>Single, return and weekly ticket options</li>
                <li>Fully RSA compliant buses and drivers</li>
                <li>Comfortable, clean and regularly serviced vehicles</li>
              </ul>
              <div className="actions">
                <a className="button" href="https://martleys.com/schools-colleges/">View timetable <Arrow /></a>
                <a className="inline-link" href="/tickets/?service=college">Buy college commute tickets <Arrow /></a>
                <a className="inline-link" href="https://martleys.com/schools-colleges/">Register a student <Arrow /></a>
              </div>
            </div>
            <div className="college__image">
              <img src={collegeCommuteImage} alt="Martley’s driver at the wheel on a commuter journey" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="private" className="hire">
          <div className="hire__media">
            <img src={fleetImage3} alt="A Martley’s coach viewed from the front" loading="lazy" />
          </div>
          <div className="hire__copy">
            <h2 className="h-tier1">Big days.<br />Small details.<br /><em>One good journey.</em></h2>
            <p>
              Corporate travel, weddings, sports clubs, airport transfers, concerts and local festivals—
              tell us the destination, dates and numbers, and we’ll shape a clear plan before anyone boards.
            </p>
            <dl className="hire-grid">
              {hireTypes.map(([title, copy]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{copy}</dd>
                </div>
              ))}
            </dl>
            <button className="button" type="button" onClick={() => openQuote('Private hire')}>Start a private hire quote <Arrow /></button>
          </div>
        </section>

        <section id="routes" className="routes">
          <div className="shell routes__grid">
            <div className="routes__intro">
              <h2 className="h-tier2">Right on<br />your route.</h2>
              <p>We proudly operate a network of public service routes in partnership with the National Transport Authority (NTA) and TFI Local Link.</p>
              <a className="button button--outline" href="https://martleys.com/public-service-routes/">See all timetables <Arrow /></a>
            </div>
            <div className="route-board">
              <p className="route-board__head">Current services</p>
              <ul>
                {routes.map(([number, name]) => (
                  <li key={number}>
                    <a href={routeTimetables[number] || 'https://martleys.com/carlow-to-naas-880/'}>
                      <strong>{number}</strong>
                      <span>{name}</span>
                      {routeTimetables[number] && <small>PDF timetable</small>}
                      <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="travel-updates" className="updates">
          <div className="shell updates__inner">
            <h2 className="h-tier3">Concerts, festivals and service news.</h2>
            <p>Find ticket links, pickup points, times and important travel information for upcoming events.</p>
            <a className="button button--outline" href="https://martleys.com/festivals-concerts/">View latest updates <Arrow /></a>
          </div>
        </section>

        <section id="fleet" className="fleet">
          <div className="shell fleet__top">
            <div>
              <h2 className="h-tier2">A bus for everyone,<br />however you travel.</h2>
              <p>Clean, comfortable and well maintained—whatever the occasion, we’ve got a vehicle that fits. From cosy minibuses for small groups to spacious premium coaches for bigger crowds, along with specially adapted wheelchair-accessible buses carrying up to 11 wheelchair passengers each, everyone can travel together.</p>
            </div>
            <div className="fleet__facilities">
              <p>Onboard facilities</p>
              <ul>
                {facilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="shell fleet__showcase">
            <div className="fleet__stage">
              <img src={fleetImages[fleetIndex].src} alt={fleetImages[fleetIndex].alt} />
              <div className="fleet__stage-bar">
                <span aria-live="polite">{fleetImages[fleetIndex].label} <small>{fleetIndex + 1} / {fleetImages.length}</small></span>
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
            </div>
            <dl className="fleet__stats">
              <div><dt>60+</dt><dd>years of local experience</dd></div>
              <div><dt>16–63</dt><dd>seats for every group size</dd></div>
              <div><dt>11</dt><dd>wheelchair passengers on adapted coaches</dd></div>
            </dl>
          </div>
          <div className="shell fleet__cta">
            <button className="button" type="button" onClick={() => openQuote('Private hire')}>Enquire about the fleet <Arrow /></button>
          </div>
        </section>

        <section id="about" className="about">
          <div className="shell about__head">
            <h2 className="h-tier2">Connecting people has been at the heart of what we do for over 60 years.</h2>
            <p>
              Martley’s of Portlaoise is a family-run transport business, established and serving the Midlands for over 60 years.
              From licensed school routes to private hire, concerts, festivals and accessible coaches—we keep every journey clear, calm and on time.
            </p>
          </div>
          <div className="shell about__visual">
            <img src={coachDetailImage} alt="Detail of a Martley's coach" loading="lazy" />
          </div>
          <div className="shell about__body">
            <h3 className="h-tier3">Proudly local, proudly family run—but it’s our team that gets you there.</h3>
            <div>
              <p>
                Martley’s is a family business at heart, but it’s our team that makes every journey happen. Experienced drivers know the roads and routes inside out. Skilled mechanics keep every coach in top condition, day in and day out. Friendly staff are on the other end of the phone, ready to answer your questions.
              </p>
              <p>
                Whether it’s a daily school run or a once-in-a-lifetime celebration, that team treats every journey with the same care: safe vehicles, trusted drivers, and people who know exactly what they’re doing.
              </p>
            </div>
          </div>
        </section>

        <section className="trust" aria-labelledby="testimonials-title">
          <div className="shell">
            <h2 id="testimonials-title" className="h-tier3">Good journeys, remembered.</h2>
            <div className="review-grid">
              {otherReviews.map((review) => (
                <figure key={review.name} className="review"><Review review={review} /></figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="shell contact__inner">
            <div>
              <p className="contact__lead">Start with a simple hello.</p>
              <h2 className="h-tier1">Where can we take you?</h2>
            </div>
            <div className="contact__actions">
              <p>Tell us your destination, group size and dates. We’ll come back with a clear, tailored plan.</p>
              <button className="button" type="button" onClick={() => openQuote()}>Request a quote <Arrow /></button>
              <a href="tel:+353578620888">Or call <strong>057 862 0888</strong></a>
            </div>
          </div>
        </section>
      </main>}

      {isHomePage && (
        <div className="action-bar" data-visible={showActionBar || undefined} inert={!showActionBar}>
          <a className="action-bar__call" href="tel:+353578620888"><Icon name="phone" /> Call us</a>
          <button className="button" type="button" onClick={() => openQuote()}>Get a quote <Arrow /></button>
        </div>
      )}

      <footer className="footer">
        <div className="shell footer__grid">
          <div className="footer__brand">
            <Mark light />
            <p>{isTicketPage ? 'Family-run coach travel from Portlaoise. Familiar roads, experienced drivers and a welcome on board.' : 'A large range of excellently maintained buses and coaches, driven by experienced, capable and responsible drivers.'}</p>
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
            <a href="/tickets/">Buy tickets</a>
            <a href="https://martleys.com/public-service-routes/">Timetables</a>
            <a href="https://martleys.com/schools-colleges/">Schools &amp; colleges</a>
            <a href="https://martleys.com/accessible-transport/">Accessible transport</a>
            <a href="/careers/">Careers</a>
          </div>
        </div>
        <div className="shell footer__bottom">
          <span>© {new Date().getFullYear()} Martley’s of Portlaoise</span>
          <span>Family-run transport for the Midlands and beyond.</span>
        </div>
      </footer>

      <dialog ref={quoteDialog} className="quote-modal" aria-labelledby="quote-title"
        onKeyDown={containDialogFocus}
        onCancel={(event) => { event.preventDefault(); setQuoteOpen(false); }}
        onClose={() => setQuoteOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setQuoteOpen(false);
        } }}>
          <section>
            <button className="modal-close" onClick={() => setQuoteOpen(false)} aria-label="Close quote form">×</button>
            <p className="eyebrow eyebrow--blue">Request a quote</p>
            <h2 id="quote-title">Let’s plan your journey.</h2>
            <p>Give us a few details and our local team will be in touch.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const subject = encodeURIComponent(`Website enquiry: ${journey}`);
                const body = encodeURIComponent(
                  `Journey type: ${journey}\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPassengers: ${data.get('passengers')}\nTravel to and from: ${data.get('travel-route')}\nTravel dates: ${data.get('travel-dates')}\nPick-up location: ${data.get('pickup-location')}\n\nJourney details:\n${data.get('details')}`,
                );
                // Keep the form open and filled in: if no email app opens, nothing typed is lost.
                const mailto = `mailto:info@martleys.com?subject=${subject}&body=${body}`;
                setQuoteSent(mailto);
                window.location.href = mailto;
              }}
            >
              <label>
                Journey type
                <select value={journey} onChange={(event) => setJourney(event.target.value)}>
                  <option>Private hire</option>
                  <option>School travel</option>
                  <option>College commute</option>
                  <option>Tours</option>
                  <option>Wedding</option>
                  <option>Corporate</option>
                  <option>Sports / event</option>
                  <option>Concerts &amp; festivals</option>
                  <option>Accessible transport</option>
                </select>
              </label>
              <label>
                Your name
                <input name="name" required autoComplete="name" autoFocus placeholder="Name" />
              </label>
              <label>
                Email address
                <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" />
              </label>
              <label>
                Number of passengers
                <input name="passengers" type="number" inputMode="numeric" min="1" max="500" placeholder="Approximate group size" />
              </label>
              <label>
                Travel to and from
                <input name="travel-route" placeholder="From and destination" />
              </label>
              <label>
                Travel dates
                <input name="travel-dates" placeholder="Dates or date range" />
              </label>
              <label>
                Pick-up location
                <input name="pickup-location" placeholder="Town, address or venue" />
              </label>
              <label>
                Tell us about the journey
                <textarea name="details" required rows="3" placeholder="Dates, group size, destination…" />
              </label>
              <button className="button" type="submit">Continue by email <Arrow /></button>
              {quoteSent && (
                <p className="quote-status" role="status">
                  Your email app should open with your enquiry ready to send. If it didn’t, <a href={quoteSent}>try again</a>,
                  email <a href="mailto:info@martleys.com">info@martleys.com</a> or call <a href="tel:+353578620888">057 862 0888</a>.
                </p>
              )}
            </form>
          </section>
      </dialog>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
