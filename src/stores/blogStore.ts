
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
  
  // Add CRUD operations
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
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
  
  addBlogPost: async (post) => {
    // Insert a new blog post - need to convert category to number
    const { data, error } = await supabase
      .from('article')
      .insert({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        read_time: post.readTime,
        // If category needs to be a number, we would need to handle this conversion
        // For now, assuming it's a text field in the database
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding blog post:', error);
      toast({
        title: "Error",
        description: `Failed to add blog post: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Add the new blog post to the state
    const newPost: BlogPost = {
      id: data.id.toString(),
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      date: new Date(data.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: data.read_time || '5 min read',
      category: post.category,
    };

    set(state => ({
      blogPosts: [newPost, ...state.blogPosts]
    }));
  },
  
  updateBlogPost: async (id, post) => {
    // Prepare the update data
    const updateData: any = {};
    if (post.title !== undefined) updateData.title = post.title;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.readTime !== undefined) updateData.read_time = post.readTime;
    if (post.category !== undefined) updateData.category = post.category;

    // Convert string id to number for the database operation
    const numericId = parseInt(id, 10);

    // Update the blog post
    const { error } = await supabase
      .from('article')
      .update(updateData)
      .eq('id', numericId);

    if (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: `Failed to update blog post: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Update the blog post in the state
    set(state => ({
      blogPosts: state.blogPosts.map(blogPost => 
        blogPost.id === id ? { ...blogPost, ...post } : blogPost
      )
    }));
  },
  
  deleteBlogPost: async (id) => {
    // Convert string id to number for the database operation
    const numericId = parseInt(id, 10);
    
    // Delete the blog post
    const { error } = await supabase
      .from('article')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    // Remove the blog post from the state
    set(state => ({
      blogPosts: state.blogPosts.filter(blogPost => blogPost.id !== id)
    }));
  },
}));
