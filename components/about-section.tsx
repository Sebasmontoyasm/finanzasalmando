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
            ¿Quién está detrás de Finanzas al Mando?
          </p>
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
            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl font-light mb-6">
              Soy <span className="font-semibold text-accent">Daniela Giraldo Salazar</span>, consultora financiera y asesora en protección.
            </p>
            <p className="text-foreground/80 leading-relaxed text-base md:text-lg mb-6">
              He trabajado ayudando a personas a tomar decisiones financieras más inteligentes y estratégicas.
            </p>
            <p className="text-foreground/80 leading-relaxed text-base md:text-lg mb-6">
              Sé lo que es empezar desde cero.<br />
              Sé lo que es querer independencia.<br />
              Y sé que el conocimiento financiero cambia vidas cuando se aplica correctamente.
            </p>
            <p className="text-foreground/90 leading-relaxed text-lg md:text-xl font-medium">
              Por eso creé este programa:<br />
              <span className="text-accent">Para que tengas claridad, orden y dirección.</span>
            </p>
          </div>

          {/* Stats grid - Actualizado para finanzas */}
          <div
            className={cn(
              "grid grid-cols-2 gap-6 transition-all duration-1000 delay-400",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="border-2 border-accent/30 p-6 flex flex-col justify-center hover:border-accent transition-colors duration-300">
              <span className="font-sans text-3xl md:text-4xl font-bold text-accent">
                +1440
              </span>
              <span className="text-sm text-foreground/70 mt-2 tracking-wide uppercase">
                Clientes asesorados
              </span>
            </div>
            <div className="border-2 border-accent/30 p-6 flex flex-col justify-center hover:border-accent transition-colors duration-300">
              <span className="font-sans text-3xl md:text-4xl font-bold text-accent">
                10+
              </span>
              <span className="text-sm text-foreground/70 mt-2 tracking-wide uppercase">
                Años de experiencia
              </span>
            </div>
            <div className="border-2 border-accent/30 p-6 flex flex-col justify-center hover:border-accent transition-colors duration-300">
              <span className="font-sans text-3xl md:text-4xl font-bold text-accent">
                100%
              </span>
              <span className="text-sm text-foreground/70 mt-2 tracking-wide uppercase">
                Compromiso
              </span>
            </div>
            <div className="border-2 border-accent/30 p-6 flex flex-col justify-center hover:border-accent transition-colors duration-300">
              <span className="font-sans text-3xl md:text-4xl font-bold text-accent">
                24/7
              </span>
              <span className="text-sm text-foreground/70 mt-2 tracking-wide uppercase">
                Soporte disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
