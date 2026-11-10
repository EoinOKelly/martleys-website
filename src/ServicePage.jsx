import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import accessibleImage from './assets/martleys-accessible-travel.webp';
import toursImage from './assets/martleys-road-live.jpg';
import festivalsImage from './assets/martleys-festival-shuttles.webp';
import eventsImage from './assets/martleys-concerts-events.webp';
import collegeImage from './assets/martleys-college-commute.webp';
import CarlowTimetable from './CarlowTimetable';
import './service-pages.css';

export const servicePages = {
  '/accessible-transport/': {
    layout: 'feature',
    title: <>Accessible <em>travel</em></>,
    pageTitle: 'Accessible transport',
    image: accessibleImage,
    imageAlt: 'A Martley’s accessible coach ready for passengers',
    content: ['Martleys is proud to provide a wide range of accessible transport solutions, including specially adapted buses with wheelchair lifts and secure tie-downs that can accommodate up to 11 wheelchair users each, along with additional standard seating. Our fleet of accessible minibuses, buses and coaches is designed to cater to groups of all sizes, with flexible seating configurations ensuring that everyone can travel comfortably and safely. Whether you’re joining us for a scenic tour or arranging private, door-to-door group travel, we aim to make every travel experience seamless, enjoyable, and barrier-free.'],
    points: ['Wheelchair lifts and secure tie-downs', 'Up to 11 wheelchair spaces on selected vehicles', 'Flexible seating for groups and tours'],
    action: { label: 'Ask about accessible travel', type: 'quote', journey: 'Accessible travel' },
  },
  '/tours/': {
    layout: 'feature',
    title: <>Tours</>,
    pageTitle: 'Tours',
    image: toursImage,
    imageAlt: 'Martley’s coach on a scenic tour',
    content: ['Martley’s offers luxury coach hire for guided tours, group holidays, and custom excursions across Ireland, the UK, and continental Europe. Whether you’re organising a multi-day scenic adventure along Ireland’s Wild Atlantic Way, an educational school trip through the UK, or an extended holiday tour into Europe, our modern fleet of 16- to 63-seat coaches delivers exceptional comfort, reliability, and safety. Driven by our team of experienced professional drivers, we handle every detail of your transport so your group can sit back, relax, and focus entirely on creating unforgettable memories along the way.'],
    points: ['Day trips and longer tours', 'Group travel shaped around your itinerary', 'A range of minibuses and coaches'],
    action: { label: 'Plan a tour', type: 'quote', journey: 'Tours' },
  },
  '/festival-shuttles/': {
    layout: 'feature',
    title: <>Festival <em>shuttles</em></>,
    pageTitle: 'Festival shuttles',
    image: festivalsImage,
    imageAlt: 'Festival shuttle passengers travelling together',
    content: ['Martley’s runs shuttles to Electric Picnic, Forest Fest and The Greenfields Festival from Portlaoise, with selected routes from other locations. Services offer return journeys during the event so you can enjoy the day without worrying about parking or driving home. Pickup points, schedules and tickets vary by festival.'],
    points: ['Electric Picnic, Forest Fest and Greenfields', 'Routes from Portlaoise and selected other locations', 'Festival shuttles for organisers'],
    action: { label: 'Ask about a festival shuttle', type: 'quote', journey: 'Concerts & festivals' },
  },
  '/concerts-events/': {
    layout: 'feature',
    title: <>Concerts <em>&amp; events</em></>,
    pageTitle: 'Concerts & events',
    image: eventsImage,
    imageAlt: 'Martley’s concert and event coach',
    content: [
      'Keep an eye on our social media pages for announcements of concert buses travelling from Portlaoise and stopping in key locations along the way!',
    ],
    points: ['Concert buses from Portlaoise', 'Private transport for groups', 'Journey plans tailored to your event'],
  },
  '/carlow-service/': {
    eyebrow: 'Student & commuter bus',
    title: <>A smoother way <em>to Carlow.</em></>,
    pageTitle: 'Carlow commuter service',
    lead: 'A daily connection for students and commuters travelling to Carlow and its colleges.',
    image: collegeImage,
    imageAlt: 'Martley’s commuter coach on the road',
    intro: 'Martley’s provide a comfortable, timely, and affordable daily commuter service to Carlow and Carlow Colleges, with convenient pick-up and drop-off points in Mountmellick, Portlaoise, Stradbally, Arles, Ballickmoyler and Carlow. Designed with students and commuters in mind, our service takes the hassle out of your daily travel to get you where you need to be on time.',
    points: ['Pay on board with cash, credit card, debit card or TFI Leap Card', 'Single, return and weekly fares', 'No online registration or advance ticket purchase'],
    note: 'Need help finding the right stop or understanding a fare? Our Portlaoise team can help before you travel.',
    action: { label: 'View the timetable', type: 'anchor', href: '#carlow-timetable' },
  },
};

