import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <section id="proyectos" className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-10 text-center text-2xl font-semibold sm:text-3xl">
          Proyectos
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 py-8 text-center text-sm text-zinc-500 dark:border-white/10">
        © {new Date().getFullYear()} Santiago Panizza
      </footer>
    </main>
  );
}
