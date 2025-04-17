
import { create } from 'zustand';
import { createSkillsActions } from './skillsActions';
import { SkillsStore } from '@/types/skills';

export const useSkillsStore = create<SkillsStore>((...args) => ({
  ...createSkillsActions(...args),
}));
