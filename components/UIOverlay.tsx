
import React, { useState } from 'react';
import { VisualConfig, VisualizationMode, Section } from '../types';
import { generateVisualConfig } from '../services/geminiService';

interface UIOverlayProps {
  config: VisualConfig;
  setConfig: React.Dispatch<React.SetStateAction<VisualConfig>>;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({ config, setConfig }) => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleGeminiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setAiMessage("Designing theme...");
    
    const result = await generateVisualConfig(prompt);
    
    if (result.config) {
      setConfig(prev => ({ ...prev, ...result.config }));
      setAiMessage(result.message);
    } else {
      setAiMessage("AI connection failed.");
    }
    
    setLoading(false);
    setPrompt('');
  };

  // Navigation Items
  const navItems = [
    { id: Section.HOME, label: 'Home' },
    { id: Section.ABOUT, label: 'About' },
    { id: Section.PROJECTS, label: 'Projects' },
    { id: Section.CONTACT, label: 'Contact' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case Section.HOME:
        return (
          <div className="flex flex-col justify-center h-full max-w-5xl mx-auto text-center md:text-left animate-in fade-in slide-in-from-bottom-10 duration-700 pointer-events-none">
            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-white/5 inline-block pointer-events-auto">
                <h2 className="text-cyan-400 font-mono tracking-widest mb-4 uppercase text-sm">Computer Scientist • Software Developer</h2>
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 mix-blend-overlay leading-none">
                MUNYARADZI<br />MZITE
                </h1>
                <p className="text-xl md:text-2xl text-white/80 font-light max-w-xl mb-8 leading-relaxed">
                  Bridging the gap between <strong className="text-white">Technology</strong> and <strong className="text-white">Art</strong>. 
                  Student at Africa University and Software Developer at NetOne Cellular.
                </p>
                <div className="flex gap-4 flex-col md:flex-row justify-center md:justify-start">
                    <button 
                        onClick={() => setActiveSection(Section.PROJECTS)}
                        className="bg-white text-black hover:bg-cyan-400 transition-colors px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider"
                    >
                        View My Work
                    </button>
                    <button 
                        onClick={() => setIsThemeOpen(true)}
                        className="bg-transparent border border-white/30 hover:bg-white/10 text-white transition-colors px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                       Customize Experience
                    </button>
                </div>
            </div>
          </div>
        );
      case Section.ABOUT:
        return (
          <div className="h-full overflow-y-auto pb-20 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto scrollbar-thin">
            <div className="max-w-5xl mx-auto bg-black/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl shadow-cyan-900/20">
              
              {/* Header */}
              <div className="mb-10">
                  <h2 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-cyan-400">01.</span> About Me
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                      I am a Computer Science student at <strong className="text-white">Africa University</strong> and a Software Developer at <strong className="text-white">NetOne Cellular</strong>.
                      My passion lies at the intersection of creative arts and technical innovation. I combine skills in 3D modeling, animation, and painting with rigorous programming and system design to create unique digital experiences.
                  </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  {/* Experience Column */}
                  <div>
                      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                          </svg>
                          Experience
                      </h3>
                      <div className="space-y-6">
                           <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-colors group">
                              <div className="flex justify-between items-start mb-2">
                                  <div>
                                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">Software Developer</h4>
                                      <p className="text-gray-400 font-medium">NetOne Cellular</p>
                                  </div>
                                  <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">Present</span>
                              </div>
                              <p className="text-gray-400 text-sm">
                                  Developing robust software solutions and contributing to the technological infrastructure of one of Zimbabwe's leading telecommunications providers.
                              </p>
                          </div>
                           
                           <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                  <div>
                                      <h4 className="text-xl font-bold text-white">Freelance Developer & Artist</h4>
                                      <p className="text-gray-400 font-medium">Self-Employed</p>
                                  </div>
                                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">2020 - Present</span>
                              </div>
                              <p className="text-gray-400 text-sm">
                                  Specializing in 3D animation, graphic design, and web development for various clients.
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* Education Column */}
                  <div>
                      <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                          </svg>
                          Education
                      </h3>
                      <div className="space-y-4">
                          {[
                            { date: "2022-2026", title: "B.Sc Computer Science", place: "Africa University", grade: "CGPA: 3.4" },
                            { date: "2025", title: "Intro to Cybersecurity", place: "Cisco" },
                            { date: "2025", title: "Building with AI", place: "Saylor Academy" },
                            { date: "2024", title: "Information Security", place: "Saylor Academy" },
                          ].map((edu, i) => (
                              <div key={i} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-colors">
                                  <div className="text-xs font-mono text-purple-400 pt-1 w-20">{edu.date}</div>
                                  <div>
                                      <div className="font-bold text-white">{edu.title}</div>
                                      <div className="text-sm text-gray-400">{edu.place}</div>
                                      {edu.grade && <div className="text-xs text-cyan-400 mt-1">{edu.grade}</div>}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Skills & Languages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                   <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-4">Technical Arsenal</h3>
                        <div className="flex flex-wrap gap-3">
                            {['C#', 'Python', 'JavaScript', 'Three.js', 'React', 'HTML/CSS', 'Blender 3D', '2D Animation', 'Photoshop', 'Game Dev', 'Git'].map(skill => (
                                <div key={skill} className="bg-cyan-900/20 text-cyan-200 border border-cyan-500/30 px-4 py-2 rounded-full font-mono text-sm hover:bg-cyan-900/40 transition-colors cursor-default">
                                    {skill}
                                </div>
                            ))}
                        </div>
                   </div>
                   <div>
                        <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
                        <ul className="space-y-2 text-sm bg-white/5 p-4 rounded-xl">
                            <li className="flex justify-between text-gray-300 border-b border-white/5 pb-2"><span>English</span> <span className="text-cyan-400 font-bold">Fluent</span></li>
                            <li className="flex justify-between text-gray-300 border-b border-white/5 pb-2"><span>Shona</span> <span className="text-cyan-400 font-bold">Fluent</span></li>
                            <li className="flex justify-between text-gray-300"><span>French</span> <span className="text-gray-500">Beginner</span></li>
                        </ul>
                   </div>
              </div>

            </div>
          </div>
        );
      case Section.PROJECTS:
        return (
           <div className="h-full overflow-y-auto pb-20 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto scrollbar-thin">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-white mb-8 sticky top-0 bg-black/0 backdrop-blur-md py-4 z-10">
                    <span className="text-cyan-400">02.</span> Projects
                </h2>
                
                {/* Programming / Innovation Section */}
                <div className="mb-16">
                    <h3 className="text-2xl text-white font-light mb-6 border-l-4 border-cyan-500 pl-4">Programming & Innovation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/30 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/60 transition-colors">
                            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">POTRAZ AWARD WINNER</div>
                            <h4 className="text-2xl font-bold text-white mb-2">Braille Eyes</h4>
                            <p className="text-xs font-mono text-purple-300 mb-4">2025 • Vision Augmentation System</p>
                            <p className="text-gray-300 mb-4">
                                Empowering the visually impaired with an innovative sound-based vision augmentation system. Uses depth cameras to determine position and proximity of obstacles. 
                            </p>
                            <ul className="text-sm text-gray-400 list-disc list-inside mb-4">
                                <li>Exhibited at MSU-AZ AI Conference 2025</li>
                                <li>ICT Expo Mutare 2025</li>
                                <li>Featured on ZBC National News</li>
                                <li><strong>Silver Trophy Winner</strong> at POTRAZ Innovation Expo 2025</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-900/40 to-black border border-cyan-500/30 p-8 rounded-3xl hover:border-cyan-500/60 transition-colors">
                            <h4 className="text-2xl font-bold text-white mb-2">Offline Payment Software</h4>
                            <p className="text-xs font-mono text-cyan-300 mb-4">2025 • Fintech Hackathon</p>
                            <p className="text-gray-300">
                                Developed for the ZB Bank Fintech Hackathon. Enables payments without internet connectivity using QR codes, NFC, or Bluetooth protocols.
                            </p>
                        </div>
                        
                        {/* Updated Web Dev Card */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                            <h4 className="text-xl font-bold text-white mb-2">Web Development</h4>
                            <p className="text-xs font-mono text-gray-400 mb-2">2023 - Present</p>
                            <p className="text-gray-400 text-sm mb-3">Building immersive, responsive web experiences.</p>
                            <div className="flex gap-2 flex-wrap">
                                <span className="bg-cyan-900/40 text-cyan-300 text-xs px-2 py-1 rounded border border-cyan-500/30">Three.js</span>
                                <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30">React</span>
                                <span className="bg-orange-900/40 text-orange-300 text-xs px-2 py-1 rounded border border-orange-500/30">HTML/CSS</span>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                            <h4 className="text-xl font-bold text-white mb-2">Game Development</h4>
                            <p className="text-xs font-mono text-gray-400 mb-2">2020 - Present</p>
                            <p className="text-gray-400 text-sm">Experience in game development mechanics and integrating machine learning agents for dynamic gameplay.</p>
                        </div>
                    </div>
                </div>

                {/* Computer Graphics Section */}
                <div>
                    <h3 className="text-2xl text-white font-light mb-6 border-l-4 border-pink-500 pl-4">Computer Graphics & Animation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {/* Prioritized Videos first as requested */}
                        {[
                            { title: "Elevator", date: "2023", url: "https://www.youtube.com/embed/LpKz78ZzPkk?si=pVnQmP8l1I0XtgMn" },
                            { title: "Gabe Guck Drop", date: "2025", url: "https://www.youtube.com/embed/mNf3xePn-LA" },
                            { title: "3D Character Anim Demo", date: "2025", url: "https://www.youtube.com/embed/gv0LeXxknWw?si=YDBakfU_U-xVQJi_" },
                            { title: "Walking on Water", date: "2024", url: "https://www.youtube.com/embed/Bff8k2b6Pao?si=rH1IH49jLmKkJdH6" },
                            { title: "Bvumba Mist Advert", date: "Nov 2024", url: "https://www.youtube.com/embed/KcCD5H2ucf0?si=-HTT_FRQ8OtHnbu5" },
                            { title: "Subway Scene", date: "Aug 2023", url: "https://www.youtube.com/embed/ZIHAZ_EjHpU?si=LI-2ZoSb4BUjMMW6" },
                            { title: "Ona Natural Oils", date: "Jan 2022", url: "https://www.youtube.com/embed/F4MqL3jv_6Q?si=6F4JSI9eyFy4kmeV" },
                            { title: "Studio Room", date: "Oct 2023", url: "https://www.youtube.com/embed/6Tl7AE5HOb8?si=0eUyyNdXiR_-_mMY" },
                            { title: "2D Head Turn", date: "Jan 2023", url: "https://www.youtube.com/embed/51k3zmcS5DM?si=eAz5K7vJbKsjAyyT" },
                            { title: "Bar Scene (WIP)", date: "Apr 2024", url: "https://www.youtube.com/embed/V2OCazkydRE?si=poLsFc-8daGCNR_u" },
                        ].map((vid, i) => (
                            <div key={i} className="bg-black/40 rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all">
                                <div className="aspect-video w-full bg-black relative">
                                     <iframe 
                                        src={vid.url} 
                                        title={vid.title}
                                        className="absolute top-0 left-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                     />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-white font-bold truncate">{vid.title}</h4>
                                    <p className="text-xs text-gray-500">{vid.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

              </div>
           </div>
        );
      case Section.CONTACT:
         return (
            <div className="h-full w-full overflow-y-auto flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto">
                <div className="bg-black/60 backdrop-blur-xl p-10 rounded-3xl border border-white/10 text-center max-w-lg w-full mx-4 my-auto">
                    <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
                    <p className="text-gray-400 mb-8">Connect with me on social media or check out my code.</p>
                    
                    <div className="grid gap-4">
                        <a href="https://www.linkedin.com/in/munyaradzi-mzite-1499b3202/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-none">
                             <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/Jindantesparda" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-none">
                             <span>GitHub @Jindantesparda</span>
                        </a>
                        <a href="https://twitter.com/Jindantesparda" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-none">
                             <span>Twitter</span>
                        </a>
                        <a href="https://www.instagram.com/sssensationall/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-pink-700 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-none">
                             <span>Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
         );
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
        {/* Top Navigation - Increased Size */}
        <nav className="w-full p-8 md:p-12 flex justify-between items-center z-20 bg-gradient-to-b from-black/90 to-transparent pointer-events-auto">
            <div 
                className="text-3xl font-black text-white tracking-tighter cursor-pointer select-none z-50"
                onClick={() => setActiveSection(Section.HOME)}
            >
                M.M<span className="text-cyan-400">.</span>
            </div>
            
            {/* Desktop Nav - Bigger and bolder */}
            <div className="hidden md:flex gap-12 bg-black/40 backdrop-blur-md px-10 py-4 rounded-full border border-white/10">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`text-lg font-bold transition-colors ${activeSection === item.id ? 'text-cyan-400' : 'text-white/60 hover:text-white'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className={`z-50 p-4 rounded-full border transition-all ${isThemeOpen ? 'bg-white text-black border-white' : 'bg-transparent text-white/70 border-white/20 hover:text-white'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.048 4.025a3 3 0 01-4.293 0 16.73 16.73 0 01-3.479-5.192 4.5 4.5 0 011.067-4.92v-5.68" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zm-6 0c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2z" />
                </svg>
            </button>
        </nav>

        {/* Mobile Nav (Bottom) - Slightly adjusted for better touch targets */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-6 flex justify-around z-30 pointer-events-auto">
             {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`text-sm font-bold uppercase tracking-wider ${activeSection === item.id ? 'text-cyan-400' : 'text-white/40'}`}
                    >
                        {item.label}
                    </button>
                ))}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 overflow-hidden pointer-events-none">
            {renderContent()}
        </main>

        {/* Theme Customizer Sidebar/Drawer */}
        {isThemeOpen && (
            <div className="absolute top-24 right-6 w-80 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 z-20 shadow-2xl animate-in fade-in slide-in-from-right-10 pointer-events-auto">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold">Theme Engine</h3>
                    <button onClick={() => setIsThemeOpen(false)} className="text-white/50 hover:text-white">&times;</button>
                 </div>

                 <div className="mb-6">
                    <label className="block text-xs text-cyan-400 mb-2 font-mono">AI DESIGNER</label>
                    <form onSubmit={handleGeminiSubmit} className="relative">
                        <input 
                            type="text" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'Cyberpunk Purple'"
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:border-cyan-500 outline-none pr-10"
                        />
                         <button 
                            type="submit" 
                            disabled={loading}
                            className="absolute right-2 top-2 text-cyan-400 disabled:text-gray-600 hover:text-white"
                         >
                             {loading ? '...' : 'GO'}
                         </button>
                    </form>
                    {aiMessage && <div className="mt-2 text-xs text-white/60 italic">"{aiMessage}"</div>}
                 </div>

                 <div className="space-y-4 border-t border-white/10 pt-4">
                    <div>
                        <label className="block text-xs text-white/50 mb-1">SPEED</label>
                        <input 
                            type="range" min="0.1" max="5.0" step="0.1" 
                            value={config.speed} 
                            onChange={(e) => setConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    
                    <div>
                         <label className="block text-xs text-white/50 mb-1">MODE</label>
                         <div className="flex gap-2">
                            {Object.values(VisualizationMode).map(m => (
                                <button
                                    key={m}
                                    onClick={() => setConfig(prev => ({...prev, mode: m}))}
                                    className={`flex-1 py-1 text-xs rounded border ${config.mode === m ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                >
                                    {m}
                                </button>
                            ))}
                         </div>
                    </div>

                     <div className="flex gap-4">
                        <div className="flex-1">
                             <label className="block text-xs text-white/50 mb-1">PRIMARY</label>
                             <input 
                                type="color" value={config.colorPrimary}
                                onChange={(e) => setConfig(prev => ({...prev, colorPrimary: e.target.value}))}
                                className="w-full h-8 bg-transparent border-none cursor-pointer"
                             />
                        </div>
                         <div className="flex-1">
                             <label className="block text-xs text-white/50 mb-1">SECONDARY</label>
                             <input 
                                type="color" value={config.colorSecondary}
                                onChange={(e) => setConfig(prev => ({...prev, colorSecondary: e.target.value}))}
                                className="w-full h-8 bg-transparent border-none cursor-pointer"
                             />
                        </div>
                    </div>
                 </div>
            </div>
        )}
    </div>
  );
};
