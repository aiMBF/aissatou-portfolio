
import { motion } from "framer-motion";
import { Database, Server, Cloud } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-6 mb-8"
        >
          <Database className="w-10 h-10 text-accent" />
          <Server className="w-10 h-10 text-primary" />
          <Cloud className="w-10 h-10 text-accent" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Cloud Data Engineering
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl mb-8"
        >
          Building scalable data pipelines and analytics solutions
        </motion.p>
        <motion.div
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
            href="#skills" 
            className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-full hover-lift"
          >
            My Skills
          </a>
        </motion.div>
      </div>
    </section>
  );
};
