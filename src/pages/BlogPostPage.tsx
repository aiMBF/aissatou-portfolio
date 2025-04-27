
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBlogStore } from "@/stores/blogStore";
import { BlogPost } from "@/stores/blogStore";

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { blogPosts, fetchBlogPosts } = useBlogStore();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchBlogPosts();
      setLoading(false);
    };
    
    loadData();
  }, [fetchBlogPosts]);

  useEffect(() => {
    if (blogPosts.length > 0 && postId) {
      const foundPost = blogPosts.find(p => p.id === postId);
      setPost(foundPost || null);
    }
  }, [blogPosts, postId]);

  // Fonction pour vérifier si le contenu est du HTML
  const isHTML = (str: string) => {
    return /<\/?[a-z][\s\S]*>/i.test(str);
  };

  // Préparation du contenu de l'article
  const prepareContent = (content: string) => {
    // Si le contenu est déjà du HTML, on le retourne tel quel
    if (isHTML(content)) {
      return content;
    }
    
    // Sinon, on convertit le texte brut en HTML basique avec formatage des paragraphes
    return content
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Préparer le contenu de l'article
  const formattedContent = prepareContent(post.content);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Back to blog link */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-secondary/50 px-4 py-2 rounded-lg inline-block mb-4">
            <span className="text-sm font-medium">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="max-w-4xl mx-auto mb-10">
          <img 
            src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt={post.title} 
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Article content with improved typography */}
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate lg:prose-xl
          prose-headings:text-primary prose-headings:font-bold prose-headings:mb-4
          prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
          prose-li:mb-2
          prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:italic
          prose-img:rounded-lg prose-img:shadow-md
          prose-code:text-primary/90 prose-code:bg-secondary/50 prose-code:px-1 prose-code:rounded
          prose-pre:bg-secondary/30 prose-pre:p-4 prose-pre:rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Separator */}
          <Separator className="my-12" />

          {/* Share section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Partager cet article</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button asChild>
              <Link to="/blog">Lire plus d'articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
