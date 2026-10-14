import { useEffect } from 'react';
import accessibleImage from './assets/martleys-accessible-travel.webp';
import toursImage from './assets/martleys-the-heath-tour.webp';
import festivalsImage from './assets/martleys-festival-shuttles.webp';
import eventsImage from './assets/martleys-concerts-events.webp';
import collegeImage from './assets/martleys-college-commute.webp';
import './service-pages.css';

const timetableOut = 'https://martleys.com/wp-content/uploads/Martleys-schoolcollege-timetables_page-0001-724x1024.jpg';
const timetableBack = 'https://martleys.com/wp-content/uploads/Martleys-schoolcollege-timetables_page-0002-1-724x1024.jpg';

export const servicePages = {
  '/accessible-transport/': {
    eyebrow: 'Travel for everyone',
    title: <>Accessible <em>transport.</em></>,
    pageTitle: 'Accessible transport',
    lead: 'Comfortable group journeys with access planned around every passenger.',
    image: accessibleImage,
    imageAlt: 'A Martley’s accessible coach ready for passengers',
    intro: 'Our accessible minibuses, buses and coaches offer flexible seating for groups of different sizes. Specially adapted vehicles include wheelchair lifts and secure tie-downs, with capacity for up to 11 wheelchair users on selected buses.',
    points: ['Wheelchair lifts and secure tie-downs', 'Flexible seating for groups', 'Tours and private door-to-door travel'],
    note: 'Tell us about your group, journey and access needs so we can recommend the right vehicle and plan a comfortable trip.',
    action: { label: 'Ask about accessible travel', type: 'quote', journey: 'Accessible travel' },
  },
  '/tours/': {
    eyebrow: 'Explore together',
    title: <>Tours, <em>your way.</em></>,
    pageTitle: 'Tours',
    lead: 'A great day out starts with a journey everyone can enjoy.',
    image: toursImage,
    imageAlt: 'Martley’s coach on a scenic tour',
    intro: 'From local days out to longer trips across Ireland, the UK and Europe, our team can help plan group transport around your itinerary. Tell us where you want to go, how many are travelling and the dates you have in mind.',
    points: ['Day trips and longer tours', 'Group travel shaped around your itinerary', 'A range of minibuses and coaches'],
    note: 'Planning a school outing, club trip or group holiday? We can help you choose the right vehicle and schedule.',
    action: { label: 'Plan a tour', type: 'quote', journey: 'Tours' },
  },
  '/festival-shuttles/': {
    eyebrow: 'Festival travel',
    title: <>Let the good times <em>roll.</em></>,
    pageTitle: 'Festival shuttles',
    lead: 'Leave the parking behind and enjoy the journey there and back.',
    image: festivalsImage,
    imageAlt: 'Festival shuttle passengers travelling together',
    intro: 'Martley’s runs shuttle services for local festivals including Electric Picnic and Forest Fest. Pickup points, schedules and tickets vary by event, so check the current event details before you travel.',
    points: ['Festival journeys from Portlaoise', 'Return travel for selected events', 'Shuttles for festival organisers'],
    note: 'Organising a festival or need a shuttle for your group? Tell us the location, dates and expected passenger numbers.',
    action: { label: 'Ask about a festival shuttle', type: 'quote', journey: 'Concerts & festivals' },
  },
  '/concerts-events/': {
    eyebrow: 'Big nights, easy journeys',
    title: <>Be there for <em>the moment.</em></>,
    pageTitle: 'Concerts & events',
    lead: 'Travel together to the show, and leave the drive home to us.',
    image: eventsImage,
    imageAlt: 'Martley’s concert and event coach',
    intro: 'Look out for Martley’s concert buses travelling from Portlaoise, with stops at selected locations along the way. We also arrange private group transport for concerts, sports fixtures and other events.',
    points: ['Concert buses from Portlaoise', 'Private transport for groups', 'Journey plans tailored to your event'],
    note: 'Planning an event journey? Send the venue, date, passenger count and preferred pickup point to our team.',
    action: { label: 'Plan event travel', type: 'quote', journey: 'Concerts & festivals' },
  },
  '/carlow-service/': {
    eyebrow: 'Student & commuter bus',
    title: <>A smoother way <em>to Carlow.</em></>,
    pageTitle: 'Carlow commuter service',
    lead: 'A daily connection for students and commuters travelling to Carlow and its colleges.',
    image: collegeImage,
    imageAlt: 'Martley’s commuter coach on the road',
    intro: 'Our Carlow service offers convenient pickup and drop-off points for your daily journey. A new timetable began on 7 September 2026. Check the timetable below before you travel.',
    points: ['Pay on the bus with cash, card or TFI Leap Card', 'Single, return and weekly fares', 'No website registration or advance ticket purchase needed'],
    note: 'Young Adult and Student TFI Leap Card holders can receive 50% off these fares. Your card must have Travel Credit available for payment on the bus.',
    action: { label: 'View the timetable', type: 'anchor', href: '#carlow-timetable' },
  },
};

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function ServicePage({ page, onQuote }) {
  useEffect(() => {
    document.title = page.pageTitle + ' — Martley’s of Portlaoise';
    return () => { document.title = 'Martley’s — Reliable coaches. Friendly service.'; };
  }, [page]);
  const isCarlow = page === servicePages['/carlow-service/'];
  return (
    <main id="top" tabIndex="-1" className="service-page">
      <div className="shell service-page__shell">
        <nav className="service-page__breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{page.pageTitle}</span></nav>
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
          <div className="service-page__section-head"><p className="service-page__eyebrow">Plan your trip</p><h2 id="carlow-title" className="h-sub">Fares &amp; <em>timetable.</em></h2><p>Timetable updated 9 September 2026. Pay on board; website booking is no longer required.</p></div>
          <div className="service-page__fares">
            <div className="service-page__fare-table"><table><caption>Carlow commuter fares</caption><thead><tr><th scope="col">Ticket</th><th scope="col">Standard</th><th scope="col">Student / Young Adult Leap</th></tr></thead><tbody>
              <tr><th scope="row">Single</th><td>€12</td><td>€6</td></tr>
              <tr><th scope="row">Return</th><td>€18</td><td>€9</td></tr>
              <tr><th scope="row">Weekly</th><td>€60</td><td>€30</td></tr>
            </tbody></table></div>
            <aside><strong>Using a TFI Leap Card?</strong><p>The Young Adult card is for ages 19–25. Student card eligibility depends on age and full-time study. Top up with Travel Credit before boarding.</p><a href="https://about.leapcard.ie/">Check Leap Card eligibility <Arrow /></a></aside>
          </div>
          <div className="service-page__timetables">
            <a href={timetableOut}><img src={timetableOut} width="724" height="1024" loading="lazy" alt="Carlow commuter timetable, outward journey" /><span>View outward timetable <Arrow /></span></a>
            <a href={timetableBack}><img src={timetableBack} width="724" height="1024" loading="lazy" alt="Carlow commuter timetable, return journey" /><span>View return timetable <Arrow /></span></a>
          </div>
        </section>}
        <aside className="service-page__contact">
          <div><p className="service-page__eyebrow">Need a hand?</p><h2 className="h-sub">Let’s talk about <em>your journey.</em></h2><p>{page.note}</p></div>
          <div className="service-page__contact-actions"><a href="tel:+353578620888">057 862 0888 <Arrow /></a><a href="mailto:info@martleys.com">info@martleys.com <Arrow /></a></div>
        </aside>
      </div>
    </main>
  );
}
