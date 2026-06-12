import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "AI Development", href: "/services#ai-development" },
    { label: "Business Automation", href: "/services#automation" },
    { label: "SaaS Development", href: "/services#saas" },
    { label: "UI/UX Design", href: "/services#design" },
    { label: "AI Consulting", href: "/services#consulting" },
  ],
  Products: [
    { label: "AI Secretary", href: "/saas/ai-secretary" },
    { label: "AI Customer Support", href: "/saas/ai-customer-support" },
    { label: "AI Resume Builder", href: "/saas/ai-resume-builder" },
    { label: "AI Business Assistant", href: "/saas/ai-business-assistant" },
    { label: "AI Marketing Manager", href: "/saas/ai-marketing-manager" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Call", href: "/consultation" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: siteConfig.social.twitter, Icon: Twitter },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
  { label: "GitHub", href: siteConfig.social.github, Icon: Github },
];

export function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E8E8ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <span className="font-semibold text-[#1D1D1F] text-sm">Bah AI Labs</span>
            </Link>
            <p className="text-sm text-[#6E6E73] leading-relaxed max-w-xs">
              Building AI systems, SaaS products, and digital solutions that help businesses operate smarter and scale faster.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#86868B] hover:text-[#1D1D1F] hover:bg-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider">
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E8ED] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#86868B]">
            © {new Date().getFullYear()} Bah AI Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
