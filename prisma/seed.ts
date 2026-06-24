import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "casque-audio-pro",
    name: "Casque Audio Pro",
    description:
      "Un casque audio haut de gamme avec réduction de bruit active, idéal pour les professionnels et les audiophiles. Confort exceptionnel pour de longues sessions d'écoute.",
    price: 299.99,
    image: "https://picsum.photos/seed/casque/800/600",
    category: "Audio",
    specifications: JSON.stringify({
      "Réponse en fréquence": "20 Hz – 20 kHz",
      Impédance: "32 Ohms",
      Autonomie: "30 heures",
      Connectivité: "Bluetooth 5.2 / Jack 3.5mm",
      Poids: "250g",
    }),
  },
  {
    slug: "montre-connectee-sport",
    name: "Montre Connectée Sport",
    description:
      "Montre connectée conçue pour les sportifs, avec suivi GPS, fréquence cardiaque, analyse du sommeil et plus de 50 modes d'entraînement.",
    price: 199.99,
    image: "https://picsum.photos/seed/montre/800/600",
    category: "Wearable",
    specifications: JSON.stringify({
      "Écran": "AMOLED 1.4\"",
      Autonomie: "7 jours",
      Étanchéité: "5 ATM",
      GPS: "Oui (intégré)",
      Capteurs: "Cardiaque, SpO2, Accéléromètre",
    }),
  },
  {
    slug: "clavier-mecanique-rgb",
    name: "Clavier Mécanique RGB",
    description:
      "Clavier mécanique tenkeyless avec switches Cherry MX Red, rétroéclairage RGB personnalisable et construction en aluminium brossé.",
    price: 149.99,
    image: "https://picsum.photos/seed/clavier/800/600",
    category: "Périphériques",
    specifications: JSON.stringify({
      Switches: "Cherry MX Red",
      Format: "TKL (87 touches)",
      Rétroéclairage: "RGB 16.8M couleurs",
      Connexion: "USB-C détachable",
      "Anti-ghosting": "N-Key Rollover",
    }),
  },
  {
    slug: "souris-gaming-precision",
    name: "Souris Gaming Précision",
    description:
      "Souris gaming ultra-légère avec capteur optique 25 600 DPI, design ergonomique et câble paracord flexible pour une liberté de mouvement totale.",
    price: 79.99,
    image: "https://picsum.photos/seed/souris/800/600",
    category: "Périphériques",
    specifications: JSON.stringify({
      Capteur: "Optique 25 600 DPI",
      Boutons: "6 programmables",
      Poids: "68g",
      "Taux de rapport": "1000 Hz",
      Câble: "Paracord 1.8m",
    }),
  },
  {
    slug: "ecran-4k-ultra",
    name: "Écran 4K Ultra",
    description:
      "Moniteur 4K 27 pouces avec dalle IPS, couverture 99% sRGB, temps de réponse 1ms et port USB-C 90W pour une expérience visuelle immersive.",
    price: 549.99,
    image: "https://picsum.photos/seed/ecran/800/600",
    category: "Moniteurs",
    specifications: JSON.stringify({
      Résolution: "3840 × 2160 (4K)",
      Taille: "27 pouces",
      Dalle: "IPS",
      "Taux de rafraîchissement": "144 Hz",
      Ports: "HDMI 2.1, DP 1.4, USB-C 90W",
    }),
  },
  {
    slug: "webcam-hd-streaming",
    name: "Webcam HD Streaming",
    description:
      "Webcam 4K avec autofocus rapide, correction automatique de la lumière et microphone à réduction de bruit. Parfaite pour le streaming et le télétravail.",
    price: 119.99,
    image: "https://picsum.photos/seed/webcam/800/600",
    category: "Audio",
    specifications: JSON.stringify({
      Résolution: "4K 30fps / 1080p 60fps",
      "Champ de vision": "90°",
      Autofocus: "Oui",
      Microphone: "Stéréo avec réduction de bruit",
      Connexion: "USB-A / USB-C",
    }),
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log("Seed terminé : 6 produits insérés.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
