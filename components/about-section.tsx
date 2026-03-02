"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const stats = [
  { number: "150+", label: "Proyectos realizados" },
  { number: "40+", label: "Clientes satisfechos" },
  { number: "8", label: "Años de experiencia" },
  { number: "12M+", label: "Visualizaciones totales" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            Sobre nosotros
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            El arte de contar historias a través del video
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div
            className={cn(
              "transition-all duration-1000 delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              En Amplify, transformamos ideas en experiencias visuales
              memorables. Combinamos tecnología de vanguardia con narrativa
              cinematográfica para crear contenido que conecta, inspira y
              trasciende fronteras.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mt-6">
              Cada proyecto es una oportunidad para amplificar tu visión.
              Desde producción audiovisual hasta estrategia de contenido
              digital, nuestro equipo se dedica a elevar cada pieza creativa
              al siguiente nivel.
            </p>
          </div>

          {/* Stats grid */}
          <div
            className={cn(
              "grid grid-cols-2 gap-6 transition-all duration-1000 delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-border p-6 flex flex-col justify-center"
              >
                <span className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {stat.number}
                </span>
                <span className="text-sm text-muted-foreground mt-2 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
