
export type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
};

export type SkillsState = {
  skillCategories: SkillCategory[];
};

export type SkillsActions = {
  setSkillCategories: (skillCategories: SkillCategory[]) => void;
  fetchSkillCategories: () => Promise<void>;
  addSkillCategory: (categoryName: string) => Promise<void>;
  updateSkillCategory: (id: string, categoryName: string) => Promise<void>;
  deleteSkillCategory: (id: string) => Promise<void>;
  addSkill: (categoryId: string, skillName: string) => Promise<void>;
  updateSkill: (categoryId: string, oldSkillName: string, newSkillName: string) => Promise<void>;
  deleteSkill: (categoryId: string, skillName: string) => Promise<void>;
};

export type SkillsStore = SkillsState & SkillsActions;
