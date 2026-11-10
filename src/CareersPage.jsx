import { useEffect, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import teamImage from './assets/martleys-careers-team.jpg';
import driverImage from './assets/martleys-careers-driver.jpg';
import './careers.css';

const vacancies = [
  {
    title: 'Coach Drivers for Tours & Day Trips Across Ireland, the UK and Europe',
    intro: 'We’re looking for coach drivers to join our growing team and take our passengers on unforgettable journeys across Ireland, the UK and Europe.',
    offer: [
      'Exciting tours to top destinations, from sun-soaked European stops and Alpine ski resorts to vibrant cities and scenic coastal routes across Ireland and the UK.',
      'Competitive, negotiable pay based on experience.',
    ],
    opportunities: ['Full-time and part-time drivers for tours and day trips across Ireland, the UK and Europe.'],
    requirements: [
      'D Category Driver’s Licence',
      'All CPCs up to date',
      'Tacho Card up to date',
      'Flexibility and willingness to be away overnight when required for extended tours and trips',
      'A commitment to friendly, helpful customer service',
      'A safe, responsible approach and a willingness to work as part of a team',
    ],
    close: 'If you’re a driver looking to join a supportive crew of great people, we’d love to hear from you.',
  },
  {
    title: 'Bus and Coach Drivers',
    intro: 'We’re looking for reliable, professional drivers to join our growing team.',
    opportunities: [
      'Part-time and full-time school bus drivers',
      'Part-time and full-time service bus drivers',
      'Minibus drivers',
      'Drivers for tours and day trips within Ireland, the UK and Europe',
    ],
    requirements: [
      'D or D1 Category Driver’s Licence',
      'All CPCs up to date',
      'Tacho Card up to date',
      'A safe, responsible approach and a willingness to work as part of a team',
    ],
    close: 'Pay is negotiable. If you take pride in connecting our community and want to join a supportive crew, we’d love to hear from you.',
  },
];

function List({ children }) {
  return <ul>{children.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function CareersPage() {
  const [emailPrepared, setEmailPrepared] = useState(false);

  useEffect(() => {
    document.title = 'Careers | Martley’s of Portlaoise';
    return () => { document.title = 'Martley’s | Reliable coaches. Friendly service.'; };
  }, []);

  const prepareEmail = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cv = data.get('cv');
    const body = [
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email')}`,
      `Job of interest: ${data.get('job')}`,
      '',
      'Relevant experience:',
      data.get('experience'),
      '',
      `CV selected: ${cv?.name || 'None'}`,
      'Please attach the CV file to this email before sending.',
    ].join('\n');

    setEmailPrepared(true);
    window.location.href = `mailto:careers@martleys.com?subject=${encodeURIComponent(`Careers enquiry from ${data.get('name')}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="top" tabIndex="-1" className="careers-page">
      <div className="shell careers-page__shell">
        <nav className="careers-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Careers</span></nav>

        <section className="careers-hero" aria-labelledby="careers-title">
          <div className="careers-hero__copy">
            <p className="careers-eyebrow">Join our team</p>
            <h1 id="careers-title" className="h-section">Come work with <em>Martley’s.</em></h1>
            <p>Join a family-run transport company with more than 60 years of experience, a modern fleet and a team that takes pride in every journey.</p>
            <a className="button" href="#careers-form">Make a careers enquiry <ArrowRight size={20} strokeWidth={1.7} aria-hidden="true" /></a>
          </div>
          <div className="careers-hero__photo"><img src={teamImage} alt="Three Martley’s team members standing in front of a coach" /></div>
        </section>

        <section className="careers-vacancies" aria-labelledby="vacancies-title">
          <div className="careers-section-heading">
            <h2 id="vacancies-title" className="h-sub">Current <em>opportunities</em></h2>
          </div>

          <div className="careers-vacancy-list">
            {vacancies.map((vacancy, index) => <article className="careers-vacancy" key={vacancy.title}>
              <header><span>0{index + 1}</span><h3>{vacancy.title}</h3></header>
              <p className="careers-vacancy__intro">{vacancy.intro}</p>
              <div className="careers-vacancy__details">
                <div>
                  {vacancy.offer && <><h4>What we offer</h4><List>{vacancy.offer}</List></>}
                  <h4>Current opportunities</h4><List>{vacancy.opportunities}</List>
                </div>
                <div><h4>What we’re looking for</h4><List>{vacancy.requirements}</List></div>
              </div>
              <p className="careers-vacancy__close">{vacancy.close}</p>
              <a href="#careers-form">Apply for this position <ArrowRight size={19} strokeWidth={1.7} aria-hidden="true" /></a>
            </article>)}
          </div>
        </section>

        <section id="careers-form" className="careers-apply" aria-labelledby="apply-title">
          <div className="careers-apply__photo"><img src={driverImage} alt="A Martley’s driver seated in a minibus" /></div>
          <div className="careers-apply__content">
            <p className="careers-eyebrow">Apply or enquire</p>
            <h2 id="apply-title" className="h-sub">Tell us about <em>your experience.</em></h2>
            <p>Complete the details below. Your email app will open with an enquiry addressed to <a href="mailto:careers@martleys.com">careers@martleys.com</a>.</p>
            <form className="careers-form" onSubmit={prepareEmail}>
              <div className="careers-form__row">
                <label>Name<input type="text" name="name" autoComplete="name" required /></label>
                <label>Phone<input type="tel" name="phone" autoComplete="tel" required /></label>
              </div>
              <label>Email<input type="email" name="email" autoComplete="email" required /></label>
              <label>What job are you interested in?<select name="job" defaultValue="" required>
                <option value="" disabled>Select a position</option>
                <option>Coach drivers for tours and day trips</option>
                <option>School bus driver</option>
                <option>Service bus driver</option>
                <option>Minibus driver</option>
                <option>Another role</option>
              </select></label>
              <label>Relevant experience<textarea name="experience" rows="5" required /></label>
              <label>Attach CV<input type="file" name="cv" accept=".pdf,.doc,.docx" required /><small>You will attach this file when your email app opens.</small></label>
              <button className="button" type="submit">Prepare careers email <Mail size={19} strokeWidth={1.7} aria-hidden="true" /></button>
              {emailPrepared && <p className="careers-form__status" role="status">Your email app should now be open. Attach your selected CV, check the details and send the message.</p>}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
