import { ArrowRight, Phone } from "lucide-react";
import ContactCallToActionSection from "@/components/ContactCallToActionSection";

const HomeCallToActionSection = () => {
  return (
    <ContactCallToActionSection
      title="Prêt à découvrir le Clos du Soleil ?"
      description={
        <>
          Notre équipe est à votre écoute pour organiser votre séjour et
          répondre à toutes vos questions.
        </>
      }
      buttonLabel="Contactez-nous"
      buttonHref="/contact"
      buttonLeadingIcon={<Phone className="h-5 w-5" />}
      buttonTrailingIcon={
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      }
      sectionClassName="py-32"
    />
  );
};

export default HomeCallToActionSection;
