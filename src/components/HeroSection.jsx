import {
  ArrowDown,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  MapPin,
  CheckCircle2,
  Briefcase, // For job title
  GraduationCap, // For degrees
} from "lucide-react";
import { memo, useCallback } from "react";

// COMPONENT: HeroSection
export const HeroSection = memo(function HeroSection() {
  // Smooth scroll helper: navigates down to #projects section
  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      itemScope
      itemType="https://schema.org/Person"
      className="relative isolate overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-gradient absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] opacity-40 blur-3xl" />
        <div className="grid-bg absolute inset-0 opacity-[0.08]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] items-center gap-10 md:gap-14">

          {/* Portrait card */}
          <aside className="flex justify-center md:justify-start">
            <div className="group relative">
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/15 p-4 md:p-5 shadow-xl animate-fade-in">
                <div className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-sky-300/25 to-fuchsia-300/25 blur-xl -z-10" />
                
                {/* Profile image */}
                <div
                  className="relative w-44 h-44 md:w-64 md:h-64 rounded-[28%_72%_62%_38%/41%_31%_69%_59%]
                             overflow-hidden ring-1 ring-white/15 shadow-2xl bg-slate-800/20 animate-floatY"
                >
                  <img
                    src="/projects/profile.jpg"
                    alt="Portrait of Arnes Kapic"
                    itemProp="image"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Badges: location + availability */}
                <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-muted-foreground ring-1 ring-white/10">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span itemProp="homeLocation">Johnston, IA</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    <span>Open to opportunities</span>
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Text column */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              <span className="opacity-0 animate-fade-in">Hi, I’m</span>{" "}
              <span className="text-primary opacity-0 animate-fade-in-delay-1" itemProp="givenName">
                Arnes
              </span>{" "}
              <span className="text-gradient opacity-0 animate-fade-in-delay-2" itemProp="familyName">
                Kapic
              </span>
            </h1>

            {/* Skill tags row */}
            <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start opacity-0 animate-fade-in-delay-2">
              {[
                "Full-Stack Software Development",
                "React • Tailwind CSS • Responsive UI",
                "Python • C# • .NET • SQL",
                "API Integration • Data Modeling",
                "Secure Development Lifecycle",
                "Agile • Code Reviews • Collaboration",
              ].map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-sm ring-1 ring-white/10">
                  {t}
                </span>
              ))}
            </div>
            
            {/* Bio / professional summary */}
            <p
              className="mt-5 max-w-2xl text-lg md:text-xl text-muted-foreground mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3"
              itemProp="description"
            >
              I design, build, and maintain production-grade software and infrastructure solutions—combining 
              clean, scalable web applications with enterprise-level automation. With a strong foundation in 
              <span className="font-semibold"> Control-M job scheduling</span>, scripting, and 
              <span className="font-semibold"> CI/CD pipelines</span>, I streamline batch operations, monitor 
              mission-critical systems, and deliver secure, high-availability deployments. Proficient in 
              <span className="font-semibold"> C#, .NET, SQL, Python, and cloud-native tooling</span>, I bring 
              hands-on experience in <span className="font-semibold">Linux/Windows environments, API integrations, 
              disaster recovery planning, and telemetry</span>. My focus is building resilient software ecosystems 
              that align IT operations, development workflows, and business goals—driving efficiency and innovation 
              across enterprise platforms.
            </p>

            {/* Call-to-action buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3 justify-center md:justify-start opacity-0 animate-fade-in-delay-4">
              <button onClick={scrollToProjects} className="cosmic-button inline-flex items-center gap-2">
                View My Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href="mailto:kapic.arnes.13@gmail.com?subject=Hello%20Arnes"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-primary/20 bg-primary/10 hover:bg-primary/15 text-primary transition"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact
              </a>
            </div>
            
            {/* Social icons */}
            <nav
              className="mt-5 flex items-center gap-4 justify-center md:justify-start opacity-0 animate-fade-in-delay-4"
              aria-label="Social links"
            >
              <a href="https://github.com/ArnesKapic" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
              </a>
              <a href="https://www.linkedin.com/in/arnes-kapic-641b40245/" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
              </a>
              <a href="mailto:kapic.arnes.13@gmail.com">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
              </a>
            </nav>
          </div>
        </div>

        {/* Degrees & Job Section */}
        <div className="mt-20 flex flex-col items-center text-center gap-6 animate-fade-in-delay-4">
          <div>
            <p className="text-lg font-semibold text-white flex justify-center items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> IT Operations @ Conduent
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" /> B.S. Computer Science (WGU) • A.A.S. Computer Information Systems (DMACC)
            </p>
          </div>

          {/* Diploma Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="group relative w-48 h-32 md:w-64 md:h-44 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-primary/50 hover:scale-105 transition">
              <img src="/degrees/bs-degree.jpg" alt="Bachelor's Degree" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <span className="absolute bottom-2 left-2 text-sm text-white opacity-0 group-hover:opacity-100">B.S. Computer Science</span>
            </div>

            <div className="group relative w-48 h-32 md:w-64 md:h-44 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-primary/50 hover:scale-105 transition">
              <img src="/degrees/aas-diploma.jpg" alt="Associate's Degree" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              <span className="absolute bottom-2 left-2 text-sm text-white opacity-0 group-hover:opacity-100">A.A.S. Computer Info Systems</span>
            </div>
          </div>

          {/* Achievements Showcase */}
          <div className="mt-6 w-full max-w-4xl">
            <h3 className="text-white text-lg font-semibold mb-3">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative w-full h-28 md:h-36 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 hover:ring-primary/50 hover:scale-105 transition">
                  <img src={`/achievements/award${i}.jpg`} alt={`Achievement ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  <span className="absolute bottom-2 left-2 text-xs text-white opacity-0 group-hover:opacity-100">
                    Achievement {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue (bouncing arrow) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
    </section>
  );
});
