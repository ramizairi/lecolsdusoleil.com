import { ArrowRight, Phone } from "lucide-react";
import ContactCallToActionSection from "@/components/ContactCallToActionSection";

const ServiceContactSection = () => {
  return (
    <ContactCallToActionSection
      title="Contactez-nous"
      description={
        <>
          Notre équipe vous accompagne pour choisir la formule adaptée et
          organiser votre séjour dans les meilleures conditions.
        </>
      }
      buttonLabel="Contactez-nous"
      buttonHref="/contact"
      buttonLeadingIcon={<Phone className="h-5 w-5" />}
      buttonTrailingIcon={
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      }
      sectionClassName="pb-20 pt-10 md:pb-24"
    />
  );
};

export default ServiceContactSection;
