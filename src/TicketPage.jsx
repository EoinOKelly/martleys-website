import { useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m, MotionConfig, useReducedMotion } from 'motion/react';
import roadImage from './assets/martleys-road-live.jpg';
import Icon from './TicketIcon';
import './tickets.css';

const services = {
  college: {
    label: 'College', icon: 'college',
    description: 'Your regular seat on the road to Carlow.',
    from: ['Portlaoise', 'Carlow'],
    to: ['SETU Carlow', 'Carlow Institute', 'Carlow College'],
    types: ['Single', 'Return', 'Weekly'],
    helpTitle: 'Have a Young Adult Leap Card?',
    help: 'Save 50% on your college commute with a valid Young Adult Leap Card.',
    helpLink: '/#college', helpLabel: 'About student travel',
  },
  school: {
    label: 'School', icon: 'school',
    description: 'A dependable start to the school day.',
    from: ['Portlaoise', 'Mountrath'],
    to: ['Portlaoise schools', 'Mountrath Community School'],
    types: ['Daily', 'Weekly', 'Term'],
    helpTitle: 'Their first journey with us?',
    help: 'Register your student before arranging their first school ticket.',
    helpLink: 'https://martleys.com/schools-colleges/', helpLabel: 'Register a student',
  },
  events: {
    label: 'Events', icon: 'event',
    description: 'Get there together. We’ll handle the drive home.',
    from: ['Portlaoise', 'Mountrath'],
    to: ['Select your event', 'Electric Picnic', 'Forest Fest'],
    types: ['Return'],
    helpTitle: 'Heading to a festival?',
    help: 'Check pickup points and travel updates before the big day.',
    helpLink: 'https://martleys.com/festivals-concerts/', helpLabel: 'Event travel information',
  },
};

function SelectField({ label, icon, value, onChange, options }) {
  return (
    <label className="ticket-field">
      <span>{label}</span>
      <span className="ticket-field__control">
        <Icon name={icon} />
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <Icon name="chevron" className="ticket-field__chevron" />
      </span>
    </label>
  );
}

function DateField({ label, value, onChange, min }) {
  return (
    <label className="ticket-field">
      <span>{label}</span>
      <span className="ticket-field__control">
        <Icon name="calendar" />
        <input type="date" value={value} min={min || undefined}
          onChange={(event) => onChange(event.target.value)} />
      </span>
    </label>
  );
}

function TravelHelp({ service, className = '' }) {
  const current = services[service];
  return (
    <aside className={`ticket-story__note ${className}`} aria-label="Travel information">
      <Icon name={service === 'college' ? 'card' : current.icon} />
      <div><h2>{current.helpTitle}</h2><p>{current.help}</p>
        <a href={current.helpLink}>{current.helpLabel}</a>
      </div>
    </aside>
  );
}

