import aliAvatar from '../assets/ali_avatar.jpg'
import projectNexus from '../assets/project_nexus.jpg'
import projectVortex from '../assets/project_vortex.jpg'
import projectAether from '../assets/project_aether.jpg'
import projectHyperscale from '../assets/project_hyperscale.jpg'

export const personalInfo = {
  name: "Ali Raza",
  preferredName: "Ali",
  title: "Senior Frontend Engineer & Creative Technologist",
  tagline: "Bridging the gap between engineering rigor and high-converting motion design.",
  status: "Available for high-impact contracts & full-time roles",
  availabilityBadge: "Open to Work • Q2/Q3 2026",
  location: "San Francisco, CA (Open to Remote / Worldwide)",
  email: "ali.creative.dev@gmail.com",
  phone: "+1 (555) 234-8901",
  avatar: aliAvatar,
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    dribbble: "https://dribbble.com",
    email: "mailto:ali.creative.dev@gmail.com"
  },
  resumeUrl: "#contact"
}

export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
]

export const heroData = {
  headlinePrefix: "CRAFTING DIGITAL",
  headlineGradient: "EXPERIENCES",
  headlineSuffix: "WITH CODE & MOTION",
  subheadline:
    "I engineer ultra-responsive, accessible, and cinematic web products. Specializing in modern React ecosystems, buttery 60 FPS GSAP animations, and scalable enterprise design systems.",
  primaryCta: {
    label: "Explore Work",
    href: "#projects"
  },
  secondaryCta: {
    label: "Get in Touch",
    href: "#contact"
  },
  techPills: [
    { label: "React 19", category: "Core" },
    { label: "GSAP Motion", category: "Animation" },
    { label: "Tailwind CSS", category: "Styling" },
    { label: "TypeScript", category: "Language" },
    { label: "Next.js & Vite", category: "Architecture" },
    { label: "WebGL / Three.js", category: "Creative" }
  ],
  quickStats: [
    { value: "5+", label: "Years Experience" },
    { value: "40+", label: "Shipped Projects" },
    { value: "99.9%", label: "Client CSAT" }
  ]
}

export const aboutData = {
  badge: "About Me",
  heading: "Passionate about pixels, obsessed with performance.",
  bioParagraphs: [
    "Hello! I'm Ali, a Senior Frontend Engineer with over 5 years of industry experience turning intricate product visions into crisp, memorable web applications.",
    "My philosophy centers on creating software that doesn't just function seamlessly behind the scenes, but evokes genuine delight on the screen. I unite design-system architecture with hardware-accelerated animations to drive measurable conversion uplifts and user engagement.",
    "When I'm not architecting modular component systems or profiling render bottlenecks in Chrome DevTools, you'll find me exploring generative shaders, contributing to open-source UI libraries, and mentoring emerging developers."
  ],
  stats: [
    { number: 5, suffix: "+", label: "Years of Experience", description: "Designing & developing production applications" },
    { number: 42, suffix: "+", label: "Projects Completed", description: "From seed-stage startups to Fortune 500 portals" },
    { number: 99, suffix: ".8%", label: "Satisfaction Rate", description: "Consistently rated 5 stars by product teams" },
    { number: 180, suffix: "k+", label: "Lines of Clean Code", description: "Tested, documented, and production ready" }
  ],
  highlights: [
    {
      icon: "Zap",
      title: "Performance First",
      description: "Sub-second initial paint times, 99+ Lighthouse scores, and 60 FPS scroll performance."
    },
    {
      icon: "Layers",
      title: "Modular Design Systems",
      description: "Scalable atomic architecture built with reusable, accessible, and tokenized components."
    },
    {
      icon: "Sparkles",
      title: "Cinematic Motion",
      description: "Scroll-triggered choreography and micro-interactions that elevate brand credibility."
    },
    {
      icon: "Code2",
      title: "Clean Modern Codebase",
      description: "Strict TypeScript types, resilient error boundaries, and zero tech debt ethos."
    }
  ]
}

