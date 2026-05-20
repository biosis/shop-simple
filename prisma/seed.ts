import { PrismaClient, Role } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Bol artisanal",
    slug: "bol-artisanal",
    description:
      "Façonné à la main en argile locale, ce bol révèle des nuances uniques à chaque pièce. Idéal pour le petit-déjeuner ou comme objet décoratif.",
    price: 2800,
    stock: 15,
    category: "Céramique",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
    ],
  },
  {
    name: "Vase en grès",
    slug: "vase-en-gres",
    description:
      "Ce vase en grès émaillé est tourné à la main dans un atelier artisanal. Sa forme organique s'adapte à tous les intérieurs.",
    price: 4500,
    stock: 8,
    category: "Céramique",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
    ],
  },
  {
    name: "Bague argent",
    slug: "bague-argent",
    description:
      "Bague en argent sterling 925, forgée et texturée à la main. Disponible en taille unique ajustable.",
    price: 3200,
    stock: 20,
    category: "Bijoux",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    ],
  },
  {
    name: "Collier doré",
    slug: "collier-dore",
    description:
      "Collier délicat en laiton doré à l'or 18 carats avec un pendentif en forme de lune. Une pièce raffinée pour toutes les occasions.",
    price: 5800,
    stock: 5,
    category: "Bijoux",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    ],
  },
  {
    name: "Tote bag brodé",
    slug: "tote-bag-brode",
    description:
      "Tote bag en coton biologique avec broderie florale réalisée à la main. Pratique et élégant pour le quotidien.",
    price: 1800,
    stock: 30,
    category: "Textile",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
    ],
  },
  {
    name: "Écharpe laine",
    slug: "echarpe-laine",
    description:
      "Écharpe tricotée à la main en laine mérinos extra-fine, douce et légère. Coloris naturels teints aux plantes.",
    price: 6500,
    stock: 3,
    category: "Textile",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
    ],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("password123", 12);

  await prisma.user.upsert({
    where: { email: "vendeur@test.com" },
    update: {},
    create: {
      email: "vendeur@test.com",
      passwordHash,
      role: Role.SELLER,
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("Seed terminé : 1 vendeur, 6 produits");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
