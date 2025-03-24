
import { m } from "framer-motion";
import { ContactInfo } from "./ContactInfo";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Contact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Get In Touch</h2>
        </m.div>

        <ContactInfo />

        {/* <m.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-2">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="message" className="block text-sm font-medium mb-2">Message</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Your message"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-lg hover-lift"
          >
            Send Message
          </Button>
        </m.form> */}
      </div>
    </section>
  );
};
