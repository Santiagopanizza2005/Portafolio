export type Project = {
  title: string;
  description: string;
  // Ruta a la imagen dentro de /public, ej: "/proyectos/mi-app.png"
  image?: string;
  tags: string[];
  // Links opcionales
  demoUrl?: string;
  repoUrl?: string;
};

// 👇 Editá este array para agregar/sacar tus proyectos.
export const projects: Project[] = [
  {
    title: "Proyecto de ejemplo",
    description:
      "Una descripción corta de qué hace el proyecto, qué problema resuelve y qué tecnologías usaste.",
    image: undefined, // poné "/proyectos/ejemplo.png" cuando tengas la imagen
    tags: ["Next.js", "TypeScript", "Tailwind"],
    demoUrl: "https://ejemplo.com",
    repoUrl: "https://github.com/Santiagopanizza2005/ejemplo",
  },
  {
    title: "Otro proyecto",
    description:
      "Otra descripción. Duplicá este bloque por cada proyecto que quieras mostrar.",
    tags: ["React", "Node"],
    repoUrl: "https://github.com/Santiagopanizza2005/otro",
  },
];
