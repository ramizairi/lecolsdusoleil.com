import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Shield, Heart, Users, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import PageHeader from "@/components/PageHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

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
        description: selectedDate && selectedTime 
          ? `Rendez-vous demandé le ${format(selectedDate, "d MMMM yyyy", { locale: fr })} à ${selectedTime}.`
          : "Nous vous rappellerons très bientôt.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedDate(undefined);
      setSelectedTime("");
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
    { icon: Heart, text: "Soins personnalisés" },
    { icon: Users, text: "À l'écoute de votre famille" },
  ];

  const contactInfo = [
    { icon: MapPin, label: "Adresse", value: "123 Avenue du Soleil\n75001 Paris, France" },
    { icon: Clock, label: "Horaires", value: "Lundi - Vendredi\n8h00 - 18h00" },
    { icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89" },
    { icon: Mail, label: "Email", value: "contact@closdusoleil.fr" },
  ];

  return (
    <>
      <Helmet>
        <title>Contactez-nous - Clos du Soleil</title>
        <meta name="description" content="Contactez Clos du Soleil par téléphone, WhatsApp ou formulaire. Notre équipe bienveillante est à votre écoute." />
      </Helmet>

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
                <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Contact
                </span>
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
                    <div className="text-primary-foreground/80 text-base">+33 1 23 45 67 89</div>
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
                    <CardTitle className="text-2xl font-serif">Demandez qu'on vous rappelle</CardTitle>
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

                      {/* Date & Time Selection */}
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Choisissez une date pour le premier rendez-vous</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal py-6 rounded-xl border-2 hover:border-primary transition-colors",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                              {selectedDate ? (
                                format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) =>
                                date < new Date() || date.getDay() === 0 || date.getDay() === 6
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-base font-medium">Choisissez un créneau horaire</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="w-full py-6 rounded-xl border-2 hover:border-primary transition-colors text-base">
                            <SelectValue placeholder="Sélectionner un horaire" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="text-base py-3">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-medium">Comment pouvons-nous vous aider ? (optionnel)</Label>
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