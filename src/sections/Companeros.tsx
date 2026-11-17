import { Users, Mail, Heart } from 'lucide-react';

// =============================================================================
// Sección "Nuestros Compañeros" — FASE 1 (estructura lista)
// Cuando la promoción envíe el material (fotos de ayer y hoy, biografías,
// mensajes personales, homenaje), se rellena aquí. Mientras tanto muestra
// una invitación a participar, que siempre es un contenido válido.
// =============================================================================

const Companeros = () => {
  return (
    <section
      id="companeros"
      className="relative w-full min-h-[70vh] bg-void-black py-20 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mb-12 text-center">
        <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
          NUESTROS COMPAÑEROS
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
          Cada uno, un camino que contar
        </h2>
        <p className="font-mono-custom text-sm text-white/50 mt-6 max-w-3xl mx-auto leading-relaxed">
          Han pasado 50 años desde que dejamos las aulas. Cada uno ha formado
          su propia historia: familias, profesiones, experiencias. Este espacio
          será el directorio de la promoción: <span className="text-white">fotografías de ayer y hoy,
          breves biografías y mensajes personales</span>, publicados con la autorización
          de cada compañero.
        </p>
      </div>

      {/* Cards: invitación a participar + homenaje */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cómo participar */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-neon-cyan/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-neon-cyan" />
            </div>
            <h3 className="font-display text-xl text-white">¿Quieres aparecer aquí?</h3>
            <p className="font-mono-custom text-sm text-white/50 leading-relaxed flex-1">
              Envía al comité tu foto actual, una breve biografía y un mensaje
              para tus compañeros. Con tu autorización, lo publicaremos en esta sección.
            </p>
            <a
              href="mailto:promocionxvii.sjo.50@gmail.com?subject=Mi%20informaci%C3%B3n%20para%20Nuestros%20Compa%C3%B1eros%20-%20Promo%20XVII"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white font-display text-xs uppercase tracking-wider hover:border-neon-cyan hover:text-neon-cyan transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              Enviar mi información
            </a>
          </div>

          {/* Homenaje */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 flex flex-col items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-neon-cyan/15 flex items-center justify-center">
              <Heart className="w-5 h-5 text-neon-cyan" />
            </div>
            <h3 className="font-display text-xl text-white">Homenaje</h3>
            <p className="font-mono-custom text-sm text-white/50 leading-relaxed flex-1">
              En preparación: un espacio de recordatorio para los compañeros
              que nos dejaron, que siempre formarán parte de la Promo XVII.
              La familia de cada uno podrá aportar su recuerdo.
            </p>
            <span className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider">
              Próximamente
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </section>
  );
};

export default Companeros;
