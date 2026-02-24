import { footerSections } from "@/data/footer";
import { company } from "@/data/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <img
              src="/images/re1/logos/reinvent-one-logo-890x242-on-dark.png"
              alt="ReinventONE"
              className="h-8 mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Applied AI & AI-First Engineering. We help companies build
              intelligent products and integrate AI into their workflows.
            </p>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-lg font-semibold mb-3 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      target={link.newWindow ? "_blank" : undefined}
                      rel={link.newWindow ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-400 hover:text-brand-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {company.title}. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href={company.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={company.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={company.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={company.social.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-brand-accent transition-colors"
              aria-label="SoundCloud"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.01-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.035.104-.094l.194-1.308-.194-1.332c-.014-.057-.047-.094-.104-.094m1.8-.801c-.064 0-.107.049-.114.112l-.209 2.116.209 2.051c.007.065.05.112.114.112.063 0 .107-.047.114-.112l.238-2.051-.238-2.116c-.007-.063-.051-.112-.114-.112m.899-.094c-.072 0-.12.054-.127.12l-.19 2.21.19 2.029c.008.068.055.12.127.12.071 0 .12-.052.127-.12l.215-2.029-.215-2.21c-.007-.066-.056-.12-.127-.12m.899-.283c-.081 0-.134.062-.14.137l-.17 2.494.17 1.988c.006.076.059.137.14.137.081 0 .134-.061.14-.137l.195-1.988-.195-2.494c-.006-.075-.059-.137-.14-.137m.9-.265c-.089 0-.147.067-.153.149l-.152 2.608.151 1.953c.006.081.064.149.153.149.088 0 .147-.068.153-.149l.172-1.953-.172-2.608c-.006-.082-.064-.149-.153-.149m.899-.124c-.098 0-.159.074-.165.16l-.132 2.732.132 1.918c.006.089.067.16.165.16.096 0 .159-.071.165-.16l.15-1.918-.15-2.732c-.006-.086-.069-.16-.165-.16m.9-.145c-.107 0-.172.082-.178.176l-.114 2.877.114 1.877c.006.094.071.176.178.176.107 0 .172-.082.178-.176l.127-1.877-.127-2.877c-.006-.094-.071-.176-.178-.176m.9-.087c-.114 0-.184.087-.19.187l-.094 2.964.094 1.838c.006.1.076.187.19.187.114 0 .184-.087.19-.187l.108-1.838-.108-2.964c-.006-.1-.076-.187-.19-.187m.9-.066c-.121 0-.197.094-.202.198l-.074 3.03.074 1.797c.005.107.081.198.202.198.12 0 .197-.091.202-.198l.087-1.797-.087-3.03c-.005-.104-.082-.198-.202-.198m2.705-.407c-.238 0-.449.096-.604.253-.053.054-.082.128-.082.206v5.078c0 .078.029.156.085.21.053.053.122.085.199.085h4.396a2.47 2.47 0 002.468-2.468 2.47 2.47 0 00-2.468-2.468c-.373 0-.726.083-1.042.234-.312-1.752-1.835-3.085-3.666-3.085-.443 0-.876.079-1.286.225m-1.119.173c-.129 0-.209.1-.215.213l-.056 3.134.056 1.748c.006.113.086.213.215.213.128 0 .209-.1.215-.213l.063-1.748-.063-3.134c-.006-.113-.087-.213-.215-.213" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
