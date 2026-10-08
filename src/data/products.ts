export type CategoryId = "papas" | "platano" | "especialidades" | "packs";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  wholesalePrice: number;
  wholesaleMin: number;
  tags: string[];
  weight: string;
  badge?: string;
  oldPrice?: number;
};

// Reutilizamos las imágenes existentes del catálogo hasta que el usuario suministre las fotos oficiales
const IMG_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2fAWapGOKN6ETsPuuo1FKP_jInszVqthwm4Jy_-5WISS0IAv4C49dXLB7I7pQTC8K0dQ_4bBMlu2xude6ldSF2gjGlQYLCDVZPlkNcJBY5TFCA51hXXMCu50zNIsmvWgKSQz5rBU1zMEcWyvzNiKFGto9o-jcRot9kadiT5JvLuwjzuTk7z_w_3ewTKHy1Q8ILTnL0gbCwyACBb8Txs8hozZ0BnbtBdUkmtpCKPxua79WUe4wR70";
const IMG_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBZX_6r9C5iCf8YEuMC9mItQRDifETyoB0Rkbja0cFvFWhv_636jscUoE5f1RwtBLJX-u-DID8Rt0hwfoqb6g6DLg6R07PkPmVulvMPLL86DcIBJoaUsnqZaIMfL4ODDPKE9gvoJqSpqlsG3tPtt5gPW0ary81GY6jkyKhXhww-6L0gLa6Fj4IiBWH8VMJEUmdkpD6vjWSpdt5HxLywMoKIYOAIvy3mfhaa-uki3aKYqZS7m6-j9bTv";
const IMG_3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuARXkJ7NpZaLjR7Di640y5m0pZpxHiQf-UScnClyGORIc1PRwkc1KiysXrMEVd7-29G08oKnvMk6uRI53IK4CYw6sJw6AnCNq3jd35TZBLm-RxlzRqm1w1Fa6TZZRfUMLJWs935zMM-lu4ZuSVuKf_iSihKl3mijyH65Ih-DUHccO6K_ew-lSF2t8MnW6PIlhS93m52TZgUTe6d_jp8cx_xllxRGwkfK2INqYkIVkokErcm5bF49Gwa";

export const products: Product[] = [
  {
    id: "papas-originales",
    name: "Papitas Fritas Originales (Solo Sal)",
    description: "Nuestras papas insignia naturales, sin aditivos, crujientes y con el toque justo de sal marina.",
    image: IMG_1,
    category: "papas",
    categoryLabel: "RECETA ORIGINAL",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["100% Natural", "Solo Sal"],
    weight: "50g",
    badge: "Más Vendido",
  },
  {
    id: "papas-queso",
    name: "Papitas con Sabor a Queso",
    description: "Papas crujientes doradas al punto exacto con un irresistible e intenso sabor a queso.",
    image: IMG_2,
    category: "papas",
    categoryLabel: "SABOR INTENSO",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["Sabor Queso", "Crocante"],
    weight: "50g",
    badge: "Favorito",
  },
  {
    id: "papas-cebolla-perejil",
    name: "Papas con Sabor a Cebolla y Perejil",
    description: "Clásica y deliciosa combinación aromática de cebolla dulce y notas frescas de perejil.",
    image: IMG_3,
    category: "papas",
    categoryLabel: "HIERBAS & ESPECIAS",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["Cebolla & Perejil", "Gourmet"],
    weight: "50g",
  },
  {
    id: "platano-original",
    name: "El Plátano Original",
    description: "Plátano verde seleccionado en finas hojuelas crujientes sazonadas con sal marina.",
    image: IMG_1,
    category: "platano",
    categoryLabel: "TRADICIONAL",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["Plátano Verde", "Artesanal"],
    weight: "50g",
  },
  {
    id: "platano-madurito",
    name: "El Plátano Madurito",
    description: "El inconfundible dulzor natural del plátano maduro venezolano, tostado y ultracrujiente.",
    image: IMG_2,
    category: "platano",
    categoryLabel: "DULCE & CROCANTE",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["Plátano Maduro", "Dulce Natural"],
    weight: "50g",
    badge: "Especial",
  },
  {
    id: "chicharron",
    name: "Chicharrón",
    description: "Chicharrón crujiente y aireado preparado con la receta artesanal tradicional de la casa.",
    image: IMG_3,
    category: "especialidades",
    categoryLabel: "100% CRUJIENTE",
    price: 1.00,
    wholesalePrice: 0.80,
    wholesaleMin: 12,
    tags: ["Puro Sabor", "Tradicional"],
    weight: "50g",
  },
];

export const categories = [
  { id: "all", label: "Nuestra Colección" },
] as const;
