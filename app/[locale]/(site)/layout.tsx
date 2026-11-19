import Navbar from "@/components/Navbar";

// Layout del sitio de Kinalia (home). Vive en un route group para que las
// paginas de producto con su propio encabezado, como Rope Master, no
// hereden esta barra de navegacion.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
