# Marketing Finanzas al mando - Daniela Giraldo Salazar

Sitio web estático construido con Next.js 16, configurado para despliegue en AWS S3.

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Build Local

```bash
# Construir para producción
npm run build

# Los archivos estáticos se generan en la carpeta 'out/'
```

## ☁️ Despliegue en AWS S3 con Dominio Personalizado

### Requisitos Previos

1. AWS CLI instalado y configurado
2. Credenciales de AWS con permisos para S3, Route 53, CloudFront
3. Dominio `finanzasalmando.com` configurado en Route 53
4. Videos preparados para subir

### Configuración Inicial (Una sola vez)

```bash
# 1. Hacer ejecutables los scripts
chmod +x *.sh

# 2. Configurar el bucket S3
./setup-s3.sh

# 3. Configurar Route 53 (para HTTP)
./setup-route53.sh

# 4. O configurar CloudFront (para HTTPS) - RECOMENDADO
./setup-cloudfront.sh
```

Ver [ROUTE53-SETUP.md](./ROUTE53-SETUP.md) para guía detallada.

### Subir Videos

Coloca tus videos en la raíz del proyecto:
- `hero-background.mp4` - Video de fondo del hero
- `video1.mp4` a `video5.mp4` - Videos del carousel
- `thumbnails/` - Carpeta con miniaturas (opcional)

```bash
# Subir videos a S3
./upload-videos.sh
```

### Desplegar el Sitio

```bash
# Build y deploy automático
./deploy.sh
```

Tu sitio estará disponible en:
```
http://finanzasalmando.com (con Route 53)
https://finanzasalmando.com (con CloudFront)
```

## 📁 Estructura del Proyecto

```
.
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── hero-section.tsx
│   ├── video-carousel.tsx
│   ├── about-section.tsx
│   ├── services-section.tsx
│   ├── contact-section.tsx
│   └── ui/               # Componentes UI (shadcn)
├── public/               # Assets estáticos
├── setup-s3.sh          # Script de configuración S3
├── deploy.sh            # Script de despliegue
├── upload-videos.sh     # Script para subir videos
└── S3-DEPLOYMENT.md     # Guía detallada de despliegue
```

## 🎥 Configuración de Videos

El proyecto está configurado para usar videos desde S3:

**Dominio**: `finanzasalmando.com`  
**Bucket**: `finanzasalmando.com`  
**Región**: `us-east-1`  
**URL Base**: `https://finanzasalmando.com`

Para cambiar el bucket o dominio, edita:
1. `components/video-carousel.tsx` - Variable `S3_BUCKET_URL`
2. `components/hero-section.tsx` - URL del video de fondo
3. Scripts de despliegue (`setup-s3.sh`, `deploy.sh`, `upload-videos.sh`)
4. `bucket-policy.json` - ARN del bucket

## 🛠️ Tecnologías

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first
- **shadcn/ui** - Componentes UI
- **Radix UI** - Primitivos accesibles
- **Lucide React** - Iconos

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo local
npm run build    # Build para producción
npm run start    # Servidor de producción (no necesario para S3)
npm run lint     # Linter
```

## 🔧 Configuración de Next.js

El proyecto está configurado para exportación estática:

```javascript
// next.config.mjs
{
  output: 'export',           // Genera archivos estáticos
  images: { unoptimized: true }, // Desactiva optimización de imágenes
}
```

## 📚 Documentación Adicional

- [ROUTE53-SETUP.md](./ROUTE53-SETUP.md) - Configuración de dominio personalizado con Route 53
- [S3-DEPLOYMENT.md](./S3-DEPLOYMENT.md) - Guía completa de despliegue en S3
- [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Checklist paso a paso
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)

## 🌐 Mejoras Recomendadas

1. **CloudFront + HTTPS**: Ya configurado con `./setup-cloudfront.sh`
2. **Dominio Personalizado**: Ya configurado con Route 53
3. **Optimización de Videos**: Comprimir videos antes de subir
4. **Lazy Loading**: Implementar carga diferida de videos
5. **Analytics**: Agregar Google Analytics o similar
6. **CDN**: CloudFront proporciona CDN global automáticamente

## 💰 Costos Estimados

Para un sitio con 5 videos de 50MB cada uno:
- **Storage**: ~$0.006/mes
- **Transfer** (1000 visitas): ~$2.25/mes
- **Total**: ~$2.26/mes

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para preguntas o problemas, consulta la documentación o contacta al equipo de desarrollo.