function Arrow() { return <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" />; }

function FeatureCopy({ page, onQuote, className = '' }) {
  return <div className={className}>
    <div className="feature-copy__prose">{page.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="feature-copy__aside">
      {page.points?.length > 0 && <ul className="feature-copy__points">{page.points.map((point) => <li key={point}>{point}</li>)}</ul>}
      {page.action && (page.action.type === 'quote'
        ? <button className="button feature-copy__action" type="button" onClick={() => onQuote(page.action.journey)}>{page.action.label} <Arrow /></button>
        : <a className="button feature-copy__action" href={page.action.href}>{page.action.label} <Arrow /></a>)}
    </div>
  </div>;
}

export default function ServicePage({ page, onQuote }) {
  useEffect(() => {
    document.title = page.pageTitle + ' | Martley’s of Portlaoise';
    return () => { document.title = 'Martley’s | Reliable coaches. Friendly service.'; };
  }, [page]);
  const isCarlow = page === servicePages['/carlow-service/'];
  const isFeature = page.layout === 'feature';
  return (
    <main id="top" tabIndex="-1" className="service-page">
      <div className="shell service-page__shell">
        <nav className="service-page__breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{page.pageTitle}</span></nav>
        {isFeature ? <section className="service-feature" aria-labelledby="service-title">
          <div className="service-feature__hero">
            <img src={page.image} alt={page.imageAlt} />
            <span aria-hidden="true" />
            <h1 id="service-title">{page.title}</h1>
          </div>
          <FeatureCopy page={page} onQuote={onQuote} className="service-feature__content" />
        </section> : <>
          <section className="service-page__hero" aria-labelledby="service-title">
            <div className="service-page__hero-copy">
              <p className="service-page__eyebrow">{page.eyebrow}</p>
              <h1 id="service-title" className="h-section">{page.title}</h1>
              <p className="service-page__lead">{page.lead}</p>
              {page.action.type === 'quote'
                ? <button className="button" type="button" onClick={() => onQuote(page.action.journey)}>{page.action.label} <Arrow /></button>
                : <a className="button" href={page.action.href}>{page.action.label} <Arrow /></a>}
            </div>
            <div className="service-page__photo"><img src={page.image} alt={page.imageAlt} /></div>
          </section>
          <section className="service-page__details" aria-label="Service details">
            <div><p className="service-page__eyebrow">The journey</p><h2 className="h-sub">Travel with <em>confidence.</em></h2><p>{page.intro}</p></div>
            <div className="service-page__points">{page.points.map((point, index) => <div key={point}><span>0{index + 1}</span><p>{point}</p></div>)}</div>
          </section>
          {isCarlow && <section id="carlow-timetable" className="service-page__carlow" aria-labelledby="carlow-title">
          <div className="service-page__section-head"><p className="service-page__eyebrow">Plan your trip</p><h2 id="carlow-title" className="h-sub">Fares &amp; <em>timetable.</em></h2><p>Monday to Friday service. Timetable updated 9 September 2026. Pay on board; website booking is no longer required.</p></div>
          <div className="service-page__fares">
            <div className="service-page__fare-table"><table><caption>Carlow commuter fares</caption><thead><tr><th scope="col">Ticket</th><th scope="col">Standard</th><th scope="col">Student / Young Adult Leap</th></tr></thead><tbody>
              <tr><th scope="row">Single</th><td>€12</td><td>€6</td></tr>
              <tr><th scope="row">Return</th><td>€18</td><td>€9</td></tr>
              <tr><th scope="row">Weekly</th><td>€60</td><td>€30</td></tr>
            </tbody></table></div>
            <aside><strong>Paying with a TFI Leap Card?</strong><p>Young Adult cards are for ages 19–25. Student cards are for those aged 16–18 or 26 and over in full-time education or training of at least 15 hours a week. Add Travel Credit before boarding to receive the 50% fare.</p><a href="https://about.leapcard.ie/young-adult-and-student-card-launch">Apply for a Leap Card <Arrow /></a><a href="https://www.leapcard.ie/en/NavigationPages/LoginSelection.aspx">Top up Travel Credit <Arrow /></a></aside>
          </div>
          <CarlowTimetable />
          </section>}
          <aside className="service-page__contact">
            <div><p className="service-page__eyebrow">Need a hand?</p><h2 className="h-sub">Let’s talk about <em>your journey.</em></h2><p>{page.note}</p></div>
            <div className="service-page__contact-actions"><a href="tel:+353578620888">057 862 0888 <Arrow /></a><a href="mailto:info@martleys.com">info@martleys.com <Arrow /></a></div>
          </aside>
        </>}
      </div>
    </main>
  );
}
