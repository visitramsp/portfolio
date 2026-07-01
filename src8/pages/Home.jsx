import {useEffect, useMemo, useRef, useState} from 'react';
import profileImage from '../assets/portfolio-profile-premium.png';
import resumeFile from '../assets/ram-sakal-patel-resume.pdf';

const SECTIONS = [
  {id: 'home', label: 'Home', short: 'Home', icon: 'home', accent: '#0f766e'},
  {id: 'about', label: 'About', short: 'About', icon: 'profile', accent: '#b7791f'},
  {id: 'work', label: 'Projects', short: 'Work', icon: 'work', accent: '#0f766e'},
  {id: 'skills', label: 'Skills', short: 'Skills', icon: 'skills', accent: '#c8792a'},
  {id: 'experience', label: 'Experience', short: 'Exp', icon: 'experience', accent: '#2f6f63'},
  {id: 'education', label: 'Education', short: 'Edu', icon: 'education', accent: '#d6a85a'},
  {id: 'contact', label: 'Contact', short: 'Call', icon: 'contact', accent: '#b7791f'},
];

const IMPORTANT_NAV_IDS = ['home', 'about', 'work', 'skills', 'experience'];
const NAV_SECTIONS = SECTIONS.filter(section => IMPORTANT_NAV_IDS.includes(section.id));
const MOBILE_TABS = NAV_SECTIONS;

const PROFILE = {
  name: 'Ram Sakal Patel',
  role: 'MERN Stack Developer',
  title: 'MERN Stack Developer building scalable web and mobile products.',
  intro:
    'Results-driven MERN Stack Developer with 3+ years of hands-on experience architecting high-performance web and mobile applications using React.js, Next.js, React Native, Node.js, Express.js, MongoDB and MySQL.',
  about:
    'I specialize in production-grade frontend architecture, real-time product experiences, reusable UI components and API-driven dashboards. My work spans transportation booking systems, prediction market platforms, restaurant booking apps, enterprise supply chain workflows and ERP modules.',
  focus:
    'I care about clean UI/UX, fast performance, responsive layouts, strong state management and business-ready interfaces that make complex systems feel simple.',
  location: 'Lucknow, Uttar Pradesh, India',
  email: 'ramsakalpatel253@gmail.com',
  phone: '+91 7355049718',
  linkedin: 'https://www.linkedin.com/in/ram-sakal-patel-94766221b/',
  github: 'https://github.com/visitramsp',
};

const STATS = [
  {value: '3+', label: 'Years experience'},
  {value: '12+', label: 'Real projects'},
  {value: 'Web + Mobile', label: 'Delivery capability'},
  {value: 'MERN', label: 'Primary stack'},
];

const VALUE_CARDS = [
  {
    number: '01',
    title: 'Frontend quality',
    text: 'Readable layouts, reusable components, smooth animations and responsive systems built for production.',
  },
  {
    number: '02',
    title: 'Realtime products',
    text: 'Socket.io, WebSockets, live dashboards, booking confirmations, market updates and activity synchronization.',
  },
  {
    number: '03',
    title: 'Full-stack thinking',
    text: 'React, Next, Node, Express, MongoDB, MySQL, REST APIs, auth flows and scalable product modules.',
  },
  {
    number: '04',
    title: 'Business impact',
    text: 'Admin panels, booking systems, inventory workflows and analytics that improve everyday operations.',
  },
];

