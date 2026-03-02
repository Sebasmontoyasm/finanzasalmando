"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollY / 600)
      setOpacity(newOpacity)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background video overlay */}
      <div className="absolute inset-0 bg-background/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />

      {/* Background video from S3  debo cambiar aqui cuando suba el S3*/}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://finanzasalmando.com/thumbnails/hero-background.jpg"
      >
        <source
          src="https://finanzasalmando.com/hero-background.mp4"
          type="video/mp4"
        />
      </video>

      {/* Hero content */}
      <div
        className="relative z-20 text-center px-6"
        style={{ opacity, transform: `translateY(${(1 - opacity) * 40}px)` }}
      >
        <p className="text-sm md:text-base tracking-[0.4em] uppercase text-accent mb-6 font-sans">
          Daniela Giraldo
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground leading-none">
          FINANZAS AL MANDO
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Creamos experiencias visuales que trascienden lo ordinario.
          Contenido que amplifica tu mensaje al mundo.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="#videos"
            className="px-8 py-3 bg-foreground text-background text-sm tracking-[0.15em] uppercase font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
          >
            Ver contenido
          </a>
          <a
            href="#about"
            className="px-8 py-3 border border-border text-foreground text-sm tracking-[0.15em] uppercase font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300"
          >
            Conocer más
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="size-5 text-muted-foreground" />
      </div>
    </section>
  )
}
