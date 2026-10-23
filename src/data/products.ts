export type CategoryId = "papas" | "platano" | "especialidades" | "packs";

export type ProductPresentation = {
  id: string;
  name: string;
  weight: string;
  price: number;
  dozenPrice: number;
  wholesalePrice: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  wholesalePrice: number;
  wholesaleMin: number;
  tags?: string[];
  weight: string;
  badge?: string;
  oldPrice?: number;
  retailOnly?: boolean;
  presentations?: ProductPresentation[];
};

export const products: Product[] = [
  {
    id: "papas-naturales",
    name: "Papas Naturales",
    description: "",
    image: "/images/papas-naturales.jpg",
    category: "papas",
    categoryLabel: "RECETA ARTESANAL",
    price: 1.00,
    wholesalePrice: 9 / 12,
    wholesaleMin: 12,
    tags: ["100% Natural", "Solo Sal"],
    weight: "60g",
    badge: "100% Artesanal",
    presentations: [
      {
        id: "60g",
        name: "60 gramos",
        weight: "60g",
        price: 1.00,
        dozenPrice: 9.00,
        wholesalePrice: 9 / 12, // $0.75 c/u al mayor
      },
      {
        id: "100g",
        name: "100 gramos",
        weight: "100g",
        price: 1.00,
        dozenPrice: 13.00,
        wholesalePrice: 13 / 12, // ~$1.08 c/u al mayor ($13 docena)
      },
    ],
  },
  {
    id: "papas-queso",
    name: "Papas Sabor a Queso",
    description: "",
    image: "/images/papas-queso.jpg",
    category: "papas",
    categoryLabel: "SABOR A QUESO",
    price: 1.00,
    wholesalePrice: 9 / 12,
    wholesaleMin: 12,
    tags: ["Sabor Queso", "Crocante"],
    weight: "60g",
    badge: "Favorito",
    presentations: [
      {
        id: "60g",
        name: "60 gramos",
        weight: "60g",
        price: 1.00,
        dozenPrice: 9.00,
        wholesalePrice: 9 / 12, // $0.75 c/u al mayor
      },
      {
        id: "100g",
        name: "100 gramos",
        weight: "100g",
        price: 1.00,
        dozenPrice: 13.00,
        wholesalePrice: 13 / 12, // ~$1.08 c/u al mayor ($13 docena)
      },
    ],
  },
  {
    id: "papas-cebolla-perejil",
    name: "Papas Cebolla y Perejil",
    description: "",
    image: "/images/papas-cebolla-perejil.jpg",
    category: "papas",
    categoryLabel: "CEBOLLA & PEREJIL",
    price: 1.00,
    wholesalePrice: 9 / 12,
    wholesaleMin: 12,
    tags: ["Cebolla & Perejil", "Gourmet"],
    weight: "60g",
    presentations: [
      {
        id: "60g",
        name: "60 gramos",
        weight: "60g",
        price: 1.00,
        dozenPrice: 9.00,
        wholesalePrice: 9 / 12, // $0.75 c/u al mayor
      },
      {
        id: "100g",
        name: "100 gramos",
        weight: "100g",
        price: 1.00,
        dozenPrice: 13.00,
        wholesalePrice: 13 / 12, // ~$1.08 c/u al mayor ($13 docena)
      },
    ],
  },
  {
    id: "tostones-naturales",
    name: "Tostones Naturales",
    description: "",
    image: "/images/tostones-naturales.jpg",
    category: "platano",
    categoryLabel: "PLÁTANO ARTESANAL",
    price: 1.00,
    wholesalePrice: 9 / 12, // $0.75 c/u al mayor ($9 docena)
    wholesaleMin: 12,
    tags: ["Plátano Verde", "Solo Sal"],
    weight: "80g",
    badge: "Crujiente",
  },
  {
    id: "chicharron-natural",
    name: "Chicharrón Natural",
    description: "",
    image: "/images/chicharron-natural.jpg",
    category: "especialidades",
    categoryLabel: "CHICHARRÓN ARTESANAL",
    price: 2.00,
    wholesalePrice: 13 / 12, // ~$1.08 c/u al mayor ($13 docena)
    wholesaleMin: 12,
    tags: ["100% Crujiente", "Artesanal"],
    weight: "50g",
    badge: "Súper Crujiente",
  },
  {
    id: "harina-chicharron",
    name: "Harina de Chicharrón",
    description: "",
    image: "/images/harina-chicharron.png",
    category: "especialidades",
    categoryLabel: "ESPECIALIDAD",
    price: 2.00,
    wholesalePrice: 2.00,
    wholesaleMin: 999999,
    tags: ["250g", "100% Puro", "Cetogénico"],
    weight: "250g",
    badge: "Solo Detal",
    retailOnly: true,
  },
];

export const categories = [
  { id: "all", label: "Nuestra Colección" },
] as const;
