import { useState } from "react";
import { cn } from "@/lib/utils";

// Each skill has a name, proficiency level (0–100), and a category.
// Categories are used for filtering (frontend, backend, tools, etc.)
const skills = [
  // Frontend Skills 
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Bootstrap", level: 85, category: "frontend" },
  { name: "PHP", level: 70, category: "frontend" },

  // Backend Skills 
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "Spring Boot", level: 70, category: "backend" },
  { name: "C# / ASP.NET Core MVC", level: 80, category: "backend" },
  { name: "Java", level: 85, category: "backend" },
  { name: "Python", level: 88, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "Oracle SQL", level: 75, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },

  // Tools / IDEs / Cloud
  { name: "Git/GitHub", level: 100, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Linux", level: 80, category: "tools" },
  { name: "Windows OS", level: 100, category: "tools" },
  { name: "Microsoft Office", level: 100, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Visual Studio", level: 85, category: "tools" },
  { name: "IntelliJ IDEA", level: 85, category: "tools" },
  { name: "Eclipse", level: 70, category: "tools" },
  { name: "PyCharm", level: 100, category: "tools" },
  { name: "Microsoft Azure", level: 65, category: "tools" },
  { name: "Azure/Intune (Device Mgmt)", level: 70, category: "tools" },
  { name: "Virtual Desktops (VDI)", level: 80, category: "tools" },
  { name: "iOS/Android Device Support", level: 75, category: "tools" },
  { name: "ServiceNow", level: 95, category: "tools" },
  

  // Programming & CS Concepts
  { name: "Data Structures & Algorithms", level: 85, category: "concepts" },
  { name: "Machine Learning / AI", level: 65, category: "concepts" },
  { name: "Cybersecurity", level: 75, category: "concepts" },
  { name: "Operating Systems", level: 75, category: "concepts" },
  { name: "Networking (TCP/IP, VLANs)", level: 70, category: "concepts" },
  { name: "Software Engineering", level: 85, category: "concepts" },
  { name: "Database Management", level: 80, category: "concepts" },

  // Diploma & Certifications
  { name: "Bachelor's in Computer Science (WGU)", level: 100, category: "diploma/certifications" },
  { name: "Computer Languages Diploma", level: 100, category: "diploma/certifications" },
  { name: "Associate's in Computer Information Systems (DMACC)", level: 100, category: "diploma/certifications" },
  { name: "C# Certificate", level: 100, category: "diploma/certifications" },
  { name: "Python Certificate", level: 100, category: "diploma/certifications" },
  { name: "SQL Certificate", level: 100, category: "diploma/certifications" },
  { name: "C++ Certificate", level: 100, category: "diploma/certifications" },
];

// List of categories available for filtering
const categories = [
  "all",
  "frontend",
  "backend",
  "tools",
  "concepts",
  "diploma/certifications",
];

export const SkillsSection = () => {
  // Track currently active filter category
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter skills list by active category (or show all if "all" selected)
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
