
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Cpu, Terminal, Activity, Server, Code, Linkedin, Github, Twitter, ArrowUp, Send, Briefcase } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard'; // Reusing component
import { ServiceItem } from './types';
import AIChat from './components/AIChat';

// Service Data replaced with Products
const SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    phase: 'PHASE 01', 
    title: 'AI Calling System', 
    subtitle: 'Twilio + Voice AI + Backend', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: Twilio + Voice AI + Backend. A robust AI calling infrastructure integrating Twilio telephony and advanced AI backends for seamless automated voice interactions.'
  },
  { 
    id: '2', 
    phase: 'PHASE 02', 
    title: 'StudyLab', 
    subtitle: 'College Social App', 
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: Next.js + Clerk + MongoDB + PostHog. A comprehensive social platform designed for student collaboration, featuring secure auth and real-time analytics.'
  },
  { 
    id: '3', 
    phase: 'PHASE 03', 
    title: 'Realtime Call Agent', 
    subtitle: 'Flask + Twilio', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: Python + WebSocket + Groq + gTTS. Ultra-low latency voice agent architecture built on Flask and WebSockets, utilizing Groq for immediate inference.'
  },
  { 
    id: '4', 
    phase: 'PHASE 04', 
    title: 'Meal Tracker App', 
    subtitle: 'Mobile Nutrition', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: Expo + MMKV + Notifications. High-performance mobile application with instant local storage (MMKV) and smart notification loops.'
  },
  { 
    id: '5', 
    phase: 'PHASE 05', 
    title: 'Remind Me App', 
    subtitle: 'Schedule + Voice + Widget', 
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: React Native + Express + MongoDB. A complete productivity ecosystem featuring voice input processing and interactive home screen widgets.'
  },
  { 
    id: '6', 
    phase: 'PHASE 06', 
    title: 'Compliance Agent', 
    subtitle: 'Industry Automation', 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    description: 'Domain: AI Retrieval + LLM + Knowledge Graph + Automation. Autonomous agent architecture for verifying complex industrial compliance standards.'
  },
];

const TEAM = [
  {
    name: 'J. VOSS',
    role: 'PRINCIPAL ARCHITECT',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&grayscale'
  },
  {
    name: 'A. CHEN',
    role: 'SYSTEMS LEAD',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&grayscale'
  },
  {
    name: 'M. REYES',
    role: 'AI ENGINEER',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&grayscale'
  },
  {
    name: 'S. PATEL',
    role: 'DEVOPS SPECIALIST',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop&grayscale'
  }
];

const CAREERS = [
  {
    role: 'Systems Architect',
    type: 'REMOTE',
    stack: 'Rust • Go • K8s • Distributed Systems',
    description: 'Design the invisible engines. We need low-level expertise to build high-availability infrastructure that scales without thought.',
    highlight: false
  },
  {
    role: 'Senior AI Engineer',
    type: 'REMOTE',
    stack: 'Python • PyTorch • RAG • LLM Ops',
    description: 'Move beyond prompts. Build autonomous agentic workflows, custom retrieval pipelines, and fine-tuned models for industry compliance.',
    highlight: true
  },
  {
    role: 'Frontend Craftsperson',
    type: 'REMOTE',
    stack: 'React • WebGL • Motion • TypeScript',
    description: 'Engineering-grade UI. You understand that performance is a feature and that smooth, 60fps interaction is non-negotiable.',
    highlight: false
  }
];

