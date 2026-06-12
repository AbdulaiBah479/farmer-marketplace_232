import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SaasProductsOverview } from "@/components/sections/SaasProductsOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTA } from "@/components/sections/CTA";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <FeaturedProjects />
      <SaasProductsOverview />
      <Testimonials />
      <BlogPreview />
      <CTA />
      <Newsletter />
    </>
  );
}
