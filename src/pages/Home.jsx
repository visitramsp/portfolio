import { useState, useEffect, useRef } from "react";
import ramSakalImage from "../assets/ramsakal.jpg";
const NAV = [
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "Contact",
];

const SKILLS = {
  Core: ["React.js", "Next.js", "JavaScript", "TypeScript", "JSX"],
  Mobile: ["React Native"],
  Backend: ["Node.js", "Express.js", "MongoDB", "MySQL"],
  Styling: ["Tailwind CSS", "MUI", "ShadCN", "SCSS", "Ant Design"],
  State: ["Redux", "Redux Saga", "RTK", "Redux Persist"],
  "Real-time": ["WebSockets", "Socket.io"],
  Tools: ["Git", "GitLab", "VS Code", "Axios", "Formik", "Yup"],
  Charts: ["Apex Charts", "Apache E-Charts", "React Table"],
};

const EXPERIENCES = [
  {
    role: "MERN Stack Developer",
    company: "Dunitech Soft Solutions Pvt. Ltd.",
    location: "Lucknow",
    period: "Jul 2025 – Present",
    color: "#6366f1",
    points: [
      "Built production-grade React.js & Next.js apps across multiple domains",
      "Developed Senzara — dynamic form platform with complex validations & conditional workflows",
      "Built goQuicksilver — global transportation booking with Google Maps API integration",
      "Developed Prediction Market platform (like Kalshi) with WebSocket live price updates",
      "Integrated Blockchain frontend with smart contract APIs & wallet connectivity",
    ],
  },
  {
    role: "Junior Frontend Developer",
    company: "Omni Market Pvt. Ltd.",
    location: "Mumbai",
    period: "May 2024 – Jan 2025",
    color: "#06b6d4",
    points: [
      "Led SupplyMatch Admin Console for UAE FMCG operations",
      "Built Supplier Dashboard CMS for vendors to manage products, pricing & inventory",
      "Developed SupplyMatch React Native app with role-specific flows",
      "Integrated RESTful APIs for real-time inventory, order & shipment tracking",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Aara Groups Pvt. Ltd.",
    location: "Lucknow",
    period: "Mar 2023 – Nov 2023",
    color: "#10b981",
    points: [
      "Developed CRM, HRM & ERP Admin Consoles for centralized operations",
      "Architected WebSocket infrastructure with Socket.io across all microservices",
      "Built AMAKA Industries e-commerce with role-based access & RESTful APIs",
    ],
  },
];

const PROJECTS = [
  {
    name: "Prediction Market Platform",
    desc: "Real-time trading like Kalshi — Yes/No positions, live price charts, WebSocket-powered instant updates.",
    tags: ["React.js", "Redux", "WebSockets", "Tailwind", "Charts"],
    period: "Jan 2024–Present",
    color: "#6366f1",
    icon: "📈",
  },
  {
    name: "goQuicksilver",
    desc: "Transportation booking for Airport Transfers, Hourly Rentals & Around Town trips with Google Maps live routing.",
    tags: ["React.js", "Google Maps", "Redux", "MUI"],
    period: "Mar 2025",
    color: "#f59e0b",
    icon: "🚖",
  },
  {
    name: "Global Transportation Admin",
    desc: "Admin panel with live location tracking, route visualization, and dynamic fare engine.",
    tags: ["React.js", "Google Maps", "Redux", "Tailwind"],
    period: "Mar 2025",
    color: "#06b6d4",
    icon: "🗺️",
  },
  {
    name: "SupplyMatch Platform",
    desc: "Full FMCG supply chain — Admin Console, Supplier Dashboard, React Native app with Socket.io.",
    tags: ["React.js", "React Native", "Socket.io", "Redux Saga"],
    period: "Mar 2024",
    color: "#10b981",
    icon: "📦",
  },
  {
    name: "ERP Management System",
    desc: "Enterprise suite covering Finance, Inventory, HR and CRM with rich data visualizations.",
    tags: ["React.js", "Apex Charts", "MUI", "Redux"],
    period: "2023",
    color: "#ec4899",
    icon: "🏢",
  },
  {
    name: "Senzara",
    desc: "Dynamic form platform with conditional workflows, multi-step validations, reusable UI components.",
    tags: ["React.js", "Formik", "Yup", "Tailwind"],
    period: "2025",
    color: "#8b5cf6",
    icon: "📋",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor's in Computer Science",
    institute: "S.P. Memorial Institute of Technology",
    location: "Kaushambi, Uttar Pradesh",
    period: "2022 – Jun 2026",
    color: "#6366f1",
    icon: "🎓",
    status: "Pursuing",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    institute: "Government Polytechnic Aadampur Tarabganj",
    location: "Gonda, U.P.",
    period: "2019 – 2022",
    color: "#06b6d4",
    icon: "🏛️",
    status: "Completed",
  },
  {
    degree: "Intermediate (12th)",
    institute: "Nagar Palika Inter College DDU Nagar",
    location: "Chandauli, U.P.",
    period: "Completed 2019",
    color: "#10b981",
    icon: "📚",
    status: "Completed",
  },
  {
    degree: "High School (10th)",
    institute: "P S A H S Rangauli, Jivnathpur",
    location: "Chandauli, U.P.",
    period: "Completed 2017",
    color: "#f59e0b",
    icon: "🏫",
    status: "Completed",
  },
];

// ── useInView ──────────────────────────────────────────────────────────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "", height = "auto" }) => {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        minHeight: height,
      }}
    >
      {children}
    </div>
  );
};

