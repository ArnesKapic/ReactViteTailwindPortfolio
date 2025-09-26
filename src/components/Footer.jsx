import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-10 px-6 bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Arnes Kapic. Built with ❤️ using React & Tailwind.
        </p>

        {/* Back to top */}
        <a
          href="#"
          className="relative left-[-120px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
        >
          <ArrowUp size={18} /> Back to top
        </a>
      </div>
    </footer>
  );
};




