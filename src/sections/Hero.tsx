import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar } from 'lucide-react';
import { heroConfig } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-void-black"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url(${heroConfig.backgroundImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/30 to-void-black" />
      </div>

      {/* Navigation pill - solo desktop */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2 hidden sm:block"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" />
          <div className="absolute top-16 right-4 left-4 nav-pill rounded-2xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-2">
              {heroConfig.navItems.map((item) => {
                const IconComponent = ICON_MAP[item.icon];
                return (
                  <button
                    key={item.sectionId}
                    onClick={() => { scrollToSection(item.sectionId); setMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hero: contenido pegado al fondo, texto pequeño para ver caras */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 sm:pb-12 px-4">
        {/* Logo / Brand y Menu - misma linea */}
        <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 flex items-center justify-between z-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
              <Disc className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neon-cyan" />
            </div>
            <span className="font-display text-sm sm:text-lg text-white">{heroConfig.brandName}</span>
          </div>
          
          {/* Hamburger menu - solo mobil */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 nav-pill rounded-full"
            aria-label="Abrir menú"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Main title with decode effect */}
        <h1
          ref={titleRef}
          className="decode-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none tracking-tighter mb-4 sm:mb-6"
        >
          <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono-custom text-xs sm:text-sm md:text-base text-neon-soft/70 uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-6 sm:mb-8 px-4 text-center"
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
            className="px-6 sm:px-8 py-3 bg-white text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-neon-soft transition-colors duration-300 w-full sm:w-auto"
          >
            {heroConfig.ctaPrimary}
          </button>
          <button
            onClick={() => window.open('https://chat.whatsapp.com/D16jMP13sSx2myxeTEmiaW?s=cl&p=a&iam=2', '_blank')}
            className="px-6 sm:px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors duration-300 w-full sm:w-auto"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      {/* Corner accents - oculto en movil para no solaparse con el menu */}
      <div className="absolute top-8 right-8 text-right hidden sm:block">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-neon-soft/60">{heroConfig.cornerDetail}</p>
      </div>
    </section>
  );
};

export default Hero;
