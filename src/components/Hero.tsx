
import { m } from "framer-motion";
import { Database, Server, Cloud, Code } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <m.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Aissatou BALDE
        </m.h1>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-2xl font-medium text-primary mb-8"
        >
          Cloud Data Engineering | IA
        </m.p>
        
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          <Database className="w-10 h-10 text-accent" />
          <Server className="w-10 h-10 text-primary" />
          <Cloud className="w-10 h-10 text-accent" />
          <Code className="w-10 h-10 text-primary" />
        </m.div>
        
        <m.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl mb-8"
        >
          Building scalable data solutions and sharing insights on IA
        </m.p>
        
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#projects" 
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full hover-lift mr-4"
          >
            View Projects
          </a>
          <a 
            href="#blog" 
            className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-full hover-lift"
          >
            Read My Blog
          </a>
        </m.div>
      </div>
    </section>
  );
};
