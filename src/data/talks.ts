export interface Talk {
  /** File stem, e.g. "2024.ruby-3-concurrency" */
  slug: string
  year: number
  title: string
  excerpt: string
  pages: number
  /** File size in bytes */
  sizeBytes: number
  /** Path to cover image */
  cover: string
  /** Path to PDF file */
  pdf: string
}

export const talks: Talk[] = [
  {
    slug: '2026.inquirex',
    year: 2026,
    title: 'Inquirex: Deterministic DSL meets Probabilistic LLM',
    excerpt:
      'Presented on April 14th, 2026 at SF Ruby User Group, this talk introduces a collection of gems that together define flexible DSL for building deterministic lead-qualification forms that are type-safe, supporting AST branching supported, TTY interface, HTML interface, and LLM acting as an extractor of answers from free-form text, shortening the process dramatically.',
    pages: 33,
    sizeBytes: 9_560_651,
    cover: '/images/talks/images/2026.inquirex.jpg',
    pdf: '/images/talks/pdfs/2026.inquirex.pdf'
  },
  {
    slug: '2015.from-obvious-to-ingenius--scaling-web-apps',
    year: 2015,
    title: 'From Obvious to Ingenious \u2014 Scaling Web Apps',
    excerpt:
      'Originally presented at SF PostgreSQL User Group, this 100+ slide deep dive covers incrementally scaling web applications on PostgreSQL, from caching strategies to sharding and beyond.',
    pages: 107,
    sizeBytes: 55_066_064,
    cover: '/images/talks/images/2015.from-obvious-to-ingenius--scaling-web-apps.jpg',
    pdf: '/images/talks/pdfs/2015.from-obvious-to-ingenius--scaling-web-apps.pdf'
  },
  {
    slug: '2025.thread-safety-in-ruby-and-rails',
    year: 2025,
    title: 'Thread Safety in Ruby and Rails',
    excerpt:
      'An overview of thread safety concepts, synchronization techniques, and race condition prevention in Ruby and Rails applications using Mutex, Queue, and concurrency patterns.',
    pages: 13,
    sizeBytes: 1_766_497,
    cover: '/images/talks/images/2025.thread-safety-in-ruby-and-rails.jpg',
    pdf: '/images/talks/pdfs/2025.thread-safety-in-ruby-and-rails.pdf'
  },
  {
    slug: '2025.terraform-with-terragrunt',
    year: 2025,
    title: 'Terraform Is Better as a Terragrunt Sandwich',
    excerpt:
      'Covers Terraform fundamentals and the challenges of pure Terraform projects, then introduces Terragrunt as the solution with practical refactoring examples and guidance on when the added layer pays off.',
    pages: 38,
    sizeBytes: 1_990_834,
    cover: '/images/talks/images/2025.terraform-with-terragrunt.jpg',
    pdf: '/images/talks/pdfs/2025.terraform-with-terragrunt.pdf'
  },
  {
    slug: '2025.bash-tooling-for-rails',
    year: 2025,
    title: 'Dev Tooling for You and Me',
    excerpt:
      'Explores when shell scripting is appropriate, how to write self-documenting dev scripts that save time, and demos practical tooling for Rails development workflows.',
    pages: 16,
    sizeBytes: 17_097_406,
    cover: '/images/talks/images/2025.bash-tooling-for-rails.jpg',
    pdf: '/images/talks/pdfs/2025.bash-tooling-for-rails.pdf'
  },
  {
    slug: '2024.ruby-3-concurrency',
    year: 2024,
    title: 'Concurrency in Ruby 3',
    excerpt:
      'A deep dive into Ruby 3 concurrency primitives \u2014 comparing Threads, Fibers, Processes, EventMachine, and Ractors, with guidance on when to use each approach for multi-core programming.',
    pages: 22,
    sizeBytes: 27_994_315,
    cover: '/images/talks/images/2024.ruby-3-concurrency.jpg',
    pdf: '/images/talks/pdfs/2024.ruby-3-concurrency.pdf'
  },
  {
    slug: '2024.design-for-loose-coupling',
    year: 2024,
    title: 'Design for Loose Coupling',
    excerpt:
      'Presented at the Ruby SF Meetup, this talk explores how tight coupling naturally emerges in applications and presents strategies for modularizing codebases with clear boundaries and enforcement.',
    pages: 37,
    sizeBytes: 17_118_224,
    cover: '/images/talks/images/2024.design-for-loose-coupling.jpg',
    pdf: '/images/talks/pdfs/2024.design-for-loose-coupling.pdf'
  },
  {
    slug: '2023.loose-coupling-with-gems-and-packwerk',
    year: 2023,
    title: 'Loose Coupling with Gems and Packwerk',
    excerpt:
      'Part 1 of an advancing Ruby series covering libraries, gems, and Rails. Encourages everyone to make a Ruby gem and explores what makes software great \u2014 easy to change, well-tested, and properly decoupled.',
    pages: 28,
    sizeBytes: 25_957_408,
    cover:
      '/images/talks/images/2023.loose-coupling-with-gems-and-packwerk.jpg',
    pdf: '/images/talks/pdfs/2023.loose-coupling-with-gems-and-packwerk.pdf'
  },
  {
    slug: '2021.software-design',
    year: 2021,
    title: 'Designing Distributed Software for Scale',
    excerpt:
      'Breaks down software design into three essential views \u2014 Data Model, State Model, and System Model \u2014 and explains why early team collaboration on design decisions has lasting implications.',
    pages: 21,
    sizeBytes: 31_993_692,
    cover: '/images/talks/images/2021.software-design.jpg',
    pdf: '/images/talks/pdfs/2021.software-design.pdf'
  },
  {
    slug: '2018.be-friends-with-unix',
    year: 2018,
    title: 'Behold, the Unix Command Line',
    excerpt:
      'An introduction to Unix, shells, and the command line \u2014 from the colorful history of MULTICS and Ken Thompson to practical power-user skills on the dominant server operating system.',
    pages: 45,
    sizeBytes: 40_643_304,
    cover: '/images/talks/images/2018.be-friends-with-unix.jpg',
    pdf: '/images/talks/pdfs/2018.be-friends-with-unix.pdf'
  }
]
