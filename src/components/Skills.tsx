
import { m } from "framer-motion";
import { useSkillsStore } from "@/stores/skills/skillsStore";
import { useEffect } from "react";

export const Skills = () => {
  const { skillCategories, fetchSkillCategories } = useSkillsStore();
  
  useEffect(() => {
    console.log('Skills component mounted, fetching categories...');
    fetchSkillCategories();
  }, [fetchSkillCategories]);

  console.log('Current skill categories:', skillCategories); // Added for debugging

  return (
    <section id="skills" className="bg-secondary section-padding">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Technical Skills</h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories && skillCategories.length > 0 ? (
            skillCategories.map((category, catIndex) => (
              <m.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/50 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{category.category}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills && category.skills.length > 0 ? (
                    category.skills.map((skill, index) => (
                      <m.div
                        key={`${category.id}-${index}-${skill}`}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (catIndex * 0.1) + (index * 0.05) }}
                        viewport={{ once: true }}
                        className="bg-secondary rounded p-3 text-center hover:bg-primary/10 transition-colors"
                      >
                        <span className="font-medium">{skill}</span>
                      </m.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-muted-foreground">
                      No skills added yet
                    </div>
                  )}
                </div>
              </m.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center p-6">
              <p className="text-muted-foreground">No skill categories available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
