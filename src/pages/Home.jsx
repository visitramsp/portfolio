// import {useState, useEffect, useRef} from 'react';

// /* ── Gradient palette ── */
// const SECTIONS = [
//   {
//     id: 'hero',
//     label: 'Welcome',
//     bg: ['#0f0c29', '#302b63', '#24243e'],
//     accent: '#a78bfa',
//     title: 'Craft Meets Code',
//     sub: 'Scroll down to explore the experience',
//     emoji: '✦',
//   },
//   {
//     id: 'about',
//     label: 'About',
//     bg: ['#1a1a2e', '#16213e', '#0f3460'],
//     accent: '#38bdf8',
//     title: 'Built for Impact',
//     sub: 'Every pixel intentional. Every interaction memorable.',
//     emoji: '◈',
//   },
//   {
//     id: 'work',
//     label: 'Work',
//     bg: ['#0d1117', '#1b2838', '#0f2027'],
//     accent: '#34d399',
//     title: 'Real-World Projects',
//     sub: 'Production-grade apps shipped across industries.',
//     emoji: '⬡',
//   },
//   {
//     id: 'skills',
//     label: 'Skills',
//     bg: ['#1f1235', '#2d1b69', '#11998e'],
//     accent: '#f472b6',
//     title: 'Full-Stack Arsenal',
//     sub: 'React · Node · WebSockets · React Native · TypeScript',
//     emoji: '◉',
//   },
//   {
//     id: 'contact',
//     label: 'Contact',
//     bg: ['#0f0c29', '#1a0533', '#2d1b69'],
//     accent: '#fb923c',
//     title: "Let's Build Together",
//     sub: 'Open to opportunities and collaborations.',
//     emoji: '★',
//   },
// ];

// const CARDS = [
//   {
//     icon: '⚡',
//     title: 'React.js',
//     desc: 'Component-driven UIs with hooks, context & performance optimizations.',
//     color: '#a78bfa',
//   },
//   {
//     icon: '🌐',
//     title: 'Next.js',
//     desc: 'SSR, SSG & API routes for production-ready web applications.',
//     color: '#38bdf8',
//   },
//   {
//     icon: '🔄',
//     title: 'WebSockets',
//     desc: 'Real-time data streaming for live dashboards & trading platforms.',
//     color: '#34d399',
//   },
//   {
//     icon: '📱',
//     title: 'React Native',
//     desc: 'Cross-platform mobile apps with native feel & performance.',
//     color: '#f472b6',
//   },
//   {
//     icon: '⚙️',
//     title: 'Node.js',
//     desc: 'Scalable back-end services, REST APIs & microservices.',
//     color: '#fb923c',
//   },
//   {
//     icon: '🗄️',
//     title: 'MongoDB',
//     desc: 'NoSQL document store for flexible, high-performance data layers.',
//     color: '#fbbf24',
//   },
// ];

// /* ── lerp helper ── */
// const lerp = (a, b, t) => a + (b - a) * t;

// /* ─────────────────────────────────────────
//    CUSTOM CURSOR
// ───────────────────────────────────────── */
// function Cursor() {
//   const dot = useRef(null);
//   const ring = useRef(null);
//   const trail = useRef(null);
//   const pos = useRef({x: -100, y: -100});
//   const smooth = useRef({x: -100, y: -100});
//   const raf = useRef(null);
//   const [accent, setAccent] = useState('#a78bfa');
//   const [clicking, setClicking] = useState(false);
//   const [hovering, setHovering] = useState(false);

//   useEffect(() => {
//     const move = e => {
//       pos.current = {x: e.clientX, y: e.clientY};
//     };
//     const down = () => setClicking(true);
//     const up = () => setClicking(false);

//     const checkHover = e => {
//       const el = e.target;
//       setHovering(
//         el.tagName === 'BUTTON' ||
//           el.tagName === 'A' ||
//           el.classList.contains('card') ||
//           el.classList.contains('nav-item') ||
//           el.closest('.card') ||
//           el.closest('button'),
//       );
//     };

//     window.addEventListener('mousemove', move);
//     window.addEventListener('mousemove', checkHover);
//     window.addEventListener('mousedown', down);
//     window.addEventListener('mouseup', up);

//     const animate = () => {
//       smooth.current.x = lerp(smooth.current.x, pos.current.x, 0.12);
//       smooth.current.y = lerp(smooth.current.y, pos.current.y, 0.12);
//       if (dot.current) {
//         dot.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
//       }
//       if (ring.current) {
//         const s = clicking ? 0.6 : hovering ? 1.6 : 1;
//         ring.current.style.transform = `translate(${smooth.current.x - 20}px, ${smooth.current.y - 20}px) scale(${s})`;
//       }
//       if (trail.current) {
//         trail.current.style.transform = `translate(${lerp(smooth.current.x, pos.current.x, 0.04) - 30}px, ${lerp(smooth.current.y, pos.current.y, 0.04) - 30}px)`;
//       }
//       raf.current = requestAnimationFrame(animate);
//     };
//     raf.current = requestAnimationFrame(animate);

//     return () => {
//       window.removeEventListener('mousemove', move);
//       window.removeEventListener('mousemove', checkHover);
//       window.removeEventListener('mousedown', down);
//       window.removeEventListener('mouseup', up);
//       cancelAnimationFrame(raf.current);
//     };
//   }, [clicking, hovering]);

//   /* listen for section changes */
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       entries => {
//         entries.forEach(e => {
//           if (e.isIntersecting) {
//             const id = e.target.dataset.sectionId;
//             const sec = SECTIONS.find(s => s.id === id);
//             if (sec) setAccent(sec.accent);
//           }
//         });
//       },
//       {threshold: 0.5},
//     );
//     document
//       .querySelectorAll('[data-section-id]')
//       .forEach(el => obs.observe(el));
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <>
//       {/* dot */}
//       <div
//         ref={dot}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: 10,
//           height: 10,
//           borderRadius: '50%',
//           background: accent,
//           pointerEvents: 'none',
//           zIndex: 9999,
//           transition: 'background 0.4s',
//           boxShadow: `0 0 12px ${accent}`,
//         }}
//       />
//       {/* ring */}
//       <div
//         ref={ring}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: 40,
//           height: 40,
//           borderRadius: '50%',
//           border: `1.5px solid ${accent}`,
//           pointerEvents: 'none',
//           zIndex: 9998,
//           transition:
//             'transform 0.08s linear, border-color 0.4s, transform 0.15s ease',
//           opacity: 0.7,
//         }}
//       />
//       {/* trail glow */}
//       <div
//         ref={trail}
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: 60,
//           height: 60,
//           borderRadius: '50%',
//           background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
//           pointerEvents: 'none',
//           zIndex: 9997,
//           transition: 'background 0.4s',
//         }}
//       />
//       <style>{`* { cursor: none !important; }`}</style>
//     </>
//   );
// }

// /* ─────────────────────────────────────────
//    ANIMATED BACKGROUND
// ───────────────────────────────────────── */
// function AnimatedBG({section}) {
//   const [from, setFrom] = useState(section);
//   const [to, setTo] = useState(section);
//   const [progress, setProgress] = useState(1);
//   const raf = useRef(null);
//   const startTime = useRef(null);

//   useEffect(() => {
//     setFrom(to);
//     setTo(section);
//     setProgress(0);
//     startTime.current = null;
//     const animate = now => {
//       if (!startTime.current) startTime.current = now;
//       const p = Math.min((now - startTime.current) / 800, 1);
//       setProgress(p);
//       if (p < 1) raf.current = requestAnimationFrame(animate);
//     };
//     raf.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf.current);
//   }, [section]);

//   const blend = (a, b, t) => {
//     const hexToRgb = h => {
//       const r = parseInt(h.slice(1, 3), 16);
//       const g = parseInt(h.slice(3, 5), 16);
//       const b2 = parseInt(h.slice(5, 7), 16);
//       return [r, g, b2];
//     };
//     const rgbToHex = ([r, g, b2]) =>
//       '#' +
//       [r, g, b2].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
//     const [r1, g1, b1] = hexToRgb(a);
//     const [r2, g2, b2] = hexToRgb(b);
//     return rgbToHex([lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t)]);
//   };

//   const eased =
//     progress < 0.5
//       ? 2 * progress * progress
//       : 1 - Math.pow(-2 * progress + 2, 2) / 2;
//   const c = [0, 1, 2].map(i => blend(from.bg[i], to.bg[i], eased));

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         inset: 0,
//         zIndex: 0,
//         background: `linear-gradient(135deg, ${c[0]} 0%, ${c[1]} 50%, ${c[2]} 100%)`,
//       }}>
//       {/* Floating orbs */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           overflow: 'hidden',
//           pointerEvents: 'none',
//         }}>
//         {[
//           {
//             x: '10%',
//             y: '20%',
//             size: 400,
//             color: to.accent + '18',
//             delay: '0s',
//             dur: '18s',
//           },
//           {
//             x: '70%',
//             y: '60%',
//             size: 320,
//             color: to.accent + '12',
//             delay: '4s',
//             dur: '22s',
//           },
//           {
//             x: '40%',
//             y: '80%',
//             size: 280,
//             color: to.accent + '0e',
//             delay: '2s',
//             dur: '16s',
//           },
//         ].map((orb, i) => (
//           <div
//             key={i}
//             style={{
//               position: 'absolute',
//               left: orb.x,
//               top: orb.y,
//               width: orb.size,
//               height: orb.size,
//               borderRadius: '50%',
//               background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
//               animation: `floatOrb ${orb.dur} ease-in-out ${orb.delay} infinite alternate`,
//               transform: 'translate(-50%, -50%)',
//             }}
//           />
//         ))}
//       </div>
//       {/* Grid overlay */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: `linear-gradient(${to.accent}08 1px, transparent 1px), linear-gradient(90deg, ${to.accent}08 1px, transparent 1px)`,
//           backgroundSize: '60px 60px',
//           transition: 'background-image 0.8s',
//         }}
//       />
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    3D SCROLL CARD
// ───────────────────────────────────────── */
// function Card3D({icon, title, desc, color, index}) {
//   const ref = useRef(null);
//   const [rot, setRot] = useState({x: 0, y: 0});
//   const [glowPos, setGlowPos] = useState({x: 50, y: 50});
//   const [hovered, setHovered] = useState(false);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([e]) => {
//         if (e.isIntersecting) setVisible(true);
//       },
//       {threshold: 0.2},
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);

