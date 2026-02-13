import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Shield, Heart, Users, CalendarIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        toast({
          title: "Envoi impossible",
          description: data?.error?.message ?? "Une erreur est survenue. Reessayez.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Demande envoyee !",
        description: data?.message ?? "Nous vous contacterons tres bientot.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Connexion impossible",
        description: "Impossible de joindre le serveur. Reessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/0032465200310?text=Bonjour, je souhaite prendre rendez-vous.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+3228860614";
  };

  const trustElements = [
    { icon: Shield, text: "Équipe qualifiée et certifiée" },
    { icon: Heart, text: "Soins personnalisés" },
    { icon: Users, text: "À l'écoute de votre famille" },
  ];

  const contactInfo = [
    { icon: Phone, label: "Téléphone", value: "+32 2 886 06 14" },
    { icon: Mail, label: "Email", value: "contact@leclosdusoleil.com" },
  ];

  return (
    <>
      <Seo
        title="Contactez-nous - Clos du Soleil"
        description="Contactez Clos du Soleil par téléphone, WhatsApp ou formulaire. Notre équipe bienveillante est à votre écoute."
      />

      <div className="min-h-screen flex flex-col">
        <AnimatedBackground variant="minimal" />
        <PageHeader />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 relative">
            <div className="container mx-auto px-6 text-center">
              {/* Eyebrow */}
              <div 
                className="animate-fade-up opacity-0"
                style={{ animationFillMode: "forwards" }}
              >
                <Eyebrow
                  label="Contact"
                  icon={<span className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                  className="px-4 py-2 shadow-none"
                />
              </div>
              
              <h1 
                className="font-serif text-4xl md:text-6xl font-bold text-foreground mt-8 mb-6 animate-fade-up opacity-0" 
                style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
              >
                Nous sommes là pour{" "}
                <span className="text-gradient-sunset">vous aider</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up opacity-0" 
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Contactez-nous de la manière qui vous convient le mieux.{" "}
                <strong>Nous vous répondons rapidement.</strong>
              </p>
            </div>
          </section>

          {/* Quick Contact Buttons */}
          <section className="py-10 bg-card/50 backdrop-blur-sm border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button
                  onClick={handleCall}
                  className="group relative overflow-hidden w-full py-8 text-lg gap-4 bg-gradient-sunset hover:opacity-90 rounded-2xl shadow-elevated animate-fade-up opacity-0 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="font-bold">Appelez-nous</div>
                    <div className="text-primary-foreground/80 text-base">+32 2 886 06 14</div>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>

                <Button
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden w-full py-8 text-lg gap-4 bg-[#25D366] hover:bg-[#20BD5A] border-none rounded-2xl shadow-elevated animate-fade-up opacity-0 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
                >
                  <MessageCircle className="w-7 h-7" />
                  <div className="text-left">
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-white/80 text-base">Écrivez-nous</div>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </div>
            </div>
          </section>

          {/* Trust Elements */}
          <section className="py-10">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {trustElements.map((item, index) => (
                  <div 
                    key={item.text}
                    className="flex items-center gap-3 text-muted-foreground animate-fade-up opacity-0"
                    style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-16 bg-card/50 backdrop-blur-sm border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="max-w-xl mx-auto">
                <Card 
                  className="shadow-elevated animate-fade-up opacity-0 border-border/50 overflow-hidden" 
                  style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
                >
                  {/* Decorative top gradient */}
                  <div className="h-1 bg-gradient-sunset" />
                  
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-serif">Prendre rendez-vous</CardTitle>
                    <CardDescription className="text-base">
                      Laissez vos coordonnées, nous vous contacterons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium">Votre nom</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="text-base py-6 rounded-xl border-2 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">Votre email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean.dupont@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="text-base py-6 rounded-xl border-2 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">Votre numéro de téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="text-base py-6 rounded-xl border-2 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-medium">Laissez-nous un message, nous vous répondrons rapidement</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Décrivez brièvement votre besoin..."
                          value={formData.message}
                          onChange={handleChange}
                          className="flex w-full rounded-xl border-2 border-input bg-background px-5 py-4 text-base ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full py-7 text-lg rounded-xl bg-gradient-sunset hover:opacity-90 gap-3 shadow-elevated transition-all duration-300 hover:scale-[1.01]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Location Info */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                  Nos coordonnées
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <Card 
                      key={item.label}
                      className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border/50 animate-fade-up opacity-0"
                      style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: "forwards" }}
                    >
                      <CardContent className="pt-6 flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-sunset flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-lg">{item.label}</p>
                          <p className="text-muted-foreground whitespace-pre-line">{item.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
