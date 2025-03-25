
import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample blog post data
const allBlogPosts = [
  {
    id: "1",
    title: "Building Scalable Data Pipelines in the Cloud",
    excerpt: "Learn how to design and implement data pipelines that can handle massive volumes of data without breaking a sweat.",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Cloud Infrastructure"
  },
  {
    id: "2",
    title: "Data Governance Best Practices for Enterprise",
    excerpt: "Explore the essential strategies to maintain data quality and compliance in large organizations.",
    date: "June 22, 2023",
    readTime: "6 min read",
    category: "Best Practices"
  },
  {
    id: "3",
    title: "Machine Learning for Anomaly Detection in Production",
    excerpt: "How to implement ML models that can detect unusual patterns in your data streams and trigger automated responses.",
    date: "August 5, 2023",
    readTime: "7 min read",
    category: "Machine Learning"
  },
  {
    id: "4",
    title: "CI/CD Pipelines for Data Engineering Projects",
    excerpt: "A practical guide to implementing DevOps practices in data engineering workflows for faster and more reliable deployments.",
    date: "September 18, 2023",
    readTime: "9 min read",
    category: "DevOps"
  },
  {
    id: "5",
    title: "Implementing AI-Powered Data Quality Checks",
    excerpt: "Using machine learning to automatically detect and flag data quality issues in your data pipelines.",
    date: "October 12, 2023",
    readTime: "9 min read",
    category: "Machine Learning"
  },
  {
    id: "6",
    title: "Container Orchestration for Data Processing Workloads",
    excerpt: "Best practices for running data processing jobs in Kubernetes and other container orchestration platforms.",
    date: "November 18, 2023",
    readTime: "12 min read",
    category: "DevOps"
  }
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter posts based on search query
  const filteredPosts = allBlogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sharing my thoughts, experiences, and insights about Machine Learning, DevOps, and cloud data engineering.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium bg-secondary px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <BookOpen className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <Button asChild variant="ghost" size="sm" className="gap-1 hover:text-primary">
                    <Link to={`/blog/${post.id}`}>
                      Read more
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BlogPage;
