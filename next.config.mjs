/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statico: `next build` genera la cartella `out/`, pubblicata su GitHub Pages.
  output: "export",
  // Genera `pagina/index.html` invece di `pagina.html`: più affidabile su GitHub Pages.
  trailingSlash: true,
  // L'ottimizzazione immagini di Next richiede un server: non disponibile con l'export statico.
  images: { unoptimized: true },
};

export default nextConfig;
