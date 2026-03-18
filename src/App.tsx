/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Target, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Mail, 
  Phone, 
  CheckCircle2, 
  X,
  Settings,
  Plus,
  Trash2,
  Save,
  Lock
} from 'lucide-react';
import { PortfolioData } from './types';
import { INITIAL_DATA } from './constants';

const INITIAL_DATA_KEY = 'portfolio_data';
const ADMIN_PASSWORD = '1219';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(INITIAL_DATA_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as PortfolioData;
      // Migration: Ensure all experiences have correct periods for known orgs
      if (parsed.name === "이름" || parsed.name === "최준혁") parsed.name = "조수빈";
      if (parsed.contact === "010-0000-0000 / email@example.com" || parsed.contact === "010-0000-0000 / 12midmo0@gmail.com") {
        parsed.contact = "010-0000-0000 / pearl8669@naver.com";
      }

      parsed.experiences = parsed.experiences.map(exp => {
        const org = exp.organization || "";
        let period = exp.period || "";
        
        // Force correct periods for specific organizations
        if (org.includes("티웨이") || org.includes("항공")) {
          if (period !== "2024.01~재직중") period = "2024.01~재직중";
        } else if (org.includes("한국산업기술진흥원") || org.includes("KIAT")) {
          if (period !== "2023.06~2023.12") period = "2023.06~2023.12";
        } else if (org.includes("국토교통") || org.includes("KAIA")) {
          if (period !== "2022.11~2023.04") period = "2022.11~2023.04";
        } else if (period.includes(" ~ ")) {
          period = period.replace(/\s~\s/g, "~");
        }
        
        return { ...exp, period };
      });
      return parsed;
    }
    return INITIAL_DATA;
  });

  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem(INITIAL_DATA_KEY, JSON.stringify(data));
  }, [data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const updateData = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
    <div className="flex items-center gap-3 mb-12">
      <div className="p-3 bg-slate-900 text-white rounded-lg">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white font-bold">CJ</div>
            <span className="font-bold text-xl tracking-tighter">HR PORTFOLIO</span>
          </div>
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Competency', 'Experience', 'Job Fit'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                title="설정"
              >
                <Settings size={20} />
              </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-900 text-xs font-bold rounded-full mb-6 tracking-widest uppercase">
                HR Portfolio 2026
              </span>
              <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                인력 운영과 <br />
                조직 경험 기반 <br />
                <span className="text-slate-900 underline decoration-slate-200 underline-offset-8">인사 직무 역량</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
                지원 직무 : 인사
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3 text-slate-700">
                  <User size={20} className="text-slate-900" />
                  <span className="font-medium">{data.name}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail size={20} className="text-slate-900" />
                  <span className="font-medium">{data.contact}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative group border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
                  alt="CJ OliveNetworks Building"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-xs">
                <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wider">Core Philosophy</p>
                <p className="text-lg font-bold text-slate-900 leading-snug">
                  "구성원의 성장이 곧 조직의 <br /> 경쟁력입니다"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={User}>About Me</SectionTitle>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 leading-tight whitespace-pre-line">
                {data.aboutMe.title}
              </h3>
              <div className="space-y-6 mb-12">
                {data.aboutMe.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-900 flex-shrink-0" />
                    <p className="text-lg text-slate-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-white rounded-2xl border border-slate-200">
                <p className="text-2xl font-bold text-slate-900 italic whitespace-pre-line">
                  {data.aboutMe.summary}
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">HR Focus Areas</h4>
                <div className="space-y-4">
                  {['인재육성', '인력운영', '조직문화'].map(area => (
                    <div key={area} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <span className="font-bold text-slate-700">{area}</span>
                      <CheckCircle2 size={18} className="text-slate-900" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section id="competency" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={Target}>Core Competency</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {data.competencies.map((comp, idx) => (
              <motion.div 
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="mb-8 flex justify-between items-start">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HR Connection</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 whitespace-pre-line">{comp.title}</h4>
                <ul className="space-y-4 mb-8">
                  {comp.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-500 text-sm leading-relaxed">
                      <ChevronRight size={16} className="mt-0.5 text-slate-900 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-sm font-bold text-slate-900 whitespace-pre-line">
                    {comp.hrConnection}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experience" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <div className="p-3 bg-white text-slate-900 rounded-lg">
              <Briefcase size={24} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Professional Experience</h2>
          </div>
          
          <div className="space-y-12">
            {data.experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-12 gap-12 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-4 block">Experience 0{idx + 1}</span>
                  <h3 className="text-2xl font-bold mb-2 leading-tight whitespace-pre-line">{exp.title}</h3>
                  <p className="text-slate-400 font-medium mb-2">{exp.organization}</p>
                  <p className="text-slate-400 text-sm font-bold mb-6">{exp.period}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Award size={14} className="text-white" />
                    <span className="whitespace-pre-line">{exp.hrConnection}</span>
                  </div>
                </div>
                <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Key Roles</h4>
                    <ul className="space-y-4">
                      {exp.roles.map((role, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Key Achievements</h4>
                    <ul className="space-y-4">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle2 size={16} className="text-white mt-0.5 flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Fit */}
      <section id="job-fit" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={Award}>Job Fit & Suitability</SectionTitle>
          <div className="bg-slate-50 rounded-[3rem] p-12 lg:p-20 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-slate-900 mb-12 leading-tight whitespace-pre-line">
                {data.jobFit.title}
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {data.jobFit.points.map((point, idx) => {
                  const [title, desc] = point.split(' → ');
                  return (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">{title}</p>
                      <p className="text-lg font-bold text-slate-900">{desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 p-10 bg-slate-900 rounded-3xl text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-2xl font-bold leading-relaxed whitespace-pre-line">
                  {data.jobFit.itContext}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Plan */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle icon={TrendingUp}>Growth Plan</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Short Term', content: data.growthPlan.shortTerm, icon: '01' },
              { label: 'Mid Term', content: data.growthPlan.midTerm, icon: '02' },
              { label: 'Long Term', content: data.growthPlan.longTerm, icon: '03' }
            ].map((plan, idx) => (
              <div key={idx} className="relative p-10 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <span className="absolute top-8 right-8 text-4xl font-black text-slate-50">
                  {plan.icon}
                </span>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 relative z-10">{plan.label}</h4>
                <p className="text-lg font-bold text-slate-900 leading-relaxed relative z-10 whitespace-pre-line">
                  {plan.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Closing */}
      <footer className="py-24 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-1 bg-white/20 mx-auto mb-12" />
          <h2 className="text-4xl font-bold mb-12 leading-tight whitespace-pre-line">
            {data.closing}
          </h2>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-sm">
            Thank you for your consideration
          </p>
        </div>
      </footer>

      {/* Admin Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-white rounded-lg">
                    <Settings size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Portfolio Settings</h2>
                </div>
                <button 
                  onClick={() => {
                    setIsAdminOpen(false);
                    setIsLoggedIn(false);
                    setPassword('');
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {!isLoggedIn ? (
                  <div className="max-w-sm mx-auto py-20 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Admin Login</h3>
                    <p className="text-slate-500 mb-8">내용을 수정하려면 비밀번호를 입력하세요.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-12 pb-12">
                    {/* Basic Info */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Basic Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Name</label>
                          <input 
                            type="text" 
                            value={data.name}
                            onChange={(e) => updateData('name', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Contact</label>
                          <input 
                            type="text" 
                            value={data.contact}
                            onChange={(e) => updateData('contact', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                          />
                        </div>
                      </div>
                    </section>

                    {/* About Me */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        About Me
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Title</label>
                          <textarea 
                            value={data.aboutMe.title}
                            onChange={(e) => updateData('aboutMe.title', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Summary</label>
                          <textarea 
                            value={data.aboutMe.summary}
                            onChange={(e) => updateData('aboutMe.summary', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-slate-500 ml-1">Key Points</label>
                          {data.aboutMe.points.map((point, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input 
                                type="text" 
                                value={point}
                                onChange={(e) => {
                                  const newPoints = [...data.aboutMe.points];
                                  newPoints[idx] = e.target.value;
                                  updateData('aboutMe.points', newPoints);
                                }}
                                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                              />
                              <button 
                                onClick={() => {
                                  const newPoints = data.aboutMe.points.filter((_, i) => i !== idx);
                                  updateData('aboutMe.points', newPoints);
                                }}
                                className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => updateData('aboutMe.points', [...data.aboutMe.points, ''])}
                            className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 font-bold rounded-2xl hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={20} /> Add Point
                          </button>
                        </div>
                      </div>
                    </section>

                    {/* Competencies */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Competencies
                      </h3>
                      <div className="space-y-8">
                        {data.competencies.map((comp, idx) => (
                          <div key={comp.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-6">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-slate-900">Competency 0{idx + 1}</h4>
                              <button 
                                onClick={() => {
                                  const newComp = data.competencies.filter(c => c.id !== comp.id);
                                  updateData('competencies', newComp);
                                }}
                                className="text-red-500 hover:text-red-700 font-bold text-sm"
                              >
                                Delete
                              </button>
                            </div>
                            <input 
                              type="text" 
                              value={comp.title}
                              onChange={(e) => {
                                const newComp = [...data.competencies];
                                newComp[idx].title = e.target.value;
                                updateData('competencies', newComp);
                              }}
                              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                              placeholder="Title"
                            />
                            <textarea 
                              value={comp.hrConnection}
                              onChange={(e) => {
                                const newComp = [...data.competencies];
                                newComp[idx].hrConnection = e.target.value;
                                updateData('competencies', newComp);
                              }}
                              className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                              placeholder="HR Connection"
                            />
                            <div className="space-y-3">
                              <label className="text-xs font-bold text-slate-500 ml-1">Items</label>
                              {comp.items.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={item}
                                    onChange={(e) => {
                                      const newComp = [...data.competencies];
                                      newComp[idx].items[i] = e.target.value;
                                      updateData('competencies', newComp);
                                    }}
                                    className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl"
                                  />
                                  <button 
                                    onClick={() => {
                                      const newComp = [...data.competencies];
                                      newComp[idx].items = newComp[idx].items.filter((_, itemIdx) => itemIdx !== i);
                                      updateData('competencies', newComp);
                                    }}
                                    className="text-red-500 p-2"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const newComp = [...data.competencies];
                                  newComp[idx].items.push('');
                                  updateData('competencies', newComp);
                                }}
                                className="text-xs font-bold text-slate-900 hover:underline"
                              >
                                + Add Item
                              </button>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => updateData('competencies', [...data.competencies, { id: Date.now().toString(), title: '', items: [], hrConnection: '' }])}
                          className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 font-bold rounded-2xl hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={20} /> Add Competency
                        </button>
                      </div>
                    </section>

                    {/* Experiences */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Experiences
                      </h3>
                      <div className="space-y-8">
                        {data.experiences.map((exp, idx) => (
                          <div key={exp.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-6">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-slate-900">Experience 0{idx + 1}</h4>
                              <button 
                                onClick={() => {
                                  const newExp = data.experiences.filter(e => e.id !== exp.id);
                                  updateData('experiences', newExp);
                                }}
                                className="text-red-500 hover:text-red-700 font-bold text-sm"
                              >
                                Delete
                              </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                value={exp.title}
                                onChange={(e) => {
                                  const newExp = [...data.experiences];
                                  newExp[idx].title = e.target.value;
                                  updateData('experiences', newExp);
                                }}
                                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                placeholder="Title"
                              />
                              <input 
                                type="text" 
                                value={exp.organization}
                                onChange={(e) => {
                                  const newExp = [...data.experiences];
                                  newExp[idx].organization = e.target.value;
                                  updateData('experiences', newExp);
                                }}
                                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                placeholder="Organization"
                              />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <input 
                                type="text" 
                                value={exp.period}
                                onChange={(e) => {
                                  const newExp = [...data.experiences];
                                  newExp[idx].period = e.target.value;
                                  updateData('experiences', newExp);
                                }}
                                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                placeholder="Period"
                              />
                              <input 
                                type="text" 
                                value={exp.hrConnection}
                                onChange={(e) => {
                                  const newExp = [...data.experiences];
                                  newExp[idx].hrConnection = e.target.value;
                                  updateData('experiences', newExp);
                                }}
                                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                placeholder="HR Connection"
                              />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 ml-1">Roles</label>
                                {exp.roles.map((role, i) => (
                                  <div key={i} className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={role}
                                      onChange={(e) => {
                                        const newExp = [...data.experiences];
                                        newExp[idx].roles[i] = e.target.value;
                                        updateData('experiences', newExp);
                                      }}
                                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl"
                                    />
                                    <button 
                                      onClick={() => {
                                        const newExp = [...data.experiences];
                                        newExp[idx].roles = newExp[idx].roles.filter((_, roleIdx) => roleIdx !== i);
                                        updateData('experiences', newExp);
                                      }}
                                      className="text-red-500 p-2"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => {
                                    const newExp = [...data.experiences];
                                    newExp[idx].roles.push('');
                                    updateData('experiences', newExp);
                                  }}
                                  className="text-xs font-bold text-slate-900 hover:underline"
                                >
                                  + Add Role
                                </button>
                              </div>
                              <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 ml-1">Achievements</label>
                                {exp.achievements.map((ach, i) => (
                                  <div key={i} className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={ach}
                                      onChange={(e) => {
                                        const newExp = [...data.experiences];
                                        newExp[idx].achievements[i] = e.target.value;
                                        updateData('experiences', newExp);
                                      }}
                                      className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl"
                                    />
                                    <button 
                                      onClick={() => {
                                        const newExp = [...data.experiences];
                                        newExp[idx].achievements = newExp[idx].achievements.filter((_, achIdx) => achIdx !== i);
                                        updateData('experiences', newExp);
                                      }}
                                      className="text-red-500 p-2"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => {
                                    const newExp = [...data.experiences];
                                    newExp[idx].achievements.push('');
                                    updateData('experiences', newExp);
                                  }}
                                  className="text-xs font-bold text-slate-900 hover:underline"
                                >
                                  + Add Achievement
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => updateData('experiences', [...data.experiences, { id: Date.now().toString(), title: '', organization: '', period: '', roles: [], achievements: [], hrConnection: '' }])}
                          className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 font-bold rounded-2xl hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                        >
                          <Plus size={20} /> Add Experience
                        </button>
                      </div>
                    </section>

                    {/* Job Fit */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Job Fit
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Title</label>
                          <textarea 
                            value={data.jobFit.title}
                            onChange={(e) => updateData('jobFit.title', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-xs font-bold text-slate-500 ml-1">Points (Format: Title → Description)</label>
                          {data.jobFit.points.map((point, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input 
                                type="text" 
                                value={point}
                                onChange={(e) => {
                                  const newPoints = [...data.jobFit.points];
                                  newPoints[idx] = e.target.value;
                                  updateData('jobFit.points', newPoints);
                                }}
                                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                              />
                              <button 
                                onClick={() => {
                                  const newPoints = data.jobFit.points.filter((_, i) => i !== idx);
                                  updateData('jobFit.points', newPoints);
                                }}
                                className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => updateData('jobFit.points', [...data.jobFit.points, 'Title → Description'])}
                            className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 font-bold rounded-2xl hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={20} /> Add Point
                          </button>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">IT Context</label>
                          <textarea 
                            value={data.jobFit.itContext}
                            onChange={(e) => updateData('jobFit.itContext', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Growth Plan */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Growth Plan
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Short Term</label>
                          <textarea 
                            value={data.growthPlan.shortTerm}
                            onChange={(e) => updateData('growthPlan.shortTerm', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Mid Term</label>
                          <textarea 
                            value={data.growthPlan.midTerm}
                            onChange={(e) => updateData('growthPlan.midTerm', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 ml-1">Long Term</label>
                          <textarea 
                            value={data.growthPlan.longTerm}
                            onChange={(e) => updateData('growthPlan.longTerm', e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Closing */}
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <div className="w-1 h-4 bg-slate-900 rounded-full" />
                        Closing Message
                      </h3>
                      <textarea 
                        value={data.closing}
                        onChange={(e) => updateData('closing', e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 min-h-[100px]"
                      />
                    </section>
                  </div>
                )}
              </div>

              {isLoggedIn && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button 
                    onClick={() => {
                      setIsAdminOpen(false);
                      setIsLoggedIn(false);
                      setPassword('');
                    }}
                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    <Save size={18} />
                    저장 후 닫기
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
