export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-lg font-bold tracking-[0.3em] text-foreground">
          FINANZAS AL MANDO
        </span>
        <p className="text-sm text-muted-foreground">
          {"© 2026 Daniela Giraldo Salazar. Todos los derechos reservados."}
        </p>
      </div>
    </footer>
  )
}
