# Guía de Despliegue en AWS S3

Este proyecto está configurado para desplegarse como sitio estático en AWS S3.

## Configuración del Bucket S3

### 1. Crear el Bucket

```bash
# Nombre del bucket (debe ser único globalmente)
BUCKET_NAME="amplify-videos"
REGION="us-east-1"

# Crear bucket
aws s3 mb s3://${BUCKET_NAME} --region ${REGION}
```

### 2. Configurar el Bucket para Hosting Estático

```bash
# Habilitar hosting de sitio web estático
aws s3 website s3://${BUCKET_NAME} \
  --index-document index.html \
  --error-document 404.html
```

### 3. Configurar Política de Acceso Público

Crea un archivo `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::amplify-videos/*"
    }
  ]
}
```

Aplica la política:

```bash
# Desbloquear acceso público
aws s3api put-public-access-block \
  --bucket ${BUCKET_NAME} \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Aplicar política del bucket
aws s3api put-bucket-policy \
  --bucket ${BUCKET_NAME} \
  --policy file://bucket-policy.json
```

### 4. Configurar CORS (para videos)

Crea un archivo `cors-config.json`:

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

Aplica la configuración:

```bash
aws s3api put-bucket-cors \
  --bucket ${BUCKET_NAME} \
  --cors-configuration file://cors-config.json
```

## Estructura de Archivos en S3

Organiza tus archivos de esta manera:

```
amplify-videos/
├── index.html                    # Sitio web (carpeta out/)
├── _next/                        # Assets de Next.js
├── hero-background.mp4           # Video del hero
├── video1.mp4                    # Videos del carousel
├── video2.mp4
├── video3.mp4
├── video4.mp4
├── video5.mp4
└── thumbnails/                   # Miniaturas (opcional)
    ├── hero-background.jpg
    ├── video1.jpg
    ├── video2.jpg
    ├── video3.jpg
    ├── video4.jpg
    └── video5.jpg
```

## Subir Videos a S3

```bash
# Subir videos individuales
aws s3 cp hero-background.mp4 s3://${BUCKET_NAME}/hero-background.mp4 \
  --content-type video/mp4

aws s3 cp video1.mp4 s3://${BUCKET_NAME}/video1.mp4 \
  --content-type video/mp4

# Subir thumbnails
aws s3 cp thumbnails/ s3://${BUCKET_NAME}/thumbnails/ \
  --recursive \
  --content-type image/jpeg
```

## Build y Despliegue del Sitio

### 1. Construir el Proyecto

```bash
npm install
npm run build
```

Esto generará la carpeta `out/` con todos los archivos estáticos.

### 2. Subir el Sitio a S3

```bash
# Subir todo el contenido de out/
aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.json"

# Subir HTML sin cache
aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json"
```

### 3. Acceder al Sitio

Tu sitio estará disponible en:
```
http://amplify-videos.s3-website-us-east-1.amazonaws.com
```

## Configuración con CloudFront (Recomendado)

Para mejor rendimiento y HTTPS:

### 1. Crear Distribución CloudFront

```bash
aws cloudfront create-distribution \
  --origin-domain-name ${BUCKET_NAME}.s3.${REGION}.amazonaws.com \
  --default-root-object index.html
```

### 2. Configurar Dominio Personalizado

1. Obtén el dominio de CloudFront (ej: `d123456.cloudfront.net`)
2. Configura un CNAME en tu DNS apuntando a CloudFront
3. Agrega certificado SSL en ACM (us-east-1)
4. Actualiza la distribución con el dominio personalizado

## Script de Despliegue Automatizado

Crea un archivo `deploy.sh`:

```bash
#!/bin/bash

BUCKET_NAME="amplify-videos"

echo "🔨 Building project..."
npm run build

echo "📤 Uploading to S3..."
aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.json"

aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json"

echo "✅ Deployment complete!"
echo "🌐 Site: http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com"
```

Hazlo ejecutable:

```bash
chmod +x deploy.sh
./deploy.sh
```

## URLs Configuradas en el Proyecto

El proyecto está configurado para usar:

- **Bucket**: `amplify-videos`
- **Región**: `us-east-1`
- **URL Base**: `https://amplify-videos.s3.us-east-1.amazonaws.com`

### Archivos Requeridos:

1. `hero-background.mp4` - Video de fondo del hero
2. `video1.mp4` a `video5.mp4` - Videos del carousel
3. `thumbnails/hero-background.jpg` - Thumbnail del hero
4. `thumbnails/video1.jpg` a `video5.jpg` - Thumbnails del carousel

## Costos Estimados

- **S3 Storage**: ~$0.023 por GB/mes
- **S3 Transfer**: $0.09 por GB (primeros 10TB)
- **CloudFront**: $0.085 por GB (primeros 10TB)

Para un sitio con 5 videos de 50MB cada uno:
- Storage: ~$0.006/mes
- Transfer (1000 visitas): ~$2.25/mes

## Troubleshooting

### Error 403 Forbidden
- Verifica que la política del bucket permita acceso público
- Confirma que los archivos tienen permisos de lectura

### Videos no cargan
- Verifica la configuración CORS
- Confirma que los archivos existen en S3
- Revisa el Content-Type de los videos

### Sitio no actualiza
- Limpia el cache de CloudFront si lo usas
- Verifica que los archivos HTML no tengan cache

## Notas Importantes

1. **Reemplaza el nombre del bucket** `amplify-videos` con tu propio nombre único
2. **Sube tus videos** antes de desplegar el sitio
3. **Considera CloudFront** para mejor rendimiento y HTTPS
4. **Optimiza videos** antes de subirlos (compresión, resolución adecuada)
5. **Genera thumbnails** para mejorar la experiencia de carga
