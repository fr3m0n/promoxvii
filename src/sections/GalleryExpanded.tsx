import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

// =============================================================================
// Galería de Recuerdos — organizada por épocas en pestañas.
// Cuando lleguen fotos nuevas del comité: añadir una entrada a `galleryPhotos`
// con su `era` correspondiente y aparecerá automáticamente en su pestaña.
// =============================================================================

type Era = 'escolar' | 'graduacion' | 'reencuentros' | 'hoy';

const ERAS: { id: Era; label: string }[] = [
  { id: 'escolar', label: 'Época Escolar' },
  { id: 'graduacion', label: 'Graduación 1977' },
  { id: 'reencuentros', label: 'Reencuentros' },
  { id: 'hoy', label: 'Hoy 2026-27' },
];

interface Foto {
  src: string;
  title: string;
  year: string;
  era: Era;
}

// Fotos de la galería, clasificadas por época
const galleryPhotos: Foto[] = [
  // Época escolar (1975-1976)
  { src: '/cube-schooldays.jpg', title: 'Días de Escuela', year: '1975', era: 'escolar' },
  { src: '/gallery-classroom.jpg', title: 'En el Aula', year: '1975', era: 'escolar' },
  { src: '/gallery-sports.jpg', title: 'Equipo Campeón', year: '1976', era: 'escolar' },
  { src: '/gallery-friends.jpg', title: 'Mejores Amigos', year: '1976', era: 'escolar' },
  // Graduación (1977)
  { src: '/hero-graduation.jpg', title: 'Foto Principal', year: '1977', era: 'graduacion' },
  { src: '/cube-graduation.jpg', title: 'Graduación', year: '1977', era: 'graduacion' },
  { src: '/gallery-diploma.jpg', title: 'Recibiendo Diplomas', year: '1977', era: 'graduacion' },
  { src: '/gallery-dance.jpg', title: 'Baile de Prom', year: '1977', era: 'graduacion' },
  { src: '/gallery-building.jpg', title: 'Nuestro Colegio', year: '1977', era: 'graduacion' },
  { src: '/cube-legacy.jpg', title: 'Legado', year: '1977', era: 'graduacion' },
  // Reencuentros
  { src: '/cube-reunion.jpg', title: 'Reuniones', year: '1976', era: 'reencuentros' },
  { src: '/gallery-reunion25.jpg', title: 'Reunión de 25 Años', year: '2002', era: 'reencuentros' },
  // Hoy (2026-2027)
  { src: '/gallery-recent.jpg', title: 'Encuentro Reciente', year: '2026', era: 'hoy' },
  { src: '/cube-recent.jpg', title: 'Hoy', year: '2026', era: 'hoy' },
  { src: '/cube-celebration.jpg', title: 'Celebración', year: '2027', era: 'hoy' },
  { src: '/footer-group.jpg', title: 'Celebración 50 Años', year: '2027', era: 'hoy' },
];

// Videos de la promoción
const galleryVideos = [
  { id: 'kXVzNlbbCRk', title: 'Video de la Promoción XVII', year: '2026' },
];

const GalleryExpanded = () => {
  const [activeEra, setActiveEra] = useState<Era>('graduacion');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<number | null>(null);

  // Fotos de la pestaña activa (el lightbox navega solo dentro de esta época)
  const fotosActuales = galleryPhotos.filter((p) => p.era === activeEra);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxVideo(null);
  };
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % fotosActuales.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + fotosActuales.length) % fotosActuales.length);
    }
  };

  return (
    <section
      id="gallery-expanded"
      className="relative w-full min-h-screen bg-void-black py-20 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
          GALERÍA POR ÉPOCAS
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white">
          Nuestros Recuerdos
        </h2>
        <p className="font-mono-custom text-sm text-white/50 mt-4 max-w-2xl">
          Las fotos están agrupadas por épocas. Iremos añadiendo nuevos recuerdos a cada etapa;
          haz clic en cualquier imagen para verla en grande.
        </p>
      </div>

      {/* Pestañas por época */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {ERAS.map((era) => {
            const count = galleryPhotos.filter((p) => p.era === era.id).length;
            const isActive = era.id === activeEra;
            return (
              <button
                key={era.id}
                onClick={() => { setActiveEra(era.id); setLightboxIndex(null); }}
                className={`px-4 sm:px-5 py-2 rounded-full font-mono-custom text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-neon-cyan text-void-black font-bold'
                    : 'nav-pill text-white/70 hover:text-white'
                }`}
              >
                {era.label}
                <span className={`ml-2 ${isActive ? 'text-void-black/60' : 'text-white/40'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo grid (época activa) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {fotosActuales.map((photo, index) => (
            <div
              key={photo.src + index}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 aspect-[4/3]"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-mono-custom text-xs text-neon-soft/80">{photo.year}</p>
                <h3 className="font-display text-lg text-white">{photo.title}</h3>
              </div>
              <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      {galleryVideos.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
          <h3 className="font-display text-2xl text-white mb-6">Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryVideos.map((video, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 aspect-video"
                onClick={() => setLightboxVideo(index)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-void-black ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="font-mono-custom text-xs text-neon-soft/80">{video.year}</p>
                  <h3 className="font-display text-lg text-white">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox for videos */}
      {lightboxVideo !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-60 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${galleryVideos[lightboxVideo].id}?autoplay=1&rel=0`}
              title={galleryVideos[lightboxVideo].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && fotosActuales[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-60 text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 z-60 text-white/70 hover:text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={fotosActuales[lightboxIndex].src}
              alt={fotosActuales[lightboxIndex].title}
              className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <p className="font-mono-custom text-sm text-neon-soft/80">{fotosActuales[lightboxIndex].year}</p>
              <h3 className="font-display text-2xl text-white">{fotosActuales[lightboxIndex].title}</h3>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 z-60 text-white/70 hover:text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-mono-custom text-sm">
            {lightboxIndex + 1} / {fotosActuales.length}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </section>
  );
};

export default GalleryExpanded;
