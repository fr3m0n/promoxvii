import { useEffect, Suspense, lazy } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
// import ParallaxGallery from './sections/ParallaxGallery'; // Ocultada: repetía fotos de la galería completa
import Companeros from './sections/Companeros';
import GalleryExpanded from './sections/GalleryExpanded';
import TourSchedule from './sections/TourSchedule';
import Footer from './sections/Footer';

// El cubo 3D (three.js) es lo más pesado: se carga de forma diferida
const AlbumCube = lazy(() => import('./sections/AlbumCube'));

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-void-black overflow-x-hidden">
      {/* Hero Section - Immersive landing */}
      <Hero />

      {/* Album Cube Section - 3D showcase (Nuestra Historia) — carga diferida */}
      <Suspense fallback={null}>
        <AlbumCube />
      </Suspense>

      {/* Parallax Gallery Section - ocultada por repetir fotos */}
      {/* <ParallaxGallery /> */}

      {/* Nuestros Compañeros - directorio de la promoción */}
      <Companeros />

      {/* Gallery Expanded Section */}
      <GalleryExpanded />

      {/* Tour Schedule Section */}
      <TourSchedule />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
