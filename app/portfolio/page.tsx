"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { projects, projectCategories } from "@/data/projects";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Portfolio</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Work that delivers results.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              A selection of AI systems, SaaS products, and software solutions built for clients across industries.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-[#E8E8ED] sticky top-16 bg-white/90 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1D1D1F] text-white"
                    : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868B]" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 rounded-full border border-[#D2D2D7] bg-white pl-9 pr-4 text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none focus:border-[#1D1D1F] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-[#86868B]">No projects match your search.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
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
                        <div className="absolute inset-0 bg-[#1D1D1F]/0 group-hover:bg-[#1D1D1F]/10 transition-colors duration-300" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="p-2 rounded-full bg-white shadow-apple-sm">
                            <ArrowUpRight className="h-4 w-4 text-[#1D1D1F]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <Badge variant="default">{project.category}</Badge>
                          {project.featured && (
                            <Badge variant="success">Featured</Badge>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-[#1D1D1F] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">
                          {project.description}
                        </p>
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
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5F5F7] border-t border-[#E8E8ED]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2 className="text-3xl font-semibold text-[#1D1D1F] tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-[#6E6E73]">
              Let&apos;s build something your users will love.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <button className="h-12 px-8 rounded-full bg-[#1D1D1F] text-white text-sm font-medium hover:bg-black transition-colors">
                  Start a project
                </button>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