const PROJECTS = [
  {
    title: 'OpinionKings Platform',
    category: 'Real-time Prediction Market',
    status: 'Completed',
    summary:
      'Scalable prediction market platform with live trading, dynamic market updates, WebSocket order execution, wallet flows, Google login and high-performance analytics screens.',
    stack: ['React.js', 'Next.js', 'Node.js', 'Nest.js', 'Redux Toolkit', 'WebSockets'],
    tone: 'mint',
  },
  {
    title: 'goQuicksilver',
    category: 'Global Transportation Booking',
    status: 'Completed',
    summary:
      'Booking platform experience with customer-facing flows, role-based admin management, real-time booking confirmation, operational APIs and responsive analytics dashboards.',
    stack: ['React.js', 'React Native', 'Node.js', 'MongoDB', 'WebSockets'],
    tone: 'amber',
  },
  {
    title: 'Colony App & Admin Panel',
    category: 'Restaurant Seat Booking',
    status: 'Completed',
    summary:
      'Full-stack restaurant reservation system with live table availability, instant confirmation, customer booking history, restaurant management, seating schedules and KPI dashboards.',
    stack: ['React Native', 'React.js', 'Node.js', 'Express.js', 'Postgres'],
    tone: 'bronze',
  },
  {
    title: 'SupplyMatch',
    category: 'Supply Chain Web Platform',
    status: 'Completed',
    summary:
      'Full-suite supply chain solution with Admin Console, Supplier Dashboard, marketing website, role-specific access and Socket.io communication between suppliers and retailers.',
    stack: ['React.js', 'Socket.io', 'MUI', 'ShadCN', 'SCSS', 'Redux'],
    tone: 'blue',
  },
  {
    title: 'SupplyMatch App',
    category: 'Logistics Mobile App',
    status: 'Completed',
    summary:
      'Cross-platform React Native app for suppliers, retailers and delivery partners with role-based dashboards, inventory updates, order tracking, Google Maps and persistent sessions.',
    stack: ['React Native', 'Axios', 'Redux', 'Redux Persist', 'Google Maps API'],
    tone: 'green',
  },
  {
    title: 'ERP Management System',
    category: 'Enterprise Dashboard Suite',
    status: 'Completed',
    summary:
      'Modular ERP covering Finance & Accounting, Inventory, HR and CRM with Apex Charts dashboards, real-time reporting and executive KPI visibility.',
    stack: ['React.js', 'SCSS', 'MUI', 'Apex Charts', 'Axios', 'Redux'],
    tone: 'rose',
  },
  {
    title: 'Garage Management System (GMS)',
    category: 'Service & Operations Platform',
    status: 'Added',
    summary:
      'Garage workflow platform for vehicle records, service booking, job cards, mechanics assignment, spare parts inventory, billing, customer history and operational reports.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MUI', 'REST APIs'],
    tone: 'orange',
  },
  {
    title: 'Student Management System (SMS)',
    category: 'Education Admin Platform',
    status: 'Added',
    summary:
      'Student lifecycle system for admission records, class management, attendance, fees, exams, results, role-based dashboards and clean admin workflows.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Redux', 'Tailwind CSS'],
    tone: 'cyan',
  },
];

