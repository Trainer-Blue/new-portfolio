
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
      title: "Portfolio Website",
      description: "A modern, responsive personal portfolio website built from scratch to showcase my projects, skills, and experience. Features a clean, dark-themed design with interactive elements and smooth scrolling.",
      techStack: ["React", "JavaScript", "Tailwind CSS", "Styled Components", "Material UI"],
      link: "https://ishan-siddhartha.vercel.app/",
      image: "/portfolio-screenshot.jpg" 
    },
    {
      title: "LexisPDF",
      description: "An intelligent web application that transforms PDF documents into AI-generated summaries using advanced language models. Features secure authentication, real-time processing, and interactive document viewing with support for files up to 20MB.",
      techStack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Google Gemini", "LangChain", "Tailwind CSS", "Clerk Auth"],
      link: "https://lexispdf.vercel.app",
      image: "/lexis-screenshot.png"
    },
    {
      title: "Samvedna",
      description: "A responsive and accessible landing page for a real-world neuropsychological rehabilitation center, optimized for cross-device user experience with clean UI/UX structure and dynamic service sections.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "EmailJS"],
      link: "https://samvedna.vercel.app",
      image: "/samvedna-screenshot.png"
    }
  ],
  contact: {
    email: "ishansiddhartha@gmail.com"
  }
};
