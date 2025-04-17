
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
};

type BlogStore = {
  blogPosts: BlogPost[];
  setBlogPosts: (blogPosts: BlogPost[]) => void;
  fetchBlogPosts: () => Promise<void>;
};

export const useBlogStore = create<BlogStore>((set) => ({
  blogPosts: [],
  
  setBlogPosts: (blogPosts) => set({ blogPosts }),
  
  fetchBlogPosts: async () => {
    const { data, error } = await supabase
      .from('article')
      .select('*, category_article!article_category_fkey(category)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return;
    }

    // Transform the data to match our BlogPost type
    const blogPosts = data.map(post => ({
      id: post.id.toString(),
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      date: new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: post.read_time || '5 min read',
      category: post.category_article?.category || 'Uncategorized',
    }));

    set({ blogPosts });
  },
}));
