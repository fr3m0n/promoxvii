import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Fotos de la galería ampliada
const galleryPhotos = [
  { src: '/hero-graduation.jpg', title: 'Foto Principal', year: '1977' },
  { src: '/cube-graduation.jpg', title: 'Graduación', year: '1977' },
  { src: '/cube-schooldays.jpg', title: 'Días de Escuela', year: '1975' },
  { src: '/cube-reunion.jpg', title: 'Reuniones', year: '1976' },
  { src: '/cube-recent.jpg', title: 'Hoy', year: '2026' },
  { src: '/cube-legacy.jpg', title: 'Legado', year: '1977' },
  { src: '/cube-celebration.jpg', title: 'Celebración', year: '2027' },
  { src: '/gallery-classroom.jpg', title: 'En el Aula', year: '1975' },
  { src: '/gallery-sports.jpg', title: 'Equipo Campeón', year: '1976' },
  { src: '/gallery-dance.jpg', title: 'Baile de Prom', year: '1977' },
  { src: '/gallery-diploma.jpg', title: 'Graduación', year: '1977' },
  { src: '/gallery-friends.jpg', title: 'Mejores Amigos', year: '1976' },
  { src: '/gallery-building.jpg', title: 'Nuestro Colegio', year: '1977' },
  { src: '/gallery-reunion25.jpg', title: 'Reunión 25 Años', year: '2002' },
  { src: '/gallery-recent.jpg', title: 'Encuentro Reciente', year: '2026' },
  { src: '/footer-group.jpg', title: 'Celebración 50 Años', year: '2027' },
];

const GalleryExpanded = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
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
          GALERÍA COMPLETA
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white">
          Todos los Recuerdos
        </h2>
        <p className="font-mono-custom text-sm text-white/50 mt-4">
          Desplázate por todas las fotos de nuestra promoción. Haz clic en cualquier imagen para verla en grande.
        </p>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
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
              src={galleryPhotos[lightboxIndex].src}
              alt={galleryPhotos[lightboxIndex].title}
              className="w-full h-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <p className="font-mono-custom text-sm text-neon-soft/80">{galleryPhotos[lightboxIndex].year}</p>
              <h3 className="font-display text-2xl text-white">{galleryPhotos[lightboxIndex].title}</h3>
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
            {lightboxIndex + 1} / {galleryPhotos.length}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </section>
  );
};

export default GalleryExpanded;