export default function TicketPage() {
  const requested = new URLSearchParams(window.location.search).get('service');
  const initial = Object.hasOwn(services, requested) ? requested : 'college';
  const [service, setService] = useState(initial);
  const [ticketType, setTicketType] = useState(services[initial].types[0]);
  const [from, setFrom] = useState(services[initial].from[0]);
  const [to, setTo] = useState(services[initial].to[0]);
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [fare, setFare] = useState(initial === 'school' ? 'School student' : 'Adult');
  const [previewMessage, setPreviewMessage] = useState(false);
  const [keyboardSelection, setKeyboardSelection] = useState(false);
  const reducedMotion = useReducedMotion();
  const current = services[service];
  const serviceIndex = Object.keys(services).indexOf(service);
  const duration = reducedMotion || keyboardSelection ? 0 : 0.22;
  const destinationOptions = service === 'college' && from === 'Carlow' ? ['Portlaoise'] : current.to;
  const passengerOptions = service === 'school' ? ['School student'] : ['Adult', 'Young Adult / Student', 'Child'];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Buy tickets — Martley’s of Portlaoise';
    return () => { document.title = originalTitle; };
  }, []);

  function chooseService(nextService) {
    setService(nextService);
    setTicketType(services[nextService].types[0]);
    setFrom(services[nextService].from[0]);
    setTo(services[nextService].to[0]);
    setFare(nextService === 'school' ? 'School student' : 'Adult');
    setPreviewMessage(false);
  }

  function changeOrigin(value) {
    setFrom(value);
    if (service === 'college') setTo(value === 'Carlow' ? 'Portlaoise' : 'SETU Carlow');
  }

  function changeDeparture(value) {
    setDeparture(value);
    if (returnDate && value > returnDate) setReturnDate('');
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <main id="top" tabIndex="-1" className="tickets-page">
          <div className="shell tickets-shell">
            <nav className="ticket-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Tickets</span>
            </nav>

            <div className="ticket-layout">
              <section className="ticket-story" aria-labelledby="ticket-title">
                <p className="ticket-story__place">Martley’s of Portlaoise</p>
                <h1 id="ticket-title">Where are <br />you off to?</h1>
                <p className="ticket-story__intro">To class, to college, or out for the day.<br className="desktop-break" /> Travel with the people who know the Midlands.</p>
                <figure className="ticket-story__photo">
                  <img src={roadImage} alt="A Martley’s coach on a quiet country road through the Midlands" width="1920" height="1080" />
                  <figcaption><Icon name="bus" /> The roads we call home.</figcaption>
                </figure>
                <TravelHelp service={service} className="ticket-travel-help--desktop" />
              </section>

              <section className="ticket-booking" aria-labelledby="booking-title">
                <ol className="booking-steps" aria-label="Booking progress">
                  <li aria-current="step"><span>1</span> Journey</li>
                  <li><span>2</span> Tickets</li>
                  <li><span>3</span> Payment</li>
                </ol>
                <div className="ticket-form__intro">
                  <h2 id="booking-title">Let’s plan your journey.</h2>
                  <p>{current.description}</p>
                </div>
                <form className="ticket-form" onSubmit={(event) => { event.preventDefault(); setPreviewMessage(true); }}>
                  <fieldset className="ticket-services"
                    onKeyDown={() => setKeyboardSelection(true)}
                    onPointerDown={() => setKeyboardSelection(false)}>
                    <legend className="visually-hidden">Service type</legend>
                    <m.span className="ticket-services__selection" aria-hidden="true"
                      initial={false} animate={{ x: (serviceIndex * 100) + '%' }}
                      transition={{ duration, ease: [0.22, 1, 0.36, 1] }} />
                    {Object.entries(services).map(([key, item]) => (
                      <label key={key}>
                        <input type="radio" name="service" value={key} checked={service === key}
                          onChange={() => chooseService(key)} />
                        <span><Icon name={item.icon} />{item.label}</span>
                      </label>
                    ))}
                  </fieldset>

                  <fieldset className="ticket-types">
                    <legend>Ticket type</legend>
                    <div>{current.types.map((type) => (
                      <label key={type}>
                        <input type="radio" name="ticket-type" value={type} checked={ticketType === type}
                          onChange={() => setTicketType(type)} />
                        <span>{type}</span>
                      </label>
                    ))}</div>
                  </fieldset>

                  <div className="ticket-route-fields">
                    <SelectField label="From" icon="pin" value={from} onChange={changeOrigin} options={current.from} />
                    {service === 'college' && (
                      <button className="ticket-swap" type="button" aria-label="Swap departure and destination"
                        onClick={() => changeOrigin(from === 'Portlaoise' ? 'Carlow' : 'Portlaoise')}>
                        <Icon name="swap" />
                      </button>
                    )}
                    <SelectField label={service === 'events' ? 'Event' : 'To'} icon={service === 'events' ? 'event' : 'pin'}
                      value={to} onChange={setTo} options={destinationOptions} />
                  </div>

                  <div className="ticket-fields-row">
                    <DateField label={['Weekly', 'Term'].includes(ticketType) ? 'Starting on' : 'Departure date'}
                      value={departure} onChange={changeDeparture} />
                    {ticketType === 'Return'
                      ? <DateField label="Return date" value={returnDate} onChange={setReturnDate} min={departure} />
                      : <SelectField label="Passenger type" icon="person" value={fare} onChange={setFare} options={passengerOptions} />}
                  </div>
                  {ticketType === 'Return' && <SelectField label="Passenger type" icon="person"
                    value={fare} onChange={setFare} options={passengerOptions} />}

                  <div className="ticket-passengers">
                    <div><strong>Passengers</strong><span>Seats to book</span></div>
                    <div className="ticket-counter">
                      <button type="button" disabled={passengers === 1} aria-label="Remove a passenger"
                        onClick={() => setPassengers((count) => count - 1)}>−</button>
                      <output aria-live="polite" aria-label="Passenger count">{passengers}</output>
                      <button type="button" disabled={passengers === 8} aria-label="Add a passenger"
                        onClick={() => setPassengers((count) => count + 1)}>+</button>
                    </div>
                  </div>

                  <div className="ticket-journey" aria-label="Journey summary">
                    <Icon name="bus" /><span>{from}</span><Icon name="arrow" />
                    <strong>{to === 'Select your event' ? 'Your event' : to}</strong>
                  </div>
                  <m.button className="ticket-submit" type="submit"
                    onKeyDown={() => setKeyboardSelection(true)} onPointerDown={() => setKeyboardSelection(false)}
                    whileTap={reducedMotion || keyboardSelection ? undefined : { scale: 0.985 }} transition={{ duration: 0.12 }}>
                    Find tickets <Icon name="arrow" />
                  </m.button>
                  <p className="ticket-form__footnote">Select your ticket and fare in the next step.</p>
                  {previewMessage && <p className="ticket-preview-message" role="status">
                    This is a design preview. Live ticket search and payment will be added here.
                  </p>}
                </form>
              </section>
              <TravelHelp service={service} className="ticket-travel-help--mobile" />
            </div>

            <section className="ticket-before" aria-labelledby="before-title">
              <div className="ticket-help">
                <h2 id="before-title">A little help before you go.</h2>
                <p>Talk to our team in Portlaoise.</p>
                <a href="tel:+353578620888"><Icon name="phone" />057 862 0888</a>
              </div>
              <div className="ticket-faqs">
                <details><summary>Which ticket should I choose?<Icon name="chevron" /></summary>
                  <p>Choose College for your commute, School for the school run, or Events for concerts and festivals. Ticket options vary by service.</p>
                </details>
                <details><summary>How do I arrange accessible travel?<Icon name="chevron" /></summary>
                  <p>Call <a href="tel:+353578620888">057 862 0888</a> to discuss wheelchair access and any support you need for your journey.</p>
                </details>
                <details><summary>Where can I find public route timetables?<Icon name="chevron" /></summary>
                  <p>Find stops and service information on our <a href="https://martleys.com/public-service-routes/">public routes page</a>.</p>
                </details>
              </div>
            </section>
          </div>
        </main>
      </LazyMotion>
    </MotionConfig>
  );
}