//   const onMouseMove = e => {
//     const rect = ref.current.getBoundingClientRect();
//     const cx = rect.left + rect.width / 2;
//     const cy = rect.top + rect.height / 2;
//     const dx = (e.clientX - cx) / (rect.width / 2);
//     const dy = (e.clientY - cy) / (rect.height / 2);
//     setRot({x: -dy * 12, y: dx * 12});
//     setGlowPos({
//       x: ((e.clientX - rect.left) / rect.width) * 100,
//       y: ((e.clientY - rect.top) / rect.height) * 100,
//     });
//   };

//   const onLeave = () => {
//     setRot({x: 0, y: 0});
//     setHovered(false);
//   };

//   return (
//     <div
//       ref={ref}
//       className="card"
//       onMouseMove={onMouseMove}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={onLeave}
//       style={{
//         perspective: '800px',
//         opacity: visible ? 1 : 0,
//         transform: visible ? 'translateY(0)' : 'translateY(40px)',
//         transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
//       }}>
//       <div
//         style={{
//           background: 'rgba(255,255,255,0.05)',
//           backdropFilter: 'blur(12px)',
//           border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.08)'}`,
//           borderRadius: 20,
//           padding: '28px 24px',
//           position: 'relative',
//           overflow: 'hidden',
//           transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${hovered ? 1.03 : 1})`,
//           transition: hovered
//             ? 'transform 0.1s ease, border-color 0.3s'
//             : 'transform 0.5s ease, border-color 0.3s',
//           boxShadow: hovered
//             ? `0 24px 48px rgba(0,0,0,0.5), 0 0 32px ${color}33`
//             : '0 8px 24px rgba(0,0,0,0.3)',
//         }}>
//         {/* Mouse-follow glow */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             borderRadius: 20,
//             background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}22 0%, transparent 60%)`,
//             opacity: hovered ? 1 : 0,
//             transition: 'opacity 0.3s',
//             pointerEvents: 'none',
//           }}
//         />
//         {/* Top accent */}
//         <div
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: 2,
//             background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
//             opacity: hovered ? 1 : 0.3,
//             transition: 'opacity 0.3s',
//           }}
//         />

//         <div style={{fontSize: 32, marginBottom: 14}}>{icon}</div>
//         <div
//           style={{
//             fontSize: 17,
//             fontWeight: 700,
//             color: '#f0f4ff',
//             marginBottom: 8,
//             fontFamily: "'Syne', sans-serif",
//             letterSpacing: '-0.02em',
//           }}>
//           {title}
//         </div>
//         <div
//           style={{
//             fontSize: 13,
//             color: 'rgba(255,255,255,0.5)',
//             lineHeight: 1.7,
//           }}>
//           {desc}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    SCROLL 3D SECTION HERO
// ───────────────────────────────────────── */
// function SectionHero({section, scrollRatio}) {
//   const scale = 1 - scrollRatio * 0.08;
//   const translateY = scrollRatio * -40;
//   const opacity = 1 - scrollRatio * 1.4;

//   return (
//     <div
//       style={{
//         position: 'sticky',
//         top: 0,
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center',
//         padding: '0 24px',
//         opacity: Math.max(0, opacity),
//         transform: `scale(${scale}) translateY(${translateY}px)`,
//         pointerEvents: 'none',
//       }}>
//       <div
//         style={{
//           fontSize: 'clamp(3rem, 8vw, 7rem)',
//           fontWeight: 800,
//           fontFamily: "'Syne', sans-serif",
//           letterSpacing: '-0.05em',
//           lineHeight: 1,
//           color: '#f0f4ff',
//           marginBottom: 24,
//           textShadow: `0 0 80px ${section.accent}55`,
//         }}>
//         <span style={{color: section.accent}}>{section.emoji} </span>
//         {section.title}
//       </div>
//       <div
//         style={{
//           fontSize: 'clamp(1rem, 2vw, 1.25rem)',
//           color: 'rgba(255,255,255,0.5)',
//           maxWidth: 520,
//           lineHeight: 1.7,
//           fontFamily: "'Space Grotesk', sans-serif",
//         }}>
//         {section.sub}
//       </div>
//       {/* Scroll indicator */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: 48,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: 8,
//           opacity: scrollRatio < 0.05 ? 1 : 0,
//           transition: 'opacity 0.4s',
//         }}>
//         <div
//           style={{
//             fontSize: 11,
//             letterSpacing: '0.2em',
//             color: 'rgba(255,255,255,0.3)',
//             textTransform: 'uppercase',
//             fontFamily: "'Space Grotesk', sans-serif",
//           }}>
//           Scroll
//         </div>
//         <div
//           style={{
//             width: 1,
//             height: 48,
//             background: `linear-gradient(to bottom, ${section.accent}, transparent)`,
//             animation: 'scrollPulse 1.8s ease-in-out infinite',
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    NAV
// ───────────────────────────────────────── */
// function Nav({active, accent}) {
//   return (
//     <nav
//       style={{
//         position: 'fixed',
//         top: 24,
//         left: '50%',
//         transform: 'translateX(-50%)',
//         zIndex: 1000,
//         display: 'flex',
//         gap: 4,
//         background: 'rgba(0,0,0,0.35)',
//         backdropFilter: 'blur(20px)',
//         border: '1px solid rgba(255,255,255,0.08)',
//         borderRadius: 100,
//         padding: '6px 8px',
//       }}>
//       {SECTIONS.map(s => (
//         <a
//           key={s.id}
//           className="nav-item"
//           href={`#${s.id}`}
//           style={{
//             padding: '6px 16px',
//             borderRadius: 100,
//             fontSize: 12,
//             fontWeight: 600,
//             letterSpacing: '0.06em',
//             textDecoration: 'none',
//             textTransform: 'uppercase',
//             fontFamily: "'Space Grotesk', sans-serif",
//             color: active === s.id ? '#fff' : 'rgba(255,255,255,0.4)',
//             background: active === s.id ? `${accent}33` : 'transparent',
//             border:
//               active === s.id
//                 ? `1px solid ${accent}44`
//                 : '1px solid transparent',
//             transition: 'all 0.25s',
//           }}>
//           {s.label}
//         </a>
//       ))}
//     </nav>
//   );
// }

