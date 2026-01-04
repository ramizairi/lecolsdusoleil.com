import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Shield, Heart, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    setTimeout(() => {
      toast({
        title: "Demande envoyée !",
        description: "Nous vous rappellerons très bientôt.",
      });
      setFormData({ name: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/33123456789?text=Bonjour, je souhaite prendre rendez-vous.", "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+33123456789";
  };

  const trustElements = [
    { icon: Shield, text: "Équipe qualifiée et certifiée" },
    { icon: Heart, text: "Soins personnalisés avec bienveillance" },
    { icon: Users, text: "À l'écoute de vous et votre famille" },
  ];

  return (
    <>
      <Helmet>
        <title>Contactez-nous - Clos du Soleil</title>
        <meta name="description" content="Contactez Clos du Soleil par téléphone, WhatsApp ou formulaire. Notre équipe bienveillante est à votre écoute." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section - Trust focused */}
          <section className="py-16 bg-gradient-soft">
            <div className="container mx-auto px-6 text-center">
              <h1 className="font-serif text-accessible-3xl md:text-accessible-4xl font-bold text-foreground mb-4 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                Nous sommes là pour{" "}
                <span className="text-gradient-sunset">vous aider</span>
              </h1>
              <p className="text-accessible-lg md:text-accessible-xl text-foreground/80 max-w-2xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Contactez-nous de la manière qui vous convient le mieux. <br className="hidden md:block" />
                <strong>Nous vous répondons rapidement.</strong>
              </p>
            </div>
          </section>

          {/* Quick Contact Buttons */}
          <section className="py-10 bg-card border-y border-border/50">
            <div className="container mx-auto px-6">
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Button
                  onClick={handleCall}
                  variant="accessible"
                  className="w-full py-8 text-accessible-lg gap-4 animate-fade-up opacity-0"
                  style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
                >
                  <Phone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="font-bold">Appelez-nous</div>
                    <div className="text-primary-foreground/80 text-accessible-base">+33 1 23 45 67 89</div>
                  </div>
                </Button>

                <Button
                  onClick={handleWhatsApp}
                  variant="accessible"
                  className="w-full py-8 text-accessible-lg gap-4 bg-[#25D366] hover:bg-[#20BD5A] border-none animate-fade-up opacity-0"
                  style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
                >
                  <MessageCircle className="w-7 h-7" />
                  <div className="text-left">
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-white/80 text-accessible-base">Écrivez-nous</div>
                  </div>
                </Button>
              </div>
            </div>
          </section>

          {/* Trust Elements */}
          <section className="py-10 bg-background">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {trustElements.map((item, index) => (
                  <div 
                    key={item.text}
                    className="flex items-center gap-3 text-muted-foreground animate-fade-up opacity-0"
                    style={{ animationDelay: `${400 + index * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="text-accessible-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form - Simplified */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-6">
              <div className="max-w-xl mx-auto">
                <Card className="shadow-elevated animate-fade-up opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-accessible-2xl">Demandez qu'on vous rappelle</CardTitle>
                    <CardDescription className="text-accessible-lg">
                      Laissez vos coordonnées, nous vous contacterons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-accessible-lg">Votre nom</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="text-accessible-lg py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-accessible-lg">Votre numéro de téléphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="text-accessible-lg py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-accessible-lg">Comment pouvons-nous vous aider ? (optionnel)</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Décrivez brièvement votre besoin..."
                          value={formData.message}
                          onChange={handleChange}
                          className="flex w-full rounded-xl border-2 border-input bg-card px-5 py-4 text-accessible-lg ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="accessible" 
                        className="w-full py-7 text-accessible-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-6 h-6" />
                            Demander un rappel
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
          <section className="py-16 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-serif text-accessible-2xl font-bold text-foreground text-center mb-8">
                  Nos coordonnées
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="animate-fade-up opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center shrink-0">
                        <MapPin className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-accessible-lg">Adresse</p>
                        <p className="text-muted-foreground text-accessible-base">123 Avenue du Soleil<br />75001 Paris, France</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-fade-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center shrink-0">
                        <Clock className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-accessible-lg">Horaires</p>
                        <p className="text-muted-foreground text-accessible-base">Lundi - Vendredi<br />8h00 - 18h00</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-fade-up opacity-0" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center shrink-0">
                        <Phone className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-accessible-lg">Téléphone</p>
                        <p className="text-muted-foreground text-accessible-base">+33 1 23 45 67 89</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-fade-up opacity-0" style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
                    <CardContent className="pt-6 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-sunset flex items-center justify-center shrink-0">
                        <Mail className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-accessible-lg">Email</p>
                        <p className="text-muted-foreground text-accessible-base">contact@closdusoleil.fr</p>
                      </div>
                    </CardContent>
                  </Card>
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
