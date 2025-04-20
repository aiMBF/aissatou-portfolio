
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Skill = {
  id: number;
  skill_name: string;
  category: string;
};

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skill')
        .select('*')
        .order('category', { ascending: true });

      if (error) {
        console.error('Error fetching skills:', error);
        return;
      }

      setSkills(data || []);
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="bg-secondary section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Expertise</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Technical Skills</h2>
        </div>

        <div className="space-y-6">
          {Object.entries(
            skills.reduce((acc, skill) => {
              if (!acc[skill.category]) {
                acc[skill.category] = [];
              }
              if (skill.skill_name) {
                acc[skill.category].push(skill.skill_name);
              }
              return acc;
            }, {} as Record<string, string[]>)
          ).map(([category, skillNames]) => (
            <div key={category} className="bg-background/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skillNames.map((skillName) => (
                  <li 
                    key={skillName}
                    className="bg-secondary rounded p-3 text-center hover:bg-primary/10 transition-colors"
                  >
                    {skillName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