export const skillsData = {
  badge: "Technical Competence",
  heading: "Curated Stack & Mastery",
  subheading: "A comprehensive toolbox developed through years of building high-velocity production software.",
  categories: [
    {
      name: "Frontend",
      description: "Core technologies powering fast, fluid, and scalable user interfaces.",
      skills: [
        { name: "React 18 / 19", level: 96, icon: "Code2", tag: "Expert" },
        { name: "TypeScript / JavaScript", level: 94, icon: "FileCode", tag: "Advanced" },
        { name: "GSAP & ScrollTrigger", level: 92, icon: "Sparkles", tag: "Specialist" },
        { name: "Tailwind CSS & PostCSS", level: 95, icon: "Palette", tag: "Expert" },
        { name: "Next.js / SSR / RSC", level: 90, icon: "Globe", tag: "Advanced" },
        { name: "HTML5 / Semantic A11y", level: 98, icon: "CheckCircle", tag: "Mastery" }
      ]
    },
    {
      name: "Backend & APIs",
      description: "Full-stack integration knowledge to bridge frontend components with servers.",
      skills: [
        { name: "Node.js & Express", level: 85, icon: "Server", tag: "Proficient" },
        { name: "REST & GraphQL APIs", level: 88, icon: "Network", tag: "Advanced" },
        { name: "PostgreSQL & Prisma", level: 82, icon: "Database", tag: "Proficient" },
        { name: "Supabase & Firebase", level: 86, icon: "Cpu", tag: "Proficient" },
        { name: "Serverless & Edge Functions", level: 84, icon: "Zap", tag: "Proficient" }
      ]
    },
    {
      name: "Tools & DevOps",
      description: "Automation, testing, and modern developer tooling for continuous delivery.",
      skills: [
        { name: "Vite / Turbopack / Webpack", level: 91, icon: "Cpu", tag: "Advanced" },
        { name: "Git / GitHub Actions CI/CD", level: 93, icon: "GitBranch", tag: "Advanced" },
        { name: "Docker & Containerization", level: 80, icon: "Boxes", tag: "Proficient" },
        { name: "Vercel / AWS Amplify", level: 92, icon: "Cloud", tag: "Advanced" },
        { name: "Vitest & Playwright E2E", level: 85, icon: "CheckSquare", tag: "Proficient" }
      ]
    },
    {
      name: "UI/UX & Creative",
      description: "Transforming ambiguous design concepts into crisp, high-converting digital products.",
      skills: [
        { name: "Figma to Code Precision", level: 96, icon: "Figma", tag: "Mastery" },
        { name: "Micro-interactions & UX", level: 92, icon: "MousePointer", tag: "Specialist" },
        { name: "Responsive & Adaptive Layouts", level: 97, icon: "Layout", tag: "Mastery" },
        { name: "Design Token Architecture", level: 90, icon: "Layers", tag: "Advanced" },
        { name: "Motion Prototyping", level: 89, icon: "Film", tag: "Specialist" }
      ]
    }
  ]
}

export const projectsData = [
  {
    id: "nexus-ai",
    title: "Nexus AI Engine",
    subtitle: "Real-time Generative Intelligence & Model Telemetry",
    description: "An enterprise-grade analytics dashboard that renders complex streaming AI model inference metrics, token consumption graphs, and neural network latency alerts in real time.",
    image: projectNexus,
    featured: true,
    tags: ["React 19", "GSAP", "Tailwind CSS", "Recharts", "WebSockets"],
    metrics: "40% latency reduction • 99 Lighthouse Score",
    liveUrl: "https://nexus-ai-demo.web.app",
    githubUrl: "https://github.com/ali/nexus-ai-engine",
    accentColor: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: "vortex-defi",
    title: "Vortex Protocol",
    subtitle: "High-Frequency Algorithmic Trading Terminal",
    description: "Next-generation decentralized finance trading platform featuring high-density order books, zero-latency candlestick charts, multi-wallet bridging, and responsive glassmorphic cards.",
    image: projectVortex,
    featured: true,
    tags: ["React", "TypeScript", "Tailwind CSS", "Ethers.js", "Chart.js"],
    metrics: "Processed $14M+ mock volume • 60 FPS renders",
    liveUrl: "https://vortex-protocol.example.com",
    githubUrl: "https://github.com/ali/vortex-protocol",
    accentColor: "from-emerald-400 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    id: "aether-studio",
    title: "Aether Motion Studio",
    subtitle: "Spatial 3D Canvas & Kinetic Typography Engine",
    description: "A browser-based creative suite that empowers visual designers to orchestrate kinetic animations, particle systems, and 3D geometric wireframes with exportable CSS & GSAP timelines.",
    image: projectAether,
    featured: true,
    tags: ["React", "Three.js", "GSAP ScrollTrigger", "Web Audio API", "Tailwind"],
    metrics: "12k+ monthly active designers • Webby Nominee",
    liveUrl: "https://aether-studio.example.com",
    githubUrl: "https://github.com/ali/aether-studio",
    accentColor: "from-violet-500 to-fuchsia-500",
    glowColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    id: "hyperscale-cloud",
    title: "HyperScale Cloud Matrix",
    subtitle: "Kubernetes Cluster Topology & DevOps Automation",
    description: "Multi-cloud infrastructure orchestrator providing visual pod topologies, automated Canary deployment pipelines, live server health heatmaps, and role-based access management.",
    image: projectHyperscale,
    featured: false,
    tags: ["React", "Next.js", "Tailwind CSS", "D3.js", "Docker API"],
    metrics: "Over 500+ cluster nodes monitored concurrently",
    liveUrl: "https://hyperscale-cloud.example.com",
    githubUrl: "https://github.com/ali/hyperscale-cloud",
    accentColor: "from-blue-500 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.4)"
  }
]

