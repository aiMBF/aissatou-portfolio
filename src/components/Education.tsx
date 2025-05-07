
import { m } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

type EducationItem = {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  type: "education" | "certification";
};

export const Education = () => {
  // Données d'éducation et certifications
  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: "Master en Ingénierie des Données",
      institution: "Université de Paris-Saclay",
      period: "2017 - 2019",
      description: "Spécialisation en data engineering, big data et cloud computing.",
      type: "education",
    },
    {
      id: 2,
      degree: "Licence en Informatique",
      institution: "Université de Paris",
      period: "2014 - 2017",
      description: "Fondamentaux en programmation, algorithmes et structures de données.",
      type: "education",
    },
  ];

  const certificationData: EducationItem[] = [
    {
      id: 3,
      degree: "AWS Certified Data Analytics",
      institution: "Amazon Web Services",
      period: "2023",
      description: "Certification spécialisée dans la conception et l'implémentation de solutions d'analyse de données sur AWS.",
      type: "certification",
    },
    {
      id: 4,
      degree: "Google Professional Data Engineer",
      institution: "Google Cloud",
      period: "2022",
      description: "Expertise en conception, création et gestion de solutions de traitement de données sur GCP.",
      type: "certification",
    },
    {
      id: 5,
      degree: "Microsoft Certified: Azure Data Engineer Associate",
      institution: "Microsoft",
      period: "2021",
      description: "Compétences en intégration, transformation et consolidation de données provenant de systèmes disparates.",
      type: "certification",
    },
  ];

  return (
    <section id="education" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Parcours</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Éducation & Certifications</h2>
        </m.div>

        <div className="space-y-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Formation Académique</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {educationData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary">{item.degree}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 font-medium">{item.institution}</div>
                    <div className="text-sm text-muted-foreground mb-4">{item.period}</div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-accent/10 p-3 rounded-full">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold">Certifications Professionnelles</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {certificationData.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-accent">{item.degree}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 font-medium">{item.institution}</div>
                    <div className="text-sm text-muted-foreground mb-4">{item.period}</div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};
