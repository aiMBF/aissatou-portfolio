
import { create } from 'zustand';

// Define the skill category type
type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
};

type SkillsStore = {
  skillCategories: SkillCategory[];
  setSkillCategories: (skillCategories: SkillCategory[]) => void;
  addSkillCategory: (category: string) => void;
  updateSkillCategory: (id: string, category: string) => void;
  deleteSkillCategory: (id: string) => void;
  addSkill: (categoryId: string, skill: string) => void;
  updateSkill: (categoryId: string, oldSkill: string, newSkill: string) => void;
  deleteSkill: (categoryId: string, skill: string) => void;
};

// Initial skill categories that match what's in AdminSkills.tsx
const initialSkillCategories: SkillCategory[] = [
  {
    id: "1",
    category: "Cloud Platforms",
    skills: ["AWS", "Google Cloud", "Azure", "Snowflake"]
  },
  {
    id: "2",
    category: "Data Processing",
    skills: ["Apache Spark", "Hadoop", "Kafka", "Airflow"]
  },
  {
    id: "3",
    category: "Programming",
    skills: ["Python", "SQL", "Scala", "Java"]
  },
  {
    id: "4",
    category: "Analytics & BI",
    skills: ["Tableau", "Power BI", "dbt", "Looker"]
  }
];

export const useSkillsStore = create<SkillsStore>((set) => ({
  skillCategories: initialSkillCategories,
  
  setSkillCategories: (skillCategories) => set({ skillCategories }),
  
  addSkillCategory: (category) => set((state) => ({
    skillCategories: [
      ...state.skillCategories,
      {
        id: Date.now().toString(),
        category,
        skills: []
      }
    ]
  })),
  
  updateSkillCategory: (id, category) => set((state) => ({
    skillCategories: state.skillCategories.map((cat) => 
      cat.id === id ? { ...cat, category } : cat
    )
  })),
  
  deleteSkillCategory: (id) => set((state) => ({
    skillCategories: state.skillCategories.filter((cat) => cat.id !== id)
  })),
  
  addSkill: (categoryId, skill) => set((state) => ({
    skillCategories: state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { ...cat, skills: [...cat.skills, skill] } : 
        cat
    )
  })),
  
  updateSkill: (categoryId, oldSkill, newSkill) => set((state) => ({
    skillCategories: state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { 
          ...cat, 
          skills: cat.skills.map((s) => s === oldSkill ? newSkill : s) 
        } : 
        cat
    )
  })),
  
  deleteSkill: (categoryId, skill) => set((state) => ({
    skillCategories: state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { ...cat, skills: cat.skills.filter((s) => s !== skill) } : 
        cat
    )
  }))
}));
