import {
  Briefcase,
  Code,
  User,
  Server,
  Activity,
  ShieldCheck,
} from "lucide-react";

// About Section

// Optional default param works in plain JS; no type annotations needed.
export const AboutSection = ({ resumeUrl = "/Arnes_Kapic_Resume.pdf" }) => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        {/* Two-column layout: Story (left) + Capability Cards (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT: Narrative / Elevator Pitch */}
          <div className="space-y-6">

            {/* Headline: Production Control + Software */}
            <h3 className="text-2xl font-semibold">
              Software Engineer & IT Production Control
            </h3>

            {/* Positioning paragraph: connecting software + ops */}
            <p className="text-muted-foreground">
              I build resilient, production-grade software and keep enterprise
              workloads running smoothly. My sweet spot is where{" "}
              <span className="font-semibold">web apps and APIs</span> meet{" "}
              <span className="font-semibold">large-scale batch scheduling (Control-M)
              </span>
              : designing clean UIs and robust services, then{" "}
              <span className="font-semibold">automating</span> how they’re
              scheduled, monitored, and recovered across{" "}
              <span className="font-semibold">24×7</span> environments.
            </p>

            {/* Tech focus paragraph: */}
            <p className="text-muted-foreground">
              Day to day, I work across{" "}
              <span className="font-semibold">C#/.NET, SQL (Oracle/MSSQL)</span>,
              and <span className="font-semibold">Python</span> in{" "}
              <span className="font-semibold">Linux/Windows</span> ecosystems,
              backed by <span className="font-semibold">CI/CD</span> (GitHub
              Actions/Azure DevOps), runbooks, and{" "}
              <span className="font-semibold">observability</span> (logs, metrics,
              alerts). I support{" "}
              <span className="font-semibold">Production Control Automation API (AAPI)</span>,
              agent troubleshooting, TLS/SSL certificate flows, and{" "}
              <span className="font-semibold">disaster recovery</span> exercises—
              partnering with Production Control and app teams to hit SLAs.
            </p>

            {/* Highlights: small proof points for scanners/recruiters */}
            <ul className="space-y-2 text-muted-foreground">
              <li>
                • Streamlined batch schedules and{" "}
                <span className="font-semibold">Application Integrator</span> job
                templates for mission-critical workloads.
              </li>
              <li>
                • Built automation & reporting to reduce manual ops toil and
                surface risks early.
              </li>
              <li>
                • Comfortable in multi-platform data centers with{" "}
                <span className="font-semibold">on-call</span> and incident response.
              </li>
            </ul>

            {/* Skill badges: skim-friendly ATS keywords */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Production Control & AAPI",
                "C#/.NET",
                "SQL (Oracle/MSSQL)",
                "Python",
                "CI/CD (GH Actions/Azure DevOps)",
                "Linux & Windows",
                "APIs & Integrations",
                "Observability",
                "TLS/SSL",
                "Disaster Recovery",
              ].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="cosmic-button" aria-label="Contact">
                Get In Touch
              </a>
              <a
                href="/projects/resume.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="Download my resume"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* RIGHT: Capability Cards */}
          <div className="grid grid-cols-1 gap-6">
            {/* Card 1: Web & API Engineering */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web & API Engineering</h4>
                  <p className="text-muted-foreground">
                    Scalable UIs, robust APIs, and secure integrations in{" "}
                    <span className="font-semibold">C#/.NET</span> with telemetry
                    and testing baked in.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Production Control & Automation */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Production Control & Automation
                  </h4>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Control-M</span> setup, AAPI,
                    agent troubleshooting, and schedule optimization across
                    multi-platform 24×7 environments.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Data, Monitoring & Reliability */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Data, Monitoring & Reliability
                  </h4>
                  <p className="text-muted-foreground">
                    SQL/Oracle development, metrics/alerts, runbooks, and{" "}
                    <span className="font-semibold">DR</span> exercises to protect
                    mission-critical workloads.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Security & Compliance */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Security & Compliance</h4>
                  <p className="text-muted-foreground">
                    TLS/SSL certificate flows, access patterns, and accurate
                    ServiceNow records that meet audit and SLA requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Communication & Teaming */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Communication & Teaming</h4>
                  <p className="text-muted-foreground">
                    Clear docs, peer reviews, and knowledge sharing to align dev,
                    ops, and business goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
