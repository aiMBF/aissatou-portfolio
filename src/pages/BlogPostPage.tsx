
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Sample blog post details data
const blogPosts = {
  "1": {
    title: "Building Scalable Data Pipelines in the Cloud",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Cloud Infrastructure",
    author: "Your Name",
    coverImage: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    content: `
      <p class="mb-4">In today's data-driven world, organizations are collecting massive amounts of data from various sources like customer interactions, IoT devices, and business processes. Processing this data efficiently requires well-designed data pipelines that can scale with growing data volumes.</p>
      
      <h2 class="text-2xl font-semibold my-6">What Makes a Data Pipeline Scalable?</h2>
      
      <p class="mb-4">A scalable data pipeline can handle increasing amounts of data without significant redesign or performance degradation. Key characteristics include:</p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li>Elasticity - ability to scale resources up or down based on demand</li>
        <li>Fault tolerance - ability to recover from failures without data loss</li>
        <li>Parallelization - ability to process data in parallel across multiple nodes</li>
        <li>Monitoring and observability - comprehensive visibility into pipeline performance</li>
      </ul>
      
      <h2 class="text-2xl font-semibold my-6">Cloud-Native Pipeline Architecture</h2>
      
      <p class="mb-4">Cloud platforms offer managed services that simplify building scalable data pipelines. Let's explore a reference architecture using AWS services:</p>
      
      <h3 class="text-xl font-semibold my-4">1. Data Ingestion</h3>
      
      <p class="mb-4">For data ingestion, use services like AWS Kinesis Data Streams for real-time data or AWS Data Transfer Services for batch data. These services can handle massive throughput and provide buffering capabilities to handle traffic spikes.</p>
      
      <h3 class="text-xl font-semibold my-4">2. Data Processing</h3>
      
      <p class="mb-4">AWS Lambda for simple transformations or AWS EMR (Elastic MapReduce) for complex processing provides scalable compute resources. For stream processing, consider AWS Kinesis Data Analytics or managed Apache Flink.</p>
      
      <h3 class="text-xl font-semibold my-4">3. Data Storage</h3>
      
      <p class="mb-4">Store processed data in appropriate storage services like Amazon S3 for data lakes, Amazon Redshift for data warehousing, or Amazon DynamoDB for NoSQL data stores.</p>
      
      <h2 class="text-2xl font-semibold my-6">Best Practices for Pipeline Scalability</h2>
      
      <ol class="list-decimal pl-5 mb-6 space-y-2">
        <li>Decouple pipeline components using message queues or event buses</li>
        <li>Implement idempotent processing to handle duplicate data</li>
        <li>Use partition strategies to enable parallel processing</li>
        <li>Implement proper error handling and dead-letter queues</li>
        <li>Set up comprehensive monitoring with alerts for bottlenecks</li>
      </ol>
      
      <p class="mb-4">By following these principles, you can build data pipelines that seamlessly scale from gigabytes to petabytes of data, ensuring your organization can harness the full value of its data assets.</p>
    `
  },
  "2": {
    title: "Data Governance Best Practices for Enterprise",
    date: "June 22, 2023",
    readTime: "6 min read",
    category: "Best Practices",
    author: "Your Name",
    coverImage: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    content: `
      <p class="mb-4">As organizations increasingly rely on data to drive decision-making, implementing robust data governance practices has become crucial. Good data governance ensures data quality, security, and compliance while enabling efficient use of data assets.</p>
      
      <h2 class="text-2xl font-semibold my-6">Why Data Governance Matters</h2>
      
      <p class="mb-4">Effective data governance provides numerous benefits:</p>
      
      <ul class="list-disc pl-5 mb-6 space-y-2">
        <li>Improved data quality and reliability for better decision-making</li>
        <li>Enhanced data security and privacy compliance</li>
        <li>Reduced data management costs through standardization</li>
        <li>Increased trust in data across the organization</li>
        <li>Better alignment between business and technical teams</li>
      </ul>
      
      <h2 class="text-2xl font-semibold my-6">Essential Components of Data Governance</h2>
      
      <h3 class="text-xl font-semibold my-4">1. Data Ownership and Stewardship</h3>
      
      <p class="mb-4">Clearly define data owners and stewards responsible for maintaining data quality and compliance for specific data domains. This accountability ensures data is properly managed throughout its lifecycle.</p>
      
      <h3 class="text-xl font-semibold my-4">2. Data Quality Management</h3>
      
      <p class="mb-4">Implement data quality standards, measuring tools, and processes to ensure data remains accurate, complete, and consistent. Regular data quality assessments help identify and resolve issues.</p>
      
      <h3 class="text-xl font-semibold my-4">3. Metadata Management</h3>
      
      <p class="mb-4">Maintain comprehensive metadata that documents data sources, transformations, business definitions, and usage policies. A central metadata repository enhances data discoverability and understanding.</p>
      
      <h2 class="text-2xl font-semibold my-6">Implementing Data Governance in Enterprises</h2>
      
      <ol class="list-decimal pl-5 mb-6 space-y-2">
        <li>Start with clear goals aligned to business objectives</li>
        <li>Secure executive sponsorship and cross-functional support</li>
        <li>Implement governance in phases, starting with critical data assets</li>
        <li>Create a data governance council with representatives from key departments</li>
        <li>Develop data governance policies, standards, and procedures</li>
        <li>Invest in data catalog and governance tools to automate processes</li>
      </ol>
      
      <p class="mb-4">By establishing strong data governance practices, enterprises can transform data from a liability into a strategic asset that drives innovation and competitive advantage.</p>
    `
  }
};

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? blogPosts[postId as keyof typeof blogPosts] : null;

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
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="max-w-4xl mx-auto mb-10">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Article content */}
        <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-primary prose-a:text-primary">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <Separator className="my-12 max-w-3xl mx-auto" />

        {/* Share section */}
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Share this article</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button asChild>
            <Link to="/blog">Read More Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
