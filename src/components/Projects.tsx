import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "A minimalist portfolio for a professional photographer.",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      link: "#"
    },
    {
      title: "Mobile App",
      description: "A cross-platform mobile application for task management.",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};