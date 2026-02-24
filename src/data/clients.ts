export interface Client {
  name: string;
  subtitle: string;
  details: string;
  externalUrl: string;
  image: string;
  short: string;
}

export const clients: Client[] = [
  {
    name: "Flow Tech Services, Inc.",
    subtitle: "Infrastructure automation.",
    details:
      "During a six-months engagement ReinventONE was tasked with a complete automation of the deployment infrastructure on AWS EC2 using enterprise Chef. It replaced manually configured services and supported any number of development environments such as staging. Highly optimized request path was contained to source availability zone thus reducing inter-zone traffic and the corresponding charges. Resulting infrastructure was fully resilient and could tolerate a number of compute node failures.",
    externalUrl: "https://flowinc.app/",
    image: "/images/clients/flowinc.jpg",
    short: "flowinc",
  },
  {
    name: "HIRED, Inc.",
    subtitle: "Performance of a Rails application.",
    details:
      "Hired.com brought in ReinventONE to help identify some of the bottlenecks preventing their highly successful Ruby on Rails application to render pages in an acceptable amount of time. We were able to identify database improvements which were later applied, and implemented a reusable design pattern supporting progressive loading of page content based on visibility. As a result, average latency of the site was improved by almost 2x.",
    externalUrl: "https://hired.com/",
    image: "/images/clients/hired.jpg",
    short: "hired",
  },
  {
    name: "HomeBase by PioneerWorks Inc.",
    subtitle: "Platform Initiatives — DevOps, Scaling, Performance.",
    details:
      "HomeBase is a popular hourly work team management software used by tens of thousands of customers worldwide. As more customers joined HomeBase, demand on the primary PostgreSQL database continually increased, eventually requiring various performance-oriented optimizations across the entire stack. Additionally, ReinventONE helped with CI automation, Docker integration, and development environment optimizations.",
    externalUrl: "https://joinhomebase.com/",
    image: "/images/clients/homebase.jpg",
    short: "homebase",
  },
  {
    name: "Reflektive, Inc.",
    subtitle: "Presentation on Scalability.",
    details:
      'As Reflektive\'s B2B application became more and more popular, the company wanted to be prepared for the challenges ahead and invited ReinventONE to come in and talk about various approaches to scaling out. Konstantin presented a very detailed talk based on a 100+ slide presentation originally prepared for the SFPUG titled "Incrementally Scaling Web Applications on PostgreSQL".',
    externalUrl: "https://www.reflektive.com/",
    image: "/images/clients/reflektive.jpg",
    short: "reflektive",
  },
  {
    name: "Returnly, Inc.",
    subtitle: "AWS connectors for the Returnly Instant Returns B2B Platform.",
    details:
      "Returnly.com brought in ReinventONE to assist in building an asynchronous Ruby application capable of delivering customized HTTP webhooks to various partners. In addition, RE1 also assisted with JSON schema serialization, transformations, and validations.",
    externalUrl: "https://returnly.com/",
    image: "/images/clients/returnly.jpg",
    short: "returnly",
  },
  {
    name: "Shippo, Inc.",
    subtitle: "Deployment — Local and Remote.",
    details:
      "At Shippo, ReinventONE was engaged in the project to automate and modernize deployment to AWS of a Dockerized application.",
    externalUrl: "https://goshippo.com/",
    image: "/images/clients/shippo.jpg",
    short: "shippo",
  },
  {
    name: "Wanelo, Inc.",
    subtitle: "DevOps, Upgrades, Infrastructure, Troubleshooting.",
    details:
      "Wanelo has been running an incredibly powerful and complex distributed system powering its many components and features. ReinventONE attacked and addressed a couple of burning issues, and assisted with upgrading applications to the latest versions of Ruby and their dependencies. In addition we worked on various infrastructure issues, automation, upgrades, and more.",
    externalUrl: "https://wanelo.com/",
    image: "/images/clients/wanelo.jpg",
    short: "wanelo",
  },
];
