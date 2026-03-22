import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactCallToActionSectionProps = {
  title: ReactNode;
  description: ReactNode;
  buttonLabel: string;
  buttonHref: string;
  eyebrowLabel?: string;
  eyebrowIcon?: ReactNode;
  buttonLeadingIcon?: ReactNode;
  buttonTrailingIcon?: ReactNode;
  sectionClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  eyebrowClassName?: string;
};

const ContactCallToActionSection = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  eyebrowLabel = "Contactez-nous",
  eyebrowIcon = <Phone className="h-4 w-4" />,
  buttonLeadingIcon,
  buttonTrailingIcon,
  sectionClassName,
  containerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  buttonClassName,
  eyebrowClassName,
}: ContactCallToActionSectionProps) => {
  const isInternalHref =
    buttonHref.startsWith("/") || buttonHref.startsWith("#");

  const actionContent = (
    <>
      {buttonLeadingIcon}
      <span className="font-semibold">{buttonLabel}</span>
      {buttonTrailingIcon}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  return (
    <section className={cn("relative overflow-hidden", sectionClassName)}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/cta-bg-sunset.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(42 90% 70% / 0.15) 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[1]"
        style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.4)" }}
      />

      <div
        className={cn(
          "container relative z-10 mx-auto px-3 text-center sm:px-6",
          containerClassName,
        )}
      >
        <div className={cn("mx-auto max-w-5xl", contentClassName)}>
          <div
            className="animate-fade-up opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <Eyebrow
              label={eyebrowLabel}
              icon={eyebrowIcon}
              className={cn(
                "border-amber-400/30 bg-amber-400/10 text-amber-300 shadow-none",
                eyebrowClassName,
              )}
            />
          </div>

          <h2
            className={cn(
              "mt-8 mb-6 font-serif text-3xl font-bold text-white animate-fade-up opacity-0 md:text-5xl lg:text-6xl",
              titleClassName,
            )}
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            {title}
          </h2>

          <div
            className={cn(
              "mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/80 animate-fade-up opacity-0 md:text-xl [&_a]:font-semibold [&_a]:text-amber-200 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-amber-100 [&_a:hover]:underline [&_p+p]:mt-4",
              descriptionClassName,
            )}
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {description}
          </div>

          <div
            className="flex justify-center animate-fade-up opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <Button
              asChild
              className={cn(
                "group relative overflow-hidden rounded-full bg-white px-10 py-7 text-lg text-foreground shadow-elevated transition-all duration-300 hover:scale-105 hover:bg-white/95",
                buttonClassName,
              )}
            >
              {isInternalHref ? (
                <Link href={buttonHref}>{actionContent}</Link>
              ) : (
                <a href={buttonHref}>{actionContent}</a>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCallToActionSection;
