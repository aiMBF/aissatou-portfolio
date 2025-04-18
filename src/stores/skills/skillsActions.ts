
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SkillCategory } from '@/types/skills';
import { StateCreator } from 'zustand';
import { SkillsStore } from '@/types/skills';

export const createSkillsActions: StateCreator<SkillsStore, [], [], SkillsStore> = (set, get) => ({
  skillCategories: [],
  
  setSkillCategories: (skillCategories) => set({ skillCategories }),
  
  fetchSkillCategories: async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('category_skill')
        .select('*')
        .order('created_at', { ascending: true });

      if (categoriesError) {
        console.error('Error fetching skill categories:', categoriesError);
        return;
      }

      const { data: skillsData, error: skillsError } = await supabase
        .from('skill')
        .select('*');

      if (skillsError) {
        console.error('Error fetching skills:', skillsError);
        return;
      }

      const skillCategories = categoriesData.map(category => {
        const categorySkills = skillsData
          .filter(skill => skill.category === category.category_name) // Fix: compare string with string
          .map(skill => skill.skill_name)
          .filter(Boolean);

        return {
          id: category.id.toString(),
          category: category.category_name || '',
          skills: categorySkills,
        };
      });

      set({ skillCategories });
    } catch (error) {
      console.error('Error in fetchSkillCategories:', error);
    }
  },
  
  addSkillCategory: async (categoryName) => {
    const { data, error } = await supabase
      .from('category_skill')
      .insert({ category_name: categoryName })
      .select()
      .single();

    if (error) {
      console.error('Error adding skill category:', error);
      toast({
        title: "Error",
        description: `Failed to add category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    const newCategory = {
      id: data.id.toString(),
      category: data.category_name || '',
      skills: [], // Create empty skills array for new category
    };

    set(state => ({
      skillCategories: [...state.skillCategories, newCategory]
    }));
  },
  
  updateSkillCategory: async (id, categoryName) => {
    const numericId = parseInt(id, 10);
    
    const { error } = await supabase
      .from('category_skill')
      .update({ category_name: categoryName })
      .eq('id', numericId);

    if (error) {
      console.error('Error updating skill category:', error);
      toast({
        title: "Error",
        description: `Failed to update category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === id ? { ...cat, category: categoryName } : cat
      )
    }));
  },
  
  deleteSkillCategory: async (id) => {
    const numericId = parseInt(id, 10);
    
    const { error } = await supabase
      .from('category_skill')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Error deleting skill category:', error);
      toast({
        title: "Error",
        description: `Failed to delete category: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    set(state => ({
      skillCategories: state.skillCategories.filter(cat => cat.id !== id)
    }));
  },
  
  addSkill: async (categoryId, skillName) => {
    const category = get().skillCategories.find(cat => cat.id === categoryId);
    
    if (!category) {
      toast({
        title: "Error",
        description: "Category not found",
        variant: "destructive",
      });
      return;
    }
    
    // Get category_name to use as reference
    const { data: categoryData, error: categoryError } = await supabase
      .from('category_skill')
      .select('category_name')
      .eq('id', parseInt(categoryId, 10))
      .single();
      
    if (categoryError) {
      console.error('Error finding category:', categoryError);
      toast({
        title: "Error",
        description: `Failed to find category: ${categoryError.message}`,
        variant: "destructive",
      });
      return;
    }
    
    // Insert the new skill using the category_name
    const { error } = await supabase
      .from('skill')
      .insert({ 
        category: categoryData.category_name,
        skill_name: skillName
      });

    if (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: `Failed to add skill: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update local state
    set(state => ({
      skillCategories: state.skillCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, skills: [...cat.skills, skillName] } 
          : cat
      )
    }));
  },
  
  updateSkill: async (categoryId, oldSkillName, newSkillName) => {
    try {
      // Get category_name to use as reference
      const { data: categoryData, error: categoryError } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', parseInt(categoryId, 10))
        .single();
        
      if (categoryError) {
        console.error('Error finding category:', categoryError);
        toast({
          title: "Error",
          description: `Failed to find category: ${categoryError.message}`,
          variant: "destructive",
        });
        return;
      }
      
      const { data: skillData, error: findError } = await supabase
        .from('skill')
        .select('id')
        .eq('category', categoryData.category_name)
        .eq('skill_name', oldSkillName)
        .single();
      
      if (findError) {
        console.error('Error finding skill:', findError);
        toast({
          title: "Error",
          description: `Failed to find skill: ${findError.message}`,
          variant: "destructive",
        });
        return;
      }

      const { error: updateError } = await supabase
        .from('skill')
        .update({ skill_name: newSkillName })
        .eq('id', skillData.id);

      if (updateError) {
        console.error('Error updating skill:', updateError);
        toast({
          title: "Error",
          description: `Failed to update skill: ${updateError.message}`,
          variant: "destructive",
        });
        return;
      }

      await get().fetchSkillCategories();
      
      toast({
        title: "Success",
        description: `Skill updated from "${oldSkillName}" to "${newSkillName}"`,
      });
    } catch (error) {
      console.error('Error in updateSkill:', error);
    }
  },
  
  deleteSkill: async (categoryId, skillName) => {
    try {
      // Get category_name to use as reference
      const { data: categoryData, error: categoryError } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', parseInt(categoryId, 10))
        .single();
        
      if (categoryError) {
        console.error('Error finding category:', categoryError);
        toast({
          title: "Error",
          description: `Failed to find category: ${categoryError.message}`,
          variant: "destructive",
        });
        return;
      }
      
      const { data: skillData, error: findError } = await supabase
        .from('skill')
        .select('id')
        .eq('category', categoryData.category_name)
        .eq('skill_name', skillName)
        .single();
      
      if (findError) {
        console.error('Error finding skill:', findError);
        toast({
          title: "Error",
          description: `Failed to find skill: ${findError.message}`,
          variant: "destructive",
        });
        return;
      }

      const { error: deleteError } = await supabase
        .from('skill')
        .delete()
        .eq('id', skillData.id);

      if (deleteError) {
        console.error('Error deleting skill:', deleteError);
        toast({
          title: "Error",
          description: `Failed to delete skill: ${deleteError.message}`,
          variant: "destructive",
        });
        return;
      }

      await get().fetchSkillCategories();
      
      toast({
        title: "Success",
        description: `Skill "${skillName}" deleted successfully`,
      });
    } catch (error) {
      console.error('Error in deleteSkill:', error);
    }
  },
});
