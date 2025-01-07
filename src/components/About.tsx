import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="bg-secondary section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">About</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">The Story So Far</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-lg leading-relaxed mb-6">
            I'm a passionate developer focused on creating beautiful, functional, and user-centered digital experiences. With a background in both design and development, I bring a unique perspective to every project.
          </p>
          <p className="text-lg leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through writing and mentoring.
          </p>
        </motion.div>
      </div>
    </section>
  );
};