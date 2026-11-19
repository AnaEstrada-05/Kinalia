// Todo el texto de la landing de Rope Master vive aqui, en espanol e ingles.
// Para cambiar la info de la pagina solo hay que editar este archivo: los
// componentes de esta carpeta no llevan texto escrito a mano.
//
// `en` se tipa contra `es`, asi que si falta una llave en ingles TypeScript avisa.

import type { Locale } from "@/components/LanguageContext";

export type Tone = "ok" | "warn" | "muted";

type Widen<T> = T extends Tone
  ? T
  : T extends string
    ? string
    : T extends boolean
      ? boolean
      : T extends number
        ? number
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : { [K in keyof T]: Widen<T[K]> };

const es = {
  meta: {
    title: "Rope Master · Sistema profesional de gestión de eventos de lazo",
    description:
      "Rope Master: el sistema de arena para gestionar tus eventos de lazo, de la inscripción al último premio, con precisión profesional y funcionando incluso sin internet.",
  },

  nav: {
    links: [
      { label: "Características", href: "#roles" },
      { label: "Modos", href: "#modos" },
      { label: "Crossplay", href: "#crossplay" },
      { label: "Licencias", href: "#licencias" },
      { label: "Preguntas", href: "#preguntas" },
    ],
    buy: "Comprar licencia",
    backToKinalia: "Volver a Kinalia",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    homeLabel: "Rope Master, inicio",
    kinaliaLabel: "Kinalia, inicio",
    switchTo: "EN",
    switchLabel: "Cambiar a inglés",
  },

  hero: {
    eyebrow: "Software para organizadores de lazo",
    titleStart: "Automatiza tus rodeos sin rodeos",
    titleEm: "con Rope Master.",
    lead: "Arma equipos, sortea, captura tiempos, resuelve decisiones del juez y proyecta resultados. Todo en un solo sistema que funciona aunque no haya señal.",
    ctaPrimary: "Comprar licencia",
    ctaSecondary: "Ver cómo funciona",
    proof: [
      "Funciona sin internet",
      "Hasta 5 estaciones conectadas",
      "Español e inglés",
      "Reportes en Excel",
    ],
    imageAlt: "",
    showcaseLabel: "Vista de la aplicación (ejemplo)",
    dashboardAlt:
      "Pantalla de inicio de Rope Master: resumen de series, eventos, equipos registrados y bolsa total.",
  },

  contrast: {
    eyebrow: "Por qué Rope Master",
    title: "Del caos de papeles a una arena en orden",
    bad: {
      title: "Sin Rope Master",
      items: [
        "Inscripciones y pagos en hojas distintas",
        "Sorteos a mano que alguien siempre reclama",
        "Tiempos anotados en papel y pasados después",
        "Premios calculados con calculadora",
        "Si se cae el internet, se cae todo",
      ],
    },
    good: {
      title: "Con Rope Master",
      items: [
        "Un roster único con estatus de pago",
        "Equipos y orden de corrida sorteados con reglas claras",
        "Captura y jueces conectados en tiempo real",
        "Posiciones y premios calculados solos",
        "Funciona en tu laptop, sin internet",
      ],
    },
  },

  flow: {
    eyebrow: "Cómo funciona",
    title: "Cuatro pasos, de principio a fin",
    steps: [
      {
        title: "Crea tu serie y evento",
        text: "Elige el modo de juego y los límites de rating por equipo y por persona.",
      },
      {
        title: "Inscribe a los lazadores",
        text: "Todos tus participantes centralizados en un solo lugar y registrados rápido, uno por uno o con la plantilla de Excel.",
      },
      {
        title: "Sortea los equipos",
        text: "Cuentas con varios modos de sorteo para armar los equipos de distintas formas, según lo que necesite tu evento.",
      },
      {
        title: "Captura y entrega premios",
        text: "Tiempos, jueces, posiciones, premios y reporte final.",
      },
    ],
  },

  roles: {
    eyebrow: "Un sistema, una sola arena",
    title: "Cada quien ve lo que necesita",
    lead: "Asistente, captura, jueces y espectadores comparten la misma información en tiempo real.",
    tabsLabel: "Roles de la arena",
    tabs: {
      assistant: "Asistente",
      capture: "Captura",
      judge: "Juez",
      spectator: "Espectador",
    },
    assistant: {
      title: "Altas y pagos, sin perseguir a nadie",
      text: "Cada equipo se registra con su cabecero y pialador. El estatus de pago llega al instante a captura y jueces.",
      bullets: [
        "Importa el roster desde Excel",
        "Controla quién ya pagó",
        "Sustituciones y corridas extra con su razón",
      ],
      imageAlt:
        "Pantalla de la app con el roster del evento: lazadores, su rol, confirmación y acciones.",
    },
    capture: {
      title: "Un tiempo, un toque, cero errores",
      text: "Quien captura ve quién sigue, escribe el tiempo y lo confirma. El marcador y el juez lo reciben al momento.",
      bullets: [
        "Penalizaciones con un botón",
        "No Time automático opcional",
        "Cada cambio queda registrado",
      ],
      imageAlt:
        "Pantalla de captura de la app: cabecero y pialador en turno, tiempo, penalizaciones y guardar resultado.",
    },
    judge: {
      title: "Decisiones de juez, resueltas en la arena",
      text: "No Time, descalificación o rerun, con una cola clara de corridas pendientes y la razón registrada.",
      bullets: [
        "Cola de corridas pendientes",
        "Empates que se resuelven ahí mismo",
        "Todo con su motivo",
      ],
      mock: {
        heading: "Vista del juez",
        pending: "3 pendientes",
        name: "R. Villarreal",
        sub: "Entrada #042 · Ronda 3 · 8.42 s",
        noTime: "No Time",
        dq: "Descalificar",
        rerun: "Rerun",
      },
      soon: "En desarrollo para eventos FMR",
    },
    spectator: {
      title: "El público ve la acción, en tiempo real",
      text: "El equipo en turno y la tabla de posiciones se actualizan solas, listas para proyectar en la arena.",
      bullets: [
        "Pantalla para proyector",
        "Salta sola a Resultados al terminar",
        "Escritorio y celular",
      ],
      imageAlt:
        "Pantalla para el público: equipo en pista, tiempo de la ronda y standings actuales.",
    },
  },

  modes: {
    eyebrow: "Modos de juego",
    title: "Elige cómo se arma tu evento",
    lead: "Dos modos listos para usar y el reglamento profesional en camino.",
    items: [
      {
        key: "rr",
        icon: "RR",
        title: "Round Robin",
        text: "Todos contra todos. Cada lazador corre con distintos compañeros y la rotación evita repetir pareja de más.",
        chips: [
          "Rotación de compañeros",
          "Orden sin choques",
          "Tope de rating",
        ],
        star: false,
        soon: "",
        planbox: { toggle: "", result: "" },
      },
      {
        key: "ls",
        icon: "LS",
        title: "Lazada Sorteada",
        text: "Cada cabecero y cada pialador corre los tiros que le tocan. Los equipos se sortean respetando el tope de rating.",
        chips: [
          "Tope por equipo y por persona",
          "Sorteo reproducible, ideal para aclarar dudas",
          "Borrar y regenerar",
        ],
        star: true,
        soon: "",
        planbox: {
          toggle: "Equipos lo más balanceados posible",
          result: "",
        },
      },
      {
        key: "fmr",
        icon: "FMR",
        title: "Profesional FMR",
        text: "Lazo por parejas con el reglamento FMR para series competitivas.",
        chips: [] as string[],
        star: false,
        soon: "En desarrollo",
        planbox: { toggle: "", result: "" },
      },
    ],
  },

  crossplay: {
    eyebrow: "Crossplay en la arena",
    title: "Todos conectados en la arena, aunque no haya internet.",
    lead: "Asistente, captura y pantalla se conectan entre sí por la red local del evento. Un router basta; no hace falta internet.",
    imageAlt: "Lazador en plena carrera de arena",
    network: [
      { label: "Laptop anfitriona", host: true },
      { label: "Asistente", host: false },
      { label: "Captura", host: false },
      { label: "Locutor", host: false },
      { label: "Pantalla", host: false },
    ],
    facts: [
      { value: "5", label: "estaciones conectadas con la licencia Local" },
      {
        value: "365",
        label: "días de uso, una vez activada, sin validaciones en línea",
      },
    ],
  },

  more: {
    eyebrow: "Y además",
    title: "Todo lo que pasa después del último tiempo",
    prizes: {
      title: "Premios",
      text: "Reparte la bolsa por porcentaje por lugar o en partes iguales entre los primeros lugares. El cálculo sale solo.",
    },
    reports: {
      title: "Reportes",
      text: "Excel del evento, tabla de posiciones y premiación listos para compartir con los lazadores.",
    },
    backups: {
      title: "Respaldos",
      text: "Copia de tu serie en un archivo y copias automáticas mientras trabajas.",
    },
    rules: {
      title: "Reglas del evento",
      text: "No Time automático, penalizaciones, corridas extra y sustituciones. Todas personalizables.",
    },
    points: {
      title: "Puntos de la serie",
      text: "Ranking acumulado de toda la serie, evento por evento.",
    },
  },

  licenses: {
    eyebrow: "Licencias",
    title: "Elige tu licencia. Un año completo de arena.",
    lead: "De un solo evento a una serie completa: dos licencias, la misma precisión.",
    recommended: "Recomendada",
    plans: [
      {
        key: "event",
        name: "Event Pass",
        price: "$999",
        per: "MXN / evento, IVA incluido",
        blurb:
          "Para un solo evento. Vigencia de 14 días desde la fecha de tu evento.",
        features: [
          { text: "1 evento", on: true },
          { text: "Modo Casual", on: true },
          { text: "Funciona sin internet", on: true },
          { text: "Exportar eventos", on: true },
          { text: "Series y ranking", on: false },
          { text: "Estaciones conectadas", on: false },
        ],
        cta: "Comprar Event Pass",
        featured: false,
        available: true,
      },
      {
        key: "local",
        name: "Local",
        price: "Próximamente",
        per: "",
        blurb: "Para organizar toda tu serie durante un año.",
        features: [
          { text: "Eventos ilimitados", on: true },
          { text: "Hasta 5 estaciones conectadas", on: true },
          { text: "Series y ranking de la serie", on: true },
          { text: "Respaldo de serie", on: true },
          { text: "Funciona sin internet", on: true },
          { text: "Exportar eventos", on: true },
        ],
        cta: "Próximamente",
        featured: true,
        available: false,
      },
    ],
    moreLead:
      "Activación paso a paso, ID de equipo, renovación y reembolsos en",
    moreLink: "Saber más sobre las licencias",
  },

  testimonials: {
    eyebrow: "Organizadores",
    title: "Lo que dicen quienes ya lo usan",
    // Se muestra la seccion solo si hay testimonios reales. Formato:
    // { quote: "...", name: "Nombre", role: "Serie o arena" }
    items: [] as { quote: string; name: string; role: string }[],
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que preguntan antes de comprar",
    items: [
      {
        q: "¿Necesito internet durante el evento?",
        a: "No. Internet solo se usa para activar la licencia. Para conectar varios dispositivos necesitas una red local (Wi-Fi o router), que no requiere internet.",
      },
      {
        q: "¿Cuántas estaciones puedo conectar?",
        a: "Con la licencia Local, hasta 5 estaciones en una misma sesión (por ejemplo asistente, captura y pantalla). Cada computadora que se conecta necesita su propia licencia Local.",
      },
      {
        q: "¿Qué pasa cuando vence mi licencia?",
        a: "Tu información se conserva mientras no borres la app, porque se guarda en tu computadora. Para seguir creando eventos se renueva la licencia.",
      },
      {
        q: "¿Cómo funciona el reembolso?",
        a: "Está en la Política de Reembolso, enlazada al pie de la página.",
      },
      // Pendiente: "¿En qué computadoras funciona?" (falta confirmar los
      // sistemas operativos admitidos antes de publicarla).
    ],
  },

  closing: {
    eyebrow: "Precisión de arena, en cualquier arena",
    title: "Tu próximo evento, sin sorpresas",
    primary: "Comprar licencia",
    secondary: "Hablar con nosotros",
    email: "servicios@kinalia.com.mx",
  },

  footer: {
    tagline:
      "Sistema profesional de gestión de eventos de lazo, diseñado para funcionar donde la señal no llega.",
    product: "Producto",
    productLinks: [
      { label: "Características", href: "#roles" },
      { label: "Crossplay", href: "#crossplay" },
      { label: "Licencias", href: "#licencias" },
    ],
    legal: "Legal",
    legalLinks: [
      {
        label: "Términos y condiciones",
        href: "/legal/kinalia/terminos-y-condiciones",
      },
      { label: "Contrato EULA", href: "/legal/ropemaster/eula" },
      {
        label: "Aviso de privacidad",
        href: "/legal/ropemaster/aviso-de-privacidad",
      },
      {
        label: "Política de reembolso",
        href: "/legal/ropemaster/politica-de-reembolso",
      },
    ],
    support: "Soporte",
    supportLinks: [
      { label: "Manual de usuario", href: "/productos/ropemaster/licencias" },
      { label: "Contacto", href: "mailto:servicios@kinalia.com.mx" },
    ],
    rights: "© 2026 Rope Master. Todos los derechos reservados.",
    by: "Por Kinalia",
  },
};

