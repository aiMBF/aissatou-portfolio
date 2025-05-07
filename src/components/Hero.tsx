
import { m } from "framer-motion";
import { Database, Server, Cloud, Code } from "lucide-react";
import { useLanguageStore } from "@/stores/languageStore";

export const Hero = () => {
  const { language } = useLanguageStore();

  const heroText = {
    subtitle: {
      en: "Cloud Data Engineering | AI",
      fr: "Ingénierie de Données Cloud | IA"
    },
    description: {
      en: "Building scalable data solutions and sharing insights on AI",
      fr: "Construction de solutions de données évolutives et partage de connaissances sur l'IA"
    },
    buttons: {
      projects: {
        en: "View Projects",
        fr: "Voir les Projets"
      },
      blog: {
        en: "Read My Blog",
        fr: "Lire Mon Blog"
      }
    }
  };

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
          {heroText.subtitle[language]}
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
          {heroText.description[language]}
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
            {heroText.buttons.projects[language]}
          </a>
          <a 
            href="#blog" 
            className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-full hover-lift"
          >
            {heroText.buttons.blog[language]}
          </a>
        </m.div>
      </div>
    </section>
  );
};