// ── Particles ──────────────────────────────────────────────────────────────
const Particles = () => {
  const dots = useRef(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: Math.random() * 20 + 14,
      delay: Math.random() * 10,
      isIndigo: Math.random() > 0.5,
    })),
  ).current;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: `rgba(${d.isIndigo ? "99,102,241" : "6,182,212"},0.2)`,
            animation: `float ${d.dur}s ease-in-out ${d.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────
const Navbar = ({ active, setActive }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] flex   h-20 sm:h-16 items-center justify-between px-[clamp(16px,5vw,80px)] transition-all duration-500 ${
        scrolled
          ? "border-b border-indigo-500/10 bg-[#080a14]/90 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="font-syne text-[22px] font-extrabold tracking-[-0.03em]">
        <span className="bg-gradient-to-br from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          RSP
        </span>
        <span className="text-indigo-500/30">.</span>
      </div>

      {/* Nav Links */}
      <div className="flex flex-wrap gap-1">
        {NAV.map((n) => {
          const isActive = active === n;

          return (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              onClick={() => setActive(n)}
              className={`rounded-full px-3 py-[5px] text-[12px] font-medium no-underline transition-all duration-200 ${
                isActive
                  ? "border border-indigo-500/35 bg-indigo-500/20 text-white"
                  : "border border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {n}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

const PHOTO_SRC = ramSakalImage;

const ProfilePhoto = () => (
  <div className="relative h-[240px] w-[240px] shrink-0">
    {/* Spinning Gradient Ring */}
    <div className="absolute inset-[-3px] z-0 rounded-full bg-[linear-gradient(135deg,#6366f1,#06b6d4,#10b981,#6366f1)] animate-[spin_5s_linear_infinite]" />

    {/* Dark Gap */}
    <div className="absolute inset-[2px] z-[1] rounded-full bg-[#080a14]" />

    {/* Inner Glow */}
    <div className="absolute inset-[5px] z-[2] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(99,102,241,0.15),transparent_65%)]" />

    {/* Image / Placeholder */}
    <div
      className={`absolute inset-[5px] z-[3] flex items-center justify-center overflow-hidden rounded-full ${
        PHOTO_SRC
          ? "bg-transparent"
          : "bg-[linear-gradient(145deg,#1a1c2e,#10121d)]"
      }`}
    >
      {PHOTO_SRC ? (
        <img
          src={PHOTO_SRC}
          alt="Ram Sakal Patel"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="select-none text-center">
          <div className="text-[72px] leading-none grayscale-[0.2]">🧑‍💻</div>

          <div className="mt-1.5 font-outfit text-[9.5px] tracking-[0.1em] text-indigo-500/45">
            ADD YOUR PHOTO
          </div>
        </div>
      )}
    </div>

    {/* Experience Badge */}
    <div className="absolute bottom-1 right-[-22px] z-10 whitespace-nowrap rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 px-[14px] py-[7px] font-outfit text-[12px] font-bold text-white shadow-[0_4px_24px_rgba(99,102,241,0.55)] animate-bounce-slow">
      3+ Yrs Exp 🚀
    </div>

    {/* Available Badge */}
    <div className="absolute right-[-24px] top-[10px] z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-[5px] font-outfit text-[11px] font-semibold text-emerald-500">
      <span className="h-[6px] w-[6px] rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
      Available
    </div>

    {/* Decorative Dots */}
    {[
      ["-18px", "60px", "6px", "rgba(99,102,241,0.5)"],
      ["-22px", "120px", "4px", "rgba(6,182,212,0.4)"],
      ["240px", "80px", "6px", "rgba(99,102,241,0.5)"],
      ["238px", "155px", "4px", "rgba(6,182,212,0.4)"],
    ].map(([left, top, size, color], i) => (
      <div
        key={i}
        className="absolute z-10 rounded-full"
        style={{
          left,
          top,
          width: size,
          height: size,
          background: color,
        }}
      />
    ))}
  </div>
);

// ── Hero ───────────────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center  sm:pt-0 pt-44 overflow-hidden px-6 md:px-10 lg:px-16"
    >
      {/* Glow Left */}
      <div className="pointer-events-none absolute -left-[5%] top-[5%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.09)_0%,transparent_65%)]" />

      {/* Glow Right */}
      <div className="pointer-events-none absolute bottom-[5%] right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.07)_0%,transparent_65%)]" />

      <div className="relative  z-10 mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-10 lg:gap-20">
        {/* LEFT */}
        <div className="min-w-0  flex-1 basis-[340px]">
          {/* Badge */}
          <div className="mb-6   inline-flex animate-fadeUp items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            <span className="font-outfit text-[11px] text-start font-bold tracking-[0.12em] text-indigo-200">
              MERN STACK DEVELOPER
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-start animate-fadeUp font-syne text-[clamp(2.6rem,5.5vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white [animation-delay:0.1s]">
            <span className="mb-1 block text-[0.55em] font-bold tracking-[-0.02em] text-slate-100/75">
              Hi, I'm
            </span>

            <span className="bg-gradient-to-r from-indigo-200 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Ram Sakal
            </span>

            <div className="sm:block hidden">{/* <br /> */}</div>

            <span> Patel</span>
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-[500px] animate-fadeUp font-outfit text-[clamp(0.9rem,1.6vw,1.05rem)] leading-[1.78] text-slate-400 [animation-delay:0.2s]">
            Building{" "}
            <span className="font-semibold text-indigo-400">
              scalable, real-time web & mobile apps
            </span>{" "}
            with 3+ years of hands-on experience. From prediction markets to
            blockchain integrations — I ship production-ready UI that performs.
          </p>

          {/* Buttons */}
          <div className="flex animate-fadeUp flex-wrap gap-3 [animation-delay:0.3s]">
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 px-7 py-3 font-outfit text-[13.5px] font-bold text-white shadow-[0_0_28px_rgba(99,102,241,0.45),0_4px_16px_rgba(0,0,0,0.3)] transition duration-300 hover:scale-105"
            >
              Hire Me →
            </a>

            <a
              href="https://www.linkedin.com/in/ram-sakal-patel-94766221b/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3 font-outfit text-[13.5px] font-semibold text-white/80 transition duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Tags */}
          <div className="mt-6 flex animate-fadeUp flex-wrap gap-2 [animation-delay:0.4s]">
            {[
              "React.js",
              "Next.js",
              "Node.js",
              "WebSockets",
              "React Native",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11.5px] font-semibold text-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 flex mx-auto w-full  justify-center  sm:justify-start animate-fadeUp flex-wrap gap-8 [animation-delay:0.5s]">
            {[
              ["3+", "Years"],
              ["10+", "Projects"],
              ["3", "Companies"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-syne text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold tracking-[-0.03em] text-transparent">
                  {num}
                </div>

                <div className="mt-1 font-outfit text-[10.5px] tracking-[0.06em] text-slate-400/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex mx-auto items-center self-center   animate-fadeUp justify-center pr-0 md:pr-6 [animation-delay:0.25s]">
          <ProfilePhoto />
        </div>
      </div>
    </section>
  );
};

// ── Section Header ─────────────────────────────────────────────────────────
const SectionHeader = ({ label, title, color = "#6366f1" }) => (
  <Reveal>
    <div style={{ marginBottom: 48 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          color,
          fontWeight: 700,
          marginBottom: 10,
          fontFamily: "'Outfit',sans-serif",
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
          fontWeight: 800,
          color: "#f1f5f9",
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  </Reveal>
);

// ── Experience ─────────────────────────────────────────────────────────────
const Experience = () => (
  <section id="experience" className="px-[clamp(20px,8vw,140px)] py-[100px]">
    <SectionHeader
      label="CAREER TIMELINE"
      title="Work Experience"
      color="#6366f1"
    />

    <div className="relative pl-8">
      {/* Timeline Line */}
      <div className="absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />

      {EXPERIENCES.map((exp, i) => (
        <Reveal key={i} delay={i * 100}>
          <div className="relative mb-10">
            {/* Dot */}
            <div
              className="absolute -left-[38px] top-2 h-3 w-3 rounded-full border-2 border-[#080a14]"
              style={{
                background: exp.color,
                boxShadow: `0 0 16px ${exp.color}`,
              }}
            />

            {/* Card */}
            <div
              className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5"
              style={{
                borderLeft: `2px solid ${exp.color}40`,
              }}
            >
              {/* Header */}
              <div className="mb-2.5 flex flex-wrap justify-between gap-2">
                <div>
                  <h3 className="mb-1 font-syne text-start text-[17px] font-bold tracking-[-0.02em] text-slate-100">
                    {exp.role}
                  </h3>

                  <div
                    className="text-[13px] font-semibold"
                    style={{ color: exp.color }}
                  >
                    {exp.company}{" "}
                    <span className="font-normal text-slate-400/50">
                      · {exp.location}
                    </span>
                  </div>
                </div>

                {/* Period Badge */}
                <span
                  className="h-fit whitespace-nowrap rounded-full border px-3 py-1 font-outfit text-[11px] font-semibold"
                  style={{
                    background: `${exp.color}15`,
                    color: exp.color,
                    borderColor: `${exp.color}30`,
                  }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Points */}
              <ul className="mt-2.5  text-start space-y-2 pl-4">
                {exp.points.map((point, j) => (
                  <li
                    key={j}
                    className="font-outfit text-[13px] leading-[1.65] text-slate-400/80"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// ── Projects ───────────────────────────────────────────────────────────────
const Projects = () => (
  <section id="projects" className="px-[clamp(20px,8vw,140px)] py-[100px]">
    <SectionHeader
      label="WHAT I BUILT"
      title="Featured Projects"
      color="#06b6d4"
    />

    {/* Grid */}
    <div className="grid  grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[18px]">
      {PROJECTS.map((p, i) => (
        <Reveal key={i} delay={i * 70}>
          {/* Card */}
          <div className="group relative cursor-default overflow-hidden h-60 rounded-[18px] border border-white/5 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-[22px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.4)]">
            {/* Top Border */}
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg,${p.color},transparent)`,
              }}
            />

            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              {/* Icon */}
              <div
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border text-[20px]"
                style={{
                  background: `${p.color}15`,
                  borderColor: `${p.color}25`,
                }}
              >
                {p.icon}
              </div>

              {/* Period */}
              <span className="font-outfit text-[10px] text-slate-400/40">
                {p.period}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-2 font-syne text-[15px] font-bold tracking-[-0.02em] text-slate-100">
              {p.name}
            </h3>

            {/* Description */}
            <p className="mb-4 font-outfit text-[12.5px] leading-[1.65] text-slate-400/70">
              {p.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-[5px]">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-[9px] py-[3px] font-outfit text-[11px] font-semibold"
                  style={{
                    background: `${p.color}12`,
                    color: p.color,
                    borderColor: `${p.color}22`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// ── Skills ─────────────────────────────────────────────────────────────────
const Skills = () => {
  const colors = [
    "#6366f1",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#f97316",
    "#3b82f6",
  ];

  return (
    <section id="skills" className="px-[clamp(20px,8vw,140px)] py-[100px]">
      <SectionHeader
        label="TECH ARSENAL"
        title="Skills & Technologies"
        color="#10b981"
      />

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[14px]">
        {Object.entries(SKILLS).map(([cat, items], i) => {
          const color = colors[i % colors.length];

          return (
            <Reveal key={cat} delay={i * 55}>
              {/* Card */}
              <div className="rounded-[14px] h-48 border border-white/5 bg-white/[0.02] p-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-white/10">
                {/* Category */}
                <div
                  className="mb-3 font-outfit text-[10.5px] font-bold tracking-[0.12em]"
                  style={{ color }}
                >
                  {cat.toUpperCase()}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-[6px]">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border px-[10px] py-[4px] font-outfit text-[11.5px] font-medium text-slate-200/80"
                      style={{
                        background: `${color}10`,
                        borderColor: `${color}18`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

// ── Education ──────────────────────────────────────────────────────────────
const Education = () => (
  <section
    id="education"
    className="px-[clamp(20px,8vw,140px)] py-[50px]   mx-auto "
  >
    <SectionHeader
      label="ACADEMIC BACKGROUND"
      title="Education"
      color="#f59e0b"
    />

    {/* Grid */}
    <div className="grid   grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[18px]">
      {EDUCATION.map((edu, i) => (
        <Reveal key={i} delay={i * 90} className="">
          {/* Card */}
          <div
            className="group relative  cursor-default h-[300px] overflow-hidden rounded-[18px] border border-white/5 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            style={{
              borderTop: `2px solid ${edu.color}55`,
            }}
          >
            {/* Glow Circle */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-[130px] w-[130px] rounded-full"
              style={{
                background: `radial-gradient(circle,${edu.color}08,transparent 70%)`,
              }}
            />

            {/* Header */}
            <div className="mb-4 flex items-start gap-[14px]">
              {/* Icon */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border text-[22px]"
                style={{
                  background: `${edu.color}15`,
                  borderColor: `${edu.color}28`,
                }}
              >
                {edu.icon}
              </div>

              {/* Status */}
              <div className="flex-1 pt-[2px]">
                <span
                  className="rounded-full border px-[10px] py-[3px] font-outfit text-[10px] font-bold"
                  style={{
                    background: `${edu.color}15`,
                    color: edu.color,
                    borderColor: `${edu.color}28`,
                  }}
                >
                  {edu.status}
                </span>
              </div>
            </div>

            {/* Degree */}
            <h3 className="mb-2 font-syne text-[14.5px] font-bold leading-[1.4] text-slate-100">
              {edu.degree}
            </h3>

            {/* Institute */}
            <div
              className="mb-1 font-outfit text-[13px] font-semibold"
              style={{ color: edu.color }}
            >
              {edu.institute}
            </div>

            {/* Location */}
            <div className="mb-3 font-outfit text-[12px] text-slate-400/50">
              📍 {edu.location}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-1.5 border-t border-white/5 pt-2.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={edu.color}
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>

              <span className="font-outfit text-[12px] text-slate-400/50">
                {edu.period}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// ── Contact ────────────────────────────────────────────────────────────────
const Contact = () => (
  <section
    id="contact"
    className="relative px-[clamp(20px,8vw,140px)] pt-[100px] pb-20"
  >
    {/* Glow Background */}
    <div className="pointer-events-none absolute left-1/2 top-[20%] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.07)_0%,transparent_70%)]" />

    <SectionHeader label="LET'S TALK" title="Get In Touch" color="#6366f1" />

    <Reveal delay={80}>
      {/* Grid */}
      <div className="mx-auto grid max-w-[840px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[14px]">
        {[
          {
            icon: "✉️",
            label: "Email",
            value: "ramsakalpatel253@gmail.com",
            href: "mailto:ramsakalpatel253@gmail.com",
            color: "#6366f1",
          },
          {
            icon: "📱",
            label: "Phone",
            value: "+91 7355049718",
            href: "tel:+917355049718",
            color: "#06b6d4",
          },
          {
            icon: "💼",
            label: "LinkedIn",
            value: "ram-sakal-patel",
            href: "https://www.linkedin.com/in/ram-sakal-patel-94766221b/",
            color: "#10b981",
          },
          {
            icon: "📍",
            label: "Location",
            value: "Lucknow, U.P.",
            href: null,
            color: "#f59e0b",
          },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => item.href && window.open(item.href)}
            className={`group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ${
              item.href
                ? "cursor-pointer hover:-translate-y-1"
                : "cursor-default"
            }`}
            style={{
              ...(item.href && {
                "--hover-bg": `${item.color}10`,
                "--hover-border": `${item.color}28`,
              }),
            }}
            onMouseEnter={(e) => {
              if (item.href) {
                e.currentTarget.style.background = `${item.color}10`;
                e.currentTarget.style.borderColor = `${item.color}28`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            {/* Icon */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-[18px]"
              style={{
                background: `${item.color}15`,
                borderColor: `${item.color}25`,
              }}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div>
              <div
                className="mb-[3px] font-outfit text-[10.5px] font-bold tracking-[0.08em]"
                style={{ color: item.color }}
              >
                {item.label}
              </div>

              <div className="break-all font-outfit text-[12px] text-slate-200/70">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>

    {/* Footer */}
    <div className="mt-16 text-center font-outfit text-[12px] tracking-[0.06em] text-slate-400/25">
      Designed & Built by Ram Sakal Patel · {new Date().getFullYear()}
    </div>
  </section>
);

// ── Root ───────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const fn = () => {
      const sections = NAV.map((n) => document.getElementById(n.toLowerCase()));
      for (const s of [...sections].reverse()) {
        if (s && window.scrollY >= s.offsetTop - 120) {
          setActive(s.id.charAt(0).toUpperCase() + s.id.slice(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      style={{
        background: "#080a14",
        color: "#f1f5f9",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#080a14;}
        ::-webkit-scrollbar-thumb{background:#6366f130;border-radius:4px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{from{transform:translate(0,0)}to{transform:translate(10px,-16px)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes spinRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes badgeBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>
      <Particles />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
