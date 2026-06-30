"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      // Aparece al hacer scroll
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      // Efecto al pasar el mouse
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      {/* Imagen (o placeholder si todavía no cargaste una) */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-2 flex gap-4 text-sm">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-zinc-900 hover:underline dark:text-white"
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-zinc-600 hover:underline dark:text-zinc-400"
            >
              <Code2 size={16} /> Código
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
