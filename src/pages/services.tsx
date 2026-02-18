import { HandHeart, Plane, Stethoscope, Palette, Utensils, BedDouble, Phone, MessageCircle, ArrowRight, Sparkles, Sun, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import SunEffect from "@/components/SunEffect";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg-sunset.jpg";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Services = () => {
  const services = [
    {
      icon: HandHeart,
      title: "Accompagnement quotidien et personnalisé",
      description: "Accompagnement quotidien et personnalisé : aide aux gestes de la vie courante avec respect et discrétion.",
      color: "from-rose-500 to-pink-500",
      image: "/service-accompagnement.jpg",
      imagePosition: "left",
    },
    {
      icon: Plane,
      title: "Accueil et transport individuel",
      description: "Accueil et transport individuel depuis l'aéroport, avec une prise en charge adaptée aux personnes à mobilité réduite.",
      color: "from-sky-500 to-blue-500",
      image: "/service-transport.jpg",
      imagePosition: "right",
    },
    {
      icon: Stethoscope,
      title: "Soins médicaux et paramédicaux",
      description: "Présence d'une équipe compétente composée d'infirmier(ère)s et d'un kinésithérapeute, proposant des séances de rééducation et de maintien de la mobilité adaptées aux besoins de chacun.",
      color: "from-emerald-500 to-teal-500",
      image: "/service-medical.jpg",
      imagePosition: "left",
    },
    {
      icon: Palette,
      title: "Activités et loisirs",
      description: "Ateliers créatifs, moments de détente, sorties culturelles et sociales pour stimuler le corps et l'esprit.",
      color: "from-violet-500 to-purple-500",
      image: "/service-activities.jpg",
      imagePosition: "right",
    },
    {
      icon: Utensils,
      title: "Repas équilibrés et conviviaux",
      description: "Repas équilibrés et conviviaux : préparés avec soin et adaptés aux besoins de chacun, avec la formule all inclusive soft.",
      color: "from-amber-500 to-orange-500",
      image: "/service-meals.jpg",
      imagePosition: "left",
    },
    {
      icon: BedDouble,
      title: "CONFORT ET PROPRETÉ",
      description:
        "L'hébergement en chambre moderne et spacieuse avec terrasse ou balcon privatif.\nPassage quotidien d'une femme de chambre.\nLa blanchisserie : linge de maison fourni et vêtements personnels entretenus avec soin.",
      color: "from-indigo-500 to-blue-500",
      image: "/service-comfort.jpg",
      imagePosition: "right",
    },
  ];

  const chartData = [
    { month: "Jan", satisfaction: 92, residents: 28 },
    { month: "Fév", satisfaction: 95, residents: 32 },
    { month: "Mar", satisfaction: 93, residents: 35 },
    { month: "Avr", satisfaction: 97, residents: 38 },
    { month: "Mai", satisfaction: 96, residents: 42 },
    { month: "Juin", satisfaction: 98, residents: 45 },
  ];

  const handleCall = () => {
    window.location.href = "tel:+3228860614";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/32465200310?text=Bonjour, je souhaite en savoir plus sur vos services.", "_blank");
  };

  return (
    <>
      <Seo
        title="Nos Services - Clos du Soleil | Résidence Hôtelière pour Seniors en Tunisie"
        description="Découvrez nos services : accompagnement quotidien et personnalisé, soins médicaux et paramédicaux, transport aéroport, activités et repas équilibrés au Clos du Soleil en Tunisie."
      />

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="sunset" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 md:py-28 relative">
            <SunEffect variant="corner" className="inset-0 z-0" />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow label="Nos Services" icon={<Sparkles className="w-4 h-4" />} className="text-lg" />
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Une gamme complète pour{" "}
                <span className="text-gradient-sunset">votre bien-être</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Au Clos du Soleil, nous offrons une gamme complète de services pour le bien-être de nos résidents.
              </p>
            </div>
          </section>

          {/* Services Sections - Alternating Layout */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`flex flex-col ${
                    service.imagePosition === "left"
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  } gap-12 items-center animate-fade-up opacity-0`}
                  style={{
                    animationDelay: `${200 + index * 150}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  {/* Image with frame effect */}
                  <div className="flex-1 relative group">
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/80 backdrop-blur-sm bg-gradient-to-br ${service.color} p-1`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-80 md:h-96 object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Decorative corner element */}
                    <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.color} rounded-full opacity-20 blur-2xl`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                        {service.description}
                      </p>
                    </div>
                    {/* Accent line */}
                    <div className={`w-20 h-1 bg-gradient-to-r ${service.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Statistics Chart Section */}
          <section className="py-24 bg-card/60 backdrop-blur-sm border-y border-border/50 relative">
            <SunEffect variant="corner" className="inset-0 z-0" />
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16 animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                <Eyebrow label="Notre Évolution" icon={<TrendingUp className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Nos Résultats Parlent Pour Nous
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Découvrez notre progression en termes de satisfaction client et d'accueil de nouveaux résidents
                </p>
              </div>

              <div className="bg-background/50 rounded-3xl p-8 md:p-12 border border-border/50 backdrop-blur-sm animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: "#f59e0b", r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Satisfaction des Résidents (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="residents"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", r: 6 }}
                      activeDot={{ r: 8 }}
                      name="Nombre de Résidents"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  { label: "Taux de Satisfaction", value: "98%", icon: "⭐" },
                  { label: "Résidents Heureux", value: "45+", icon: "👥" },
                  { label: "Services Offerts", value: "6+", icon: "🎯" },
                ].map((stat, idx) => (
                  <Card
                    key={stat.label}
                    className="text-center p-6 animate-fade-up opacity-0 border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-glow transition-all duration-500"
                    style={{
                      animationDelay: `${300 + idx * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Qui sommes-nous Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />

            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow label="Qui sommes-nous ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Le Clos du Soleil, une résidence dédiée au bien-être
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le Clos du Soleil est une résidence hôtelière pour seniors située en Tunisie. Nous accueillons des personnes âgées dans un cadre calme, sécurisé et bienveillant. Nous offrons un accompagnement quotidien, des soins personnalisés et une attention particulière au bien-être et à la dignité de chaque résident.
                </p>
              </div>
            </div>
          </section>

          {/* Pourquoi nous choisir Section */}
          <section className="py-20 relative">
            <SunEffect variant="subtle" className="inset-0" />
            
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Eyebrow label="Pourquoi nous choisir ?" icon={<Sun className="w-4 h-4" />} className="mb-6" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  La Tunisie, un cadre de vie idéal
                </h2>
                <h3 className="font-serif text-3xl md:text-lg font-bold text-amber-600 uppercase mb-6">
                  Le coût en Tunisie est moins cher de <span className="text-2xl">40%</span> qu'en Europe
                </h3>
                <div className="text-lg text-muted-foreground  leading-relaxed space-y-3">
                  <p>La Tunisie, c’est la sécurité, le soleil, la mer et un climat agréable.</p>
                  <p>C’est aussi une alimentation fraîche et équilibrée.</p>
                  <p>Au Clos du Soleil, nous offrons à chaque résident une attention personnalisée et un cadre de vie apaisant.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section with Background Image */}
          <section className="py-32 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={ctaBg.src}
                alt="" 
                className="w-full h-full object-cover"
              />
              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
            </div>
            
            {/* Sun rays effect */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
              <div 
                className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(42 90% 70% / 0.15) 0%, transparent 50%)",
                  filter: "blur(40px)",
                }}
              />
            </div>
            
            {/* Vignette */}
            <div className="absolute inset-0 z-[1]" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.4)' }} />
            
            <div className="container mx-auto px-6 text-center relative z-10">
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow
                  label="Contactez-nous"
                  icon={<Phone className="w-4 h-4" />}
                  className="text-amber-300 border-amber-400/30 bg-amber-400/10 shadow-none"
                />
              </div>
              
              <h2 
                className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-8 mb-6 animate-fade-up opacity-0"
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Prêt à découvrir le Clos du Soleil ?
              </h2>
              <p 
                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-12 animate-fade-up opacity-0"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Notre équipe est à votre écoute pour organiser votre séjour et répondre à toutes vos questions.
              </p>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
              >
                <Button 
                  onClick={handleCall}
                  className="group relative overflow-hidden bg-white text-foreground hover:bg-white/95 text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Appelez-nous</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden bg-[#25D366] hover:bg-[#20BD5A] border-none text-white text-lg py-7 px-10 rounded-full shadow-elevated gap-3 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">WhatsApp</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
