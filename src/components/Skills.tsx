import { motion } from "framer-motion";

export const Skills = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "UI/UX Design",
    "Responsive Design", "Performance Optimization", "Git", "AWS"
  ];

  return (
    <section className="bg-secondary section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Skills & Technologies</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-4 text-center hover-lift"
            >
              <span className="font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};