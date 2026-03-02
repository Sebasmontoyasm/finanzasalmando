# ✅ Checklist de Despliegue en S3

Usa esta lista para asegurar un despliegue exitoso.

## Pre-Despliegue

### 1. Preparación de Videos
- [ ] Videos optimizados y comprimidos
- [ ] Resolución adecuada (1080p recomendado)
- [ ] Formato MP4 con codec H.264
- [ ] Tamaño razonable (< 100MB por video recomendado)
- [ ] Thumbnails generados (opcional pero recomendado)

### 2. Configuración de AWS
- [ ] AWS CLI instalado (`aws --version`)
- [ ] Credenciales configuradas (`aws configure`)
- [ ] Permisos de S3 verificados
- [ ] Región seleccionada (us-east-1 por defecto)

### 3. Configuración del Proyecto
- [ ] Dependencias instaladas (`npm install`)
- [ ] Build local exitoso (`npm run build`)
- [ ] Nombre del bucket decidido (debe ser único)
- [ ] Scripts tienen permisos de ejecución (`chmod +x *.sh`)

## Configuración Inicial (Una sola vez)

### 4. Setup del Bucket S3
```bash
./setup-s3.sh
```

- [ ] Bucket creado exitosamente
- [ ] Hosting estático habilitado
- [ ] Acceso público configurado
- [ ] Política del bucket aplicada
- [ ] CORS configurado

### 5. Personalización (Opcional)
- [ ] Cambiar nombre del bucket en todos los archivos
- [ ] Actualizar región si es necesario
- [ ] Modificar URLs en componentes
- [ ] Ajustar configuración de cache

## Subida de Contenido

### 6. Subir Videos
```bash
./upload-videos.sh
```

- [ ] hero-background.mp4 subido
- [ ] video1.mp4 subido
- [ ] video2.mp4 subido
- [ ] video3.mp4 subido
- [ ] video4.mp4 subido
- [ ] video5.mp4 subido
- [ ] Thumbnails subidos (si aplica)

### 7. Verificar Videos en S3
- [ ] Videos accesibles vía URL directa
- [ ] Content-Type correcto (video/mp4)
- [ ] Permisos de lectura pública

## Despliegue del Sitio

### 8. Build y Deploy
```bash
./deploy.sh
```

- [ ] Build completado sin errores
- [ ] Archivos subidos a S3
- [ ] Cache configurado correctamente
- [ ] HTML sin cache, assets con cache largo

### 9. Verificación Post-Despliegue
- [ ] Sitio accesible en URL de S3
- [ ] Página principal carga correctamente
- [ ] Video del hero se reproduce
- [ ] Carousel de videos funciona
- [ ] Navegación entre secciones funciona
- [ ] Responsive en móvil
- [ ] Responsive en tablet
- [ ] Responsive en desktop

### 10. Pruebas de Videos
- [ ] Video del hero carga y reproduce
- [ ] Videos del carousel cargan
- [ ] Controles de play/pause funcionan
- [ ] Navegación del carousel funciona
- [ ] Thumbnails se muestran (si aplica)
- [ ] Videos no tienen errores CORS

## Optimización (Recomendado)

### 11. CloudFront (Opcional)
- [ ] Distribución CloudFront creada
- [ ] Origen configurado a bucket S3
- [ ] Certificado SSL configurado (ACM)
- [ ] Dominio personalizado agregado
- [ ] DNS actualizado (CNAME)
- [ ] Cache behaviors configurados
- [ ] Invalidación de cache probada

### 12. Dominio Personalizado
- [ ] Dominio registrado
- [ ] DNS configurado
- [ ] Certificado SSL válido
- [ ] HTTPS funcionando
- [ ] Redirección HTTP → HTTPS

### 13. Monitoreo
- [ ] Analytics configurado
- [ ] Logs de S3 habilitados (opcional)
- [ ] CloudWatch alarms (opcional)
- [ ] Presupuesto de AWS configurado

## Mantenimiento

### 14. Actualizaciones Futuras
Para actualizar el sitio:
```bash
# 1. Hacer cambios en el código
# 2. Ejecutar deploy
./deploy.sh
```

Para actualizar videos:
```bash
# 1. Reemplazar archivos de video
# 2. Ejecutar upload
./upload-videos.sh
```

### 15. Limpieza de Cache (si usas CloudFront)
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Troubleshooting

### Problemas Comunes

#### ❌ Error 403 Forbidden
- [ ] Verificar política del bucket
- [ ] Confirmar acceso público habilitado
- [ ] Revisar permisos de archivos

#### ❌ Videos no cargan
- [ ] Verificar URLs en el código
- [ ] Confirmar CORS configurado
- [ ] Revisar Content-Type de videos
- [ ] Verificar que archivos existen en S3

#### ❌ Sitio no actualiza
- [ ] Limpiar cache del navegador
- [ ] Invalidar cache de CloudFront
- [ ] Verificar que archivos se subieron

#### ❌ Build falla
- [ ] Verificar errores de TypeScript
- [ ] Confirmar dependencias instaladas
- [ ] Revisar configuración de Next.js

## URLs de Referencia

Guarda estas URLs para acceso rápido:

- **Sitio Web**: http://amplify-videos.s3-website-us-east-1.amazonaws.com
- **Bucket S3**: https://s3.console.aws.amazon.com/s3/buckets/amplify-videos
- **CloudFront** (si aplica): https://console.aws.amazon.com/cloudfront

## Costos a Monitorear

- [ ] Storage de S3
- [ ] Transfer de datos
- [ ] Requests de S3
- [ ] CloudFront (si aplica)

## Notas Adicionales

Fecha de despliegue: _______________
Versión desplegada: _______________
Responsable: _______________
Notas especiales: _______________
