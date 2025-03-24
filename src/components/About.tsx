
import { m } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="bg-secondary section-padding">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">About</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Cloud Data Expert</h2>
        </m.div>
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-lg leading-relaxed mb-6">
            I'm a specialized Cloud Data Engineer with extensive experience designing and implementing data-driven solutions on major cloud platforms. My expertise lies in building efficient ETL pipelines, data lakes, and analytics platforms that transform raw data into actionable insights.
          </p>
          <p className="text-lg leading-relaxed">
            With a strong background in both software engineering and data science, I bridge the gap between data infrastructure and business intelligence. I'm passionate about solving complex data challenges and enabling organizations to make data-informed decisions through scalable, resilient cloud architectures.
          </p>
        </m.div>
      </div>
    </section>
  );
};