const SKILLS = [
  {
    title: 'Programming',
    items: ['HTML', 'CSS', 'JavaScript', 'C Programming'],
  },
  {
    title: 'Frameworks',
    items: ['React.js', 'Next.js', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
  },
  {
    title: 'UI Libraries',
    items: ['Tailwind CSS', 'Material UI', 'ShadCN', 'Ant Design', 'SCSS', 'Responsive UI'],
  },
  {
    title: 'State, Forms & Data',
    items: ['Redux', 'Redux Persist', 'Formik', 'Yup', 'Axios', 'React Table'],
  },
  {
    title: 'Realtime & Visualization',
    items: ['WebSockets', 'Socket.io', 'Apex Charts', 'Apache E-Charts', 'Google Maps API'],
  },
  {
    title: 'Tools & Workflow',
    items: ['Git', 'GitLab', 'GitHub', 'Visual Studio Code', 'REST APIs'],
  },
];

const EXPERIENCE = [
  {
    role: 'MERN Stack Developer',
    company: 'Dunitech Soft Solutions Pvt. Ltd.',
    place: 'Lucknow',
    period: 'July 2025 - Present',
    points: [
      'Develop scalable and responsive React.js, Next.js, Node.js, Express.js and MongoDB applications with clean architecture.',
      'Integrate REST APIs, WebSockets, Redux, Redux Persist and live data handling for seamless real-time synchronization.',
      'Work with Google Maps API, blockchain wallet integration, smart contract APIs, authentication systems, Tailwind CSS and Material UI.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Omni Market Pvt. Ltd.',
    place: 'Mumbai',
    period: 'May 2024 - Jan 2025',
    points: [
      'Built scalable web and mobile products using React.js, React Native, Redux, Redux Persist and REST APIs.',
      'Implemented dynamic dashboards, CMS modules, inventory systems and shipment tracking features with API-driven architecture.',
      'Improved workflow scalability using Google Maps API, WebSockets, Tailwind CSS, Material UI, Git and responsive UI/UX practices.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Aara Groups Pvt. Ltd.',
    place: 'Lucknow, U.P.',
    period: 'Mar 2023 - Nov 2023',
    points: [
      'Built scalable real-time web applications with React.js, Node.js, Express.js, MongoDB, REST APIs, Socket.io and Material UI.',
      'Developed CRM, HRM, ERP dashboards and AMAKA Industries e-commerce workflows with inventory and order lifecycle tracking.',
      'Implemented responsive UI architecture, live data synchronization, notifications and real-time communication workflows.',
    ],
  },
];

const INTERNSHIP = {
  role: 'MERN Stack Trainee Intern',
  company: 'Techpile Technology Pvt. Ltd.',
  place: 'Lucknow, U.P.',
  period: 'Aug 2022 - Feb 2023',
  points: [
    'Built foundational expertise in React.js, JSX, component architecture, Hooks, reusable UI and React Router.',
    'Worked with Axios REST API integration and explored Node.js, Express.js and MongoDB backend fundamentals.',
    'Practiced Socket.io concepts, HTML, CSS, JavaScript, Git and GitHub for structured development workflows.',
  ],
};

const EDUCATION = [
  {
    degree: 'Bachelor of Technology - Computer Science',
    institute: 'S.P. Memorial Institute of Technology, Kaushambi, U.P.',
    period: '2023 - 2026',
  },
  {
    degree: 'Diploma in Computer Science Engineering',
    institute: 'Government Polytechnic Aadampur Tarabganj, Gonda, U.P.',
    period: '2019 - 2022',
  },
];

const CONTACTS = [
  {label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`},
  {label: 'Phone', value: PROFILE.phone, href: 'tel:+917355049718'},
  {label: 'LinkedIn', value: 'ram-sakal-patel', href: PROFILE.linkedin},
  {label: 'GitHub', value: 'visitramsp', href: PROFILE.github},
];

const TECH_MARQUEE = [
  'React.js',
  'Next.js',
  'React Native',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'Socket.io',
  'WebSockets',
  'Redux',
  'Tailwind CSS',
  'Material UI',
  'Apex Charts',
  'Google Maps API',
];

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      let current = SECTIONS[0];
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.24) {
          current = section;
          break;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, {passive: true});
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return {active, progress};
}

function usePointer() {
  const [pointer, setPointer] = useState({x: 48, y: 28});

  useEffect(() => {
    const move = event => {
      setPointer({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('pointermove', move, {passive: true});
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return pointer;
}

function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.12, rootMargin: '0px 0px -70px'},
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}

function Ambient({pointer, accent}) {
  const particles = useMemo(
    () =>
      Array.from({length: 34}, (_, index) => ({
        id: index,
        x: 4 + ((index * 31) % 92),
        y: 7 + ((index * 43) % 86),
        size: 2 + (index % 4),
        delay: `${(index % 9) * -0.45}s`,
      })),
    [],
  );

  return (
    <div className="ambient" style={{'--mx': `${pointer.x}%`, '--my': `${pointer.y}%`, '--active': accent}}>
      <div className="aurora-veil" />
      <div className="noise" />
      <div className="grid-overlay" />
      <div className="digital-dots" />
      <div className="halo-ring halo-ring-one" />
      <div className="halo-ring halo-ring-two" />
      <div className="light-beam beam-one" />
      <div className="light-beam beam-two" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="orb orb-three" />
      <div className="particle-field">
        {particles.map(particle => (
          <span
            key={particle.id}
            style={{'--x': `${particle.x}%`, '--y': `${particle.y}%`, '--s': `${particle.size}px`, '--d': particle.delay}}
          />
        ))}
      </div>
    </div>
  );
}

function Cursor({accent}) {
  const ring = useRef(null);
  const dot = useRef(null);
  const target = useRef({x: -80, y: -80});
  const current = useRef({x: -80, y: -80});

  useEffect(() => {
    const move = event => {
      target.current = {x: event.clientX, y: event.clientY};
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${current.current.x - 26}px, ${current.current.y - 26}px, 0)`;
      if (dot.current) dot.current.style.transform = `translate3d(${target.current.x - 5}px, ${target.current.y - 5}px, 0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', move, {passive: true});
    const frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} style={{'--cursor': accent}}>
        <span />
        <em />
      </div>
      <div className="cursor-dot" ref={dot} style={{'--cursor': accent}} />
    </>
  );
}

const ICON_PATHS = {
  home: (
    <>
      <path d="M3.8 11.3 12 4l8.2 7.3" />
      <path d="M6.2 10.4v8.2h4.1v-4.7h3.4v4.7h4.1v-8.2" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.1" />
      <path d="M5.4 19c.9-3.3 3.1-5 6.6-5s5.7 1.7 6.6 5" />
    </>
  ),
  skills: (
    <>
      <path d="m8.4 7.2-4.1 4.1 4.1 4.1" />
      <path d="m15.6 7.2 4.1 4.1-4.1 4.1" />
      <path d="M13.6 5.8 10.4 18" />
    </>
  ),
  experience: (
    <>
      <path d="M8 7.2V5.6c0-.9.7-1.6 1.6-1.6h4.8c.9 0 1.6.7 1.6 1.6v1.6" />
      <path d="M4.5 8.2h15v9.4c0 1.2-.8 2-2 2h-11c-1.2 0-2-.8-2-2V8.2Z" />
      <path d="M9.2 12.1h5.6" />
    </>
  ),
  work: (
    <>
      <path d="M4.2 6.8h15.6v12.1H4.2z" />
      <path d="M7.1 6.8V5.4c0-.7.5-1.2 1.2-1.2h7.4c.7 0 1.2.5 1.2 1.2v1.4" />
      <path d="M4.2 11.3h15.6" />
    </>
  ),
  education: (
    <>
      <path d="m3.8 8.7 8.2-4.1 8.2 4.1-8.2 4.1-8.2-4.1Z" />
      <path d="M7 10.4v4.7c1.3 1.3 3 2 5 2s3.7-.7 5-2v-4.7" />
    </>
  ),
  contact: (
    <>
      <path d="M4.6 6.5h14.8v11H4.6z" />
      <path d="m5.2 7.1 6.8 5.5 6.8-5.5" />
    </>
  ),
};

function TabIcon({name}) {
  return (
    <svg className="tab-icon" viewBox="0 0 24 24" aria-hidden="true">
      {ICON_PATHS[name] || ICON_PATHS.home}
    </svg>
  );
}

function Nav({active, progress}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <>
      <div className="progress-line">
        <span style={{transform: `scaleX(${progress})`, background: active.accent}} />
      </div>
      <header className="top-nav">
        <a href="#home" className="brand" aria-label="Ram Sakal Patel portfolio home">
          <span>RSP</span>
          <strong>Ram Sakal Patel</strong>
        </a>
        <nav className="desktop-links" aria-label="Portfolio navigation">
          {NAV_SECTIONS.map(section => (
            <a
              href={`#${section.id}`}
              key={section.id}
              className={active.id === section.id ? 'active' : ''}
              style={{'--link': section.accent}}>
              {section.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={resumeFile} download>
          Resume
        </a>
        <button className="menu-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label="Open menu">
          <span>{open ? 'Close' : 'Menu'}</span>
          <i />
        </button>
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_SECTIONS.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{'--link': section.accent, '--i': index}}
            onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {section.label}
          </a>
        ))}
      </div>

      <nav className="mobile-bottom-tabs" aria-label="Mobile portfolio tabs">
        {MOBILE_TABS.map(section => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active.id === section.id ? 'active' : ''}
            style={{'--link': section.accent}}>
            <span className="tab-glow" />
            <TabIcon name={section.icon} />
            <span>{section.short}</span>
            <b className="tab-indicator" />
          </a>
        ))}
      </nav>
    </>
  );
}

