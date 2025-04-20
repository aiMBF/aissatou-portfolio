
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
  },

  // Add a new skill category
  addSkillCategory: async (categoryName) => {
    try {
      const { data, error } = await supabase
        .from('category_skill')
        .insert([{ category_name: categoryName }])
        .select()
        .single();

      if (error) {
        console.error('Error adding category:', error);
        toast({
          title: "Error",
          description: "Failed to add skill category",
          variant: "destructive",
        });
        return;
      }

      // Update state with the new category
      const { skillCategories } = get();
      const newCategory: SkillCategory = {
        id: data.id.toString(),
        category: data.category_name,
        skills: []
      };

      set({ skillCategories: [...skillCategories, newCategory] });

      toast({
        title: "Success",
        description: "Skill category added successfully",
      });
    } catch (error) {
      console.error('Error in addSkillCategory:', error);
      toast({
        title: "Error",
        description: "Failed to add skill category",
        variant: "destructive",
      });
    }
  },

  // Update a skill category
  updateSkillCategory: async (id, categoryName) => {
    try {
      // Convert string id to number for Supabase query
      const numericId = parseInt(id, 10);
      
      const { error } = await supabase
        .from('category_skill')
        .update({ category_name: categoryName })
        .eq('id', numericId);

      if (error) {
        console.error('Error updating category:', error);
        toast({
          title: "Error",
          description: "Failed to update skill category",
          variant: "destructive",
        });
        return;
      }

      // Update category in all associated skills
      const { data: oldCategory } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', numericId)
        .single();

      if (oldCategory) {
        await supabase
          .from('skill')
          .update({ category: categoryName })
          .eq('category', oldCategory.category_name);
      }

      // Update state
      const { skillCategories } = get();
      const updatedCategories = skillCategories.map(category => {
        if (category.id === id) {
          return { ...category, category: categoryName };
        }
        return category;
      });

      set({ skillCategories: updatedCategories });

      toast({
        title: "Success",
        description: "Skill category updated successfully",
      });
    } catch (error) {
      console.error('Error in updateSkillCategory:', error);
      toast({
        title: "Error",
        description: "Failed to update skill category",
        variant: "destructive",
      });
    }
  },

  // Delete a skill category
  deleteSkillCategory: async (id) => {
    try {
      // Convert string id to number for Supabase query
      const numericId = parseInt(id, 10);
      
      // Get category name before deletion to also delete associated skills
      const { data: categoryData } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', numericId)
        .single();

      if (categoryData) {
        // Delete associated skills first
        await supabase
          .from('skill')
          .delete()
          .eq('category', categoryData.category_name);
      }

      // Delete category
      const { error } = await supabase
        .from('category_skill')
        .delete()
        .eq('id', numericId);

      if (error) {
        console.error('Error deleting category:', error);
        toast({
          title: "Error",
          description: "Failed to delete skill category",
          variant: "destructive",
        });
        return;
      }

      // Update state
      const { skillCategories } = get();
      const updatedCategories = skillCategories.filter(category => category.id !== id);
      set({ skillCategories: updatedCategories });

      toast({
        title: "Success",
        description: "Skill category deleted successfully",
      });
    } catch (error) {
      console.error('Error in deleteSkillCategory:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill category",
        variant: "destructive",
      });
    }
  },

  // Add a skill to a category
  addSkill: async (categoryId, skillName) => {
    try {
      // Convert string id to number for Supabase query
      const numericId = parseInt(categoryId, 10);
      
      // Get category name from ID
      const { data: categoryData } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', numericId)
        .single();

      if (!categoryData) {
        toast({
          title: "Error",
          description: "Category not found",
          variant: "destructive",
        });
        return;
      }

      // Add skill to the database
      const { error } = await supabase
        .from('skill')
        .insert([
          { skill_name: skillName, category: categoryData.category_name }
        ]);

      if (error) {
        console.error('Error adding skill:', error);
        toast({
          title: "Error",
          description: "Failed to add skill",
          variant: "destructive",
        });
        return;
      }

      // Update state
      const { skillCategories } = get();
      const updatedCategories = skillCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            skills: [...category.skills, skillName]
          };
        }
        return category;
      });

      set({ skillCategories: updatedCategories });

      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      console.error('Error in addSkill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  },

  // Update a skill
  updateSkill: async (categoryId, oldSkillName, newSkillName) => {
    try {
      // Convert string id to number for Supabase query
      const numericId = parseInt(categoryId, 10);
      
      // Get category name from ID
      const { data: categoryData } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', numericId)
        .single();

      if (!categoryData) {
        toast({
          title: "Error",
          description: "Category not found",
          variant: "destructive",
        });
        return;
      }

      // Update skill in the database
      const { error } = await supabase
        .from('skill')
        .update({ skill_name: newSkillName })
        .eq('category', categoryData.category_name)
        .eq('skill_name', oldSkillName);

      if (error) {
        console.error('Error updating skill:', error);
        toast({
          title: "Error",
          description: "Failed to update skill",
          variant: "destructive",
        });
        return;
      }

      // Update state
      const { skillCategories } = get();
      const updatedCategories = skillCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            skills: category.skills.map(skill => 
              skill === oldSkillName ? newSkillName : skill
            )
          };
        }
        return category;
      });

      set({ skillCategories: updatedCategories });

      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
    } catch (error) {
      console.error('Error in updateSkill:', error);
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive",
      });
    }
  },

  // Delete a skill
  deleteSkill: async (categoryId, skillName) => {
    try {
      // Convert string id to number for Supabase query
      const numericId = parseInt(categoryId, 10);
      
      // Get category name from ID
      const { data: categoryData } = await supabase
        .from('category_skill')
        .select('category_name')
        .eq('id', numericId)
        .single();

      if (!categoryData) {
        toast({
          title: "Error",
          description: "Category not found",
          variant: "destructive",
        });
        return;
      }

      // Delete skill from the database
      const { error } = await supabase
        .from('skill')
        .delete()
        .eq('category', categoryData.category_name)
        .eq('skill_name', skillName);

      if (error) {
        console.error('Error deleting skill:', error);
        toast({
          title: "Error",
          description: "Failed to delete skill",
          variant: "destructive",
        });
        return;
      }

      // Update state
      const { skillCategories } = get();
      const updatedCategories = skillCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            skills: category.skills.filter(skill => skill !== skillName)
          };
        }
        return category;
      });

      set({ skillCategories: updatedCategories });

      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
    } catch (error) {
      console.error('Error in deleteSkill:', error);
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    }
  }
});
