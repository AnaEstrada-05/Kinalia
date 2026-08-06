# Kinalia — sitio web

Landing page de Kinalia, construida con [Next.js](https://nextjs.org) (App Router), TypeScript y Tailwind CSS v4.

## Estructura

```
app/
  layout.tsx      # fuentes (Fraunces, Inter, IBM Plex Mono) + metadata SEO
  page.tsx         # arma todas las secciones en orden
  globals.css      # tokens de marca (colores, tipografía)
components/
  Navbar.tsx        # header con nav + CTA + menú móvil
  Hero.tsx           # sección principal con headline y CTA
  Clients.tsx        # franja "con empresas como"
  Process.tsx        # los 6 pasos del proceso
  About.tsx           # "Detrás de Kinalia" + ServicesCards
  ServicesCards.tsx    # las 3 tarjetas de servicio (D / IA / E)
  Footer.tsx            # CTA final oscuro + footer
  CalendlyModal.tsx      # modal de agendado, se abre desde cualquier botón
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configurar Calendly

El botón "Agenda una llamada" abre un modal con tu Calendly embebido.
Copia `.env.example` a `.env.local` y pon tu link real:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/tu-usuario/30min
```

Si no configuras esta variable, se usa un link de ejemplo — el sitio
compila igual, pero el modal no va a mostrar un calendario real.

## Deploy a Vercel (plan gratuito)

1. Sube este repo a GitHub (ver sección siguiente).
2. Entra a [vercel.com](https://vercel.com) → **Add New… → Project**.
3. Importa el repo de GitHub. Vercel detecta Next.js automáticamente,
   no hace falta tocar el build command.
4. En **Environment Variables**, agrega `NEXT_PUBLIC_CALENDLY_URL` con
   tu link real de Calendly (para Production, Preview y Development).
5. Dale **Deploy**. Cada push a `main` vuelve a desplegar solo.

También puedes hacerlo desde la terminal con la [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel        # deploy de prueba (preview)
vercel --prod # deploy a producción
```

## Subir el repo a GitHub

```bash
git init
git add .
git commit -m "Kinalia — sitio web inicial"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/kinalia.git
git push -u origin main
```
