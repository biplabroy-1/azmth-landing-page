/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers, Cpu, Terminal, Activity, Server, Code } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard'; // Reusing component
import { ServiceItem } from './types';
import AIChat from './components/AIChat';

// Service Data
const SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    phase: 'PHASE 01', 
    title: 'Discovery Grid', 
    subtitle: 'Requirements Mapping', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    description: 'We map the full territory of your technical needs before writing a single line of code. Deep dive audits into existing infrastructure, data flow analysis, and identifying architectural bottlenecks.'
  },
  { 
    id: '2', 
    phase: 'PHASE 01', 
    title: 'System Blueprint', 
    subtitle: 'Architecture & Data Flows', 
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop',
    description: 'Constructing the skeleton of your application. We deliver comprehensive architectural diagrams, database schema designs, and API contracts that serve as the single source of truth.'
  },
  { 
    id: '3', 
    phase: 'PHASE 02', 
    title: 'Build Engine', 
    subtitle: 'Backends / APIs / Integrations', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description: 'High-performance backend execution. We build robust REST and GraphQL APIs, implement microservices where necessary, and ensure seamless third-party integrations.'
  },
  { 
    id: '4', 
    phase: 'PHASE 02', 
    title: 'Ops Layer', 
    subtitle: 'CI/CD • Cloud • Monitoring', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description: 'Infrastructure as Code. We set up automated deployment pipelines, scalable cloud environments (AWS/GCP), and comprehensive observability stacks (Prometheus/Grafana).'
  },
  { 
    id: '5', 
    phase: 'PHASE 03', 
    title: 'Control Panel', 
    subtitle: 'Dashboards • Internal Tools', 
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
    description: 'Empowering your team with visibility. Custom admin panels, data visualization dashboards, and operational tools that give you full control over your system.'
  },
  { 
    id: '6', 
    phase: 'PHASE 03', 
    title: 'Scale Track', 
    subtitle: 'Performance Optimization', 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    description: 'Preparing for hyper-growth. Database indexing strategies, caching layers, load balancing configuration, and cost optimization audits.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  const [purchasingIndex, setPurchasingIndex] = useState<number | null>(null);
  const [purchasedIndex, setPurchasedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService) return;
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const handlePurchase = (index: number) => {
    setPurchasingIndex(index);
    setTimeout(() => {
      setPurchasingIndex(null);
      setPurchasedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">AZMTH</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.2em] uppercase font-mono">
          {['Solutions', 'Process', 'Pricing'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-white text-gray-400 transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('pricing')}
          className="hidden md:inline-flex items-center gap-2 bg-white text-black px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          data-hover="true"
        >
          Work With Us <ArrowRight className="w-3 h-3" />
        </button>

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
            {['Solutions', 'Process', 'Pricing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-gray-400 transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('pricing')}
              className="mt-8 bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase"
            >
              Work With Us
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
            <span className="w-1 h-1 bg-white rounded-full"/>
            <span>Global</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex flex-col justify-center items-center">
            <GradientText 
              text="AZMTH" 
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
             <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                data-hover="true"
             >
                Work With Us
             </button>
             <button 
                onClick={() => scrollToSection('solutions')}
                className="bg-transparent border border-white/20 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                data-hover="true"
             >
                View Services
             </button>
          </motion.div>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full py-4 bg-white text-black z-20 overflow-hidden border-t-2 border-black">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-xl md:text-3xl font-heading font-bold px-8 flex items-center gap-6 tracking-wider">
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

      {/* SERVICES SECTION */}
      <section id="solutions" className="relative z-10 py-24 md:py-32 bg-black">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 px-4 border-l-2 border-white pl-6 md:pl-10">
             <span className="text-gray-500 font-mono text-sm tracking-widest uppercase block mb-2">Capabilities</span>
             <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase leading-[0.9] text-white">
              System<br/>
              <span className="text-gray-500">Modules</span>
            </h2>
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
              <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-mono mb-6 text-gray-400 uppercase tracking-widest">The Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">
                Not just a <br/> <span className="text-gray-500">dev shop.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                AZMTH is a systems partner. We engineer reliable infrastructure, automation, and AI workflows that work in production — not just demos. We prioritize architectural clarity over feature bloat.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Layers, title: 'Monochrome Stack', desc: 'Full architectural clarity. No black boxes.' },
                  { icon: Code, title: 'Signal-First Decisions', desc: 'Constraints over hype. Proven tech only.' },
                  { icon: Activity, title: 'Live Ops View', desc: 'Logs, Alerts, and Dashboards with control.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="p-4 bg-black border border-white/10 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-2 font-heading uppercase">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[500px] md:h-[600px] w-full">
               {/* Technical Diagram visual */}
               <div className="absolute inset-0 border border-white/10 bg-black p-6 md:p-10 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Server className="w-32 h-32" />
                  </div>
                  
                  {/* Fake terminal code */}
                  <div className="font-mono text-xs md:text-sm text-gray-500 space-y-2 z-10">
                    <p><span className="text-white">{'>'}</span> initiating_system_audit...</p>
                    <p><span className="text-white">{'>'}</span> analyzing_bottlenecks [COMPLETE]</p>
                    <p><span className="text-white">{'>'}</span> optimizing_query_paths...</p>
                    <p><span className="text-white">{'>'}</span> <span className="text-green-500">deployment_success</span> (v2.4.0)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 z-10 mt-10">
                     <div className="border border-white/10 p-4 bg-white/5">
                        <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                        <div className="text-xs uppercase text-gray-500">Uptime</div>
                     </div>
                     <div className="border border-white/10 p-4 bg-white/5">
                        <div className="text-2xl font-bold text-white mb-1">50ms</div>
                        <div className="text-xs uppercase text-gray-500">Latency</div>
                     </div>
                     <div className="border border-white/10 p-4 bg-white/5 col-span-2">
                        <div className="text-2xl font-bold text-white mb-1">Scale</div>
                        <div className="text-xs uppercase text-gray-500">Auto-provisioning enabled</div>
                     </div>
                  </div>
               </div>
               
               {/* Decorative border offset */}
               <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border border-white/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="relative z-10 py-24 md:py-32 px-4 md:px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-8xl font-heading font-bold text-white/10 uppercase mb-4">
               ACCESS
             </h2>
             <p className="text-white font-mono uppercase tracking-widest text-sm md:text-base">
               Start building with AZMTH
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sprint Audit', price: '$1,499', desc: 'One-time review & report', button: 'Book Audit' },
              { name: 'Build Sprint', price: '$4,999', desc: 'Scoped development delivery', button: 'Start a Sprint', highlight: true },
              { name: 'Embedded Partner', price: 'Custom', desc: 'Long-term collaboration', button: 'Talk to AZMTH' },
            ].map((tier, i) => {
              const isPurchasing = purchasingIndex === i;
              const isPurchased = purchasedIndex === i;
              const isDisabled = (purchasingIndex !== null) || (purchasedIndex !== null);

              return (
                <motion.div
                  key={i}
                  whileHover={isDisabled ? {} : { y: -10 }}
                  className={`relative p-8 border ${tier.highlight ? 'border-white bg-white/5' : 'border-white/10 bg-black'} flex flex-col min-h-[450px] transition-colors duration-300`}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold mb-2 text-white uppercase">{tier.name}</h3>
                    <p className="text-gray-400 text-xs mb-8 uppercase tracking-widest">{tier.desc}</p>
                    
                    <div className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter text-white">
                      {tier.price}
                    </div>
                    
                    <ul className="space-y-4 text-sm font-mono text-gray-300 border-t border-white/10 pt-8">
                      <li className="flex items-center gap-3"><span className="text-white">01</span> Requirements Analysis</li>
                      <li className="flex items-center gap-3"><span className="text-white">02</span> Technical Architecture</li>
                      {i > 0 && <li className="flex items-center gap-3"><span className="text-white">03</span> Implementation Phase</li>}
                      {i > 1 && <li className="flex items-center gap-3"><span className="text-white">04</span> Long-term Maintenance</li>}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handlePurchase(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white transition-all duration-300 mt-8 
                      ${isPurchased 
                        ? 'bg-white text-black cursor-default' 
                        : isPurchasing 
                          ? 'bg-gray-800 text-white cursor-wait'
                          : isDisabled 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-white hover:text-black cursor-pointer'
                      }`}
                  >
                     {isPurchasing ? 'Processing...' : isPurchased ? 'Inquiry Sent' : tier.button}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
             <div className="font-heading text-3xl font-bold tracking-tighter mb-4 text-white">AZMTH</div>
             <div className="text-sm text-gray-500 max-w-xs mb-6">
                Monochrome systems engineering.
                <br/>Built by AZMTH Studio.
             </div>
             <a href="mailto:contact@azmth.com" className="text-white border-b border-white pb-1 hover:text-gray-300 transition-colors">contact@azmth.com</a>
          </div>
          
          <div className="flex gap-8">
             {['GitHub', 'LinkedIn', 'X'].map(social => (
                <a key={social} href="#" className="text-gray-500 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
                  {social}
                </a>
             ))}
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
                
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-4 text-white">
                  {selectedService.title}
                </h3>
                
                <p className="text-base text-gray-400 font-mono uppercase tracking-widest mb-8">
                  {selectedService.subtitle}
                </p>
                
                <div className="h-px w-full bg-white/10 mb-8" />
                
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {selectedService.description}
                </p>

                <button 
                  onClick={() => { setSelectedService(null); scrollToSection('pricing'); }}
                  className="mt-10 self-start border-b border-white pb-1 text-sm font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
                >
                    Inquire about this phase ->
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;