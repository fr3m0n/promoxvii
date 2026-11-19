import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, FileText, ChevronDown, HelpCircle } from 'lucide-react';
import { tourScheduleConfig } from '../config';
import FormularioInscripcion from './FormularioInscripcion';

gsap.registerPlugin(ScrollTrigger);

const TourSchedule = () => {
  // Null check: if config is empty, do not render
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeVenue, setActiveVenue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.tour-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-sale':
        return { text: tourScheduleConfig.statusLabels.onSale, color: 'text-emerald-600 bg-emerald-100' };
      case 'sold-out':
        return { text: tourScheduleConfig.statusLabels.soldOut, color: 'text-rose-600 bg-rose-100' };
      case 'coming-soon':
        return { text: tourScheduleConfig.statusLabels.comingSoon, color: 'text-amber-600 bg-amber-100' };
      default:
        return { text: tourScheduleConfig.statusLabels.default, color: 'text-gray-600 bg-gray-100' };
    }
  };

  const TOUR_DATES = tourScheduleConfig.tourDates;

  // Preguntas frecuentes (respuestas orientativas: el comité puede corregirlas)
  const FAQS = [
    {
      q: '¿Cómo confirmo mi asistencia?',
      a: 'Entrando al grupo de WhatsApp de la promoción (botón "Confirmar Asistencia") o escribiendo al correo del comité: promocionxvii.sjo.50@gmail.com. Indica tu nombre y, si vienes acompañado, cuántas personas seréis en total.',
    },
    {
      q: '¿Puedo asistir con acompañantes o familiares?',
      a: 'Sí, la celebración es para compartir. Al confirmar tu asistencia, indica cuántas personas os acompañarán para que el comité planifique la capacidad de los restaurantes y del hotel.',
    },
    {
      q: '¿Cuáles son los costos y las formas de pago?',
      a: 'El comité está preparando el detalle de costos por persona (almuerzos, cenas y celebración) y las formas de pago disponibles. La información se publicará pronto en esta sección y en el PDF del programa.',
    },
    {
      q: '¿Cómo reservo en el Hotel Bracamonte?',
      a: 'El Hotel Bracamonte será el punto central del reencuentro (recepción, desayunos y cenas). El comité negociará una tarifa especial de grupo: reserva a través del comité escribiendo al correo promocionxvii.sjo.50@gmail.com para obtener el precio de la promoción.',
    },
    {
      q: '¿Hay un código de vestimenta?',
      a: 'Para la cena con música del recuerdo se sugiere vestimenta elegante (o casual elegante). Para las actividades del día en el colegio y el paseo de despedida, lo cómodo y fresco es lo ideal.',
    },
    {
      q: '¿Qué recomendaciones hay para quienes viajamos desde el extranjero?',
      a: 'Trujillo cuenta con el aeropuerto CAP FAP Carlos Martínez de Pinillos, con vuelos diarios desde Lima, o puedes llegar en bus desde Lima (aprox. 8 horas). Agosto es temporada de buen clima en Trujillo. Si necesitas ayuda con tu itinerario, escríbele al comité y os orientaremos.',
    },
    {
      q: '¿Dónde veo el programa completo de los tres días?',
      a: 'Puedes descargar el programa oficial completo en PDF desde el botón "Ver Programa Completo (PDF)" que está justo debajo de estas preguntas.',
    },
  ];

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#9DC4FF] py-20 overflow-hidden"
    >
      {/* Content container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono-custom text-xs text-[#1F1F1F]/60 uppercase tracking-wider mb-2">
            {tourScheduleConfig.sectionLabel}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-[#1F1F1F]">
            {tourScheduleConfig.sectionTitle}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Venue preview centered */}
          {TOUR_DATES.length > 0 && (
            <div className="hidden lg:flex lg:justify-center lg:items-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-[#1F1F1F]/10 mx-auto">
                <img
                  src={TOUR_DATES[activeVenue]?.image}
                  alt={TOUR_DATES[activeVenue]?.venue}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Venue info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1F1F1F] to-transparent">
                  <p className="font-display text-2xl text-white">
                    {TOUR_DATES[activeVenue]?.venue}
                  </p>
                  <p className="font-mono-custom text-sm text-white/70">
                    {TOUR_DATES[activeVenue]?.city}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right: Tour list */}
          <div className="space-y-4">
            {TOUR_DATES.slice(0, 6).map((tour, index) => {
              const status = getStatusLabel(tour.status);

              return (
                <div
                  key={tour.id}
                  className="tour-item group relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-[#1F1F1F]/10 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveVenue(index)}
                  onMouseLeave={() => setActiveVenue(0)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 min-w-0">
                    {/* Date */}
                    <div className="flex-shrink-0 w-28">
                      <p className="font-mono-custom text-2xl font-bold text-[#1F1F1F]">
                        {tour.date.split('.').slice(1).join('.')}
                      </p>
                      <p className="font-mono-custom text-xs text-[#1F1F1F]/50">
                        {tour.date.split('.')[0]}
                      </p>
                    </div>

                    {/* Venue info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#1F1F1F]/50" />
                        <span className="font-display text-lg text-[#1F1F1F]">
                          {tour.city}
                        </span>
                      </div>
                      <p className="text-sm text-[#1F1F1F]/60 ml-6 truncate">
                        {tour.venue}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex-shrink-0 flex items-center gap-2 text-[#1F1F1F]/60">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono-custom text-sm whitespace-nowrap">{tour.time}</span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#1F1F1F] rounded-full group-hover:h-12 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cómo llegar - Mapas */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="font-mono-custom text-xs text-[#1F1F1F]/60 uppercase tracking-wider mb-2">
              CÓMO LLEGAR
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-[#1F1F1F]">
              Lugares de celebración
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hotel Bracamonte */}
            <div className="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-[#1F1F1F]/10">
              <iframe
                src="https://maps.google.com/maps?q=-8.0846598,-79.1212522&z=16&output=embed"
                title="Mapa: Hotel Bracamonte"
                loading="lazy"
                className="w-full h-64 md:h-72 border-0"
              />
              <div className="p-5 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-[#1F1F1F]">Hotel Bracamonte</p>
                  <p className="font-mono-custom text-xs text-[#1F1F1F]/50">
                    Recepción, desayunos y cenas
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/hcLX6czuS4poyGGn7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] text-white font-display text-xs uppercase tracking-wider rounded-full hover:bg-[#1F1F1F]/80 transition-colors flex-shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Abrir en</span> Maps
                </a>
              </div>
            </div>

            {/* Colegio San José Obrero */}
            <div className="rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-[#1F1F1F]/10">
              <iframe
                src="https://maps.google.com/maps?q=-8.1341259,-79.0394331&z=16&output=embed"
                title="Mapa: Colegio San José Obrero"
                loading="lazy"
                className="w-full h-64 md:h-72 border-0"
              />
              <div className="p-5 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-[#1F1F1F]">Colegio San José Obrero</p>
                  <p className="font-mono-custom text-xs text-[#1F1F1F]/50">
                    Visita, placa, misa y fotos
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/KQ7opzcpwToJ9ssX9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1F1F] text-white font-display text-xs uppercase tracking-wider rounded-full hover:bg-[#1F1F1F]/80 transition-colors flex-shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Abrir en</span> Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <div className="mt-20">
          <div className="mb-8">
            <p className="font-mono-custom text-xs text-[#1F1F1F]/60 uppercase tracking-wider mb-2">
              PREGUNTAS FRECUENTES
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-[#1F1F1F]">
              Todo lo que necesitas saber
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
            <p className="font-mono-custom text-xs text-[#1F1F1F]/40 text-center pt-4">
              Respuestas orientativas — el comité organizador confirmará los detalles finales.
            </p>
          </div>
        </div>

        {/* Formulario de inscripción */}
        <FormularioInscripcion />

        {/* Bottom CTA - Botón del PDF */}
        <div className="mt-20 text-center">
          <p className="font-mono-custom text-sm text-[#1F1F1F]/60 mb-4">
            {tourScheduleConfig.bottomNote}
          </p>
          <button
            type="button"
            onClick={() => {
              window.open('/ProgramaBodasOro.pdf', '_blank');
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1F1F1F] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#1F1F1F]/80 transition-colors cursor-pointer relative z-30"
          >
            <FileText className="w-5 h-5" />
            <span>{tourScheduleConfig.bottomCtaText}</span>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1F1F1F]/20 to-transparent" />
    </section>
  );
};

// Item plegable de preguntas frecuentes
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="tour-item rounded-xl bg-white/50 backdrop-blur-sm border border-[#1F1F1F]/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left cursor-pointer hover:bg-white/70 transition-colors"
      >
        <HelpCircle className="w-4 h-4 text-[#1F1F1F]/50 flex-shrink-0" />
        <span className="font-display text-base text-[#1F1F1F] flex-grow">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#1F1F1F]/50 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pl-12">
          <p className="text-sm text-[#1F1F1F]/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default TourSchedule;
