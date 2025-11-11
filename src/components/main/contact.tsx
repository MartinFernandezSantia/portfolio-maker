"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeroButton } from "@/components/ui/button-variants";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { toast } from "sonner";

const Contact = () => {

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ponte en <span className="gradient-text">Contacto</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o simplemente quieres charlar? Me encantaría
            saber de ti. Creemos algo increíble juntos.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Enviar un Mensaje</h3>
              {/* <ContactForm /> */}
              <PreviewContactForm />

            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

function ContactForm() {
  const { state: { aboutMe } } = usePortfolio();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [currentUrl, setCurrentUrl] = useState("");


  useEffect(() => {
    // Get current URL on client side
    setCurrentUrl(window.location.href);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form action={`https://formsubmit.co/${aboutMe.email}`} className="space-y-6" method="POST">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="transition-smooth focus:glow"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="transition-smooth focus:glow"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          rows={5}
          className="transition-smooth focus:glow resize-none h-30"
        />
      </div>

      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" />
      <input type="hidden" name="_next" value={currentUrl} />


      <HeroButton
        type="submit"
        variant="hero"
        size="lg"
        className="w-full group"
        disabled={isSubmitting}
      >
        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-smooth" />
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </HeroButton>
    </form>
  );
}

function PreviewContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.warning("El envío de formularios está deshabilitado en modo vista previa.", { className: "md:!w-[450px] md:!text-[1rem] md:!gap-5", richColors: true });
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2"
        >
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          className="transition-smooth focus:glow"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2"
        >
          Correo Electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu.correo@ejemplo.com"
          required
          className="transition-smooth focus:glow"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2"
        >
          Mensaje
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntame sobre tu proyecto..."
          required
          rows={5}
          className="transition-smooth focus:glow resize-none h-30"
        />
      </div>

      <HeroButton
        type="submit"
        variant="hero"
        size="lg"
        className="w-full group"
        disabled={isSubmitting}
      >
        <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-smooth" />
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
      </HeroButton>
    </form>
  )
}

export default Contact;
