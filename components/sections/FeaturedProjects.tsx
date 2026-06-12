"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
              Work
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Selected projects.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:gap-3 transition-all duration-200 shrink-0"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 0.1}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-apple-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F5F7]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#1D1D1F]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <h3 className="text-base font-semibold text-[#1D1D1F] mb-2 group-hover:text-[#6E6E73] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-[#86868B] px-2 py-0.5 rounded-md bg-[#F5F5F7]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  {project.results && project.results[0] && (
                    <div className="mt-4 pt-4 border-t border-[#F5F5F7]">
                      <p className="text-xs text-[#86868B]">Key result</p>
                      <p className="text-sm font-medium text-[#1D1D1F] mt-0.5">
                        {project.results[0]}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
