import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Newsletter } from "@/components/sections/Newsletter";
import { blogPosts } from "@/data/blog-posts";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Back */}
      <div className="border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article header */}
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge>{post.category}</Badge>
              <span className="flex items-center gap-1 text-xs text-[#86868B]">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-[#86868B]">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-[#6E6E73] leading-relaxed mb-8">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 border-b border-[#E8E8ED]">
              <div className="w-10 h-10 rounded-full bg-[#1D1D1F] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-semibold">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1D1D1F]">{post.author.name}</p>
                <p className="text-xs text-[#86868B]">{post.author.role}</p>
              </div>
            </div>
          </AnimateIn>

          {/* Cover image */}
          <AnimateIn>
            <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-apple-lg">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn>
            <div className="prose-apple">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-semibold text-[#1D1D1F] mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-semibold text-[#1D1D1F] mt-8 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={i} className="text-[#6E6E73] leading-relaxed mb-5">
                    {paragraph}
                  </p>
                );
              })}

              {/* Teaser for full content */}
              <div className="mt-12 p-8 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED] text-center">
                <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
                  Want the full deep-dive?
                </p>
                <p className="text-sm text-[#6E6E73] mb-4">
                  Subscribe to get complete articles, code examples, and practical frameworks.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-[#E8E8ED] flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </AnimateIn>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F5F5F7] border-t border-[#E8E8ED]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-8">Related articles</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <AnimateIn key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.coverImageUrl}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-5">
                      <Badge className="mb-3">{p.category}</Badge>
                      <h3 className="text-sm font-semibold text-[#1D1D1F] leading-snug">{p.title}</h3>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