// /* ─────────────────────────────────────────
//    CONTACT FORM
// ───────────────────────────────────────── */
// function ContactForm({accent}) {
//   const [fields, setFields] = useState({name: '', email: '', msg: ''});
//   const [sent, setSent] = useState(false);
//   const set = k => e => setFields(f => ({...f, [k]: e.target.value}));
//   const submit = e => {
//     e.preventDefault();
//     setSent(true);
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 16px',
//     background: 'rgba(255,255,255,0.06)',
//     border: `1px solid rgba(255,255,255,0.1)`,
//     borderRadius: 12,
//     color: '#f0f4ff',
//     fontSize: 14,
//     fontFamily: "'Space Grotesk', sans-serif",
//     outline: 'none',
//     boxSizing: 'border-box',
//   };

//   if (sent)
//     return (
//       <div style={{textAlign: 'center', padding: '48px 24px'}}>
//         <div style={{fontSize: 48, marginBottom: 16}}>✦</div>
//         <div
//           style={{
//             fontSize: 22,
//             fontWeight: 700,
//             color: '#f0f4ff',
//             fontFamily: "'Syne', sans-serif",
//             marginBottom: 8,
//           }}>
//           Message Sent!
//         </div>
//         <div style={{color: 'rgba(255,255,255,0.5)', fontSize: 14}}>
//           I'll get back to you soon.
//         </div>
//       </div>
//     );

//   return (
//     <form
//       onSubmit={submit}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 16,
//         maxWidth: 480,
//         margin: '0 auto',
//       }}>
//       <input
//         placeholder="Your name"
//         value={fields.name}
//         onChange={set('name')}
//         style={inputStyle}
//         required
//       />
//       <input
//         placeholder="Email address"
//         type="email"
//         value={fields.email}
//         onChange={set('email')}
//         style={inputStyle}
//         required
//       />
//       <textarea
//         placeholder="Your message…"
//         value={fields.msg}
//         onChange={set('msg')}
//         rows={5}
//         style={{...inputStyle, resize: 'vertical'}}
//         required
//       />
//       <button
//         type="submit"
//         style={{
//           padding: '14px 32px',
//           borderRadius: 12,
//           background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
//           border: 'none',
//           color: '#fff',
//           fontSize: 14,
//           fontWeight: 700,
//           fontFamily: "'Space Grotesk', sans-serif",
//           letterSpacing: '0.06em',
//           cursor: 'none',
//           boxShadow: `0 0 32px ${accent}55`,
//           transition: 'transform 0.2s, box-shadow 0.2s',
//         }}
//         onMouseEnter={e => {
//           e.target.style.transform = 'translateY(-2px)';
//           e.target.style.boxShadow = `0 8px 32px ${accent}88`;
//         }}
//         onMouseLeave={e => {
//           e.target.style.transform = '';
//           e.target.style.boxShadow = `0 0 32px ${accent}55`;
//         }}>
//         SEND MESSAGE →
//       </button>
//     </form>
//   );
// }

// /* ─────────────────────────────────────────
//    ROOT APP
// ───────────────────────────────────────── */
// export default function App() {
//   const [activeSection, setActiveSection] = useState(SECTIONS[0]);
//   const [sectionScrollRatios, setSectionScrollRatios] = useState({});

//   useEffect(() => {
//     const handleScroll = () => {
//       const ratios = {};
//       SECTIONS.forEach(sec => {
//         const el = document.getElementById(sec.id);
//         if (!el) return;
//         const rect = el.getBoundingClientRect();
//         const vh = window.innerHeight;
//         ratios[sec.id] = Math.max(0, Math.min(1, -rect.top / vh));
//         if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5)
//           setActiveSection(sec);
//       });
//       setSectionScrollRatios(ratios);
//     };
//     window.addEventListener('scroll', handleScroll, {passive: true});
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
//         html { scroll-behavior: smooth; }
//         body { margin: 0; overflow-x: hidden; }
//         * { box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 3px; }
//         ::-webkit-scrollbar-track { background: #0f0c29; }
//         ::-webkit-scrollbar-thumb { background: ${activeSection.accent}; border-radius: 2px; }
//         ::selection { background: ${activeSection.accent}55; color: #fff; }
//         @keyframes floatOrb { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-50%,-50%) scale(1.2) translate(20px, -20px); } }
//         @keyframes scrollPulse { 0%,100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.2); } }
//         @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
//       `}</style>

//       <Cursor />
//       <AnimatedBG section={activeSection} />
//       <Nav active={activeSection.id} accent={activeSection.accent} />

//       <main style={{position: 'relative', zIndex: 2}}>
//         {/* HERO */}
//         <section
//           id="hero"
//           data-section-id="hero"
//           style={{height: '200vh', position: 'relative'}}>
//           <SectionHero
//             section={SECTIONS[0]}
//             scrollRatio={sectionScrollRatios['hero'] || 0}
//           />
//         </section>

