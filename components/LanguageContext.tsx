"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

export type Locale = "es" | "en";

type Product = {
  id: string;
  num: string;
  name: string;
  tag: string;
  queEs: string;
  paraQue: string;
  duracion: string;
  entregables: string[];
  restrictions: string[];
};

type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio?: string;
};

// Products showcased on the homepage "Nuestros productos" section and in the
// Navbar's Productos dropdown. `href` is locale-independent (the /[locale]
// prefix is added where it's used); add new entries here as more products ship.
type ProductShowcaseItem = {
  id: string;
  name: string;
  tag: string;
  description: string;
  href: string;
  logo: string;
};

const dictionary = {
  es: {
    nav: {
      proceso: "Proceso",
      nosotros: "Sobre nosotros",
      contacto: "Contacto",
      productos: "Productos",
      cta: "Agenda tu llamada",
      langLabel: "EN",
      langAria: "Cambiar a inglés",
    },
    products: {
      title: "Nuestros productos",
      subtitle:
        "Software que construimos y que ya está en uso — no son mockups, son productos reales, listos para instalar hoy.",
      viewProduct: "Ver producto",
      items: [
        {
          id: "ropemaster",
          name: "Rope Master",
          tag: "Gestión de eventos de lazo",
          description:
            "Series, equipos, jueces y resultados sincronizados en tiempo real — incluso sin una sola barra de señal.",
          href: "/productos/ropemaster",
          logo: "/assets/ropemaster-logo.png",
        },
      ] as ProductShowcaseItem[],
    },
    hero: {
      line1: "Soluciones",
      line2: "Sin Complicaciones.",
      subtitle:
        "Kinalia transforma tus procesos manuales en soluciones de inteligencia artificial a la medida — paso a paso, con impacto real desde el primer día.",
      cta: "Agenda una llamada de 30 min →",
      badges: [
        { label: "Sin compromisos", sub: "Fase inicial clara" },
        { label: "A la medida", sub: "Arquitectura propia" },
        { label: "6 pasos", sub: "Diagnóstico a producción" },
      ],
      tagline:
        "Menos pérdidas. Más decisiones basadas en datos reales y automatización inteligente.",
    },
    painPoints: {
      title: "El freno invisible de tu crecimiento.",
      subtitle:
        "Identificamos los obstáculos cotidianos que impiden que tu empresa alcance su máximo potencial digital y operativo.",
      items: [
        {
          num: "01.",
          title: "Procesos Manuales",
          description:
            "Tareas rudimentarias que consumen horas valiosas del equipo cada semana.",
          image: "/assets/manual-work.jpg",
          alt: "Equipo de trabajo revisando procesos manuales",
        },
        {
          num: "02.",
          title: "Herramientas Genéricas",
          description:
            "Software estándar que no se adapta a lo que realmente necesita el negocio.",
          image: "/assets/generic-tools.jpg",
          alt: "Reunión de estrategia analizando software",
        },
        {
          num: "03.",
          title: "Oportunidades Perdidas",
          description:
            "Sin presencia web o un sistema centralizado, los clientes se van con otros.",
          image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
          alt: "Profesionales analizando oportunidades de crecimiento",
        },
      ],
    },
    process: {
      title: "Un camino, seis pasos.",
      subtitle:
        "Empieza donde tenga sentido para tu negocio. Cada paso construye sobre el anterior y ninguno te compromete con el siguiente.",
      queEsLabel: "Qué es",
      paraQueLabel: "Para qué sirve",
      duracionLabel: "Duración",
      entregablesLabel: "Entregables",
      restrictionsLabel: "Restricciones",
      showDetail: "Ver información",
      hideDetail: "Ocultar detalle",
      closeAria: "Cerrar detalles del proceso",
      products: [
        {
          id: "call",
          num: "01",
          name: "Kinalia Call",
          tag: "Primer contacto",
          queEs:
            "Una llamada de 30 minutos para conocer tu operación y mostrarte el impacto real que la IA puede tener en tu negocio.",
          paraQue:
            "Dar a conocer Kinalia y validar si hay un problema que valga la pena resolver.",
          duracion: "30 min aprox.",
          entregables: [],
          restrictions: [],
        },
        {
          id: "discovery",
          num: "02",
          name: "Kinalia Discovery",
          tag: "Mini-diagnóstico",
          queEs:
            "Tu primer producto de bajo costo y bajo compromiso, pensado para validar la realidad técnica de tus datos antes de construir nada.",
          paraQue:
            "Evitar desarrollar sobre datos basura — sabrás en qué estado están tus sistemas antes de invertir.",
          duracion: "5 a 7 días hábiles",
          entregables: [
            "Diagnóstico de estado técnico",
            "Matriz de impacto / esfuerzo",
            "Roadmap de siguientes pasos",
          ],
          restrictions: [
            "No incluye desarrollo de software, código, dashboards ni limpieza de datos.",
            "Máximo 2 reuniones de levantamiento de información.",
          ],
        },
        {
          id: "adaptation",
          num: "03",
          name: "Kinalia Adaptation",
          tag: "Orden y acceso a datos",
          queEs:
            "Recopilamos, limpiamos e integramos tus datos dispersos en un solo lugar accesible.",
          paraQue:
            "Es la base que cualquier modelo de IA necesita: pipelines confiables y datos reales sobre el estado actual de tu negocio.",
          duracion: "2 semanas a 3 meses",
          entregables: [
            "Auditoría de fuentes",
            "Pipelines de conexión",
            "Base de datos estructurada",
          ],
          restrictions: [
            "No incluye automatizaciones ni modelos predictivos; eso corresponde a Development.",
            "No incluye licencias ni servidores cloud, los cuales corren por cuenta del cliente.",
          ],
        },
        {
          id: "development",
          num: "04",
          name: "Kinalia Development",
          tag: "Construcción de IA",
          queEs:
            "Nuestro servicio central de ingeniería: construimos el software de IA o la automatización avanzada para tu empresa.",
          paraQue:
            "Resolver pérdidas de tiempo, dinero o información con procesos automáticos y herramientas predictivas.",
          duracion: "1 a 6 meses",
          entregables: [
            "Dashboard de impacto inmediato",
            "Modelo de IA / automatización en producción",
            "Kit de cierre y capacitación",
          ],
          restrictions: [
            "El alcance queda blindado en el contrato inicial; cualquier extra se cotiza por separado.",
            "No incluye soporte técnico post-entrega más allá de la garantía estándar de 15 días.",
          ],
        },
        {
          id: "maintain",
          num: "05",
          name: "Kinalia Maintain",
          tag: "Soporte continuo",
          queEs:
            "Un esquema mensual para soporte, mantenimiento y optimización continua de tu infraestructura entregada.",
          paraQue:
            "Los modelos de IA no son estáticos; este servicio garantiza que nada se rompa y el sistema siga útil.",
          duracion: "Suscripción mensual",
          entregables: [
            "Monitoreo y soporte técnico mensual",
            "Reporte mensual de performance",
          ],
          restrictions: [
            "Cambios grandes o nuevas funcionalidades quedan fuera de la suscripción y se cotizan como Upgrade.",
            "Las horas no son acumulables para el siguiente mes.",
          ],
        },
        {
          id: "upgrade",
          num: "06",
          name: "Kinalia Upgrade",
          tag: "Evolución del modelo",
          queEs:
            "Un sprint enfocado en expandir, potenciar y reentrenar una solución ya en producción.",
          paraQue:
            "Recalibrar algoritmos y añadir nuevas funciones a medida que el negocio cambia.",
          duracion: "Por sprint",
          entregables: [
            "Reentrenamiento del modelo",
            "Integración de nuevas funciones",
            "Documentación actualizada",
          ],
          restrictions: [
            "No debe superar el 70% del valor del proyecto original; si lo hace, se cotiza como nuevo Development.",
            "Si un tercero modificó el código original, el Upgrade se suspende hasta un nuevo Discovery técnico.",
          ],
        },
      ] as Product[],
    },
    services: [
      {
        initial: "D",
        title: "Datos & Analítica",
        description: "Tus datos dispersos, conectados en un solo lugar confiable.",
      },
      {
        initial: "IA",
        title: "IA & Automatización",
        description: "Modelos predictivos y automatizaciones que sí se usan.",
      },
      {
        initial: "E",
        title: "Estrategia & Producto",
        description: "Roadmap claro de dónde empezar y por qué.",
      },
    ],
    about: {
      title: "Detrás de Kinalia",
      intro:
        "Somos un equipo técnico que prefiere los datos reales a las promesas. Trabajamos codo a codo con tu operación para construir soluciones que de verdad se usan.",
      phrases: [
        {
          line: "\u201CTenemos los datos, pero nadie los usa.\u201D",
          reply: "Los conectamos y los ponemos a trabajar para ti.",
        },
        {
          line: "\u201CCada reporte nos toma días armarlo a mano.\u201D",
          reply: "Lo automatizamos hasta que sea un clic.",
        },
        {
          line: "\u201CNo sabemos si nuestros datos sirven para algo.\u201D",
          reply: "Te lo decimos antes de cobrarte por construir nada.",
        },
        {
          line: "\u201CYa probamos con IA y no funcionó.\u201D",
          reply: "Empezamos por lo aburrido: datos limpios y confiables.",
        },
      ],
      teamHeading: "Conoce al equipo",
      teamSubheading: "Personas reales, no un logo genérico de IA.",
    },
    team: {
      eyebrow: "Nuestro equipo",
      title: "Conoce a Nuestro Equipo",
      ctaCard: {
        label: "Kinalia Core",
        title: "Ingeniería a la Medida",
        description:
          "Desarrollo directo y soluciones personalizadas con nuestros expertos en tecnología y diseño para impulsar tus metas.",
        button: "Explorar más",
      },
      members: [
        {
          name: "Ana Estrada",
          role: "COO",
          initials: "AE",
          bio: "Construye los pipelines y modelos que sostienen cada entrega.",
        },
        {
          name: "Emiliano Neaves",
          role: "CEO",
          initials: "EN",
          bio: "Traduce datos dispersos en modelos que sí se usan.",
        },
        {
          name: "Edgar Aviles",
          role: "CTO",
          initials: "EA",
          bio: "Define el roadmap y valida que cada paso tenga impacto real.",
        },
      ] as TeamMember[],
    },
    footer: {
      heading: "¿Listo para conocer el estado real de tus datos?",
      subheading:
        "Empieza con una llamada de 30 minutos, sin costo ni compromiso.",
      cta: "Agenda tu Kinalia Call",
      tagline: "IA, automatización y datos para negocios reales.",
      rights: "Kinalia",
      columns: {
        productos: "Productos",
        empresa: "Empresa",
        social: "Social",
        empresaLinks: ["Nosotros", "Proceso", "Contacto"],
        productosLinks: ["Discovery", "Development", "Maintain", "Upgrade"],
        socialLinks: ["LinkedIn", "Instagram"],
      },
    },
    ctaBanner: {
      title: "¿Listo para mejorar tu operación?",
      description:
        "Empieza con una Kinalia Call — 30 minutos, sin costo, sin compromiso.",
      cta: "Agenda tu llamada",
    },
    calendly: {
      eyebrow: "Kinalia Call",
      heading: "Agenda tu llamada — 30 min",
      closeAria: "Cerrar ventana de agendado",
      title: "Agenda tu Kinalia Call",
      closeBackdrop: "Cerrar",
    },
  },
  en: {
    nav: {
      proceso: "Process",
      nosotros: "About",
      contacto: "Contact",
      productos: "Products",
      cta: "Book a call",
      langLabel: "ES",
      langAria: "Switch to Spanish",
    },
    products: {
      title: "Our products",
      subtitle:
        "Software we've built and that's already in use — not mockups, real products, ready to install today.",
      viewProduct: "View product",
      items: [
        {
          id: "ropemaster",
          name: "Rope Master",
          tag: "Roping event management",
          description:
            "Series, teams, judges and results synced in real time — even without a single bar of signal.",
          href: "/productos/ropemaster",
          logo: "/assets/ropemaster-logo.png",
        },
      ] as ProductShowcaseItem[],
    },
    hero: {
      line1: "Solutions",
      line2: "Without Complications.",
      subtitle:
        "Kinalia turns your manual processes into custom artificial intelligence solutions — step by step, with real impact from day one.",
      cta: "Book a 30-min call →",
      badges: [
        { label: "No commitment", sub: "Clear starting phase" },
        { label: "Built for you", sub: "Custom architecture" },
        { label: "6 steps", sub: "Diagnosis to production" },
      ],
      tagline:
        "Fewer losses. Better decisions based on real data and intelligent automation.",
    },
    painPoints: {
      title: "The invisible brake on your growth.",
      subtitle:
        "We identify the everyday obstacles that stop your company from reaching its full digital and operational potential.",
      items: [
        {
          num: "01.",
          title: "Manual Processes",
          description:
            "Rudimentary tasks that consume valuable team hours every week.",
          image: "/assets/manual-work.jpg",
          alt: "Team reviewing manual processes",
        },
        {
          num: "02.",
          title: "Generic Tools",
          description:
            "Off-the-shelf software that doesn’t adapt to what the business really needs.",
          image: "/assets/generic-tools.jpg",
          alt: "Strategy meeting analyzing software",
        },
        {
          num: "03.",
          title: "Missed Opportunities",
          description:
            "Without a web presence or a centralized system, customers leave for competitors.",
          image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
          alt: "Professionals analyzing growth opportunities",
        },
      ],
    },
    process: {
      title: "One path, six steps.",
      subtitle:
        "Start wherever it makes sense for your business. Each step builds on the last — and none locks you into the next.",
      queEsLabel: "What it is",
      paraQueLabel: "What it's for",
      duracionLabel: "Duration",
      entregablesLabel: "Deliverables",
      restrictionsLabel: "Restrictions",
      showDetail: "View details",
      hideDetail: "Hide details",
      closeAria: "Close process details",
      products: [
        {
          id: "call",
          num: "01",
          name: "Kinalia Call",
          tag: "First contact",
          queEs:
            "A 30-minute call to understand your operation and show you the real impact AI could have on your business.",
          paraQue:
            "Introduce Kinalia and validate whether there's a problem worth solving.",
          duracion: "~30 min",
          entregables: [],
          restrictions: [],
        },
        {
          id: "discovery",
          num: "02",
          name: "Kinalia Discovery",
          tag: "Mini-diagnosis",
          queEs:
            "Your low-cost, low-commitment first product, built to validate the technical reality of your data before we build anything.",
          paraQue:
            "Avoid building on top of bad data — you'll know exactly what state your systems are in before you invest.",
          duracion: "5 to 7 business days",
          entregables: [
            "Technical state diagnosis",
            "Impact / effort matrix",
            "Next-steps roadmap",
          ],
          restrictions: [
            "Does not include software development, code, dashboards, or data cleaning.",
            "Maximum of 2 discovery meetings.",
          ],
        },
        {
          id: "adaptation",
          num: "03",
          name: "Kinalia Adaptation",
          tag: "Data order & access",
          queEs:
            "We gather, clean, and integrate your scattered data into a single accessible place.",
          paraQue:
            "The foundation any AI model needs: reliable pipelines and real data on your business's current state.",
          duracion: "2 weeks to 3 months",
          entregables: [
            "Source audit",
            "Connection pipelines",
            "Structured database",
          ],
          restrictions: [
            "Does not include automations or predictive models; that's covered by Development.",
            "Does not include licenses or cloud servers, which are covered by the client.",
          ],
        },
        {
          id: "development",
          num: "04",
          name: "Kinalia Development",
          tag: "AI build",
          queEs:
            "Our core engineering service: we build the AI software or advanced automation for your company.",
          paraQue:
            "Solve losses of time, money, or information with automatic processes and predictive tools.",
          duracion: "1 to 6 months",
          entregables: [
            "Immediate-impact dashboard",
            "AI model / automation in production",
            "Handoff and training kit",
          ],
          restrictions: [
            "Scope is locked in the initial contract; any extra is quoted separately.",
            "Does not include post-delivery technical support beyond the standard 15-day warranty.",
          ],
        },
        {
          id: "maintain",
          num: "05",
          name: "Kinalia Maintain",
          tag: "Ongoing support",
          queEs:
            "A monthly plan for support, maintenance, and continuous optimization of the infrastructure delivered.",
          paraQue:
            "AI models aren't static; this keeps everything running and useful over time.",
          duracion: "Monthly subscription",
          entregables: [
            "Monthly monitoring and technical support",
            "Monthly performance report",
          ],
          restrictions: [
            "Large changes or new features fall outside the subscription and are quoted as an Upgrade.",
            "Hours don't roll over to the next month.",
          ],
        },
        {
          id: "upgrade",
          num: "06",
          name: "Kinalia Upgrade",
          tag: "Model evolution",
          queEs:
            "A focused sprint to expand, strengthen, and retrain a solution already in production.",
          paraQue:
            "Recalibrate algorithms and add new capabilities as the business changes.",
          duracion: "Per sprint",
          entregables: [
            "Model retraining",
            "New feature integration",
            "Updated documentation",
          ],
          restrictions: [
            "Should not exceed 70% of the original project's value; if it does, it's quoted as a new Development.",
            "If a third party modified the original code, the Upgrade is paused until a new technical Discovery.",
          ],
        },
      ] as Product[],
    },
    services: [
      {
        initial: "D",
        title: "Data & Analytics",
        description: "Your scattered data, connected in one reliable place.",
      },
      {
        initial: "AI",
        title: "AI & Automation",
        description: "Predictive models and automations people actually use.",
      },
      {
        initial: "S",
        title: "Strategy & Product",
        description: "A clear roadmap of where to start and why.",
      },
    ],
    about: {
      title: "Behind Kinalia",
      intro:
        "We're a technical team that trusts real data over promises. We work side by side with your operation to build solutions people actually use.",
      phrases: [
        {
          line: "\u201CWe have the data, but nobody uses it.\u201D",
          reply: "We connect it and put it to work for you.",
        },
        {
          line: "\u201CEvery report takes days to put together by hand.\u201D",
          reply: "We automate it down to one click.",
        },
        {
          line: "\u201CWe don't know if our data is even usable.\u201D",
          reply: "We tell you before charging you to build anything.",
        },
        {
          line: "\u201CWe already tried AI and it didn't work.\u201D",
          reply: "We start with the boring part: clean, reliable data.",
        },
      ],
      teamHeading: "Meet the team",
      teamSubheading: "Real people, not a generic AI logo.",
    },
    team: {
      eyebrow: "Our team",
      title: "Meet Our Team",
      ctaCard: {
        label: "Kinalia Core",
        title: "Custom Engineering",
        description:
          "Direct development and tailored solutions with our technology and design experts to drive your goals.",
        button: "Explore more",
      },
      members: [
        {
          name: "Ana Estrada",
          role: "COO",
          initials: "AE",
          bio: "Builds the pipelines and models that power every delivery.",
        },
        {
          name: "Emiliano Neaves",
          role: "CEO",
          initials: "EN",
          bio: "Turns scattered data into models people actually use.",
        },
        {
          name: "Edgar Aviles",
          role: "CTO",
          initials: "EA",
          bio: "Defines the roadmap and validates that every step has real impact.",
        },
      ] as TeamMember[],
    },
    footer: {
      heading: "Ready to see the real state of your data?",
      subheading: "Start with a free, no-commitment 30-minute call.",
      cta: "Book your Kinalia Call",
      tagline: "AI, automation, and data for real businesses.",
      rights: "Kinalia",
      columns: {
        productos: "Products",
        empresa: "Company",
        social: "Social",
        empresaLinks: ["About", "Process", "Contact"],
        productosLinks: ["Discovery", "Development", "Maintain", "Upgrade"],
        socialLinks: ["LinkedIn", "Instagram"],
      },
    },
    ctaBanner: {
      title: "Ready to improve your operation?",
      description:
        "Start with a Kinalia Call — 30 minutes, free, no strings attached.",
      cta: "Book your call",
    },
    calendly: {
      eyebrow: "Kinalia Call",
      heading: "Book your call — 30 min",
      closeAria: "Close scheduling window",
      title: "Book your Kinalia Call",
      closeBackdrop: "Close",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      t: dictionary[locale],
      setLocale: (next: Locale) => {
        const path = window.location.pathname;
        const newPath = path.replace(/^\/(es|en)/, `/${next}`);
        window.location.assign(newPath || `/${next}`);
      },
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}