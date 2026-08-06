"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "es" | "en";

type Product = {
  id: string;
  num: string;
  name: string;
  tag: string;
  price: string;
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
};

const dictionary = {
  es: {
    nav: {
      productos: "Productos",
      nosotros: "Nosotros",
      contacto: "Contacto",
      cta: "Agenda una llamada",
      langLabel: "EN",
      langAria: "Cambiar a inglés",
    },
    hero: {
      eyebrow: "Consultoría de IA, automatización y datos",
      title: ["Menos pérdidas.", "Más decisiones con datos reales."],
      subtitle:
        "Kinalia transforma tus datos y procesos en soluciones de IA a la medida — paso a paso, sin comprometerte de más.",
      cta: "Agenda tu llamada — 30 min",
      badges: [
        { label: "Datos conectados", value: "100%" },
        { label: "Sin compromiso inicial", value: "0 MXN" },
        { label: "De diagnóstico a producción", value: "6 pasos" },
      ],
    },
    process: {
      eyebrow: "02 — Nuestro proceso",
      title: "Un camino, seis pasos.",
      subtitle:
        "Empieza donde tenga sentido para tu negocio. Cada paso construye sobre el anterior — y ninguno te compromete con el siguiente.",
      queEsLabel: "Qué es",
      paraQueLabel: "Para qué sirve",
      duracionLabel: "Duración",
      restrictionsLabel: "Restricciones",
      closeAria: "Cerrar detalles del proceso",
      products: [
        {
          id: "call",
          num: "01",
          name: "Kinalia Call",
          tag: "Primer contacto",
          price: "Gratis",
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
          price: "$3,000 a $9,500 MXN",
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
          price: "$12,000 a $24,000 MXN",
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
          price: "$25,000 a $60,000 MXN",
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
          price: "$3,000 a $10,000 MXN / mes",
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
          price: "$5,000 a $12,000 MXN",
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
      { initial: "D", title: "Datos & Analítica" },
      { initial: "IA", title: "IA & Automatización" },
      { initial: "E", title: "Estrategia & Producto" },
    ],
    about: {
      eyebrow: "03 — Nosotros",
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
      members: [
        { name: "Equipo Kinalia", role: "Ingeniería & Producto", initials: "K" },
        { name: "Equipo Kinalia", role: "Datos & IA", initials: "K" },
        { name: "Equipo Kinalia", role: "Estrategia", initials: "K" },
      ] as TeamMember[],
    },
    footer: {
      heading: "¿Listo para conocer el estado real de tus datos?",
      subheading: "Empieza con una llamada de 30 minutos, sin costo ni compromiso.",
      cta: "Agenda tu Kinalia Call",
      tagline: "IA, automatización y datos para negocios reales.",
      rights: "Kinalia",
    },
    calendly: {
      eyebrow: "Kinalia Call",
      heading: "Agenda tu llamada — 30 min",
      closeAria: "Cerrar ventana de agendado",
      title: "Agenda tu Kinalia Call",
    },
  },
  en: {
    nav: {
      productos: "Products",
      nosotros: "About",
      contacto: "Contact",
      cta: "Book a call",
      langLabel: "ES",
      langAria: "Switch to Spanish",
    },
    hero: {
      eyebrow: "AI, automation & data consulting",
      title: ["Fewer losses.", "Better decisions with real data."],
      subtitle:
        "Kinalia turns your data and processes into AI solutions built for you — one step at a time, with no over-commitment.",
      cta: "Book your call — 30 min",
      badges: [
        { label: "Data, connected", value: "100%" },
        { label: "No upfront commitment", value: "$0" },
        { label: "From diagnosis to production", value: "6 steps" },
      ],
    },
    process: {
      eyebrow: "02 — Our process",
      title: "One path, six steps.",
      subtitle:
        "Start wherever it makes sense for your business. Each step builds on the last — and none locks you into the next.",
      queEsLabel: "What it is",
      paraQueLabel: "What it's for",
      duracionLabel: "Duration",
      restrictionsLabel: "Restrictions",
      closeAria: "Close process details",
      products: [
        {
          id: "call",
          num: "01",
          name: "Kinalia Call",
          tag: "First contact",
          price: "Free",
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
          price: "$3,000–$9,500 MXN",
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
          price: "$12,000–$24,000 MXN",
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
          price: "$25,000–$60,000 MXN",
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
          price: "$3,000–$10,000 MXN / month",
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
          price: "$5,000–$12,000 MXN",
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
      { initial: "D", title: "Data & Analytics" },
      { initial: "AI", title: "AI & Automation" },
      { initial: "S", title: "Strategy & Product" },
    ],
    about: {
      eyebrow: "03 — About",
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
      members: [
        { name: "Kinalia Team", role: "Engineering & Product", initials: "K" },
        { name: "Kinalia Team", role: "Data & AI", initials: "K" },
        { name: "Kinalia Team", role: "Strategy", initials: "K" },
      ] as TeamMember[],
    },
    footer: {
      heading: "Ready to see the real state of your data?",
      subheading: "Start with a free, no-commitment 30-minute call.",
      cta: "Book your Kinalia Call",
      tagline: "AI, automation, and data for real businesses.",
      rights: "Kinalia",
    },
    calendly: {
      eyebrow: "Kinalia Call",
      heading: "Book your call — 30 min",
      closeAria: "Close scheduling window",
      title: "Book your Kinalia Call",
    },
  },
} as const;

export type Dictionary = typeof dictionary["es"];

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "kinalia-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLocaleState(stored);
      return;
    }
    const browserLang = window.navigator.language?.toLowerCase();
    if (browserLang && !browserLang.startsWith("es")) {
      setLocaleState("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const toggleLocale = () => setLocale(locale === "es" ? "en" : "es");

  const value = useMemo(
    () => ({ locale, t: dictionary[locale], toggleLocale, setLocale }),
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