export const experienceData = [
  {
    role: "Lead Frontend Engineer",
    company: "Aura Labs / Quantum UX",
    location: "San Francisco, CA (Hybrid)",
    period: "2024 — Present",
    type: "Full-Time",
    description:
      "Directing core frontend architecture for high-growth SaaS products. Mentoring 6 frontend developers, driving design system adoption, and optimizing performance across high-volume analytics modules.",
    achievements: [
      "Engineered design system consumed by 14 product squads, slashing feature delivery times by 35%.",
      "Architected GSAP micro-interaction choreography resulting in a 22% conversion lift on checkout flows.",
      "Optimized Core Web Vitals to achieve all-green 98+ Lighthouse benchmarks across enterprise views."
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Micro-frontends", "Design Systems"]
  },
  {
    role: "Senior Frontend Developer",
    company: "Synthetix Digital Agency",
    location: "New York, NY (Remote)",
    period: "2022 — 2024",
    type: "Full-Time",
    description:
      "Built bespoke web experiences and motion-heavy landing pages for top venture-backed startups and international lifestyle brands, partnering directly with creative directors.",
    achievements: [
      "Delivered 18 client portfolio and product launch applications with 100% on-schedule record.",
      "Pioneered GSAP ScrollTrigger timeline workflows with reusable custom hooks, saving 50+ hours per build.",
      "Authored custom WebGL background shader components for 4 Awwwards-featured client portals."
    ],
    skills: ["React", "GSAP ScrollTrigger", "Three.js", "Tailwind CSS", "Vite", "Accessibility"]
  },
  {
    role: "Full Stack UI Engineer",
    company: "CloudScale Technologies",
    location: "Austin, TX (Remote)",
    period: "2021 — 2022",
    type: "Full-Time",
    description:
      "Developed high-velocity dashboard components, customer billing portals, and API integrations for an enterprise cloud observability platform.",
    achievements: [
      "Built real-time metric charting widgets handling over 100,000 data points with zero frame drops.",
      "Migrated monolithic legacy codebase to a modern React & Tailwind component library.",
      "Integrated automated end-to-end testing pipeline reducing regression incidents by 40%."
    ],
    skills: ["React", "Node.js", "REST APIs", "Tailwind CSS", "Jest", "Git CI/CD"]
  }
]

export const contactData = {
  badge: "Get In Touch",
  heading: "Let's build something exceptional together.",
  subheading:
    "Whether you have an ambitious new project, require a high-impact senior frontend specialist, or simply want to chat code & motion — my inbox is always open.",
  infoItems: [
    {
      icon: "Mail",
      title: "Direct Email",
      value: "ali.creative.dev@gmail.com",
      link: "mailto:ali.creative.dev@gmail.com",
      actionText: "Send email"
    },
    {
      icon: "Phone",
      title: "Phone / WhatsApp",
      value: "+1 (555) 234-8901",
      link: "tel:+15552348901",
      actionText: "Call now"
    },
    {
      icon: "MapPin",
      title: "Location",
      value: "San Francisco, CA",
      subvalue: "Available globally (EST / PST / UTC)",
      link: null
    },
    {
      icon: "Clock",
      title: "Response Time",
      value: "Within 24 Hours",
      subvalue: "Monday – Friday",
      link: null
    }
  ]
}

export const footerData = {
  copyright: `© ${new Date().getFullYear()} Ali Raza. Crafted with precision, React, Tailwind CSS & GSAP.`,
  tagline: "Designed & engineered with love for beautiful digital motion."
}
