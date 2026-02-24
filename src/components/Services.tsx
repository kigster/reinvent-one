const services = [
  {
    title: "AI Strategy & Consulting",
    desc: "Identify high-impact opportunities to integrate AI into your products and workflows. We assess feasibility, design architecture, and build roadmaps.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "LLM Integration",
    desc: "Build production-grade applications powered by large language models. RAG pipelines, prompt engineering, fine-tuning, and evaluation frameworks.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "AI-Powered Products",
    desc: "End-to-end development of AI-native products — from intelligent search and recommendation engines to autonomous agents and conversational interfaces.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: "MLOps & Infrastructure",
    desc: "Scalable ML infrastructure, model deployment pipelines, monitoring, and observability. Cloud-native architecture on AWS, GCP, or Azure.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Scalability & Performance",
    desc: "Deep expertise in PostgreSQL, Redis, distributed systems, and high-throughput architectures. We make applications fast and resilient.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "DevOps & Automation",
    desc: "CI/CD pipelines, Docker, Kubernetes, infrastructure as code. Automate everything from development environments to production deployments.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];

const techStack = [
  "Python",
  "TypeScript",
  "Ruby",
  "Go",
  "LLMs (GPT, Claude, Llama)",
  "LangChain",
  "Vector DBs",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "Kubernetes",
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-brand-dark mb-4">
            What We Do
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From AI strategy to production deployment — we bring deep
            engineering expertise to every engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="p-6 rounded-lg border border-gray-200 hover:border-brand-accent/50 hover:shadow-lg transition-all group"
            >
              <div className="text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-2">
                {svc.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="font-heading text-3xl font-semibold text-brand-dark mb-6">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
