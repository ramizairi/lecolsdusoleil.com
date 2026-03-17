import { useRouter } from "next/router";
import ServiceBlock from "@/components/ServiceBlock";
import {
  serviceIndexById,
  servicesBySection,
} from "@/components/home/homePageData";

const HomeServicesSection = () => {
  const router = useRouter();

  const handleOpenServiceDetail = (id: string) => {
    void router.push(`/services#${id}`);
  };

  return (
    <section className="py-12 sm:px-3 md:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-warm-brown md:text-6xl">
            Une gamme complète pour
          </h2>
          <p className="mt-3 font-serif text-4xl font-bold text-primary md:text-6xl">
            votre bien-être
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl space-y-12 md:space-y-16">
          {servicesBySection.map((section) => (
            <div key={section.id} className="space-y-7 md:space-y-9">
              <h3 className="font-serif text-2xl font-bold text-warm-brown md:text-3xl">
                {section.title}
              </h3>
              <div className="space-y-7 md:space-y-10">
                {section.items.map((service) => {
                  const serviceIndex = serviceIndexById[service.id] ?? 0;

                  return (
                    <div key={service.id}>
                      <ServiceBlock
                        id={service.id}
                        title={service.title}
                        description={service.description}
                        imageSrc={service.imageSrc}
                        imageAlt={service.imageAlt}
                        icon={service.icon}
                        variant={service.variant}
                        index={serviceIndex}
                        onImageClick={() => handleOpenServiceDetail(service.id)}
                        ctaHref={`/services#${service.id}`}
                        ctaLabel="En savoir plus"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
