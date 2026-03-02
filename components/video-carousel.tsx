"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const videos = [
  {
    id: 1,
    title: "¿Quién soy?",
    subtitle: "Daniela Giraldo",
    src: "/video/20260302Finanzasalmando.mp4",
    poster: "/thumbnails/hero-background.jpg",
  },
  {
    id: 2,
    title: "Documental Urbano",
    subtitle: "Dirección Creativa",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Spot Comercial",
    subtitle: "Marca & Estrategia",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Videoclip Musical",
    subtitle: "Dirección Artística",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Cortometraje",
    subtitle: "Narrativa Visual",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    poster: "/placeholder.svg",
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
  const [isMuted, setIsMuted] = useState(true)

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

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  return (
    <div className="relative w-full h-[85vh] bg-black flex items-center justify-center group">
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        poster={video.poster}
        className="max-h-full max-w-full object-contain"
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/30 group-hover:bg-background/50 transition-colors duration-500 pointer-events-none" />

      {/* Play / Pause */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border-2 border-foreground/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-foreground/10"
      >
        {isPlaying ? (
          <Pause className="size-6 md:size-8 text-foreground" />
        ) : (
          <Play className="size-6 md:size-8 text-foreground ml-1" />
        )}
      </button>

      {/* Mute */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleMute()
        }}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-background/60 backdrop-blur rounded-full"
      >
        {isMuted ? (
          <VolumeX className="size-5 text-foreground" />
        ) : (
          <Volume2 className="size-5 text-foreground" />
        )}
      </button>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 pointer-events-none">
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

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section
      id="videos"
      className="relative py-24 md:py-32 bg-secondary scroll-mt-28"
    >
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Nuestro trabajo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
            Contenido destacado
          </h2>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
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

      <div className="px-6 md:px-12 lg:px-20 mt-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => api?.scrollPrev()}>
              <ChevronLeft />
            </button>
            <button onClick={() => api?.scrollNext()}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}