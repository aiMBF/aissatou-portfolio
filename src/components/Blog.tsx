
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogStore } from "@/stores/blogStore";

export const Blog = () => {
  // Use the blog store to get the same data as AdminBlog
  const { blogPosts } = useBlogStore();

  // Display only 2 posts in the homepage section
  const homepagePosts = blogPosts.slice(0, 2);

  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">My Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing insights and experiences on IA and cloud data engineering.
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {homepagePosts.map((post) => (
            <m.div
              key={post.id}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>{post.readTime}</span>
                  <span className="text-xs">•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline inline-flex items-center gap-1">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </m.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
