import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Github } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="bg-white">
      {/* Back nav */}
      <div className="border-b border-[#E8E8ED]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 border-b border-[#E8E8ED]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateIn>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="default">{project.category}</Badge>
              {project.featured && <Badge variant="success">Featured</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1D1D1F] leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-[#6E6E73] leading-relaxed mb-6">
              {project.longDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-[#6E6E73] px-3 py-1.5 rounded-lg bg-[#F5F5F7] border border-[#E8E8ED]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-[#86868B]">
              <span>Completed {formatDate(project.completedAt)}</span>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#1D1D1F] hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#1D1D1F] hover:underline"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Main image */}
      <div className="border-b border-[#E8E8ED]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
          <AnimateIn>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-apple-xl">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Details */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {project.problemStatement && (
                <AnimateIn>
                  <h2 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                    The Challenge
                  </h2>
                  <p className="text-[#1D1D1F] leading-relaxed">
                    {project.problemStatement}
                  </p>
                </AnimateIn>
              )}

              {project.solution && (
                <AnimateIn>
                  <h2 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                    The Solution
                  </h2>
                  <p className="text-[#1D1D1F] leading-relaxed">{project.solution}</p>
                </AnimateIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {project.results && project.results.length > 0 && (
                <AnimateIn>
                  <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-[#E8E8ED]">
                    <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-4">
                      Results
                    </h3>
                    <ul className="space-y-3">
                      {project.results.map((result) => (
                        <li key={result} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#1D1D1F] shrink-0 mt-0.5" />
                          <span className="text-sm text-[#1D1D1F] font-medium">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              )}

              <AnimateIn>
                <div className="p-6 rounded-2xl bg-[#1D1D1F] text-white">
                  <h3 className="text-sm font-semibold mb-3">Want similar results?</h3>
                  <p className="text-sm text-white/60 mb-5 leading-relaxed">
                    Let's talk about your project.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] gap-2">
                      Start a project
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <section className="py-16 bg-[#F5F5F7] border-t border-[#E8E8ED]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimateIn>
              <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-8">
                More projects
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherProjects.map((p) => (
                <AnimateIn key={p.id}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group flex gap-4 p-5 bg-white rounded-2xl border border-[#E8E8ED] hover:border-[#D2D2D7] hover:shadow-apple transition-all duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Badge variant="outline" className="mb-1.5 w-fit">{p.category}</Badge>
                      <h3 className="text-sm font-semibold text-[#1D1D1F]">{p.title}</h3>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
