import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  delay?: number;
}

const NavigationCard = ({ title, description, icon: Icon, to, delay = 0 }: NavigationCardProps) => {
  return (
    <Link
      href={to}
      className="group block animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elevated hover:border-primary transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[220px] flex flex-col items-center justify-center text-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-sunset flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
          <Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-serif text-accessible-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-accessible-base text-muted-foreground max-w-[200px]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
