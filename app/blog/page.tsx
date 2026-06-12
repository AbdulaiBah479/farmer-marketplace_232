"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Search } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const [featuredPost, ...rest] = filtered;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-32 bg-[#F5F5F7] border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn className="max-w-2xl">
            <span className="section-label">Blog</span>
            <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              Insights on AI &<br />software.
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] leading-relaxed">
              Deep-dives on building AI systems, SaaS products, and scaling technology businesses.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-[#E8E8ED] sticky top-16 bg-white/90 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {blogCategories.map((cat) => (
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868B]" />
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 rounded-full border border-[#D2D2D7] bg-white pl-9 pr-4 text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none focus:border-[#1D1D1F] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[#86868B]">No articles match your search.</div>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && activeCategory === "All" && searchQuery === "" && (
                <AnimateIn className="mb-12">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#F5F5F7] rounded-3xl overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-apple-lg transition-all duration-300"
                  >
                    <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                      <Image
                        src={featuredPost.coverImageUrl}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="flex flex-col justify-center p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge>{featuredPost.category}</Badge>
                        <span className="text-xs text-[#86868B] flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readingTime} min read
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#1D1D1F] leading-snug mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[#6E6E73] leading-relaxed mb-6">{featuredPost.excerpt}</p>
                      <p className="text-xs text-[#86868B]">{formatDate(featuredPost.publishedAt)}</p>
                    </div>
                  </Link>
                </AnimateIn>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(activeCategory === "All" && searchQuery === "" ? rest : filtered).map((post, i) => (
                  <AnimateIn key={post.id} delay={i * 0.08}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col h-full bg-[#F5F5F7] rounded-2xl overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge>{post.category}</Badge>
                          <span className="text-xs text-[#86868B] flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} min
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug mb-2 flex-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[#6E6E73] line-clamp-2 mb-4">{post.excerpt}</p>
                        <p className="text-xs text-[#86868B]">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
