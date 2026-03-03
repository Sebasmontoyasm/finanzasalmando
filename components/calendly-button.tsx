"use client"

import { Calendar, X, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export function CalendlyButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Mostrar el botón después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    window.open('https://calendly.com/finanzasalmando/consultoriafinanciera', '_blank')
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
    // Volver a mostrar después de 30 segundos
    setTimeout(() => {
      setIsMinimized(false)
    }, 30000)
  }

  if (!isVisible || isMinimized) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-left-8 fade-in duration-700">
      {/* Botón principal */}
      <div className="relative group">
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        
        <button
          onClick={handleClick}
          className="relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-accent to-accent/90 text-background rounded-full shadow-2xl hover:shadow-accent/50 hover:scale-105 transition-all duration-300 overflow-hidden group"
        >
          {/* Efecto shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <Calendar className="w-5 h-5 relative z-10" />
          <span className="font-bold text-sm tracking-wide relative z-10">
            Agéndate conmigo
          </span>
          <Sparkles className="w-4 h-4 relative z-10 animate-pulse" />
        </button>

        {/* Botón de cerrar */}
        <button
          onClick={handleMinimize}
          className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent hover:text-background"
          aria-label="Cerrar temporalmente"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Tooltip mejorado */}
      <div className="absolute bottom-full left-0 mb-3 px-4 py-3 bg-background/95 backdrop-blur-md border-2 border-accent/30 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap transform group-hover:-translate-y-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-sm font-semibold text-accent">
              Consultoría Financiera Gratuita
            </p>
            <p className="text-xs text-foreground/70">
              30 minutos • Online • Sin compromiso
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-background border-r-2 border-b-2 border-accent/30"></div>
      </div>
    </div>
  )
}
