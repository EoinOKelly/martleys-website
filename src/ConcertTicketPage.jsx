import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import concertImage from './assets/martleys-concerts-events.webp';
import './concert-tickets.css';

// Replace this sample with the next event's details before opening bookings.
const event = {
  artist: 'Ne-Yo & Akon',
  venue: '3Arena, Dublin',
  dates: [
    { label: 'Thursday 23 April', value: '2026-04-23' },
    { label: 'Friday 24 April', value: '2026-04-24' },
    { label: 'Saturday 25 April', value: '2026-04-25' },
  ],
  stops: [
    { time: '16:30', name: 'Maldron Hotel', town: 'Portlaoise' },
    { time: '16:40', name: 'JFL Avenue', town: 'Portlaoise', note: 'Stop 155251' },
    { time: '16:55', name: 'The Killeshin Hotel', town: 'Portlaoise' },
    { time: '17:00', name: 'Kilminchy, Dublin Road Eastbound', town: 'Portlaoise', note: 'Stop 11241' },
    { time: '17:20', name: 'Junction 14 Mayfield Services', town: 'Monasterevin', note: 'Stop 14755' },
  ],
  arrival: '18:35',
  returnTime: '23:59',
  returnStop: 'North Wall Quay, bus lane outside The Mayson Hotel',
  returnStopId: 'Stop 13174',
  fare: 35,
};

const euro = (value) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function ConcertTicketPage() {
  const [date, setDate] = useState(event.dates[0].value);
  const [stop, setStop] = useState('');
  const [quantity, setQuantity] = useState(1);
  const selectedDate = event.dates.find((item) => item.value === date);
  const selectedStop = event.stops.find((item) => item.name === stop);

  useEffect(() => {
    document.title = `Concert ticket preview — ${event.artist} | Martley’s`;
    return () => { document.title = 'Martley’s — Reliable coaches. Friendly service.'; };
  }, []);

  return (
    <main id="top" tabIndex="-1" className="concert-ticket">
      <div className="shell concert-ticket__shell">
        <nav className="ticket-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><a href="/tickets/">All tickets</a><span aria-hidden="true">/</span><span aria-current="page">Concert tickets</span>
        </nav>

        <div className="concert-ticket__hero">
          <div className="concert-ticket__hero-copy">
            <span className="concert-ticket__status">Sample page · Bookings closed</span>
            <p className="concert-ticket__eyebrow">Return coach travel · Portlaoise to Dublin</p>
            <h1>{event.artist}<br /><em>Enjoy the journey.</em></h1>
            <p className="concert-ticket__hero-lead">Bus travel to <strong>{event.artist}</strong> at the {event.venue}. Choose a pickup point, travel together and leave the late drive home to us.</p>
            <div className="concert-ticket__hero-facts">
              <div><span>Event</span><strong>23–25 April 2026</strong></div>
              <div><span>Destination</span><strong>{event.venue}</strong></div>
              <div><span>Return fare</span><strong>{euro(event.fare)} per person</strong></div>
            </div>
          </div>
          <div className="concert-ticket__hero-image"><img src={concertImage} alt="Martley’s coaches ready for event passengers" fetchPriority="high" /></div>
        </div>

        <div className="concert-ticket__layout">
          <div className="concert-ticket__content">
            <section className="concert-ticket__section" aria-labelledby="journey-title">
              <p className="concert-ticket__eyebrow">Your journey</p>
              <h2 id="journey-title" className="h-sub">From the Midlands <em>to the music.</em></h2>
              <p>For this sample event, the coach picked up in Portlaoise and Monasterevin before travelling to Dublin. The outbound journey was scheduled to arrive at the 3Arena at 18:35.</p>
              <div className="concert-ticket__route">
                <div><span className="concert-ticket__route-dot" /><strong>Portlaoise</strong><small>Four pickup points</small></div>
                <div><span className="concert-ticket__route-dot" /><strong>Monasterevin</strong><small>Junction 14 Mayfield Services</small></div>
                <div><span className="concert-ticket__route-dot" /><strong>3Arena, Dublin</strong><small>Arrive 18:35</small></div>
              </div>
            </section>

            <section className="concert-ticket__section" aria-labelledby="timetable-title">
              <p className="concert-ticket__eyebrow">Plan your trip</p>
              <h2 id="timetable-title" className="h-sub">Pickup <em>times.</em></h2>
              <p>The same outbound pickup schedule applied on each of the three sample concert dates.</p>
              <ol className="concert-ticket__timetable">
                {event.stops.map((item) => <li key={item.name}><time>{item.time}</time><div><strong>{item.name}</strong><span>{item.town}{item.note ? ` · ${item.note}` : ''}</span></div></li>)}
              </ol>
              <div className="concert-ticket__return"><span className="concert-ticket__return-icon" aria-hidden="true"><ArrowDownLeft size={23} strokeWidth={1.7} /></span><div><strong>Return after the show · {event.returnTime}</strong><p>Departs from {event.returnStop}, {event.returnStopId}. The coach stops in Monasterevin and Portlaoise on the way back.</p></div></div>
            </section>

            <section className="concert-ticket__section concert-ticket__help" aria-labelledby="help-title">
              <p className="concert-ticket__eyebrow">Good to know</p>
              <h2 id="help-title" className="h-sub">Questions before <em>you travel?</em></h2>
              <p>Online booking for this sample service closed at 12 noon on Thursday 23 April 2026. Check your selected pickup time and arrive a few minutes early. Contact our team if you need help with the return pickup or have an accessibility question.</p>
              <a href="tel:+353578620888">Call 057 862 0888 <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" /></a>
            </section>
          </div>

          <aside className="concert-ticket__booking" aria-labelledby="booking-title">
            <div className="concert-ticket__booking-head"><span>Return coach ticket</span><strong>{euro(event.fare)} <small>/ person</small></strong></div>
            <h2 id="booking-title">Choose your journey</h2>
            <p className="concert-ticket__booking-intro">Explore how a concert booking would work. This April 2026 event is a past example.</p>
            <div className="concert-ticket__fields">
              <label htmlFor="concert-date">Concert date</label>
              <select id="concert-date" value={date} onChange={(e) => setDate(e.target.value)}>{event.dates.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select>
              <label htmlFor="concert-stop">Outbound pickup</label>
              <select id="concert-stop" value={stop} onChange={(e) => setStop(e.target.value)}><option value="">Select a pickup point</option>{event.stops.map((item) => <option key={item.name} value={item.name}>{item.time} · {item.town} — {item.name}</option>)}</select>
              <label htmlFor="concert-quantity">Passengers</label>
              <select id="concert-quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? 'passenger' : 'passengers'}</option>)}</select>
            </div>
            <div className="concert-ticket__summary" aria-live="polite"><span>Journey summary</span><strong>{selectedDate?.label}</strong><span>{selectedStop ? `${selectedStop.time} · ${selectedStop.name}` : 'Choose your pickup point'}</span><span>Return from Dublin at {event.returnTime}</span></div>
            <div className="concert-ticket__total"><span>Total</span><strong>{euro(event.fare * quantity)}</strong></div>
            <button className="concert-ticket__closed" type="button" disabled>Bookings closed</button>
            <p className="concert-ticket__fineprint">For a live event, the next step would collect passenger contact details and payment. No payment is taken on this preview page.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
