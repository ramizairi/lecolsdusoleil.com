import Link from "next/link";
import { Phone } from "lucide-react";
import ContactCallToActionSection from "@/components/ContactCallToActionSection";

const FormulesChoiceSection = () => {
  return (
    <ContactCallToActionSection
      title="Besoin d'aide pour choisir ?"
      description={
        <>
          <p>Inclus dans tous nos séjours :</p>
          <p>
            Tous nos résidents profitent du même standard d'excellence en
            matière de soins et de confort. Retrouvez le détail de nos{" "}
            <Link href="/services">services</Link> et laissez-nous vous guider
            vers la formule la plus adaptée.
          </p>
        </>
      }
      buttonLabel="Appelez-nous"
      buttonHref="tel:+3228860614"
      buttonLeadingIcon={<Phone className="h-5 w-5" />}
      sectionClassName="pb-12 pt-4 md:pb-20"
    />
  );
};

export default FormulesChoiceSection;
