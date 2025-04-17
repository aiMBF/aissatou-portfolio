
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
};

type SkillsStore = {
  skillCategories: SkillCategory[];
  setSkillCategories: (skillCategories: SkillCategory[]) => void;
  fetchSkillCategories: () => Promise<void>;
};

export const useSkillsStore = create<SkillsStore>((set) => ({
  skillCategories: [],
  
  setSkillCategories: (skillCategories) => set({ skillCategories }),
  
  fetchSkillCategories: async () => {
    const { data, error } = await supabase
      .from('category_skill')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching skill categories:', error);
      return;
    }

    // Transform the data to match our SkillCategory type
    const skillCategories = data.map(category => ({
      id: category.id.toString(),
      category: category.category_name || '',
      skills: category.skills || [],
    }));

    set({ skillCategories });
  },
}));