function Eyebrow({number, children}) {
  return (
    <div className="eyebrow">
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

function PortraitVisual({className = '', compact = false}) {
  return (
    <div className={`portrait-wrap ${className}`} data-reveal>
      <div className="portrait-card">
        <div className="portrait-glow" />
        <img src={profileImage} alt="Ram Sakal Patel" />
        <div className="portrait-info">
          <strong>{PROFILE.name}</strong>
          <span>{PROFILE.role} - {PROFILE.location}</span>
        </div>
      </div>
      {!compact && (
        <>
          <div className="code-card code-card-one">
            <small>Core stack</small>
            <strong>React / Next / Node</strong>
          </div>
          <div className="code-card code-card-two">
            <small>Experience</small>
            <strong>3+ years</strong>
          </div>
        </>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section-pad">
      <div className="hero-copy" data-reveal>
        <div className="hero-kicker">
          <i />
          <span>Available for MERN / Frontend roles</span>
        </div>
        <h1>
          <span>MERN Stack</span>
          <span>Developer</span>
          <em>for scalable products.</em>
        </h1>
        <PortraitVisual className="mobile-hero-portrait" compact />
        <p className="hero-intro">{PROFILE.intro}</p>
        <div className="hero-actions">
          <a href="#work" className="primary-btn">View projects</a>
          <a href={resumeFile} download className="secondary-btn">Download resume</a>
        </div>
        <div className="hero-meta">
          <span>React.js</span>
          <span>Next.js</span>
          <span>React Native</span>
          <span>Node.js</span>
          <span>Socket.io</span>
        </div>
      </div>

      <PortraitVisual className="desktop-hero-portrait" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="section-heading" data-reveal>
        <Eyebrow number="01">About profile</Eyebrow>
        <h2>Clean engineering, polished interfaces and practical product thinking.</h2>
      </div>
      <div className="about-grid">
        <article className="about-main glass" data-reveal>
          <p>{PROFILE.about}</p>
          <p>{PROFILE.focus}</p>
        </article>
        <div className="stat-grid">
          {STATS.map((stat, index) => (
            <article className="stat-card glass" key={stat.label} data-reveal style={{'--i': index}}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
      <div className="value-grid">
        {VALUE_CARDS.map((item, index) => (
          <article className="value-card" key={item.title} data-reveal style={{'--i': index}}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({project, index}) {
  return (
    <article className={`project-card glass tone-${project.tone}`} data-reveal style={{'--i': index}}>
      <div className="project-visual">
        <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="mini-window">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="project-info">
        <div className="project-topline">
          <span>{project.category}</span>
          <small>{project.status}</small>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="chip-row">
          {project.stack.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="work section-pad">
      <div className="section-heading wide" data-reveal>
        <Eyebrow number="02">Selected work</Eyebrow>
        <h2>Production-ready projects from resume, plus GMS and SMS added for your portfolio.</h2>
      </div>
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills section-pad">
      <div className="section-heading center" data-reveal>
        <Eyebrow number="03">Technical skills</Eyebrow>
        <h2>Modern MERN stack skillset with frontend, mobile, realtime and dashboard strength.</h2>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>
      <div className="skill-grid">
        {SKILLS.map((skill, index) => (
          <article className="skill-card glass" key={skill.title} data-reveal style={{'--i': index}}>
            <span>0{index + 1}</span>
            <h3>{skill.title}</h3>
            <ul>
              {skill.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience section-pad">
      <div className="section-heading wide" data-reveal>
        <Eyebrow number="04">Professional journey</Eyebrow>
        <h2>Experience across MERN development, admin dashboards, mobile apps and real-time systems.</h2>
      </div>
      <div className="timeline">
        {EXPERIENCE.map((job, index) => (
          <article className="timeline-item" key={job.company} data-reveal style={{'--i': index}}>
            <div className="timeline-marker" />
            <div className="timeline-card glass">
              <div className="timeline-head">
                <div>
                  <h3>{job.role}</h3>
                  <p>{job.company} - {job.place}</p>
                </div>
                <span>{job.period}</span>
              </div>
              <ul>
                {job.points.map(point => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="education section-pad">
      <div className="section-heading" data-reveal>
        <Eyebrow number="05">Education & internship</Eyebrow>
        <h2>Computer Science foundation with practical MERN training.</h2>
      </div>
      <div className="credential-grid">
        <div className="education-list">
          {EDUCATION.map((item, index) => (
            <article className="credential-card glass" key={item.degree} data-reveal style={{'--i': index}}>
              <span>{item.period}</span>
              <h3>{item.degree}</h3>
              <p>{item.institute}</p>
            </article>
          ))}
        </div>
        <article className="internship-card glass" data-reveal>
          <span>{INTERNSHIP.period}</span>
          <h3>{INTERNSHIP.role}</h3>
          <p>{INTERNSHIP.company} - {INTERNSHIP.place}</p>
          <ul>
            {INTERNSHIP.points.map(point => <li key={point}>{point}</li>)}
          </ul>
        </article>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="success glass">
        <span>✓</span>
        <h3>Message ready</h3>
        <p>Thank you. I will connect with you soon.</p>
      </div>
    );
  }

  return (
    <form
      className="contact-form glass"
      data-reveal
      onSubmit={event => {
        event.preventDefault();
        setSent(true);
      }}>
      <input placeholder="Your name" required />
      <input placeholder="Email address" type="email" required />
      <textarea placeholder="Tell me about your project or role" rows="5" required />
      <button type="submit">Send message</button>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact section-pad">
      <div className="contact-copy" data-reveal>
        <Eyebrow number="06">Contact</Eyebrow>
        <h2>Open to frontend, MERN stack, React Native and dashboard-focused opportunities.</h2>
        <p>
          Looking for a role where clean engineering, premium UI and product ownership create lasting impact. Let us build reliable digital products together.
        </p>
        <div className="contact-list">
          {CONTACTS.map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </div>
      </div>
      <ContactForm />
    </section>
  );
}

export default function Portfolio() {
  const {active, progress} = useActiveSection();
  const pointer = usePointer();

  return (
    <div className="portfolio-shell" style={{'--accent': active.accent}}>
      <RevealObserver />
      <Cursor accent={active.accent} />
      <Ambient pointer={pointer} accent={active.accent} />
      <Nav active={active} progress={progress} />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="footer">© {new Date().getFullYear()} Ram Sakal Patel - Premium MERN Portfolio</footer>
    </div>
  );
}
