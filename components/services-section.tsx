"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, GraduationCap, Shield, Lightbulb } from "lucide-react"

const services = [
  {
    icon: TrendingUp,
    title: "Consultoría Financiera con Equipo Especializado",
    description:
      "Obtén una sesión estratégica de 60 minutos sin costo, donde analizaremos tu situación actual y definiremos oportunidades claras de crecimiento y protección patrimonial.",
    number: "01",
  },
  {
    icon: GraduationCap,
    title: "Educación Financiera, Inversiones y Energía con Enfoque Estratégico",
    description:
      "He creado programas diseñados para personas que desean elevar su nivel financiero, comprender el mundo de las inversiones y fortalecer su mentalidad de crecimiento desde una perspectiva integral.",
    points: [
      "No es solo teoría.",
      "Es estructura, claridad y aplicación real."
    ],
    number: "02",
  },
  {
    icon: Shield,
    title: "Protección Patrimonial y Seguros",
    description:
      "Análisis completo de tu situación actual y diseño de estrategias de protección para tu patrimonio, familia y futuro financiero.",
    number: "03",
  },
  {
    icon: Lightbulb,
    title: "Planeación Financiera Integral",
    description:
      "Diseñamos un plan financiero personalizado que incluye inversiones, ahorro, protección y estrategias de crecimiento a corto, mediano y largo plazo.",
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
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-secondary"
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
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight text-balance max-w-3xl">
            Cómo puedo ayudarte
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={cn(
                "bg-background border-2 border-accent/20 p-8 md:p-10 group hover:border-accent hover:bg-background/50 transition-all duration-500 rounded-lg",
                "transition-all duration-1000",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
                  <service.icon className="size-7 text-accent" />
                </div>
                <span className="font-mono text-sm text-accent/60 font-semibold">
                  {service.number}
                </span>
              </div>
              <h3 className="font-sans text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 h-0.5 bg-accent/20 w-0 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