export type Copy = Widen<typeof es>;

const en: Copy = {
  meta: {
    title: "Rope Master · Professional Roping Event Management System",
    description:
      "Rope Master: the arena system to run your roping series, from sign-up to the last payout, with professional precision and working even without internet.",
  },

  nav: {
    links: [
      { label: "Features", href: "#roles" },
      { label: "Modes", href: "#modos" },
      { label: "Crossplay", href: "#crossplay" },
      { label: "Licensing", href: "#licencias" },
      { label: "FAQ", href: "#preguntas" },
    ],
    buy: "Buy license",
    backToKinalia: "Back to Kinalia",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeLabel: "Rope Master, home",
    kinaliaLabel: "Kinalia, home",
    switchTo: "ES",
    switchLabel: "Switch to Spanish",
  },

  hero: {
    eyebrow: "Software for roping organizers",
    titleStart: "Automate your rodeos, no runaround,",
    titleEm: "with Rope Master.",
    lead: "Build teams, run the draw, capture times, settle judge calls and project results. All in one system that works even without signal.",
    ctaPrimary: "Buy license",
    ctaSecondary: "See how it works",
    proof: [
      "Works offline",
      "Up to 5 connected stations",
      "Spanish and English",
      "Excel reports",
    ],
    imageAlt: "",
    showcaseLabel: "App preview (example)",
    dashboardAlt:
      "Rope Master home screen: summary of series, events, registered teams and total purse.",
  },

  contrast: {
    eyebrow: "Why Rope Master",
    title: "From paper chaos to an arena in order",
    bad: {
      title: "Without Rope Master",
      items: [
        "Sign-ups and payments scattered across spreadsheets",
        "Hand-run draws that someone always disputes",
        "Times jotted on paper and entered later",
        "Payouts worked out on a calculator",
        "If the internet drops, everything drops",
      ],
    },
    good: {
      title: "With Rope Master",
      items: [
        "One roster with payment status",
        "Teams and run order drawn by clear rules",
        "Capture and judges connected in real time",
        "Standings and payouts calculated for you",
        "Runs on your laptop, no internet needed",
      ],
    },
  },

  flow: {
    eyebrow: "How it works",
    title: "Four steps, start to finish",
    steps: [
      {
        title: "Create your series and event",
        text: "Pick the game mode and the rating limits per team and per person.",
      },
      {
        title: "Sign up the ropers",
        text: "All your participants centralized in one place and registered fast, one by one or with the Excel template.",
      },
      {
        title: "Draw the teams",
        text: "Several draw modes let you build teams in different ways, depending on what your event needs.",
      },
      {
        title: "Capture and pay out",
        text: "Times, judges, standings, payouts and the final report.",
      },
    ],
  },

  roles: {
    eyebrow: "One system, one arena",
    title: "Everyone sees what they need",
    lead: "Assistant, capture, judges and spectators share the same information in real time.",
    tabsLabel: "Arena roles",
    tabs: {
      assistant: "Assistant",
      capture: "Capture",
      judge: "Judge",
      spectator: "Spectator",
    },
    assistant: {
      title: "Check-ins and payments, no chasing anyone",
      text: "Every team registers with its header and heeler. Payment status reaches capture and judges instantly.",
      bullets: [
        "Import the roster from Excel",
        "Track who has already paid",
        "Substitutions and extra runs, with a reason",
      ],
      imageAlt:
        "App screen with the event roster: ropers, their role, confirmation and actions.",
    },
    capture: {
      title: "One time, one tap, zero errors",
      text: "Whoever captures sees who is next, types the time and confirms it. The scoreboard and the judge get it right away.",
      bullets: [
        "Penalties with one button",
        "Optional automatic No Time",
        "Every change is logged",
      ],
      imageAlt:
        "App capture screen: header and heeler up, time, penalties and save result.",
    },
    judge: {
      title: "Judge decisions, resolved right at the arena",
      text: "No Time, disqualification or rerun, with a clear queue of pending runs and the reason logged.",
      bullets: [
        "Queue of pending runs",
        "Ties settled on the spot",
        "Everything with its reason",
      ],
      mock: {
        heading: "Judge view",
        pending: "3 pending",
        name: "R. Villarreal",
        sub: "Entry #042 · Round 3 · 8.42 s",
        noTime: "No Time",
        dq: "Disqualify",
        rerun: "Rerun",
      },
      soon: "In development for FMR events",
    },
    spectator: {
      title: "The crowd sees the action, in real time",
      text: "The team up and the standings update on their own, ready to project in the arena.",
      bullets: [
        "Projector screen",
        "Jumps to Results when it ends",
        "Desktop and phone",
      ],
      imageAlt:
        "Audience screen: team on the run, round time and current standings.",
    },
  },

  modes: {
    eyebrow: "Game modes",
    title: "Choose how your event is built",
    lead: "Two modes ready to use and the professional rulebook on the way.",
    items: [
      {
        key: "rr",
        icon: "RR",
        title: "Round Robin",
        text: "Everyone against everyone. Each roper runs with different partners and the rotation avoids repeating a pair more than needed.",
        chips: ["Partner rotation", "Order without clashes", "Rating cap"],
        star: false,
        soon: "",
        planbox: { toggle: "", result: "" },
      },
      {
        key: "ls",
        icon: "LS",
        title: "Lazada Sorteada",
        text: "Every header and every heeler runs the steers they are assigned. Teams are drawn within the rating cap.",
        chips: [
          "Cap per team and per person",
          "Reproducible draw, ideal for settling disputes",
          "Delete and regenerate",
        ],
        star: true,
        soon: "",
        planbox: {
          toggle: "Teams as balanced as possible",
          result: "",
        },
      },
      {
        key: "fmr",
        icon: "FMR",
        title: "Professional FMR",
        text: "Team roping under the FMR rulebook for competitive series.",
        chips: [] as string[],
        star: false,
        soon: "In development",
        planbox: { toggle: "", result: "" },
      },
    ],
  },

  crossplay: {
    eyebrow: "Crossplay in the arena",
    title: "Everyone connected in the arena, even with no internet.",
    lead: "Assistant, capture and display connect to each other over the event's local network. A router is enough; no internet needed.",
    imageAlt: "Roper at full speed in the arena",
    network: [
      { label: "Host laptop", host: true },
      { label: "Assistant", host: false },
      { label: "Capture", host: false },
      { label: "Announcer", host: false },
      { label: "Display", host: false },
    ],
    facts: [
      { value: "5", label: "connected stations with the Local license" },
      {
        value: "365",
        label: "days of use, once activated, with no online checks",
      },
    ],
  },

  more: {
    eyebrow: "And more",
    title: "Everything that happens after the last time",
    prizes: {
      title: "Payouts",
      text: "Split the purse by percentage per place or in equal parts among the top places. The math is done for you.",
    },
    reports: {
      title: "Reports",
      text: "Event Excel, standings table and payout sheet, ready to share with the ropers.",
    },
    backups: {
      title: "Backups",
      text: "A copy of your series in one file, plus automatic copies while you work.",
    },
    rules: {
      title: "Event rules",
      text: "Automatic No Time, penalties, extra runs and substitutions. All customizable.",
    },
    points: {
      title: "Series points",
      text: "Running ranking for the whole series, event by event.",
    },
  },

  licenses: {
    eyebrow: "Licensing",
    title: "Choose your license. A full year of arena.",
    lead: "From a single event to a full series: two licenses, the same precision.",
    recommended: "Recommended",
    plans: [
      {
        key: "event",
        name: "Event Pass",
        price: "$999",
        per: "MXN / event, VAT included",
        blurb: "For a single event. Valid for 14 days from your event date.",
        features: [
          { text: "1 event", on: true },
          { text: "Casual mode", on: true },
          { text: "Works offline", on: true },
          { text: "Export events", on: true },
          { text: "Series and ranking", on: false },
          { text: "Connected stations", on: false },
        ],
        cta: "Buy Event Pass",
        featured: false,
        available: true,
      },
      {
        key: "local",
        name: "Local",
        price: "Coming soon",
        per: "",
        blurb: "To run your whole series for a year.",
        features: [
          { text: "Unlimited events", on: true },
          { text: "Up to 5 connected stations", on: true },
          { text: "Series and series ranking", on: true },
          { text: "Series backup", on: true },
          { text: "Works offline", on: true },
          { text: "Export events", on: true },
        ],
        cta: "Coming soon",
        featured: true,
        available: false,
      },
    ],
    moreLead: "Step-by-step activation, machine ID, renewal and refunds in",
    moreLink: "Learn more about licensing",
  },

  testimonials: {
    eyebrow: "Organizers",
    title: "What people already using it say",
    items: [],
  },

  faq: {
    eyebrow: "Frequently asked questions",
    title: "What people ask before buying",
    items: [
      {
        q: "Do I need internet during the event?",
        a: "No. Internet is only used to activate the license. To connect several devices you need a local network (Wi-Fi or a router), which does not require internet.",
      },
      {
        q: "How many stations can I connect?",
        a: "With the Local license, up to 5 stations in the same session (for example assistant, capture and display). Each computer that connects needs its own Local license.",
      },
      {
        q: "What happens when my license expires?",
        a: "Your data is kept as long as you do not delete the app, because it is stored on your computer. To keep creating events, renew the license.",
      },
      {
        q: "How do refunds work?",
        a: "It is covered in the Refund Policy, linked at the bottom of the page.",
      },
    ],
  },

  closing: {
    eyebrow: "Arena precision, in any arena",
    title: "Your next series, no surprises",
    primary: "Buy license",
    secondary: "Talk to us",
    email: "servicios@kinalia.com.mx",
  },

  footer: {
    tagline:
      "Professional roping event management system, designed to work where the signal does not reach.",
    product: "Product",
    productLinks: [
      { label: "Features", href: "#roles" },
      { label: "Crossplay", href: "#crossplay" },
      { label: "Licensing", href: "#licencias" },
    ],
    legal: "Legal",
    legalLinks: [
      {
        label: "Terms & Conditions",
        href: "/legal/kinalia/terminos-y-condiciones",
      },
      { label: "EULA Agreement", href: "/legal/ropemaster/eula" },
      {
        label: "Privacy Notice",
        href: "/legal/ropemaster/aviso-de-privacidad",
      },
      {
        label: "Refund Policy",
        href: "/legal/ropemaster/politica-de-reembolso",
      },
    ],
    support: "Support",
    supportLinks: [
      { label: "User manual", href: "/productos/ropemaster/licencias" },
      { label: "Contact", href: "mailto:servicios@kinalia.com.mx" },
    ],
    rights: "© 2026 Rope Master. All rights reserved.",
    by: "By Kinalia",
  },
};

export const copy: Record<Locale, Copy> = { es, en };