//         {/* ABOUT */}
//         <section
//           id="about"
//           data-section-id="about"
//           style={{
//             minHeight: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '100px 40px',
//           }}>
//           <div style={{maxWidth: 800, textAlign: 'center'}}>
//             <div
//               style={{
//                 fontSize: 11,
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 letterSpacing: '0.2em',
//                 color: SECTIONS[1].accent,
//                 textTransform: 'uppercase',
//                 marginBottom: 16,
//               }}>
//               About
//             </div>
//             <h2
//               style={{
//                 fontSize: 'clamp(2.4rem,5vw,4.2rem)',
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 800,
//                 letterSpacing: '-0.04em',
//                 color: '#f0f4ff',
//                 marginBottom: 24,
//                 lineHeight: 1.1,
//               }}>
//               MERN Stack Developer
//               <br />
//               <span
//                 style={{
//                   background: `linear-gradient(135deg, ${SECTIONS[1].accent}, #a78bfa)`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                 }}>
//                 from Lucknow
//               </span>
//             </h2>
//             <p
//               style={{
//                 fontSize: 17,
//                 color: 'rgba(255,255,255,0.55)',
//                 lineHeight: 1.9,
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 maxWidth: 600,
//                 margin: '0 auto',
//               }}>
//               3+ years shipping production-grade apps — from real-time
//               prediction markets to blockchain frontends. I turn complex
//               requirements into polished, performant interfaces.
//             </p>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: 48,
//                 marginTop: 48,
//                 flexWrap: 'wrap',
//               }}>
//               {[
//                 ['3+', 'Years'],
//                 ['10+', 'Projects'],
//                 ['3', 'Companies'],
//               ].map(([n, l]) => (
//                 <div key={l} style={{textAlign: 'center'}}>
//                   <div
//                     style={{
//                       fontSize: 'clamp(2rem,4vw,3rem)',
//                       fontFamily: "'Syne', sans-serif",
//                       fontWeight: 800,
//                       background: `linear-gradient(135deg, ${SECTIONS[1].accent}, #f0f4ff)`,
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent',
//                       backgroundClip: 'text',
//                       letterSpacing: '-0.04em',
//                     }}>
//                     {n}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 11,
//                       color: 'rgba(255,255,255,0.3)',
//                       letterSpacing: '0.1em',
//                       textTransform: 'uppercase',
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       marginTop: 4,
//                     }}>
//                     {l}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* WORK */}
//         <section
//           id="work"
//           data-section-id="work"
//           style={{minHeight: '100vh', padding: '100px 40px'}}>
//           <div style={{maxWidth: 1100, margin: '0 auto'}}>
//             <div style={{textAlign: 'center', marginBottom: 64}}>
//               <div
//                 style={{
//                   fontSize: 11,
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   letterSpacing: '0.2em',
//                   color: SECTIONS[2].accent,
//                   textTransform: 'uppercase',
//                   marginBottom: 14,
//                 }}>
//                 Projects
//               </div>
//               <h2
//                 style={{
//                   fontSize: 'clamp(2rem,4vw,3.2rem)',
//                   fontFamily: "'Syne', sans-serif",
//                   fontWeight: 800,
//                   letterSpacing: '-0.04em',
//                   color: '#f0f4ff',
//                   margin: 0,
//                 }}>
//                 Featured Work
//               </h2>
//             </div>
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns:
//                   'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
//                 gap: 18,
//               }}>
//               {[
//                 {
//                   icon: '📈',
//                   title: 'Prediction Market',
//                   desc: 'Real-time Yes/No trading platform with live WebSocket price updates. Like Kalshi.',
//                   color: '#a78bfa',
//                   period: '2024',
//                 },
//                 {
//                   icon: '🚖',
//                   title: 'goQuicksilver',
//                   desc: 'Airport transfers & hourly rentals with Google Maps live routing.',
//                   color: '#38bdf8',
//                   period: 'Mar 2025',
//                 },
//                 {
//                   icon: '🗺️',
//                   title: 'Transport Admin',
//                   desc: 'Live tracking, route visualization, dynamic fare engine for global logistics.',
//                   color: '#34d399',
//                   period: 'Mar 2025',
//                 },
//                 {
//                   icon: '📦',
//                   title: 'SupplyMatch',
//                   desc: 'UAE FMCG supply chain — Admin Console, Supplier CMS, React Native app.',
//                   color: '#f472b6',
//                   period: 'Mar 2024',
//                 },
//                 {
//                   icon: '🏢',
//                   title: 'ERP Suite',
//                   desc: 'Finance, Inventory, HR & CRM with Apex Charts dashboards.',
//                   color: '#fb923c',
//                   period: '2023',
//                 },
//                 {
//                   icon: '📋',
//                   title: 'Senzara',
//                   desc: 'Dynamic form platform with conditional workflows & multi-step validations.',
//                   color: '#fbbf24',
//                   period: '2025',
//                 },
//               ].map((p, i) => (
//                 <Card3D key={i} {...p} index={i} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* SKILLS */}
//         <section
//           id="skills"
//           data-section-id="skills"
//           style={{minHeight: '100vh', padding: '100px 40px'}}>
//           <div style={{maxWidth: 1100, margin: '0 auto'}}>
//             <div style={{textAlign: 'center', marginBottom: 64}}>
//               <div
//                 style={{
//                   fontSize: 11,
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   letterSpacing: '0.2em',
//                   color: SECTIONS[3].accent,
//                   textTransform: 'uppercase',
//                   marginBottom: 14,
//                 }}>
//                 Skills
//               </div>
//               <h2
//                 style={{
//                   fontSize: 'clamp(2rem,4vw,3.2rem)',
//                   fontFamily: "'Syne', sans-serif",
//                   fontWeight: 800,
//                   letterSpacing: '-0.04em',
//                   color: '#f0f4ff',
//                   margin: 0,
//                 }}>
//                 Tech Arsenal
//               </h2>
//             </div>
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns:
//                   'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
//                 gap: 18,
//               }}>
//               {CARDS.map((c, i) => (
//                 <Card3D key={i} {...c} index={i} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CONTACT */}
//         <section
//           id="contact"
//           data-section-id="contact"
//           style={{
//             minHeight: '100vh',
//             padding: '100px 40px 60px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <div style={{textAlign: 'center', marginBottom: 56}}>
//             <div
//               style={{
//                 fontSize: 11,
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 letterSpacing: '0.2em',
//                 color: SECTIONS[4].accent,
//                 textTransform: 'uppercase',
//                 marginBottom: 14,
//               }}>
//               Contact
//             </div>
//             <h2
//               style={{
//                 fontSize: 'clamp(2rem,4vw,3.2rem)',
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 800,
//                 letterSpacing: '-0.04em',
//                 color: '#f0f4ff',
//                 margin: 0,
//               }}>
//               Get In Touch
//             </h2>
//           </div>
//           <div style={{width: '100%', maxWidth: 520}}>
//             <ContactForm accent={SECTIONS[4].accent} />
//           </div>
//           <div
//             style={{
//               textAlign: 'center',
//               marginTop: 80,
//               fontSize: 12,
//               color: 'rgba(255,255,255,0.2)',
//               fontFamily: "'Space Grotesk', sans-serif",
//               letterSpacing: '0.06em',
//             }}>
//             Built by Ram Sakal Patel · {new Date().getFullYear()}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

import {useState, useEffect, useRef} from 'react';

/* ════════════════════════════════════════════
   DATA
════════════════════════════════════════════ */
const SECTIONS = [
  {
    id: 'hero',
    label: 'Home',
    bg: ['#0f0c29', '#302b63', '#24243e'],
    accent: '#a78bfa',
    title: 'Craft Meets Code',
    sub: 'Scroll down to explore the experience',
    emoji: '✦',
  },
  {
    id: 'about',
    label: 'About',
    bg: ['#1a1a2e', '#16213e', '#0f3460'],
    accent: '#38bdf8',
    title: 'Built for Impact',
    sub: 'Every pixel intentional. Every interaction memorable.',
    emoji: '◈',
  },
  {
    id: 'work',
    label: 'Work',
    bg: ['#0d1117', '#1b2838', '#0f2027'],
    accent: '#34d399',
    title: 'Real-World Projects',
    sub: 'Production-grade apps shipped across industries.',
    emoji: '⬡',
  },
  {
    id: 'skills',
    label: 'Skills',
    bg: ['#1f1235', '#2d1b69', '#11998e'],
    accent: '#f472b6',
    title: 'Full-Stack Arsenal',
    sub: 'React · Node · WebSockets · React Native · TypeScript',
    emoji: '◉',
  },
  {
    id: 'experience',
    label: 'Exp',
    bg: ['#0a1628', '#0f2044', '#1a3a6b'],
    accent: '#fbbf24',
    title: '3+ Years Experience',
    sub: 'Building real products across industries.',
    emoji: '◆',
  },
  {
    id: 'contact',
    label: 'Contact',
    bg: ['#0f0c29', '#1a0533', '#2d1b69'],
    accent: '#fb923c',
    title: "Let's Build Together",
    sub: 'Open to opportunities and collaborations.',
    emoji: '★',
  },
];

