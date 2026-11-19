import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, Users } from 'lucide-react';
import { heroConfig, confirmados } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cuenta regresiva en vivo hasta el Gran Reencuentro (26 de agosto de 2027)
  const EVENT_DATE = new Date(2027, 7, 26); // mes 7 = agosto (los meses van de 0 a 11)
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000); // actualiza cada segundo
    return () => clearInterval(interval);
  }, []);

  const remaining = Math.max(0, EVENT_DATE.getTime() - now);
  const daysLeft = Math.floor(remaining / 86400000);
  const hoursLeft = Math.floor((remaining % 86400000) / 3600000);
  const minutesLeft = Math.floor((remaining % 3600000) / 60000);
  const secondsLeft = Math.floor((remaining % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle fade in (el elemento se quita en el hero comprimido)
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sombra que hace que el texto se lea bien sobre cualquier foto (sin tapar la foto)
  const textShadowStyle: React.CSSProperties = {
    textShadow: '0 1px 4px rgba(0,0,0,0.75), 0 0 10px rgba(0,0,0,0.4)',
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
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ backgroundImage: `url(${heroConfig.backgroundImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 video-overlay" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void-black/15 to-void-black" />
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

      {/* Hero: contenido centrado en el hueco vacío, por encima de las cabezas del grupo */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pb-[16vh] sm:pb-[20vh]">
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

        {/* Contenido: contador por encima de las cabezas + confirmación */}
        <div className="absolute left-1/2 top-[12vh] -translate-x-1/2 z-20 flex flex-col items-center gap-3 px-4 text-center">
          {/* Cuenta regresiva */}
          <div className="nav-pill rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-2 sm:gap-3">
            <Calendar className="w-4 h-4 text-neon-cyan flex-shrink-0" />
            <span className="font-mono-custom text-[10px] sm:text-sm uppercase tracking-wider text-white/85 whitespace-nowrap" style={textShadowStyle}>
              Faltan{' '}
              <span className="text-neon-cyan font-bold" style={textShadowStyle}>{daysLeft}</span>{' '}
              {daysLeft === 1 ? 'día' : 'días'}{' '}
              <span className="text-neon-cyan font-bold tabular-nums">{pad(hoursLeft)}:{pad(minutesLeft)}:{pad(secondsLeft)}</span>
              <span className="hidden sm:inline"> — 26 de agosto de 2027</span>
            </span>
          </div>

          {/* Botón Confirmar Asistencia */}
          <button
            onClick={() => window.open('https://chat.whatsapp.com/D16jMP13sSx2myxeTEmiaW?s=cl&p=a&iam=2', '_blank')}
            style={textShadowStyle}
            className="px-6 sm:px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-colors duration-300"
          >
            {heroConfig.ctaSecondary}
          </button>

          {/* Confirmados (visible cuando hay más de 0) */}
          {confirmados > 0 && (
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono-custom text-xs sm:text-sm uppercase tracking-wider text-white/70">
                Ya somos{' '}
                <span className="text-neon-cyan font-bold" style={textShadowStyle}>{confirmados}</span>{' '}
                confirmados
              </span>
            </div>
          )}
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
