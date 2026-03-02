"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Film, Camera, Palette, Megaphone } from "lucide-react"

const services = [
  {
    icon: Film,
    title: "Producción Audiovisual",
    description:
      "Desde la conceptualización hasta la postproducción. Creamos piezas cinematográficas que capturan la esencia de tu marca.",
    number: "01",
  },
  {
    icon: Camera,
    title: "Dirección Creativa",
    description:
      "Guiamos cada proyecto con una visión artística única. Cada frame es una oportunidad para contar tu historia.",
    number: "02",
  },
  {
    icon: Palette,
    title: "Diseño & Motion",
    description:
      "Animaciones, gráficos en movimiento y diseño visual que elevan el impacto de cada producción.",
    number: "03",
  },
  {
    icon: Megaphone,
    title: "Estrategia Digital",
    description:
      "Optimizamos tu contenido para cada plataforma. Maximizamos el alcance y la conexión con tu audiencia.",
    number: "04",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            Servicios
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance max-w-3xl">
            Lo que hacemos mejor
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px mt-16 bg-border">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={cn(
                "bg-background p-8 md:p-10 group hover:bg-secondary transition-all duration-500",
                "transition-all duration-1000",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <service.icon className="size-8 text-accent" />
                <span className="font-mono text-sm text-muted-foreground">
                  {service.number}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 h-px bg-border w-0 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
