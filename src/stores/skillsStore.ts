
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

// Get initial data from localStorage or use default
const getInitialSkillCategories = () => {
  const saved = localStorage.getItem('skillCategories');
  return saved ? JSON.parse(saved) : initialSkillCategories;
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
  skillCategories: getInitialSkillCategories(),
  
  setSkillCategories: (skillCategories) => {
    localStorage.setItem('skillCategories', JSON.stringify(skillCategories));
    set({ skillCategories });
  },
  
  addSkillCategory: (category) => set((state) => {
    const newCategories = [
      ...state.skillCategories,
      {
        id: Date.now().toString(),
        category,
        skills: []
      }
    ];
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  }),
  
  updateSkillCategory: (id, category) => set((state) => {
    const newCategories = state.skillCategories.map((cat) => 
      cat.id === id ? { ...cat, category } : cat
    );
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  }),
  
  deleteSkillCategory: (id) => set((state) => {
    const newCategories = state.skillCategories.filter((cat) => cat.id !== id);
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  }),
  
  addSkill: (categoryId, skill) => set((state) => {
    const newCategories = state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { ...cat, skills: [...cat.skills, skill] } : 
        cat
    );
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  }),
  
  updateSkill: (categoryId, oldSkill, newSkill) => set((state) => {
    const newCategories = state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { 
          ...cat, 
          skills: cat.skills.map((s) => s === oldSkill ? newSkill : s) 
        } : 
        cat
    );
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  }),
  
  deleteSkill: (categoryId, skill) => set((state) => {
    const newCategories = state.skillCategories.map((cat) => 
      cat.id === categoryId ? 
        { ...cat, skills: cat.skills.filter((s) => s !== skill) } : 
        cat
    );
    localStorage.setItem('skillCategories', JSON.stringify(newCategories));
    return { skillCategories: newCategories };
  })
}));
