import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
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
    email: "",
    phone: "",
    subject: "",
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
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    { icon: MapPin, title: "Adresse", value: "123 Avenue du Soleil, 75001 Paris, France" },
    { icon: Phone, title: "Téléphone", value: "+33 1 23 45 67 89" },
    { icon: Mail, title: "Email", value: "contact@closdusoleil.fr" },
    { icon: Clock, title: "Horaires", value: "Lun - Ven: 8h - 18h" },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Clos du Soleil</title>
        <meta name="description" content="Contactez Clos du Soleil pour toute question sur nos services de soins pour seniors. Notre équipe est à votre écoute." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-24">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-6 text-center">
              <h1 className="font-serif text-accessible-4xl font-bold text-foreground mb-6 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
                Contactez-
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  nous
                </span>
              </h1>
              <p className="text-accessible-lg text-muted-foreground max-w-3xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
                Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos démarches.
              </p>
            </div>
          </section>

          {/* Contact Content */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <h2 className="font-serif text-accessible-2xl font-bold text-foreground">
                    Nos Coordonnées
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {contactInfo.map((info, index) => (
                      <Card 
                        key={info.title}
                        className="animate-fade-up opacity-0"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
                      >
                        <CardContent className="pt-6 flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center shrink-0">
                            <info.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-accessible-lg">{info.title}</p>
                            <p className="text-muted-foreground text-accessible-base">{info.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <Card className="shadow-elevated animate-fade-up opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                  <CardHeader>
                    <CardTitle>Envoyez-nous un message</CardTitle>
                    <CardDescription>
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Jean Dupont"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Demande d'information"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Votre message..."
                          value={formData.message}
                          onChange={handleChange}
                          className="flex w-full rounded-xl border-2 border-input bg-card px-5 py-4 text-accessible-base ring-offset-background transition-all duration-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="accessible" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
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
