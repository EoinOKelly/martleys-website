import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import schoolBusImage from './assets/martleys-school-bus.webp';
import concertImage from './assets/martleys-concerts-events.webp';
import './tickets.css';

// Add another entry here when its booking page is ready.
const ticketTypes = [
  { title: 'School tickets', image: schoolBusImage, href: '/tickets/school/' },
  { title: 'Concert tickets', image: concertImage, href: '/tickets/concert/', badge: 'Page preview' },
];

export default function TicketsLandingPage() {
  useEffect(() => {
    document.title = 'All tickets — Martley’s of Portlaoise';
    return () => { document.title = 'Martley’s — Reliable coaches. Friendly service.'; };
  }, []);

  return (
    <main id="top" tabIndex="-1" className="ticket-index">
      <div className="shell ticket-index__shell">
        <nav className="ticket-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">All tickets</span>
        </nav>
        <header className="ticket-index__intro">
          <p className="school-tickets__eyebrow">Travel with Martley’s</p>
          <h1 className="h-section">Find your <em>ticket.</em></h1>
          <p>Choose the ticket you need to see booking information and available options.</p>
        </header>
        <section aria-label="Ticket types">
          <ul className="ticket-index__grid">
            {ticketTypes.map(({ title, image, href, badge }) => (
              <li key={href}>
                <a className="ticket-index__card" href={href}>
                  <img src={image} alt="" />
                  <span className="ticket-index__card-shade" aria-hidden="true" />
                  {badge && <span className="ticket-index__card-badge">{badge}</span>}
                  <span className="ticket-index__card-content">
                    <strong>{title}</strong>
                    <span className="ticket-index__card-arrow" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.7} /></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
