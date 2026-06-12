import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";

export function BlogPreview() {
  const featured = blogPosts.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold text-[#86868B] uppercase tracking-widest">
              Insights
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight">
              From the blog.
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-[#1D1D1F] hover:gap-3 transition-all duration-200 shrink-0"
          >
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((post, i) => (
            <AnimateIn key={post.id} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-[#F5F5F7] rounded-2xl overflow-hidden hover:shadow-apple transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="default">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-[#86868B]">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min read
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-[#1D1D1F] leading-snug mb-2 group-hover:text-[#6E6E73] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#E8E8ED]">
                    <p className="text-xs text-[#86868B]">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
