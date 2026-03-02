"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

// Configuración del bucket S3
const S3_BUCKET_URL = "https://finanzasalmando.com"

const videos = [
  {
    id: 1,
    title: "Campaña Visual 2025",
    subtitle: "Producción Cinematográfica",
    src: `${S3_BUCKET_URL}/video1.mp4`,
    poster: `${S3_BUCKET_URL}/thumbnails/video1.jpg`,
  },
  {
    id: 2,
    title: "Documental Urbano",
    subtitle: "Dirección Creativa",
    src: `${S3_BUCKET_URL}/video2.mp4`,
    poster: `${S3_BUCKET_URL}/thumbnails/video2.jpg`,
  },
  {
    id: 3,
    title: "Spot Comercial",
    subtitle: "Marca & Estrategia",
    src: `${S3_BUCKET_URL}/video3.mp4`,
    poster: `${S3_BUCKET_URL}/thumbnails/video3.jpg`,
  },
  {
    id: 4,
    title: "Videoclip Musical",
    subtitle: "Dirección Artística",
    src: `${S3_BUCKET_URL}/video4.mp4`,
    poster: `${S3_BUCKET_URL}/thumbnails/video4.jpg`,
  },
  {
    id: 5,
    title: "Cortometraje",
    subtitle: "Narrativa Visual",
    src: `${S3_BUCKET_URL}/video5.mp4`,
    poster: `${S3_BUCKET_URL}/thumbnails/video5.jpg`,
  },
]

function VideoSlide({
  video,
  isActive,
}: {
  video: (typeof videos)[0]
  isActive: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return
    if (isActive) {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying])

  return (
    <div className="relative aspect-video w-full overflow-hidden group cursor-pointer">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        poster={video.poster}
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30 group-hover:bg-background/50 transition-colors duration-500" />

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 border-foreground/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-foreground/10"
        aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
      >
        {isPlaying ? (
          <Pause className="size-6 md:size-8 text-foreground" />
        ) : (
          <Play className="size-6 md:size-8 text-foreground ml-1" />
        )}
      </button>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        <p className="text-xs tracking-[0.25em] uppercase text-accent mb-2">
          {video.subtitle}
        </p>
        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          {video.title}
        </h3>
      </div>
    </div>
  )
}

export function VideoCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
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

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-secondary"
    >
      {/* Section header */}
      <div
        className={cn(
          "px-6 md:px-12 lg:px-20 mb-12 transition-all duration-1000",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        )}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
              Nuestro trabajo
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Contenido destacado
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            Cada video cuenta una historia. Explora nuestras producciones
            más recientes y descubre cómo amplificamos cada mensaje.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className={cn(
          "transition-all duration-1000 delay-300",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        )}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {videos.map((video, index) => (
              <CarouselItem
                key={video.id}
                className="pl-4 md:pl-6 basis-[85%] md:basis-[70%] lg:basis-[60%]"
              >
                <VideoSlide video={video} isActive={index === current} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Controls */}
        <div className="px-6 md:px-12 lg:px-20 mt-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    index === current
                      ? "w-8 bg-foreground"
                      : "w-4 bg-muted-foreground/40 hover:bg-muted-foreground"
                  )}
                  aria-label={`Ir al video ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter & arrows */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-mono">
                {String(current + 1).padStart(2, "0")}{" "}
                <span className="text-border">/</span>{" "}
                {String(count).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:bg-secondary hover:border-foreground/30 transition-colors duration-300"
                  aria-label="Video anterior"
                >
                  <ChevronLeft className="size-5 text-foreground" />
                </button>
                <button
                  onClick={() => api?.scrollNext()}
                  className="w-10 h-10 flex items-center justify-center border border-border hover:bg-secondary hover:border-foreground/30 transition-colors duration-300"
                  aria-label="Siguiente video"
                >
                  <ChevronRight className="size-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
