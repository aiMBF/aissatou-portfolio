
import { create } from 'zustand';

// Define a specific blog post type
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
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (id: string, post: Partial<Omit<BlogPost, 'id' | 'date'>>) => void;
  deleteBlogPost: (id: string) => void;
};

// Initial blog posts that match what's in AdminBlog.tsx
const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Data Pipelines in the Cloud",
    excerpt: "Learn how to design and implement data pipelines that can handle massive volumes of data without breaking a sweat.",
    content: "This is the full content of the blog post, which would be much longer in a real application. It would include paragraphs, headings, code samples, and possibly images.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Cloud Infrastructure"
  },
  {
    id: "2",
    title: "Data Governance Best Practices for Enterprise",
    excerpt: "Explore the essential strategies to maintain data quality and compliance in large organizations.",
    content: "This is the full content of the blog post about data governance. It would include detailed explanations of governance frameworks, compliance requirements, and implementation strategies.",
    date: "June 22, 2023",
    readTime: "6 min read",
    category: "Best Practices"
  },
  {
    id: "3",
    title: "The Future of Data Engineering with AI",
    excerpt: "How artificial intelligence is transforming the field of data engineering and what it means for your career.",
    content: "Detailed discussion of AI's impact on data engineering practices, tools, and job roles. Would include case studies and future predictions.",
    date: "July 10, 2023",
    readTime: "10 min read",
    category: "Artificial Intelligence"
  },
  {
    id: "4",
    title: "Optimizing Snowflake for Cost Efficiency",
    excerpt: "Practical tips to reduce your Snowflake costs while maintaining performance.",
    content: "In-depth analysis of Snowflake pricing models and specific strategies to optimize queries, storage, and compute resources.",
    date: "August 5, 2023",
    readTime: "7 min read",
    category: "Cloud Infrastructure"
  }
];

export const useBlogStore = create<BlogStore>((set) => ({
  blogPosts: initialBlogPosts,
  
  setBlogPosts: (blogPosts) => set({ blogPosts }),
  
  addBlogPost: (post) => set((state) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return {
      blogPosts: [
        ...state.blogPosts,
        {
          id: Date.now().toString(),
          date: currentDate,
          ...post
        }
      ]
    };
  }),
  
  updateBlogPost: (id, post) => set((state) => ({
    blogPosts: state.blogPosts.map((p) => 
      p.id === id ? { ...p, ...post } : p
    )
  })),
  
  deleteBlogPost: (id) => set((state) => ({
    blogPosts: state.blogPosts.filter((p) => p.id !== id)
  }))
}));
