"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/finanzasalmando" },
  { label: "YouTube", href: "" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/danielagiraldomarketing" },
  { label: "Whatsapp", href: "https://wa.me/573177723994" },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneNumber = "573177723994" // +57 317 7723994

    // Construir mensaje de WhatsApp
    const whatsappMessage = `Hola! 

*Nombre:* ${formData.name}
*Email:* ${formData.email}

*Mensaje:*
${formData.message}

---
Enviado desde finanzasalmando.com`

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage)

    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

    // Limpiar formulario
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side */}
          <div
            className={cn(
              "transition-all duration-1000",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
              Contacto
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight text-balance">
              {"Hablemos de tu próximo proyecto"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-6 max-w-md">
              {"¿Tienes una idea en mente? Nos encantaría escucharla. Escríbenos y hagamos algo extraordinario juntos."}
            </p>

            {/* Contact info */}
            <div className="mt-10 flex flex-col gap-4">
              <a
                href="mailto:daniela.giraldo@gmail.com"
                className="text-foreground text-lg md:text-xl font-medium hover:text-accent transition-colors duration-300"
              >
                daniela.giraldo@gmail.com
              </a>
              <a
                href="https://wa.me/573177723994"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors duration-300 flex items-center gap-2"
              >
                <span>+57 317 7723994</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            {/* Social links */}
            <div className="mt-10 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 border border-border text-sm tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors duration-300"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - form */}
          <div
            className={cn(
              "transition-all duration-1000 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-8 py-4 bg-foreground text-background text-sm tracking-[0.15em] uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-300 self-start"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
