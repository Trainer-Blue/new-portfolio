
export const PORFOLIO_DATA = {
  hero: {
    name: "Ishan Siddhartha",
    title: "Developer",
    bio: "I'm currently pursuing a B.Tech in Computer Science at Birla Institute of Technology Mesra, Ranchi. Born and raised in Varanasi I've always loved learning new things and challenging myself every single day to push the boundaries of who and what I am.",
    location: "Varanasi, India",
    designation: "Computer Science Student"
  },
  education: {
    degree: "B.Tech in Computer Science",
    institution: "Birla Institute of Technology Mesra, Ranchi",
    year: "2023 - 2027" 
  },
  skills: [
    "C", "C++", "JavaScript", "Java", "Python", 
    "React", "Next.js", "Node.js", "Tailwind CSS", 
    "HTML", "CSS", "Git", "SQL"
  ],
  projects: [
    {
      title: "SwiftShare",
      description: "A decentralized real-time collaborative text editor powered by Yjs CRDTs, enabling conflict-free concurrent editing with sub-100ms sync latency. Features a custom WebSocket server, two-tiered MongoDB + in-memory persistence, and a premium minimalist UI with glassmorphism effects.",
      techStack: ["React", "Node.js", "Yjs", "WebSocket", "MongoDB", "Tailwind CSS", "Docker", "UploadThing"],
      link: "swiftshare.in",
      github: "https://www.swiftshare.in/moreinfo/about#open-source",
      image: "/swiftshare.png"
    },
    {
      title: "Portfolio",
      description: "A modern, minimalistic portfolio with a dynamic hex grid background with comet animations(check github for component), smooth View Transition theme toggling, and Lenis smooth scrolling. Built with a focus on GPU-accelerated rendering and mobile performance, also cat theme toggle 😺",
      techStack: ["React", "Vite", "Tailwind CSS", "Canvas API", "View Transitions API", "Lenis"],
      link: "ishan-siddhartha.vercel.app",
      github: "https://github.com/Trainer-Blue/new-portfolio",
      image: "/new_portfolio.png"
    },
    {
      title: "Old Portfolio",
      description: "A modern, responsive personal portfolio website built from scratch to showcase my projects, skills, and experience. Features a clean, dark-themed design with interactive elements and smooth scrolling and a sideways navbar",
      techStack: ["React", "JavaScript", "Tailwind CSS", "Styled Components", "Material UI"],
      link: "https://ishansidd.vercel.app/",
      github: "https://github.com/Trainer-Blue/portfolio",
      image: "/portfolio-screenshot.jpg" 
    },
    {
      title: "LexisPDF",
      description: "An intelligent web application that transforms PDF documents into AI-generated summaries using language models. Features secure authentication, real-time processing, and interactive document viewing with support for files up to 20MB.",
      techStack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Google Gemini", "LangChain", "Tailwind CSS", "Clerk Auth"],
      link: "https://lexispdf.vercel.app",
      github: "https://github.com/Trainer-Blue/lexis",
      image: "/lexis-screenshot.png"
    },
    {
      title: "Samvedna",
      description: "A responsive and accessible landing page for a neuropsychological rehabilitation center, optimized for cross-device user experience with clean UI/UX structure and dynamic service sections.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "EmailJS"],
      link: "https://samvedna.vercel.app",
      github: "",
      image: "/samvedna-screenshot.png"
    }
  ],
  contact: {
    email: "ishansiddhartha@gmail.com"
  }
};
