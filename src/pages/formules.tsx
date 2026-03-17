import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import FormulaCard from "@/components/formules/FormulaCard";
import FormulesChoiceSection from "@/components/formules/FormulesChoiceSection";
import { formulaPlans } from "@/components/formules/formulesPageData";
import PageIntroSection from "@/components/PageIntroSection";
import Seo from "@/components/Seo";
import ServiceSiteHeader from "@/components/ServiceSiteHeader";
import { Sparkles } from "lucide-react";

const FormulesPage = () => {
  return (
    <>
      <Seo
        title="Formules - Clos du Soleil"
        description="Découvrez les différentes formules de séjour Clos du Soleil, entre séjour courte durée, convalescence et installation longue durée."
        canonicalPath="/formules"
      />

      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AnimatedBackground variant="sunrise" />

        <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
          <div className="absolute left-1/2 top-32 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-amber-300/14 blur-3xl" />
          <div className="absolute -left-20 top-[30rem] h-80 w-80 rounded-full bg-orange-200/16 blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-yellow-200/18 blur-3xl" />
        </div>

        <ServiceSiteHeader activeKey="formules" logoMode="always" />

        <main className="relative z-10">
          <PageIntroSection
            label="Formules"
            title="Formules"
            icon={<Sparkles className="h-4 w-4" />}
            sectionClassName="px-3 pb-14 pt-36 sm:px-6 md:pb-20 md:pt-40"
          />

          <section className="px-3 pb-14 sm:px-6 md:pb-18">
            <div className="mx-auto flex max-w-[1280px] flex-col gap-8 md:gap-10">
              {formulaPlans.map((formula, index) => (
                <FormulaCard key={formula.id} formula={formula} index={index} />
              ))}
            </div>
          </section>

          <FormulesChoiceSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FormulesPage;