// Reusable Animation Components
const Reveal: React.FC<{ children: React.ReactNode, delay?: number, width?: "fit-content" | "100%" }> = ({ children, delay = 0, width = "fit-content" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ width }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [email, setEmail] = useState('');
  
  const [applyingIndex, setApplyingIndex] = useState<number | null>(null);
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService) return;
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const handleApply = (index: number) => {
    setApplyingIndex(index);
    setTimeout(() => {
      setApplyingIndex(null);
      setAppliedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-white selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/5 transition-all duration-500">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-xl md:text-2xl font-black tracking-tighter text-white cursor-default z-50"
        >
            AZMTH
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase font-mono">
          {['Solutions', 'Process', 'Team', 'Careers'].map((item, i) => (
            <motion.button 
              key={item} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-white text-gray-400 transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, backgroundColor: "#e5e5e5" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('careers')}
          className="hidden md:inline-flex items-center gap-2 bg-white text-black px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          data-hover="true"
        >
          Join Unit <ArrowRight className="w-3 h-3" />
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Solutions', 'Process', 'Team', 'Careers'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-black text-white hover:text-gray-400 transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('careers')}
              className="mt-8 bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase"
            >
              Join Unit
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-7xl pb-10"
        >
           {/* Location/Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 text-xs font-mono text-gray-400 tracking-[0.2em] uppercase mb-8"
          >
            <span>Remote</span>
            <span className="w-1 h-1 bg-white rounded-full animate-pulse"/>
            <span>Global</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex flex-col justify-center items-center">
            <GradientText 
              text="azmth" 
              as="h1" 
              className="text-[18vw] md:text-[16vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="text-lg md:text-2xl font-light text-gray-300 mt-8 tracking-wide max-w-2xl text-center"
            >
              A monochrome systems engineering studio
            </motion.p>
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-xs h-px bg-white/30 mt-12 mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex gap-6"
          >
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('careers')}
                className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                data-hover="true"
             >
                Join Unit
             </motion.button>
             <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('solutions')}
                className="bg-transparent border border-white/20 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
                data-hover="true"
             >
                View Services
             </motion.button>
          </motion.div>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full py-4 bg-white text-black z-20 overflow-hidden border-t-2 border-black group">
          <motion.div 
            className="flex w-fit will-change-transform group-hover:[animation-play-state:paused]"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-xl md:text-3xl font-heading font-black px-8 flex items-center gap-6 tracking-wider hover:text-gray-600 transition-colors duration-300 cursor-default">
                    AZMTH STUDIO <span className="w-2 h-2 bg-black rounded-full"></span> 
                    SYSTEMS OVER HYPE <span className="w-2 h-2 bg-black rounded-full"></span>
                    RELIABLE INFRASTRUCTURE <span className="w-2 h-2 bg-black rounded-full"></span>
                    AI AUTOMATION <span className="w-2 h-2 bg-black rounded-full"></span>
                    CLEAR ARCHITECTURE <span className="w-2 h-2 bg-black rounded-full"></span>
                    OPERATIONAL EXECUTION <span className="w-2 h-2 bg-black rounded-full"></span>
                    SHIP OBSERVE IMPROVE <span className="w-2 h-2 bg-black rounded-full"></span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* VISION & MISSION SECTION */}
      <section className="relative z-10 py-24 md:py-32 bg-neutral-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
               {/* VISION */}
               <div className="flex flex-col justify-start">
                  <Reveal>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-6 block border-l-2 border-white pl-3">
                        Vision
                    </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight uppercase">
                        Total <br/> System <br/> <span className="text-gray-600">Autonomy</span>
                    </h2>
                  </Reveal>
               </div>

               {/* MISSION */}
               <div className="flex flex-col justify-end">
                  <Reveal delay={0.2}>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-6 block border-l-2 border-white pl-3">
                        Mission
                    </span>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
                        We exist to strip away the noise. To build infrastructure that doesn't just function, but <span className="font-bold">performs</span>.
                    </p>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <p className="text-gray-400 leading-relaxed max-w-md">
                        In an era of digital clutter, AZMTH provides the signal. We engineer bespoke AI systems and backend architectures that serve as the silent, powerful engines of modern business. We prioritize reliability, scalability, and absolute clarity.
                    </p>
                  </Reveal>
               </div>
            </div>
        </div>
      </section>

      {/* PRODUCTS / SERVICES SECTION */}
      <section id="solutions" className="relative z-10 py-24 md:py-32 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 px-4 border-l-2 border-white pl-6 md:pl-10">
             <Reveal>
                <span className="text-gray-500 font-mono text-sm tracking-widest uppercase block mb-2">Capabilities</span>
             </Reveal>
             <Reveal delay={0.1}>
                <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-[0.9] text-white">
                    System<br/>
                    <span className="text-gray-500">Products</span>
                </h2>
             </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} artist={service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / EXPERIENCE SECTION */}
      <section id="process" className="relative z-10 py-24 md:py-32 bg-neutral-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-mono mb-6 text-gray-400 uppercase tracking-widest">The Philosophy</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-tight">
                    Not just a <br/> <span className="text-gray-500">dev shop.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                    AZMTH is a systems partner. We engineer reliable infrastructure, automation, and AI workflows that work in production — not just demos. We prioritize architectural clarity over feature bloat.
                </p>
              </Reveal>
              
              <div className="space-y-8">
                {[
                  { icon: Layers, title: 'Monochrome Stack', desc: 'Full architectural clarity. No black boxes.' },
                  { icon: Code, title: 'Signal-First Decisions', desc: 'Constraints over hype. Proven tech only.' },
                  { icon: Activity, title: 'Live Ops View', desc: 'Logs, Alerts, and Dashboards with control.' },
                ].map((feature, i) => (
                  <Reveal key={i} delay={0.3 + (i * 0.1)}>
                    <motion.div 
                        whileHover={{ x: 10 }}
                        className="flex items-start gap-6 group cursor-default"
                    >
                        <div className="p-4 bg-black border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        <feature.icon className="w-6 h-6" />
                        </div>
                        <div>
                        <h4 className="text-lg md:text-xl font-bold mb-2 font-heading uppercase">{feature.title}</h4>
                        <p className="text-sm text-gray-400">{feature.desc}</p>
                        </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[500px] md:h-[600px] w-full">
               {/* Technical Diagram visual */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 border border-white/10 bg-black p-6 md:p-10 flex flex-col justify-between overflow-hidden"
               >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 p-4 opacity-20"
                  >
                    <Server className="w-32 h-32" />
                  </motion.div>
                  
                  {/* Fake terminal code */}
                  <div className="font-mono text-xs md:text-sm text-gray-500 space-y-2 z-10">
                    <p><span className="text-white">{'>'}</span> initiating_system_audit...</p>
                    <p><span className="text-white">{'>'}</span> analyzing_bottlenecks [COMPLETE]</p>
                    <p><span className="text-white">{'>'}</span> optimizing_query_paths...</p>
                    <p><span className="text-white">{'>'}</span> <span className="text-green-500">deployment_success</span> (v2.4.0)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 z-10 mt-10">
                     <motion.div whileHover={{ scale: 1.05 }} className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                        <div className="text-xs uppercase text-gray-500">Uptime</div>
                     </motion.div>
                     <motion.div whileHover={{ scale: 1.05 }} className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-white mb-1">50ms</div>
                        <div className="text-xs uppercase text-gray-500">Latency</div>
                     </motion.div>
                     <motion.div whileHover={{ scale: 1.02 }} className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm col-span-2">
                        <div className="text-2xl font-bold text-white mb-1">Scale</div>
                        <div className="text-xs uppercase text-gray-500">Auto-provisioning enabled</div>
                     </motion.div>
                  </div>
               </motion.div>
               
               {/* Decorative border offset */}
               <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border border-white/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="relative z-10 py-24 md:py-32 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
            <div className="border-l-2 border-white pl-6 md:pl-10">
              <Reveal>
                <span className="text-gray-500 font-mono text-sm tracking-widest uppercase block mb-2">Core Unit</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-5xl md:text-7xl font-heading font-black uppercase leading-[0.9] text-white">
                    The<br/>Engineers
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
                <p className="text-gray-400 font-mono uppercase tracking-widest text-sm max-w-xs text-right hidden md:block">
                Architecting the systems of tomorrow.
                </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div 
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-white/5 mb-6 relative border border-white/10">
                  <div className="absolute inset-0 bg-neutral-900 mix-blend-color z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  {/* Tech overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex justify-center gap-6">
                     <motion.div whileHover={{ scale: 1.2, color: '#fff' }} className="text-gray-400"><Linkedin className="w-4 h-4 cursor-pointer" /></motion.div>
                     <motion.div whileHover={{ scale: 1.2, color: '#fff' }} className="text-gray-400"><Github className="w-4 h-4 cursor-pointer" /></motion.div>
                     <motion.div whileHover={{ scale: 1.2, color: '#fff' }} className="text-gray-400"><Twitter className="w-4 h-4 cursor-pointer" /></motion.div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-1 uppercase tracking-tight group-hover:text-gray-300 transition-colors">{member.name}</h3>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS SECTION (Formerly Pricing) */}
      <section id="careers" className="relative z-10 py-24 md:py-32 px-4 md:px-6 bg-neutral-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <Reveal>
                <h2 className="text-4xl md:text-8xl font-heading font-black text-white/10 uppercase mb-4">
                CAREERS
                </h2>
             </Reveal>
             <Reveal delay={0.1}>
                <p className="text-white font-mono uppercase tracking-widest text-sm md:text-base">
                Join the Core Unit
                </p>
             </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAREERS.map((job, i) => {
              const isApplying = applyingIndex === i;
              const isApplied = appliedIndex === i;
              const isDisabled = (applyingIndex !== null) || (appliedIndex !== null);

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={isDisabled ? {} : { y: -15, boxShadow: '0 20px 40px -20px rgba(255,255,255,0.1)' }}
                  className={`relative p-8 border ${job.highlight ? 'border-white bg-white/5' : 'border-white/10 bg-black'} flex flex-col min-h-[450px] transition-all duration-300`}
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-heading font-black text-white uppercase break-words w-2/3">{job.role}</h3>
                        <span className="text-[10px] border border-white/20 px-2 py-1 uppercase tracking-widest font-mono text-gray-400">{job.type}</span>
                    </div>
                    
                    <p className="text-gray-400 text-xs mb-8 uppercase tracking-widest min-h-[3em]">{job.stack}</p>
                    
                    <div className="w-10 h-1 bg-white mb-6"></div>
                    
                    <p className="text-sm font-mono text-gray-300 leading-relaxed mb-8">
                      {job.description}
                    </p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApply(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white transition-all duration-300 mt-8 flex items-center justify-center gap-2
                      ${isApplied 
                        ? 'bg-white text-black cursor-default' 
                        : isApplying 
                          ? 'bg-gray-800 text-white cursor-wait'
                          : isDisabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-white hover:text-black cursor-pointer'
                      }`}
                  >
                     {isApplying ? 'Processing...' : isApplied ? 'Applied' : (
                        <>
                           Apply Now <Briefcase className="w-3 h-3" />
                        </>
                     )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPANDED FOOTER */}
      <footer className="relative z-10 border-t border-white/10 pt-20 pb-8 bg-black">
        <div className="max-w-7xl mx-auto px-6">
            {/* Top Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                {/* Brand & Newsletter */}
                <div className="col-span-1 md:col-span-2">
                    <Reveal>
                        <div className="font-heading text-3xl font-black tracking-tighter mb-4 text-white">AZMTH</div>
                        <div className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
                            Monochrome systems engineering studio focused on backend infrastructure, AI automation, and absolute reliability.
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="max-w-sm">
                            <label className="text-xs font-mono uppercase text-gray-500 mb-2 block">Subscribe to System Logs</label>
                            <div className="flex border-b border-white/20 focus-within:border-white transition-colors">
                                <input 
                                    type="email" 
                                    placeholder="email@domain.com" 
                                    className="bg-transparent border-none outline-none text-white text-sm py-2 w-full placeholder-gray-700"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className="text-white hover:text-gray-300 transition-colors">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Sitemap */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6">Index</h4>
                    <ul className="space-y-4">
                        {['Solutions', 'Process', 'Team', 'Careers'].map((link) => (
                            <motion.li key={link} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                <button onClick={() => scrollToSection(link.toLowerCase())} className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider">
                                    {link}
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Social */}
                <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                     variants={{
                         hidden: { opacity: 0 },
                         visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                     }}
                >
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-6">Connect</h4>
                    <ul className="space-y-4">
                        {[
                            { name: 'GitHub', icon: Github }, 
                            { name: 'LinkedIn', icon: Linkedin }, 
                            { name: 'X', icon: Twitter }
                        ].map((social) => (
                            <motion.li key={social.name} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors uppercase tracking-wider flex items-center gap-2 group">
                                    {social.name}
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-xs text-gray-600 font-mono uppercase tracking-wider">
                    © {new Date().getFullYear()} AZMTH Studio. All systems operational.
                </div>
                
                <div className="flex gap-8">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(legal => (
                        <a key={legal} href="#" className="text-xs text-gray-600 hover:text-white font-mono uppercase tracking-wider transition-colors">
                            {legal}
                        </a>
                    ))}
                </div>

                <motion.button 
                    whileHover={{ y: -5, color: '#fff' }}
                    onClick={() => scrollToSection('top')}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors"
                >
                    Back to Top <ArrowUp className="w-4 h-4" />
                </motion.button>
            </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/20 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2 text-white hover:text-gray-400 transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 md:hidden" />
                <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-70"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                     <span className="text-xs font-mono text-white/50 border border-white/20 px-2 py-1 uppercase tracking-widest">
                       {selectedService.phase}
                     </span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-heading font-black uppercase leading-none mb-4 text-white">
                  {selectedService.title}
                </h3>
                
                <p className="text-base text-gray-400 font-mono uppercase tracking-widest mb-8">
                  {selectedService.subtitle}
                </p>
                
                <div className="h-px w-full bg-white/10 mb-8" />
                
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {selectedService.description}
                </p>

                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => { setSelectedService(null); scrollToSection('careers'); }}
                  className="mt-10 self-start border-b border-white pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
                >
                    Inquire about this product ->
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
