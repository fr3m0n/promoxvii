import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, PenLine } from 'lucide-react';

// =============================================================================
// Formulario de inscripción — envía los datos al email del comité vía Formspree
// Endpoint configurado: https://formspree.io/f/xvkaawve
// =============================================================================

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkaawve';

type Estado = 'idle' | 'sending' | 'ok' | 'error';

const FormularioInscripcion = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [acompanantes, setAcompanantes] = useState('1');
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Nueva inscripción — Gran Reencuentro 2027 (Promo XVII)',
          nombre,
          email,
          telefono,
          acompanantes,
          mensaje,
        }),
      });
      if (res.ok) {
        setEstado('ok');
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/80 border border-[#1F1F1F]/15 font-mono-custom text-sm text-[#1F1F1F] placeholder-[#1F1F1F]/40 focus:outline-none focus:border-[#1F1F1F]/50 transition-colors';

  return (
    <div className="mt-20">
      <div className="mb-8 text-center">
        <p className="font-mono-custom text-xs text-[#1F1F1F]/60 uppercase tracking-wider mb-2">
          INSCRIPCIÓN
        </p>
        <h3 className="font-display text-3xl md:text-4xl text-[#1F1F1F]">
          Confirma tu asistencia
        </h3>
        <p className="text-sm text-[#1F1F1F]/60 mt-3 max-w-xl mx-auto">
          Rellena el formulario y los datos llegarán directamente al correo del
          comité organizador, que se pondrá en contacto contigo.
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-2xl bg-white/60 backdrop-blur-sm border border-[#1F1F1F]/10 p-6 sm:p-10">
        {estado === 'ok' ? (
          <div className="text-center py-8">
            <CheckCircle className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
            <h4 className="font-display text-2xl text-[#1F1F1F] mb-2">
              ¡Inscripción enviada!
            </h4>
            <p className="text-sm text-[#1F1F1F]/60 max-w-md mx-auto">
              Gracias, <span className="text-[#1F1F1F]">{nombre}</span>. Tu
              solicitud ya está en el correo del comité. Te responderán lo antes
              posible con los detalles de pago y reservas.
            </p>
            <button
              type="button"
              onClick={() => { setEstado('idle'); setNombre(''); setEmail(''); setTelefono(''); setAcompanantes('1'); setMensaje(''); }}
              className="mt-6 text-xs font-mono-custom uppercase tracking-wider text-[#1F1F1F]/50 hover:text-[#1F1F1F] underline underline-offset-4 cursor-pointer"
            >
              Enviar otra inscripción
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="insc-nombre" className="block font-mono-custom text-xs uppercase tracking-wider text-[#1F1F1F]/60 mb-1.5">
                  Nombre completo *
                </label>
                <input
                  id="insc-nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="insc-email" className="block font-mono-custom text-xs uppercase tracking-wider text-[#1F1F1F]/60 mb-1.5">
                  Email *
                </label>
                <input
                  id="insc-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="insc-telefono" className="block font-mono-custom text-xs uppercase tracking-wider text-[#1F1F1F]/60 mb-1.5">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="insc-telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+51 ... (opcional)"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="insc-acompanantes" className="block font-mono-custom text-xs uppercase tracking-wider text-[#1F1F1F]/60 mb-1.5">
                  ¿Cuántos seréis? (contigo)
                </label>
                <select
                  id="insc-acompanantes"
                  value={acompanantes}
                  onChange={(e) => setAcompanantes(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="1">Solo yo</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5+">5 o más</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="insc-mensaje" className="block font-mono-custom text-xs uppercase tracking-wider text-[#1F1F1F]/60 mb-1.5">
                Comentarios para el comité
              </label>
              <textarea
                id="insc-mensaje"
                rows={3}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="¿Necesitas alojamiento? ¿Vienes desde el extranjero? Cuéntanoslo (opcional)"
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={estado === 'sending'}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1F1F1F] text-white font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#1F1F1F]/80 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {estado === 'sending' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar inscripción
                </>
              )}
            </button>

            {estado === 'error' && (
              <p className="flex items-center justify-center gap-2 text-sm text-red-700 bg-red-100/60 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                No se pudo enviar. Inténtalo de nuevo o escribe directamente a
                promocionxvii.sjo.50@gmail.com
              </p>
            )}

            <p className="flex items-center justify-center gap-2 font-mono-custom text-xs text-[#1F1F1F]/40 text-center">
              <PenLine className="w-3.5 h-3.5 flex-shrink-0" />
              Tus datos solo los usará el comité para organizar el reencuentro.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormularioInscripcion;
