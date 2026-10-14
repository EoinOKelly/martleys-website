import { useEffect } from 'react';
import schoolBusImage from './assets/martleys-school-bus.webp';
import Icon from './TicketIcon';
import './tickets.css';

const checkout = 'https://martleys.com/ticket/school-bus-tickets/';
const registration = 'https://martleys.com/student-registration/';
const options = [
  ['01', '1 or 2 days', 'For occasional school travel.'],
  ['02', '3–5 days', 'For the regular school week.'],
  ['03', 'Term or annual', 'For a longer travel plan.'],
  ['04', 'Sibling tickets', 'Options for two or more children.'],
];
const schools = [
  'Dunamase College', 'Educate Together Portlaoise', 'Gaelscoil Portlaoise',
  'Holy Family Schools', 'Maryborough National School', 'Mountrath Community School',
  'Portlaoise College', 'Scoil Bhríde', 'Scoil Chríost Rí', 'St Mary’s CBS',
];

export default function TicketPage() {
  useEffect(() => {
    document.title = 'School tickets — Martley’s of Portlaoise';
    return () => { document.title = 'Martley’s — Reliable coaches. Friendly service.'; };
  }, []);
  return (
    <main id="top" tabIndex="-1" className="school-tickets">
      <div className="shell school-tickets__shell">
        <nav className="ticket-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">School tickets</span>
        </nav>
        <div className="school-tickets__hero">
          <div className="school-tickets__intro">
            <p className="school-tickets__eyebrow">School transport · Portlaoise &amp; Mountrath</p>
            <h1 className="h-section">The school run,<br /><em>sorted.</em></h1>
            <p className="school-tickets__lead">Choose the right ticket for your child’s school journey. We’ll help make every morning a little easier.</p>
            <div className="school-tickets__notice"><Icon name="calendar" /><p><strong>Booking for next week?</strong> Purchase by Sunday to guarantee your child’s seat. Unclaimed seats may be offered to families on the waiting list.</p></div>
          </div>
          <div className="school-tickets__image"><img src={schoolBusImage} alt="Martley’s school bus outside a school" /></div>
        </div>
        <section className="school-tickets__booking" aria-labelledby="school-booking-title">
          <div className="school-tickets__booking-head">
            <div><p className="school-tickets__eyebrow">Your ticket</p><h2 id="school-booking-title" className="h-sub">Ready for the <em>week ahead.</em></h2></div>
            <p>School tickets are available for Portlaoise schools and Mountrath Community School. Select your school and exact ticket at checkout, where the price is shown.</p>
          </div>
          <div className="school-tickets__options">
            {options.map(([number, title, description]) => <div className="school-tickets__option" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}
          </div>
          <div className="school-tickets__checkout">
            <div><strong>Before you buy</strong><p>Please register your child if they haven’t travelled with us before. Have their name, class, school and start date ready for checkout.</p><a href={registration}>Register your child <span aria-hidden="true">↗</span></a></div>
            <a className="button" href={checkout}>Choose and buy school tickets <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        <section className="school-tickets__details" aria-label="School ticket information">
          <div>
            <p className="school-tickets__eyebrow">Schools served</p>
            <h2 className="h-sub">A familiar face on <em>the school run.</em></h2>
            <p>Our licensed school services cover Portlaoise and Mountrath. Ticket options include the following schools.</p>
            <ul>{schools.map((school) => <li key={school}>{school}</li>)}</ul>
          </div>
          <div>
            <p className="school-tickets__eyebrow">Booking guide</p>
            <h2 className="h-sub">Three steps to <em>travel.</em></h2>
            <ol>
              <li><strong>Register your child</strong><span>Complete the student registration form before their first journey.</span></li>
              <li><strong>Choose the ticket</strong><span>At checkout, select the school and number of days, or choose a term, annual or sibling option.</span></li>
              <li><strong>Add their details</strong><span>Enter the passenger name, class, school and commencement date. Purchase by Sunday for the coming week.</span></li>
            </ol>
          </div>
        </section>
        <section className="school-tickets__help" aria-labelledby="school-help-title">
          <div><p className="school-tickets__eyebrow">Here to help</p><h2 id="school-help-title" className="h-sub">Questions about <em>the school run?</em></h2></div>
          <div><p>Talk to our Portlaoise team about routes, registration or the right ticket for your family.</p><a href="tel:+353578620888">057 862 0888</a><a href="mailto:info@martleys.com">info@martleys.com</a></div>
        </section>
      </div>
    </main>
  );
}
