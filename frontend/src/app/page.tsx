"use client";
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, ExternalLink, Code2, Rocket, Brain, Layers, ShieldCheck, BarChart3, TrendingUp, Users, Package, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Interactive Cursor Glow */}
      <div 
        className="fixed pointer-events-none z-30 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] transition-transform duration-300 ease-out hidden lg:block"
        style={{ 
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)` 
        }}
      />

      {/* Technical Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform duration-300">V</div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">Vimarsha <span className="text-blue-500 not-italic">Invotech</span></span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400"
        >
          {['Solutions', 'Research', 'About'].map((item) => (
            <a key={item} href="#" className={`hover:text-blue-400 transition-colors relative group ${item === 'About' ? 'text-blue-400' : ''}`}>
              {item}
              <span className={`absolute -bottom-1 left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full ${item === 'About' ? 'w-full' : ''}`} />
            </a>
          ))}
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-95">
            Work with us
          </button>
        </motion.div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-32">
        {/* Header Section */}
        <motion.header 
          {...fadeIn}
          className="mb-32 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Engineering Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-[1.1]">
            About <span className="relative inline-block">
              <span className="relative z-10 text-blue-500">Vimarsha</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-900/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light italic">
            "Deep insight fuels scalable engineering."
          </p>
        </motion.header>

        {/* Dashboard Concept Section */}
        <section className="mb-40">
          <motion.div 
            {...fadeIn}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-6">Market-First Intelligence</h2>
              <p className="text-slate-400 text-lg">Custom-built analytical environments for <b>Jay Hanuman Agro Traders</b> that track market volatility in real-time.</p>
            </div>
            <div className="flex gap-3">
              <div className="h-10 px-4 flex items-center bg-[#0f141d] border border-white/5 rounded-lg text-xs font-mono text-blue-400">
                <BarChart3 className="w-4 h-4 mr-2" /> DATA_STREAM: ACTIVE
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <Package className="text-blue-400" />, value: "84.2%", label: "Inventory Liquidity", color: "blue" },
              { icon: <TrendingUp className="text-green-400" />, value: "+12.4%", label: "Price Volatility", color: "green" },
              { icon: <Users className="text-purple-400" />, value: "312", label: "Farmer Outreach", color: "purple" },
              { icon: <ShieldCheck className="text-orange-400" />, value: "96.8%", label: "Supply Forecast", color: "orange" },
            ].map((metric, idx) => (
              <motion.div 
                key={idx}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-[#0f141d] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group cursor-crosshair"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-slate-600" />
                </div>
                <div className="mb-6 p-3 bg-white/5 inline-block rounded-xl group-hover:bg-blue-500/10 transition-colors">
                  {metric.icon}
                </div>
                <div className="text-4xl font-black text-white mb-1 tracking-tighter">{metric.value}</div>
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{metric.label}</div>
                
                <div className="mt-8 overflow-hidden rounded-full bg-white/5 h-1.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    className={`h-full bg-${metric.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Origin Section with Hover Parallax Effect */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
          <motion.div 
            {...fadeIn}
            className="group p-10 md:p-14 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
              <Layers className="text-blue-500 w-8 h-8" /> Origin
            </h2>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Vimarsha Invotech was founded with a belief that technology should be driven by <span className="text-white border-b-2 border-blue-500/50">insight</span>, not assumptions.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              We start by deeply understanding the data and the domain before a single line of code is committed.
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            className="p-10 md:p-14 bg-blue-600 rounded-[3rem] shadow-2xl shadow-blue-600/20 flex flex-col justify-center relative group"
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-[3rem]" />
            <h3 className="text-3xl font-bold mb-6 text-white tracking-tight">Vimarsha + Invotech</h3>
            <p className="text-blue-50 text-xl leading-relaxed font-medium">
              A fusion of deep analytical thinking and modern engineering, designed to build systems that scale with absolute confidence.
            </p>
          </motion.div>
        </section>

        {/* Executive Founder Section */}
        <motion.section 
          {...fadeIn}
          className="relative py-24 px-8 md:px-20 bg-[#0a0a0a] border border-white/5 rounded-[4rem] overflow-hidden mb-40 group"
        >
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full group-hover:bg-blue-600/20 transition-colors duration-1000" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group/photo">
                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 scale-95 opacity-20 group-hover/photo:rotate-0 group-hover/photo:scale-105 transition-all duration-500" />
                <div className="w-72 h-72 md:w-96 md:h-96 bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 relative grayscale hover:grayscale-0 transition-all duration-700 flex items-center justify-center">
                   <div className="text-slate-800 text-[12rem] font-black select-none tracking-tighter">PK</div>
                   <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                      <div className="text-white font-bold text-xl uppercase tracking-widest">Pintu Kumar</div>
                      <div className="text-blue-400 text-sm font-medium">FOUNDER</div>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">The <span className="text-blue-500 font-light italic">Architect</span></h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full" />
              </div>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Integrating 2+ years of full-stack expertise with a commitment to research-driven development. I transform complex business logic into high-performance digital assets.
              </p>
              
              <div className="grid grid-cols-2 gap-8 py-6 border-y border-white/5">
                <div>
                  <div className="text-2xl font-bold text-white tracking-tighter">Scalability</div>
                  <div className="text-sm text-slate-500">Built for 1M+ Requests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tighter">Security</div>
                  <div className="text-sm text-slate-500">Enterprise Standards</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl font-bold transition-all transform active:scale-95 group/btn shadow-xl">
                  Connect on LinkedIn <Linkedin className="w-5 h-5 group-hover/btn:animate-pulse" />
                </button>
                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <Github className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Cloud */}
        <motion.section 
          {...fadeIn}
          className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-16 text-center group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-3xl font-bold mb-12 text-white">Engineered with Precision</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['NEXT.JS', 'AWS', 'NODE.JS', 'TYPESCRIPT', 'REACT', 'POSTGRES'].map((tech) => (
              <span key={tech} className="text-2xl md:text-4xl font-black text-slate-800 hover:text-blue-500/40 cursor-default transition-all duration-500 tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/5 py-16 text-center space-y-4">
        <div className="flex justify-center gap-6 opacity-40">
           <Code2 className="w-5 h-5" />
           <Brain className="w-5 h-5" />
           <Rocket className="w-5 h-5" />
        </div>
        <p className="text-slate-600 text-sm font-medium tracking-widest">© 2025 VIMARSHA INVOTECH. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default Home;