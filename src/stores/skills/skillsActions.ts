
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SkillCategory } from '@/types/skills';
import { StateCreator } from 'zustand';
import { SkillsStore } from '@/types/skills';

export const createSkillsActions: StateCreator<SkillsStore, [], [], SkillsStore> = (set) => ({
  skillCategories: [],
  
  setSkillCategories: (skillCategories) => set({ skillCategories }),
  
  fetchSkillCategories: async () => {
    try {
      // Fetch all categories first
      const { data: categories, error: categoriesError } = await supabase
        .from('category_skill')
        .select('*')
        .order('created_at', { ascending: true });

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        toast({
          title: "Error",
          description: "Failed to fetch skill categories",
          variant: "destructive",
        });
        return;
      }

      // Fetch all skills
      const { data: skills, error: skillsError } = await supabase
        .from('skill')
        .select('*')
        .order('created_at', { ascending: true });

      if (skillsError) {
        console.error('Error fetching skills:', skillsError);
        toast({
          title: "Error",
          description: "Failed to fetch skills",
          variant: "destructive",
        });
        return;
      }

      // Group skills by category
      const skillCategories = categories.map(category => ({
        id: category.id.toString(),
        category: category.category_name,
        skills: skills
          .filter(skill => skill.category === category.category_name)
          .map(skill => skill.skill_name)
          .filter(Boolean)
      }));

      set({ skillCategories });
    } catch (error) {
      console.error('Error in fetchSkillCategories:', error);
      toast({
        title: "Error",
        description: "Failed to fetch skills data",
        variant: "destructive",
      });
    }
  }
});