const PROJECTS = [
  {
    icon: '📈',
    title: 'Prediction Market',
    desc: 'Real-time Yes/No trading platform with live WebSocket price feeds, order books and live chart animations — modelled on Kalshi.',
    tags: ['React.js', 'Redux', 'WebSockets', 'Tailwind'],
    color: '#a78bfa',
    period: 'Jan 2024–Present',
    imgBg: 'linear-gradient(135deg,#1a0533,#4c1d95,#2d1b69)',
  },
  {
    icon: '🚖',
    title: 'goQuicksilver',
    desc: 'Global transportation booking — Airport Transfers, Hourly Rentals & Around Town trips with Google Maps live routing & real-time fare engine.',
    tags: ['React.js', 'Google Maps', 'Redux', 'MUI'],
    color: '#38bdf8',
    period: 'Mar 2025',
    imgBg: 'linear-gradient(135deg,#0c2340,#0f3460,#1a5276)',
  },
  {
    icon: '🗺️',
    title: 'Transport Admin',
    desc: 'Admin panel with live driver location tracking, route visualisation, dynamic fare management and analytics dashboards.',
    tags: ['React.js', 'Google Maps', 'Redux', 'Tailwind'],
    color: '#34d399',
    period: 'Mar 2025',
    imgBg: 'linear-gradient(135deg,#052e16,#064e3b,#065f46)',
  },
  {
    icon: '📦',
    title: 'SupplyMatch',
    desc: 'Full UAE FMCG supply-chain platform — Admin Console, Supplier Dashboard CMS, React Native app with Socket.io real-time inventory updates.',
    tags: ['React.js', 'React Native', 'Socket.io', 'Redux Saga'],
    color: '#f472b6',
    period: 'Mar 2024',
    imgBg: 'linear-gradient(135deg,#4a044e,#831843,#9d174d)',
  },
  {
    icon: '🏢',
    title: 'ERP Suite',
    desc: 'Enterprise platform covering Finance, Inventory, HR & CRM with rich Apex Charts visualisations and role-based access control.',
    tags: ['React.js', 'Apex Charts', 'MUI', 'Redux'],
    color: '#fb923c',
    period: '2023',
    imgBg: 'linear-gradient(135deg,#431407,#7c2d12,#9a3412)',
  },
  {
    icon: '📋',
    title: 'Senzara',
    desc: 'Dynamic multi-step form platform with conditional workflow engine, complex Formik+Yup validations and reusable component library.',
    tags: ['React.js', 'Formik', 'Yup', 'Tailwind'],
    color: '#fbbf24',
    period: '2025',
    imgBg: 'linear-gradient(135deg,#1c1007,#451a03,#78350f)',
  },
];

const SKILL_GROUPS = [
  {
    cat: 'Core Frontend',
    color: '#a78bfa',
    skills: [
      {name: 'React.js', level: 95},
      {name: 'Next.js', level: 88},
      {name: 'JavaScript', level: 95},
      {name: 'TypeScript', level: 82},
      {name: 'JSX/TSX', level: 90},
    ],
  },
  {
    cat: 'Mobile',
    color: '#38bdf8',
    skills: [
      {name: 'React Native', level: 80},
      {name: 'Expo', level: 72},
      {name: 'Native APIs', level: 68},
    ],
  },
  {
    cat: 'Backend',
    color: '#34d399',
    skills: [
      {name: 'Node.js', level: 85},
      {name: 'Express.js', level: 83},
      {name: 'MongoDB', level: 80},
      {name: 'MySQL', level: 72},
    ],
  },
  {
    cat: 'Styling',
    color: '#f472b6',
    skills: [
      {name: 'Tailwind CSS', level: 92},
      {name: 'MUI', level: 85},
      {name: 'ShadCN', level: 78},
      {name: 'SCSS', level: 80},
      {name: 'Ant Design', level: 75},
    ],
  },
  {
    cat: 'State Mgmt',
    color: '#fb923c',
    skills: [
      {name: 'Redux', level: 88},
      {name: 'Redux Saga', level: 80},
      {name: 'RTK', level: 85},
      {name: 'Redux Persist', level: 76},
    ],
  },
  {
    cat: 'Real-time',
    color: '#fbbf24',
    skills: [
      {name: 'WebSockets', level: 85},
      {name: 'Socket.io', level: 82},
    ],
  },
  {
    cat: 'Tools & Libs',
    color: '#818cf8',
    skills: [
      {name: 'Git', level: 88},
      {name: 'Axios', level: 90},
      {name: 'Formik+Yup', level: 85},
      {name: 'VS Code', level: 92},
    ],
  },
  {
    cat: 'Charts',
    color: '#2dd4bf',
    skills: [
      {name: 'Apex Charts', level: 82},
      {name: 'Apache E-Charts', level: 75},
      {name: 'React Table', level: 78},
    ],
  },
];

const EXPERIENCES = [
  {
    role: 'MERN Stack Developer',
    company: 'Dunitech Soft Solutions Pvt. Ltd.',
    location: 'Lucknow',
    period: 'Jul 2025 – Present',
    color: '#a78bfa',
    points: [
      'Built production-grade React.js & Next.js apps across multiple domains',
      'Developed Senzara — dynamic form platform with complex validations & conditional workflows',
      'Built goQuicksilver — global transportation booking with Google Maps API',
      'Developed Prediction Market platform (Kalshi-like) with WebSocket live price updates',
      'Integrated Blockchain frontend with smart contract APIs & wallet connectivity',
    ],
  },
  {
    role: 'Junior Frontend Developer',
    company: 'Omni Market Pvt. Ltd.',
    location: 'Mumbai',
    period: 'May 2024 – Jan 2025',
    color: '#38bdf8',
    points: [
      'Led SupplyMatch Admin Console for UAE FMCG operations',
      'Built Supplier Dashboard CMS for vendors to manage products, pricing & inventory',
      'Developed SupplyMatch React Native app with role-specific flows',
      'Integrated RESTful APIs for real-time inventory, order & shipment tracking',
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Aara Groups Pvt. Ltd.',
    location: 'Lucknow',
    period: 'Mar 2023 – Nov 2023',
    color: '#34d399',
    points: [
      'Developed CRM, HRM & ERP Admin Consoles for centralised operations',
      'Architected WebSocket infrastructure with Socket.io across all microservices',
      'Built AMAKA Industries e-commerce with role-based access & RESTful APIs',
    ],
  },
];

const lerp = (a, b, t) => a + (b - a) * t;

/* ════════════════════════════════════════════
   RESPONSIVE HOOK
════════════════════════════════════════════ */
function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return {isMobile: w < 640, isTablet: w < 1024, w};
}

