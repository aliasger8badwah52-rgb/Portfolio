import projectShopco from '../assets/project_shopco.png'
import projectLead from '../assets/project_lead.png'
import projectOptixel from '../assets/project_optixel.png'

/*
  TODO (fill these in): email, GitHub, LinkedIn and location are not set yet.
  Empty values are hidden automatically in the Contact section and Footer.
*/
export const personalInfo = {
  name: "Aliasgar",
  preferredName: "Aliasgar",
  initial: "A",
  title: "Web Developer & B.Tech Data Science Student",
  badge: "Web Developer · Data Science Student",
  location: "",
  email: "",
  avatar: null, // add your own photo, e.g. import it and set it here
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: ""
  }
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
  greeting: "Hi, I'm Aliasgar.",
  headline: "I Build Digital Experiences That Make an Impact.",
  subheadline:
    "I'm a web developer and B.Tech Data Science student passionate about creating modern, responsive, and interactive websites. I combine clean code, thoughtful design, and engaging animations to turn ideas into digital experiences.",
  primaryCta: { label: "Explore My Work", href: "#projects" },
  secondaryCta: { label: "Let's Connect", href: "#contact" },
  chips: ["React.js", "Next.js", "WordPress"]
}

export const aboutData = {
  badge: "About Me",
  heading: "Turning ideas into",
  headingGradient: "practical digital solutions.",
  bioParagraphs: [
    "I'm Aliasgar, a passionate web developer currently pursuing a B.Tech in Computer Science with a specialization in Data Science at Medi-Caps University.",
    "My journey in development focuses on building visually appealing, responsive, and functional websites. I work with HTML, CSS, JavaScript, React.js, Next.js, and WordPress with Advanced Custom Fields (ACF) to create customized digital experiences. I also enjoy exploring GSAP animations, reusable components, and custom WordPress themes.",
    "Alongside web development, my Data Science background helps me develop analytical thinking and a problem-solving mindset. I'm continuously learning, experimenting with new technologies, and improving my ability to transform ideas into practical digital solutions."
  ],
  goal:
    "My goal is to become a well-rounded software developer who combines technical knowledge, creativity, and user-focused thinking to build meaningful products."
}

export const skillsData = {
  badge: "Technical Skills",
  categories: [
    {
      name: "Frontend",
      skills: [
        { name: "HTML5", icon: "Code2" },
        { name: "CSS3", icon: "Palette" },
        { name: "JavaScript", icon: "FileCode" },
        { name: "React.js", icon: "Code2" },
        { name: "Next.js", icon: "Globe" },
        { name: "Responsive Design", icon: "Layout" },
        { name: "GSAP", icon: "Sparkles" }
      ]
    },
    {
      name: "WordPress",
      skills: [
        { name: "WordPress", icon: "Globe" },
        { name: "Advanced Custom Fields (ACF)", icon: "Layers" },
        { name: "Custom Themes", icon: "Palette" },
        { name: "Custom PHP", icon: "FileCode" },
        { name: "Elementor", icon: "Layout" }
      ]
    },
    {
      name: "Backend & Database",
      skills: [
        { name: "Node.js", icon: "Server" },
        { name: "Express.js", icon: "Network" },
        { name: "PostgreSQL / Neon", icon: "Database" },
        { name: "REST APIs", icon: "Network" }
      ]
    },
    {
      name: "Tools & Other",
      skills: [
        { name: "Git", icon: "GitBranch" },
        { name: "GitHub", icon: "GitBranch" },
        { name: "Microsoft Excel (Advanced)", icon: "FileSpreadsheet" },
        { name: "Microsoft Word", icon: "FileText" }
      ]
    }
  ]
}

// Live (deployed) projects get a real screenshot; the rest are shown as compact cards.
export const projectsData = [
  {
    id: "shop-co",
    title: "Shop-Co",
    type: "E-Commerce Website",
    description:
      "An e-commerce website focused on product presentation and a clean online shopping experience.",
    image: projectShopco,
    live: true,
    tags: ["Live Website", "E-Commerce"],
    liveUrl: "https://shop-co-76.vercel.app/"
  },
  {
    id: "lead-website",
    title: "Lead Website",
    type: "Live Website",
    description:
      "A responsive web project showcasing my approach to page layouts, interface design, and clean implementation.",
    image: projectLead,
    live: true,
    tags: ["Live Website", "Responsive"],
    liveUrl: "https://lead-new-ali.vercel.app/"
  },
  {
    id: "optixel",
    title: "Optixel Website",
    type: "Live Website",
    description:
      "A frontend website project highlighting modern design, responsive behavior, and interactions.",
    image: projectOptixel,
    live: true,
    tags: ["Live Website", "Frontend"],
    liveUrl: "https://optixel-two.vercel.app/"
  },
  {
    id: "ecommerce-nextjs",
    title: "E-Commerce Website",
    type: "Next.js · Web Application",
    description:
      "A modern e-commerce experience focused on product presentation, responsive layouts, and a scalable application structure.",
    icon: "ShoppingBag",
    live: false,
    tags: ["Next.js", "Web Application"]
  },
  {
    id: "ai-agency",
    title: "AI Agency Website",
    type: "React · Frontend Website",
    description:
      "An AI-focused agency website that communicates technical expertise through bold typography, modern layouts, and interactive GSAP motion.",
    icon: "Bot",
    live: false,
    tags: ["React", "GSAP"]
  },
  {
    id: "portfolio-admin",
    title: "Dynamic Portfolio & Admin Dashboard",
    type: "React · Express · Neon PostgreSQL",
    description:
      "A portfolio management system to manage projects dynamically, with a backend API, database integration, and a media library for reusable assets.",
    icon: "LayoutDashboard",
    live: false,
    tags: ["React", "Express", "PostgreSQL"]
  },
  {
    id: "wp-landing",
    title: "Custom WordPress Landing Page",
    type: "WordPress · ACF",
    description:
      "A customizable landing page built from reusable theme components and editable ACF content fields for hero, calls to action, forms, and footer.",
    icon: "PenTool",
    live: false,
    tags: ["WordPress", "ACF"]
  }
]

export const educationData = [
  {
    title: "B.Tech in Computer Science — Data Science",
    place: "Medi-Caps University",
    period: "2025 – 2029",
    note: "Currently pursuing"
  },
  {
    title: "Class XII / Higher Secondary Education",
    place: "Badri Higher Secondary School",
    period: "Completed",
    note: "86%"
  }
]

export const experienceData = {
  title: "Web Development Experience",
  points: [
    "Developed responsive website layouts using HTML, CSS, JavaScript, and React.js.",
    "Customized WordPress websites using Advanced Custom Fields (ACF), custom theme development, and custom code.",
    "Explored interactive web experiences using GSAP animations, reusable components, and modern frontend frameworks.",
    "Worked on website deployment, project presentation, and Git/GitHub workflows.",
    "Explored full-stack architecture, database integration, and admin dashboard functionality for dynamic websites."
  ]
}

export const contactData = {
  badge: "Get In Touch",
  heading: "Let's",
  headingGradient: "Connect.",
  subheading:
    "Have a project in mind, or just want to talk web development? Send me a message and I'll get back to you."
}

export const footerData = {
  copyright: `© ${new Date().getFullYear()} Aliasgar. All rights reserved.`
}
