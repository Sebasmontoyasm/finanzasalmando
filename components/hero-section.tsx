"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, Volume2, VolumeX } from "lucide-react"

export function HeroSection() {
  const [opacity, setOpacity] = useState(1)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Trigger entrance animation
    setIsLoaded(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const newOpacity = Math.max(0, 1 - scrollY / 600)
      setOpacity(newOpacity)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background video from public folder - optimizado para video vertical */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
        style={{
          objectPosition: 'center center',
        }}
        poster="/thumbnails/hero-background.jpg"
      >
        <source
          src="/video/20260302Finanzasalmando.mp4"
          type="video/mp4"
        />
      </video>

      {/* Background video overlay */}
      <div className="absolute inset-0 bg-background/60 z-10 animate-in fade-in duration-700" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />

      {/* Audio control button - z-index más alto */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-black/40 backdrop-blur-md border-2 border-white/30 rounded-full hover:bg-black/60 hover:border-white/50 transition-all duration-300 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700 delay-500"
        aria-label={isMuted ? "Activar audio" : "Silenciar audio"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Hero content */}
      <div
        className="relative z-20 text-center px-6"
        style={{ opacity, transform: `translateY(${(1 - opacity) * 40}px)` }}
      >
        <p className={`text-xs md:text-sm tracking-[0.3em] uppercase text-accent/80 mb-8 font-sans font-light transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
           style={{ transitionDelay: '300ms' }}>
          Daniela Giraldo
        </p>
        <h1 className={`font-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-[0.9] mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '500ms' }}>
          FINANZAS AL MANDO
        </h1>
        <p className={`mt-8 text-base md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
           style={{ transitionDelay: '700ms' }}>
          Asesoría financiera personalizada para tomar el control de tu futuro económico
        </p>
        <div className={`mt-12 flex items-center justify-center gap-6 flex-wrap transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
             style={{ transitionDelay: '900ms' }}>
          <a
            href="#videos"
            className="px-10 py-4 bg-foreground text-background text-sm tracking-[0.15em] uppercase font-semibold hover:bg-foreground/90 hover:scale-105 transition-all duration-300"
          >
            Ver contenido
          </a>
          <a
            href="#about"
            className="px-10 py-4 border-2 border-foreground text-foreground text-sm tracking-[0.15em] uppercase font-semibold hover:bg-foreground hover:text-background hover:scale-105 transition-all duration-300"
          >
            Conocer más
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce animate-in fade-in duration-1000 delay-1000">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Desliza
        </span>
        <ChevronDown className="size-5 text-muted-foreground" />
      </div>
    </section>
  )
}