/* ════════════════════════════════════════════
   CUSTOM CURSOR  (hidden on mobile)
════════════════════════════════════════════ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef(null);
  const pos = useRef({x: -100, y: -100});
  const smooth = useRef({x: -100, y: -100});
  const raf = useRef(null);
  const [accent, setAccent] = useState('#a78bfa');
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const {isMobile} = useBreakpoint();

  useEffect(() => {
    if (isMobile) return;
    const move = e => {
      pos.current = {x: e.clientX, y: e.clientY};
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const hover = e => {
      const el = e.target;
      setHovering(
        !!(
          el.tagName === 'BUTTON' ||
          el.tagName === 'A' ||
          el.closest('.card') ||
          el.closest('button') ||
          el.classList.contains('nav-item')
        ),
      );
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', hover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    const animate = () => {
      smooth.current.x = lerp(smooth.current.x, pos.current.x, 0.12);
      smooth.current.y = lerp(smooth.current.y, pos.current.y, 0.12);
      if (dot.current)
        dot.current.style.transform = `translate(${pos.current.x - 5}px,${pos.current.y - 5}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${smooth.current.x - 20}px,${smooth.current.y - 20}px) scale(${clicking ? 0.6 : hovering ? 1.6 : 1})`;
      if (trail.current)
        trail.current.style.transform = `translate(${lerp(smooth.current.x, pos.current.x, 0.04) - 30}px,${lerp(smooth.current.y, pos.current.y, 0.04) - 30}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', hover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      cancelAnimationFrame(raf.current);
    };
  }, [clicking, hovering, isMobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const sec = SECTIONS.find(s => s.id === e.target.dataset.sectionId);
            if (sec) setAccent(sec.accent);
          }
        });
      },
      {threshold: 0.5},
    );
    document
      .querySelectorAll('[data-section-id]')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (isMobile) return null;
  return (
    <>
      <div
        ref={dot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: accent,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.4s',
          boxShadow: `0 0 12px ${accent}`,
        }}
      />
      <div
        ref={ring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `1.5px solid ${accent}`,
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'border-color 0.4s',
          opacity: 0.7,
        }}
      />
      <div
        ref={trail}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: `radial-gradient(circle,${accent}22 0%,transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'background 0.4s',
        }}
      />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}

/* ════════════════════════════════════════════
   ANIMATED BACKGROUND
════════════════════════════════════════════ */
function AnimatedBG({section}) {
  const [from, setFrom] = useState(section);
  const [to, setTo] = useState(section);
  const [progress, setProgress] = useState(1);
  const raf = useRef(null);
  const t0 = useRef(null);

  useEffect(() => {
    setFrom(to);
    setTo(section);
    setProgress(0);
    t0.current = null;
    const run = now => {
      if (!t0.current) t0.current = now;
      const p = Math.min((now - t0.current) / 800, 1);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(run);
    };
    raf.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf.current);
  }, [section]);

  const blend = (a, b, t) => {
    const h2r = h => [
      parseInt(h.slice(1, 3), 16),
      parseInt(h.slice(3, 5), 16),
      parseInt(h.slice(5, 7), 16),
    ];
    const r2h = ([r, g, b]) =>
      '#' +
      [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
    const [r1, g1, b1] = h2r(a),
      [r2, g2, b2] = h2r(b);
    return r2h([lerp(r1, r2, t), lerp(g1, g2, t), lerp(b1, b2, t)]);
  };
  const e =
    progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
  const c = [0, 1, 2].map(i => blend(from.bg[i], to.bg[i], e));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: `linear-gradient(135deg,${c[0]} 0%,${c[1]} 50%,${c[2]} 100%)`,
      }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
        {[
          {x: '10%', y: '20%', s: 500, d: '18s', dl: '0s'},
          {x: '75%', y: '65%', s: 400, d: '22s', dl: '4s'},
          {x: '40%', y: '85%', s: 320, d: '16s', dl: '2s'},
          {x: '60%', y: '15%', s: 280, d: '24s', dl: '6s'},
        ].map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: o.x,
              top: o.y,
              width: o.s,
              height: o.s,
              borderRadius: '50%',
              background: `radial-gradient(circle,${to.accent}14 0%,transparent 70%)`,
              animation: `floatOrb ${o.d} ease-in-out ${o.dl} infinite alternate`,
              transform: 'translate(-50%,-50%)',
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${to.accent}07 1px,transparent 1px),linear-gradient(90deg,${to.accent}07 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
          transition: 'background-image 0.8s',
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   NAV
════════════════════════════════════════════ */
function Nav({active, accent}) {
  const [open, setOpen] = useState(false);
  const {isMobile} = useBreakpoint();

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px,4vw,48px)',
        height: 64,
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: '-0.03em',
          background: `linear-gradient(135deg,${accent},#fff)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
        RSP.
      </div>

      {isMobile ? (
        <>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: 'none',
              border: `1px solid ${accent}44`,
              borderRadius: 8,
              padding: '6px 10px',
              color: accent,
              fontSize: 18,
              cursor: 'none',
            }}>
            {open ? '✕' : '☰'}
          </button>
          {open && (
            <div
              style={{
                position: 'fixed',
                top: 64,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(10,8,30,0.97)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
                zIndex: 999,
              }}>
              {SECTIONS.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="nav-item"
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                    fontSize: 28,
                    letterSpacing: '-0.02em',
                    color: active === s.id ? accent : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}>
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 100,
            padding: '4px 6px',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="nav-item"
              style={{
                padding: '6px 16px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontFamily: "'Space Grotesk',sans-serif",
                color: active === s.id ? '#fff' : 'rgba(255,255,255,0.4)',
                background: active === s.id ? `${accent}30` : 'transparent',
                border:
                  active === s.id
                    ? `1px solid ${accent}44`
                    : '1px solid transparent',
                transition: 'all 0.25s',
              }}>
              {s.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ════════════════════════════════════════════
   HERO PARALLAX SECTION
════════════════════════════════════════════ */
function SectionHero({section, scrollRatio}) {
  const scale = 1 - scrollRatio * 0.08;
  const ty = scrollRatio * -40;
  const op = Math.max(0, 1 - scrollRatio * 1.4);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(20px,6vw,80px)',
        opacity: op,
        transform: `scale(${scale}) translateY(${ty}px)`,
        pointerEvents: 'none',
      }}>
      <div
        style={{
          fontSize: 'clamp(3rem,9vw,7.5rem)',
          fontWeight: 800,
          fontFamily: "'Syne',sans-serif",
          letterSpacing: '-0.05em',
          lineHeight: 1,
          color: '#f0f4ff',
          marginBottom: 24,
          textShadow: `0 0 100px ${section.accent}44`,
        }}>
        <span style={{color: section.accent}}>{section.emoji} </span>
        {section.title}
      </div>
      <div
        style={{
          fontSize: 'clamp(0.95rem,2vw,1.25rem)',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: 560,
          lineHeight: 1.8,
          fontFamily: "'Space Grotesk',sans-serif",
        }}>
        {section.sub}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: scrollRatio < 0.05 ? 1 : 0,
          transition: 'opacity 0.4s',
        }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk',sans-serif",
          }}>
          Scroll
        </div>
        <div
          style={{
            width: 1,
            height: 48,
            background: `linear-gradient(to bottom,${section.accent},transparent)`,
            animation: 'scrollPulse 1.8s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   3-D TILT PROJECT CARD  (with dummy image)
════════════════════════════════════════════ */
function ProjectCard({icon, title, desc, tags, color, period, imgBg, index}) {
  const ref = useRef(null);
  const [rot, setRot] = useState({x: 0, y: 0});
  const [glow, setGlow] = useState({x: 50, y: 50});
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      {threshold: 0.15},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setRot({x: -dy * 10, y: dx * 10});
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      className="card"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setRot({x: 0, y: 0});
        setHovered(false);
      }}
      style={{
        perspective: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(44px)',
        transition: `opacity 0.65s ease ${index * 0.09}s,transform 0.65s ease ${index * 0.09}s`,
      }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 20,
          overflow: 'hidden',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition: hovered
            ? 'transform 0.1s,border-color 0.3s'
            : 'transform 0.55s ease,border-color 0.3s',
          boxShadow: hovered
            ? `0 28px 56px rgba(0,0,0,0.55),0 0 40px ${color}28`
            : '0 8px 28px rgba(0,0,0,0.3)',
          position: 'relative',
        }}>
        {/* Mouse glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%,${color}20 0%,transparent 55%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Dummy project image */}
        <div
          style={{
            position: 'relative',
            height: 180,
            background: imgBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
          {/* Replace with: <img src={yourImage} alt={title} style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
            }}
          />
          <div style={{position: 'relative', zIndex: 2, textAlign: 'center'}}>
            <div
              style={{
                fontSize: 48,
                marginBottom: 8,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
              }}>
              {icon}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Space Grotesk',sans-serif",
                textTransform: 'uppercase',
              }}>
              project preview
            </div>
          </div>
          {/* Decorative corner lines */}
          {[
            ['0,0', '20,0', '0,20'],
            ['100%,0', 'calc(100% - 20px),0', '100%,20px'],
            ['0,100%', '20px,100%', '0,calc(100% - 20px)'],
            ['100%,100%', 'calc(100% - 20px),100%', '100%,calc(100% - 20px)'],
          ].map(([corner, p2, p3], ci) => (
            <div
              key={ci}
              style={{
                position: 'absolute',
                left: corner.split(',')[0],
                top: corner.split(',')[1],
                width: 20,
                height: 20,
                border: `1.5px solid ${color}88`,
                borderRight: 'none',
                borderBottom: 'none',
                transform:
                  ci === 1
                    ? 'scaleX(-1)'
                    : ci === 2
                      ? 'scaleY(-1)'
                      : ci === 3
                        ? 'scale(-1,-1)'
                        : 'none',
                borderRadius: '2px 0 0 0',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg,transparent,${color},transparent)`,
              opacity: 0.6,
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{padding: '20px 22px 22px', position: 'relative', zIndex: 2}}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 10,
            }}>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: '#f0f4ff',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
              {title}
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                whiteSpace: 'nowrap',
                marginLeft: 10,
                marginTop: 3,
              }}>
              {period}
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.75,
              margin: '0 0 16px',
              fontFamily: "'Space Grotesk',sans-serif",
            }}>
            {desc}
          </p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 5}}>
            {tags.map(t => (
              <span
                key={t}
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 8,
                  border: `1px solid ${color}30`,
                  background: `${color}14`,
                  color: color,
                }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SKILL CATEGORY CARD  (with progress bars)
════════════════════════════════════════════ */
function SkillCard({cat, color, skills, index}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      {threshold: 0.2},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.07}s,transform 0.6s ease ${index * 0.07}s`,
      }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderRadius: 18,
          padding: '24px 22px',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s,transform 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '44';
          e.currentTarget.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.transform = '';
        }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,transparent,${color},transparent)`,
          }}
        />
        <div
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: color,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
          {cat}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {skills.map((sk, si) => (
            <div key={sk.name}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.75)',
                    fontWeight: 500,
                  }}>
                  {sk.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 11,
                    color: color,
                    fontWeight: 600,
                  }}>
                  {sk.level}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 4,
                    background: `linear-gradient(90deg,${color},${color}88)`,
                    width: visible ? `${sk.level}%` : '0%',
                    transition: `width 1s ease ${index * 0.07 + si * 0.05}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SKILL PILLS ROW  (tech cloud)
════════════════════════════════════════════ */
function SkillPills({accent}) {
  const all = SKILL_GROUPS.flatMap(g =>
    g.skills.map(s => ({name: s.name, color: g.color})),
  );
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      {threshold: 0.2},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginTop: 64,
      }}>
      {all.map((sk, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 12,
            fontWeight: 600,
            padding: '6px 14px',
            borderRadius: 100,
            border: `1px solid ${sk.color}30`,
            background: `${sk.color}14`,
            color: sk.color,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.5s ease ${i * 0.02}s,transform 0.5s ease ${i * 0.02}s`,
          }}>
          {sk.name}
        </span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   EXPERIENCE TIMELINE
