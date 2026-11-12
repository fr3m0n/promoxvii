// =============================================================================
// Site Configuration - 50 Años de Egresados
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "50 Años de Egresados - Promo XVII",
  description: "Cincuenta años de amistad, recuerdos y legado. Celebrando nuestra reunión de oro.",
  language: "es",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-graduation.jpg",
  brandName: "PROMO XVII",
  decodeText: "50 AÑOS",
  decodeChars: "01",
  subtitle: "De egresados • Colegio San Jose Obrero",
  ctaPrimary: "Ver Galería de Recuerdos",
  ctaPrimaryTarget: "gallery",
  ctaSecondary: "Confirmar Asistencia",
  ctaSecondaryTarget: "contact",
  cornerLabel: "REUNIÓN DE ORO",
  cornerDetail: "1977 — 2027",
  navItems: [
    { label: "Memorias", sectionId: "albums", icon: "disc" },
    { label: "Galería", sectionId: "gallery", icon: "play" },
    { label: "Eventos", sectionId: "tour", icon: "calendar" },
    { label: "Contacto", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section -------------------------------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    { id: 1, title: "Graduación 1977", subtitle: "El comienzo de todo", image: "/cube-graduation.jpg" },
    { id: 2, title: "Días de Escuela", subtitle: "Risas y aprendizajes", image: "/cube-schooldays.jpg" },
    { id: 3, title: "Reuniones", subtitle: "Encuentros inolvidables", image: "/cube-reunion.jpg" },
    { id: 4, title: "Hoy", subtitle: "La amistad continúa", image: "/cube-recent.jpg" },
    { id: 5, title: "Legado", subtitle: "Nuestra historia", image: "/cube-legacy.jpg" },
    { id: 6, title: "Celebración", subtitle: "50 años de orgullo", image: "/cube-celebration.jpg" },
  ],
  cubeTextures: [
    "/cube-graduation.jpg",
    "/cube-schooldays.jpg",
    "/cube-reunion.jpg",
    "/cube-recent.jpg",
    "/cube-legacy.jpg",
    "/cube-celebration.jpg",
  ],
  scrollHint: "Desplaza para explorar",
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "GALERÍA DE RECUERDOS",
  sectionTitle: "Momentos que perduran",
  galleryLabel: "HISTORIA VISUAL",
  galleryTitle: "Nuestra trayectoria",
  marqueeTexts: [
    "1977 • GRADUACIÓN •",
    "50 AÑOS DE AMISTAD •",
    "REUNIÓN DE ORO •",
    "MEMORIAS ETERNAS •",
  ],
  endCtaText: "Ver más recuerdos",
  parallaxImagesTop: [
    { id: 1, src: "/gallery-classroom.jpg", alt: "Días de clase" },
    { id: 2, src: "/gallery-sports.jpg", alt: "Equipo deportivo" },
    { id: 3, src: "/gallery-dance.jpg", alt: "Baile de graduación" },
    { id: 4, src: "/gallery-diploma.jpg", alt: "Recibiendo diplomas" },
    { id: 5, src: "/gallery-friends.jpg", alt: "Amigos de siempre" },
    { id: 6, src: "/gallery-building.jpg", alt: "Nuestro colegio" },
  ],
  parallaxImagesBottom: [
    { id: 7, src: "/gallery-reunion25.jpg", alt: "Reunión de 25 años" },
    { id: 8, src: "/gallery-recent.jpg", alt: "Encuentro reciente" },
    { id: 9, src: "/cube-graduation.jpg", alt: "Graduación" },
    { id: 10, src: "/cube-schooldays.jpg", alt: "Días escolares" },
    { id: 11, src: "/cube-reunion.jpg", alt: "Reunión" },
    { id: 12, src: "/cube-recent.jpg", alt: "Hoy" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-classroom.jpg", title: "En el aula", date: "1975" },
    { id: 2, src: "/gallery-sports.jpg", title: "Equipo campeón", date: "1976" },
    { id: 3, src: "/gallery-dance.jpg", title: "Baile de prom", date: "1977" },
    { id: 4, src: "/gallery-diploma.jpg", title: "Graduación", date: "1977" },
    { id: 5, src: "/gallery-friends.jpg", title: "Mejores amigos", date: "1976" },
    { id: 6, src: "/gallery-building.jpg", title: "Nuestro colegio", date: "1977" },
  ],
};

// -- Tour Schedule Section ----------------------------------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "CRONOGRAMA",
  sectionTitle: "Programa de Celebración",
  vinylImage: "/cube-celebration.jpg",
  buyButtonText: "Confirmar",
  detailsButtonText: "Ver detalles",
  bottomNote: "Consulta el programa completo de la celebración",
  bottomCtaText: "Ver Programa Completo (PDF)",
  statusLabels: {
    onSale: "Abierto",
    soldOut: "Completo",
    comingSoon: "Pronto",
    default: "Info",
  },
  tourDates: [
    {
      id: 1,
      date: "2027.08.26",
      time: "Todo el día",
      city: "Recepción e Instalación",
      venue: "Hotel Bracamonte - Trujillo",
      status: "on-sale",
      image: "/gallery-friends.jpg",
    },
    {
      id: 2,
      date: "2027.08.27",
      time: "08:30 am",
      city: "Desayuno",
      venue: "Hotel Bracamonte",
      status: "on-sale",
      image: "/gallery-classroom.jpg",
    },
    {
      id: 3,
      date: "2027.08.27",
      time: "10:00 am",
      city: "Presentación con Dirección",
      venue: "Colegio San Jose Obrero",
      status: "on-sale",
      image: "/gallery-building.jpg",
    },
    {
      id: 4,
      date: "2027.08.27",
      time: "12:30 pm",
      city: "Develación de Placa",
      venue: "Colegio San Jose Obrero",
      status: "on-sale",
      image: "/gallery-diploma.jpg",
    },
    {
      id: 5,
      date: "2027.08.27",
      time: "02:00 pm",
      city: "Almuerzo Criollo",
      venue: "Restaurante Campestre",
      status: "on-sale",
      image: "/gallery-recent.jpg",
    },
    {
      id: 6,
      date: "2027.08.27",
      time: "08:00 pm",
      city: "Cena con Música del Recuerdo",
      venue: "Hotel Bracamonte",
      status: "on-sale",
      image: "/cube-celebration.jpg",
    },
    {
      id: 7,
      date: "2027.08.28",
      time: "10:00 am",
      city: "Clase del Recuerdo",
      venue: "Colegio San Jose Obrero",
      status: "on-sale",
      image: "/gallery-sports.jpg",
    },
    {
      id: 8,
      date: "2027.08.28",
      time: "10:30 am",
      city: "Misa de Acción de Gracias",
      venue: "Capilla del Colegio",
      status: "on-sale",
      image: "/cube-legacy.jpg",
    },
    {
      id: 9,
      date: "2027.08.28",
      time: "12:30 pm",
      city: "Fotos para el Recuerdo",
      venue: "Colegio San Jose Obrero",
      status: "on-sale",
      image: "/gallery-dance.jpg",
    },
    {
      id: 10,
      date: "2027.08.28",
      time: "02:00 pm",
      city: "Almuerzo Criollo",
      venue: "Asociación de Caballos de Paso",
      status: "on-sale",
      image: "/gallery-reunion25.jpg",
    },
    {
      id: 11,
      date: "2027.08.28",
      time: "08:00 pm",
      city: "Cena con Música del Recuerdo",
      venue: "Hotel Bracamonte",
      status: "on-sale",
      image: "/cube-recent.jpg",
    },
    {
      id: 12,
      date: "2027.08.29",
      time: "Todo el día",
      city: "Despedida y Paseo",
      venue: "Huanchaco / Plaza de Armas - Trujillo",
      status: "coming-soon",
      image: "/cube-schooldays.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/footer-group.jpg",
  portraitAlt: "Celebración de 50 años",
  heroTitle: "La verdadera riqueza no está en lo que tenemos, sino en los amigos que hicimos y los recuerdos que compartimos.",
  heroSubtitle: "— Promo XVII",
  artistLabel: "ORGANIZADO POR",
  artistName: "Comité de Egresados",
  artistSubtitle: "Con amor y dedicación para nuestra promoción",
  brandName: "PROMO XVII",
  brandDescription: "Cincuenta años de amistad, recuerdos y legado. Una celebración del pasado que ilumina el presente.",
  quickLinksTitle: "Enlaces rápidos",
  quickLinks: ["Inicio", "Galería", "Eventos", "Confirmar asistencia"],
  contactTitle: "Contacto",
  emailLabel: "Email",
  email: "reunion50@colegio.edu",
  phoneLabel: "Teléfono",
  phone: "+34 681 932 178",
  addressLabel: "Dirección",
  address: "Colegio San Jose Obrero, Ciudad",
  newsletterTitle: "Mantente informado",
  newsletterDescription: "Recibe actualizaciones sobre los eventos de la reunión.",
  newsletterButtonText: "Suscribirse",
  subscribeAlertMessage: "¡Gracias por suscribirte! Te mantendremos informado.",
  copyrightText: "© 2027 Promo XVII. 50 años de amistad.",
  bottomLinks: ["Política de privacidad", "Términos de uso"],
  socialLinks: [
    { icon: "youtube", label: "YouTube", href: "https://youtu.be/kXVzNlbbCRk" },
  ],
  galleryImages: [
    { id: 1, src: "/thumb1.jpg" },
    { id: 2, src: "/thumb2.jpg" },
    { id: 3, src: "/thumb3.jpg" },
    { id: 4, src: "/thumb4.jpg" },
  ],
};
