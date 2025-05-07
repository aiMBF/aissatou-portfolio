
import { m } from "framer-motion";
import { ContactInfo } from "./ContactInfo";
import { useLanguageStore } from "@/stores/languageStore";

export const Contact = () => {
  const { language } = useLanguageStore();

  const contactText = {
    title: {
      en: "Get In Touch",
      fr: "Me Contacter"
    },
    subtitle: {
      en: "Contact",
      fr: "Contact"
    }
  };

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
          <span className="text-sm uppercase tracking-wider text-muted-foreground">{contactText.subtitle[language]}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{contactText.title[language]}</h2>
        </m.div>

        <ContactInfo />
      </div>
    </section>
  );
};