════════════════════════════════════════════ */
function ExpCard({role, company, location, period, color, points, index}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      {threshold: 0.15},
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: clampPx(20, 28),
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.65s ease ${index * 0.12}s,transform 0.65s ease ${index * 0.12}s`,
        marginBottom: clampPx(28, 40),
      }}>
      {/* Timeline line + dot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 16px ${color}88`,
            flexShrink: 0,
            marginTop: 6,
          }}
        />
        <div
          style={{
            width: 1,
            flex: 1,
            background: `linear-gradient(to bottom,${color}60,transparent)`,
            marginTop: 6,
          }}
        />
      </div>
      {/* Card */}
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid rgba(255,255,255,0.08)`,
          borderLeft: `2px solid ${color}44`,
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 4,
          transition: 'border-color 0.3s',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = color + '44')}
        onMouseLeave={e =>
          (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')
        }>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 12,
          }}>
          <div>
            <div
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: clampPx(15, 17),
                fontWeight: 700,
                color: '#f0f4ff',
                letterSpacing: '-0.02em',
              }}>
              {role}
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: color,
                marginTop: 3,
              }}>
              {company}{' '}
              <span style={{color: 'rgba(255,255,255,0.3)', fontWeight: 400}}>
                · {location}
              </span>
            </div>
          </div>
          <span
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 100,
              background: `${color}18`,
              color: color,
              border: `1px solid ${color}30`,
              whiteSpace: 'nowrap',
              alignSelf: 'flex-start',
            }}>
            {period}
          </span>
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
          }}>
          {points.map((p, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
              }}>
              <span
                style={{
                  color: color,
                  fontSize: 10,
                  marginTop: 5,
                  flexShrink: 0,
                }}>
                ▸
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════ */
function ContactForm({accent}) {
  const [f, setF] = useState({name: '', email: '', msg: ''});
  const [sent, setSent] = useState(false);
  const set = k => e => setF(v => ({...v, [k]: e.target.value}));
  const inp = {
    width: '100%',
    padding: '13px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    color: '#f0f4ff',
    fontSize: 14,
    fontFamily: "'Space Grotesk',sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  if (sent)
    return (
      <div style={{textAlign: 'center', padding: '56px 24px'}}>
        <div style={{fontSize: 52, marginBottom: 16}}>✦</div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#f0f4ff',
            fontFamily: "'Syne',sans-serif",
            marginBottom: 8,
          }}>
          Message Sent!
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 14,
            fontFamily: "'Space Grotesk',sans-serif",
          }}>
          I'll get back to you soon.
        </div>
      </div>
    );
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setSent(true);
      }}
      style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 16,
        }}>
        <input
          placeholder="Your name"
          value={f.name}
          onChange={set('name')}
          style={inp}
          required
          onFocus={e => (e.target.style.borderColor = accent + '88')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
        <input
          placeholder="Email address"
          type="email"
          value={f.email}
          onChange={set('email')}
          style={inp}
          required
          onFocus={e => (e.target.style.borderColor = accent + '88')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      </div>
      <textarea
        placeholder="Your message…"
        value={f.msg}
        onChange={set('msg')}
        rows={5}
        style={{...inp, resize: 'vertical'}}
        required
        onFocus={e => (e.target.style.borderColor = accent + '88')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
      <button
        type="submit"
        style={{
          padding: '14px 32px',
          borderRadius: 12,
          background: `linear-gradient(135deg,${accent},${accent}99)`,
          border: 'none',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          fontFamily: "'Space Grotesk',sans-serif",
          letterSpacing: '0.06em',
          cursor: 'none',
          boxShadow: `0 0 32px ${accent}44`,
          transition: 'transform 0.2s,box-shadow 0.2s',
          width: '100%',
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = `0 8px 32px ${accent}77`;
        }}
        onMouseLeave={e => {
          e.target.style.transform = '';
          e.target.style.boxShadow = `0 0 32px ${accent}44`;
        }}>
        SEND MESSAGE →
      </button>
    </form>
  );
}

/* ════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════ */
const clampPx = (min, max) =>
  `clamp(${min}px,${((min + max) / 2) * 0.1}vw,${max}px)`;

function SectionLabel({text, color}) {
  return (
    <div
      style={{
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color,
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
      {text}
      <span
        style={{flex: '0 0 36px', height: 1, background: color, opacity: 0.4}}
      />
    </div>
  );
}

function SectionTitle({children}) {
  return (
    <h2
      style={{
        fontFamily: "'Syne',sans-serif",
        fontSize: 'clamp(2rem,4vw,3rem)',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#f0f4ff',
        margin: '0 0 56px',
        lineHeight: 1.1,
      }}>
      {children}
    </h2>
  );
}

/* ════════════════════════════════════════════
   ROOT
════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState(SECTIONS[0]);
  const [ratios, setRatios] = useState({});
  const {isMobile} = useBreakpoint();

  useEffect(() => {
    const fn = () => {
      const r = {};
      SECTIONS.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const rect = el.getBoundingClientRect(),
          vh = window.innerHeight;
        r[sec.id] = Math.max(0, Math.min(1, -rect.top / vh));
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) setActive(sec);
      });
      setRatios(r);
    };
    window.addEventListener('scroll', fn, {passive: true});
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const pad = `clamp(24px,7vw,120px)`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        html{scroll-behavior:smooth;}body{margin:0;overflow-x:hidden;}*{box-sizing:border-box;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#0f0c29;}::-webkit-scrollbar-thumb{background:${active.accent};border-radius:2px;}
        ::selection{background:${active.accent}55;color:#fff;}
        @keyframes floatOrb{from{transform:translate(-50%,-50%) scale(1)}to{transform:translate(-50%,-50%) scale(1.25) translate(24px,-18px)}}
        @keyframes scrollPulse{0%,100%{opacity:0.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.15)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        .contact-info-card:hover{background:rgba(255,255,255,0.06)!important;border-color:var(--c)!important;transform:translateY(-3px);}
      `}</style>

      <Cursor />
      <AnimatedBG section={active} />
      <Nav active={active.id} accent={active.accent} />

      <main style={{position: 'relative', zIndex: 2}}>
        {/* ── HERO ── */}
        <section
          id="hero"
          data-section-id="hero"
          style={{height: '200vh', position: 'relative'}}>
          <SectionHero
            section={SECTIONS[0]}
            scrollRatio={ratios['hero'] || 0}
          />
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          data-section-id="about"
          style={{
            padding: `100px ${pad}`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}>
            {/* Left text */}
            <div>
              <SectionLabel text="About Me" color={SECTIONS[1].accent} />
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 'clamp(2.2rem,4.5vw,3.6rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#f0f4ff',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}>
                MERN Stack Dev
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg,${SECTIONS[1].accent},#a78bfa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  from Lucknow 🇮🇳
                </span>
              </h2>
              <p
                style={{
                  fontSize: 'clamp(14px,1.6vw,16px)',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.9,
                  fontFamily: "'Space Grotesk',sans-serif",
                  marginBottom: 20,
                }}>
                3+ years shipping production-grade apps — from real-time
                prediction markets to blockchain frontends. I turn complex
                requirements into polished, performant interfaces that scale.
              </p>
              <p
                style={{
                  fontSize: 'clamp(14px,1.6vw,16px)',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.9,
                  fontFamily: "'Space Grotesk',sans-serif",
                  marginBottom: 36,
                }}>
                Currently at{' '}
                <strong style={{color: SECTIONS[1].accent}}>
                  Dunitech Soft Solutions
                </strong>
                , building global transportation and fintech platforms with
                React, WebSockets and Node.js.
              </p>
              <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
                <a
                  href="#contact"
                  style={{
                    padding: '12px 28px',
                    borderRadius: 12,
                    background: SECTIONS[1].accent,
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk',sans-serif",
                    textDecoration: 'none',
                    boxShadow: `0 0 28px ${SECTIONS[1].accent}44`,
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e =>
                    (e.target.style.transform = 'translateY(-2px)')
                  }
                  onMouseLeave={e => (e.target.style.transform = '')}>
                  Hire Me →
                </a>
                <a
                  href="https://www.linkedin.com/in/ram-sakal-patel-94766221b/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '12px 28px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk',sans-serif",
                    border: '1px solid rgba(255,255,255,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = `${SECTIONS[1].accent}18`;
                    e.target.style.borderColor = `${SECTIONS[1].accent}44`;
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}>
                  LinkedIn ↗
                </a>
              </div>
            </div>
            {/* Right — stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}>
              {[
                ['3+', 'Years of Experience', '#a78bfa'],
                ['10+', 'Projects Shipped', '#38bdf8'],
                ['3', 'Companies', '#34d399'],
                ['∞', 'Lines of Code', '#f472b6'],
              ].map(([n, l, c]) => (
                <div
                  key={l}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${c}22`,
                    borderRadius: 16,
                    padding: '28px 20px',
                    textAlign: 'center',
                    transition: 'transform 0.3s,border-color 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = c + '55';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = c + '22';
                    e.currentTarget.style.transform = '';
                  }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 'clamp(2rem,3.5vw,2.8rem)',
                      fontWeight: 800,
                      background: `linear-gradient(135deg,${c},#fff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}>
                    {n}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.05em',
                      marginTop: 8,
                    }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK ── */}
        <section
          id="work"
          data-section-id="work"
          style={{padding: `100px ${pad} 120px`}}>
          <div style={{maxWidth: 1200, margin: '0 auto'}}>
            <div style={{marginBottom: 64}}>
              <SectionLabel
                text="Featured Projects"
                color={SECTIONS[2].accent}
              />
              <SectionTitle>Work I'm Proud Of</SectionTitle>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(min(100%,340px),1fr))',
                gap: 22,
              }}>
              {PROJECTS.map((p, i) => (
                <ProjectCard key={i} {...p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          id="skills"
          data-section-id="skills"
          style={{
            padding: `100px ${pad} 120px`,
            background: 'rgba(0,0,0,0.2)',
          }}>
          <div style={{maxWidth: 1200, margin: '0 auto'}}>
            <div style={{marginBottom: 64}}>
              <SectionLabel text="Tech Arsenal" color={SECTIONS[3].accent} />
              <SectionTitle>Skills & Technologies</SectionTitle>
            </div>

            {/* Category cards with progress bars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(min(100%,260px),1fr))',
                gap: 18,
                marginBottom: 0,
              }}>
              {SKILL_GROUPS.map((g, i) => (
                <SkillCard key={g.cat} {...g} index={i} />
              ))}
            </div>

            {/* All tech as pills */}
            <SkillPills accent={SECTIONS[3].accent} />
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          data-section-id="experience"
          style={{padding: `100px ${pad} 120px`}}>
          <div style={{maxWidth: 900, margin: '0 auto'}}>
            <div style={{marginBottom: 64}}>
              <SectionLabel text="Career Timeline" color={SECTIONS[4].accent} />
              <SectionTitle>Work Experience</SectionTitle>
            </div>
            {EXPERIENCES.map((e, i) => (
              <ExpCard key={i} {...e} index={i} />
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          data-section-id="contact"
          style={{
            padding: `100px ${pad} 80px`,
            background: 'rgba(0,0,0,0.15)',
          }}>
          <div style={{maxWidth: 1000, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 72}}>
              <SectionLabel text="Get In Touch" color={SECTIONS[5].accent} />
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: 'clamp(2rem,4vw,3rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: '#f0f4ff',
                  margin: '0 0 16px',
                  lineHeight: 1.1,
                }}>
                Let's Build Something
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg,${SECTIONS[5].accent},#a78bfa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  Extraordinary
                </span>
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Space Grotesk',sans-serif",
                  maxWidth: 480,
                  margin: '0 auto',
                }}>
                Open to full-time roles, freelance projects, and exciting
                collaborations.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 40,
                alignItems: 'start',
              }}>
              {/* Contact info */}
              <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
                {[
                  {
                    icon: '✉️',
                    label: 'Email',
                    value: 'ramsakalpatel253@gmail.com',
                    href: 'mailto:ramsakalpatel253@gmail.com',
                    c: SECTIONS[5].accent,
                  },
                  {
                    icon: '📱',
                    label: 'Phone',
                    value: '+91 7355049718',
                    href: 'tel:+917355049718',
                    c: '#38bdf8',
                  },
                  {
                    icon: '💼',
                    label: 'LinkedIn',
                    value: 'ram-sakal-patel',
                    href: 'https://www.linkedin.com/in/ram-sakal-patel-94766221b/',
                    c: '#34d399',
                  },
                  {
                    icon: '📍',
                    label: 'Location',
                    value: 'Lucknow, U.P., India',
                    href: null,
                    c: '#f472b6',
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className="contact-info-card"
                    onClick={() =>
                      item.href && window.open(item.href, '_blank')
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid rgba(255,255,255,0.08)`,
                      borderRadius: 14,
                      padding: '16px 20px',
                      cursor: item.href ? 'none' : 'default',
                      transition: 'all 0.3s',
                      '--c': item.c,
                    }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${item.c}18`,
                        border: `1px solid ${item.c}28`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        flexShrink: 0,
                      }}>
                      {item.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk',sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: item.c,
                          marginBottom: 3,
                        }}>
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk',sans-serif",
                          fontSize: 13,
                          color: 'rgba(255,255,255,0.55)',
                          wordBreak: 'break-all',
                        }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 'clamp(24px,4vw,40px)',
                }}>
                <ContactForm accent={SECTIONS[5].accent} />
              </div>
            </div>

            <p
              style={{
                textAlign: 'center',
                marginTop: 80,
                fontSize: 12,
                color: 'rgba(255,255,255,0.15)',
                fontFamily: "'Space Grotesk',sans-serif",
                letterSpacing: '0.06em',
              }}>
              Designed &amp; Built by Ram Sakal Patel ·{' '}
              {new Date().getFullYear()}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
