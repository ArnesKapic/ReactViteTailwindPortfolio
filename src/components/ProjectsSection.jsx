// Icons: right arrow, external link, and GitHub logo
import { ArrowRight, ExternalLink, Github } from "lucide-react";

// PROJECTS DATA
// Each project contains metadata for display: title, description, tags, images, and links
const projects = [
  {
    id: 1,
    title: "VerdantQuest: Soulslike RPG Game",
    description: "A 2D action RPG inspired by Soulslike mechanics, built with Python and Pygame. Features dungeon exploration, combat system, inventory management, and pixel-art graphics with immersive sound design.",
    image: "/projects/project1.png",
    tags: ["Python", "OOP", "Pygame","Pixel Art","Collision Detection","Inventory System"],
    demoUrl: "https://github.com/ArnesKapic/VerdantQuest-SoulslikeActionRPG#readme",
    githubUrl: "https://github.com/ArnesKapic/VerdantQuest-SoulslikeActionRPG",
  },
  {
    id: 2,
    title: "TimeGrid: EventCalender App",
    description:
      "A full-stack event scheduling and location manager built with ASP.NET Core MVC, Entity Framework, and SQL Server. Features CRUD operations, authentication, and a modern calendar interface styled with Bootstrap.",
    image: "/projects/project2.png",
    tags: ["C#", "JavaScript", "SQL","HTML/CSS","Bootstrap","More ASP.NET Core MVC"],
    demoUrl: "https://github.com/ArnesKapic/TimeGridCalendar#readme",
    githubUrl: "https://github.com/ArnesKapic/TimeGridCalendar",
  },
  {
    id: 3,
    title: "HotelFlow: Hotel Reservation API",
    description:
      "An enterprise-grade hotel reservation system built with Java and Spring Boot. Features multithreaded booking operations, RESTful APIs, JPA/Hibernate persistence, and robust concurrency handling for scalable performance.",
    image: "/projects/project3.png",
    tags: ["Java", "HTML/CSS", "Spring Boot", "MySQL", "Multithreading", "REST API"],
    demoUrl: "https://github.com/ArnesKapic/Enterprise-Grade-Multithreaded-Spring-Application#readme",
    githubUrl: "https://github.com/ArnesKapic/Enterprise-Grade-Multithreaded-Spring-Application",
  },
];

// COMPONENT: ProjectsSection
// Renders a "Featured Projects" section with cards, descriptions, tags, and links
export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/ArnesKapic"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
