import Image from "next/image";
import Reveal from "./Reveal";

// Laptop con la pantalla de inicio de la app flotando sobre el hero, igual
// que en la pagina anterior pero con una captura real. Para cambiar la
// captura basta con reemplazar public/rope-master/app-dashboard.webp (y
// ajustar sus medidas aqui si cambia la proporcion).
export default function LaptopMockup({
  alt,
  label,
}: {
  alt: string;
  label: string;
}) {
  return (
    <Reveal className="relative mx-auto max-w-4xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -inset-y-8 rounded-[2.5rem]"
        style={{
          background:
            "radial-gradient(ellipse 70% 75% at 50% 40%, rgba(242,112,26,.35), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative" aria-label={label}>
        <div className="relative rounded-t-xl bg-gradient-to-b from-[#3d3d3d] to-[#161616] p-2 shadow-2xl sm:rounded-t-2xl sm:p-2.5">
          <div className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-black/40 sm:top-1.5" />

          {/* en celular se recorta a la izquierda (tarjeta principal y series) para que el texto se lea mas grande */}
          <div className="relative overflow-hidden rounded-md border border-black/5 bg-[#f7f0e2] max-sm:aspect-[117/100] sm:rounded-lg">
            <Image
              src="/rope-master/app-dashboard.webp"
              alt={alt}
              width={1916}
              height={978}
              quality={85}
              sizes="(min-width: 896px) 880px, 100vw"
              className="block h-auto w-full max-sm:absolute max-sm:inset-0 max-sm:h-full max-sm:object-cover max-sm:object-left-top"
            />
          </div>
        </div>

        {/* bisagra y base */}
        <div className="h-[3px] bg-gradient-to-b from-[#4a4a4a] to-[#0d0d0d]" />
        <div
          className="mx-auto h-2.5 bg-gradient-to-b from-[#dedede] via-[#c4c4c4] to-[#a6a6a6] shadow-lg sm:h-3"
          style={{
            width: "104%",
            marginLeft: "-2%",
            clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0% 100%)",
            borderRadius: "0 0 8px 8px",
          }}
        />
      </div>
    </Reveal>
  );
}
