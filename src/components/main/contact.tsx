"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HeroButton } from "@/components/ui/button-variants";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Resend } from 'resend';
import { sendEmail } from "@/lib/actions";

const Contact = () => {
  // const resend = new Resend(process.env.RESEND_API_KEY!);
  const { state: { aboutMe } } = usePortfolio();
  const [currentUrl, setCurrentUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    // Get current URL on client side
    setCurrentUrl(window.location.href);
    console.log("Current URL set to:", window.location.href);
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you. Let&apos;s create something amazing together.
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
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </HeroButton>
              </form>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
