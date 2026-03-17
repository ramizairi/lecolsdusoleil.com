import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import HomeBackgroundDecor from "@/components/home/HomeBackgroundDecor";
import HomeCallToActionSection from "@/components/home/HomeCallToActionSection";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeIntroductionSection from "@/components/home/HomeIntroductionSection";
import HomeReasonsSection from "@/components/home/HomeReasonsSection";
import HomeServicesSection from "@/components/home/HomeServicesSection";
import {
  highlights,
  introParagraphs,
  reasons,
} from "@/components/home/homePageData";
import Seo from "@/components/Seo";
import ServiceSiteHeader from "@/components/ServiceSiteHeader";

type HomePageShellProps = {
  canonicalPath: string;
  logoMode?: "scroll" | "always";
};

const HomePageShell = ({
  canonicalPath,
  logoMode = "scroll",
}: HomePageShellProps) => {
  return (
    <>
      <Seo
        title="Séjours pour Seniors - Clos du Soleil"
        description="Découvrez la page de présentation Clos du Soleil : séjours pour seniors, accompagnement, formules d'accueil et accès aux services détaillés."
        canonicalPath={canonicalPath}
      />

      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AnimatedBackground variant="sunrise" />
        <HomeBackgroundDecor />
        <ServiceSiteHeader activeKey="services" logoMode={logoMode} />

        <main className="relative z-10">
          <HomeHeroSection highlights={highlights} />
          <HomeIntroductionSection paragraphs={introParagraphs} />
          <HomeServicesSection />
          <HomeReasonsSection reasons={reasons} />
          <HomeCallToActionSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePageShell;
