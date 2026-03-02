# Configuración de Route 53 y Dominio Personalizado

Guía para configurar `finanzasalmando.com` con S3 y Route 53.

## Opción 1: S3 + Route 53 (Solo HTTP)

Esta es la opción más simple pero solo soporta HTTP (no HTTPS).

### Paso 1: Configurar S3

```bash
# Ejecutar setup de S3
./setup-s3.sh
```

**IMPORTANTE**: El bucket DEBE llamarse exactamente igual que tu dominio: `finanzasalmando.com`

### Paso 2: Configurar Route 53

```bash
# Hacer ejecutable el script
chmod +x setup-route53.sh

# Ejecutar configuración de Route 53
./setup-route53.sh
```

Este script:
1. Busca tu Hosted Zone en Route 53
2. Crea un registro A que apunta al bucket S3
3. Configura el alias automáticamente

### Paso 3: Verificar

Espera 5-10 minutos para propagación DNS, luego:

```bash
# Verificar DNS
dig finanzasalmando.com

# Probar en navegador
http://finanzasalmando.com
```

## Opción 2: S3 + CloudFront + Route 53 (HTTPS) ⭐ RECOMENDADO

Esta opción incluye HTTPS, mejor rendimiento y CDN global.

### Paso 1: Configurar S3

```bash
./setup-s3.sh
```

### Paso 2: Solicitar Certificado SSL

```bash
# Hacer ejecutable el script
chmod +x setup-cloudfront.sh

# Ejecutar (solicitará certificado si no existe)
./setup-cloudfront.sh
```

O manualmente en la consola de AWS:

1. Ve a **AWS Certificate Manager (ACM)** en región **us-east-1**
2. Click "Request certificate"
3. Ingresa: `finanzasalmando.com`
4. Método de validación: **DNS validation**
5. Click "Request"
6. En la lista de certificados, click en el nuevo certificado
7. Click "Create records in Route 53" (si tu dominio está en Route 53)
8. Espera a que el estado sea "Issued" (5-30 minutos)

### Paso 3: Crear Distribución CloudFront

Una vez que el certificado esté emitido:

```bash
./setup-cloudfront.sh
```

Esto creará una distribución CloudFront con:
- HTTPS habilitado
- Redirección automática HTTP → HTTPS
- Compresión habilitada
- Cache optimizado
- Dominio personalizado configurado

### Paso 4: Actualizar Route 53

Espera 15-20 minutos a que CloudFront se despliegue, luego:

```bash
# Obtener el dominio de CloudFront
aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items[0]=='finanzasalmando.com'].DomainName" \
  --output text

# Actualizar Route 53 manualmente o usar la consola
```

O en la consola de AWS:

1. Ve a **Route 53** → **Hosted Zones**
2. Click en `finanzasalmando.com`
3. Edita el registro A
4. Cambia el alias target a la distribución CloudFront
5. Guarda

### Paso 5: Verificar HTTPS

```bash
# Probar en navegador
https://finanzasalmando.com
```

## Estructura de Archivos en S3

```
finanzasalmando.com/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── hero-background.mp4
├── video1.mp4
├── video2.mp4
├── video3.mp4
├── video4.mp4
├── video5.mp4
└── thumbnails/
    ├── hero-background.jpg
    ├── video1.jpg
    ├── video2.jpg
    ├── video3.jpg
    ├── video4.jpg
    └── video5.jpg
```

## Comandos Útiles

### Verificar Hosted Zone

```bash
aws route53 list-hosted-zones-by-name \
  --dns-name finanzasalmando.com
```

### Verificar Registros DNS

```bash
aws route53 list-resource-record-sets \
  --hosted-zone-id YOUR_HOSTED_ZONE_ID
```

### Verificar Certificado SSL

```bash
aws acm list-certificates \
  --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='finanzasalmando.com']"
```

### Verificar Distribución CloudFront

```bash
aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items[0]=='finanzasalmando.com']"
```

### Invalidar Cache de CloudFront

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Comparación de Opciones

| Característica | S3 + Route 53 | S3 + CloudFront + Route 53 |
|----------------|---------------|----------------------------|
| HTTPS | ❌ No | ✅ Sí |
| Velocidad | Media | ⚡ Rápida (CDN) |
| Costo | $ Bajo | $$ Medio |
| Configuración | Simple | Moderada |
| SEO | ⚠️ Limitado | ✅ Óptimo |
| Recomendado | Desarrollo | ✅ Producción |

## Costos Estimados (CloudFront)

Para un sitio con 1000 visitas/mes:

- **S3 Storage**: $0.006/mes
- **S3 Transfer a CloudFront**: Gratis
- **CloudFront Transfer**: ~$0.85/mes
- **CloudFront Requests**: ~$0.01/mes
- **Route 53 Hosted Zone**: $0.50/mes
- **Total**: ~$1.36/mes

## Troubleshooting

### Error: Hosted Zone not found

```bash
# Crear Hosted Zone
aws route53 create-hosted-zone \
  --name finanzasalmando.com \
  --caller-reference $(date +%s)
```

### Error: Certificate not found

El certificado debe estar en región **us-east-1** para CloudFront.

### Error: Bucket name must match domain

El bucket S3 DEBE llamarse exactamente `finanzasalmando.com` para usar con Route 53.

### DNS no resuelve

- Espera 5-10 minutos para propagación
- Verifica que los nameservers de tu dominio apunten a Route 53
- Usa `dig` o `nslookup` para verificar

```bash
dig finanzasalmando.com
nslookup finanzasalmando.com
```

### CloudFront muestra error

- Verifica que el origen apunte al endpoint de website de S3
- Usa: `finanzasalmando.com.s3-website-us-east-1.amazonaws.com`
- NO uses: `finanzasalmando.com.s3.amazonaws.com`

## Nameservers de Route 53

Después de crear el Hosted Zone, necesitas configurar estos nameservers en tu registrador de dominios:

```bash
# Obtener nameservers
aws route53 get-hosted-zone \
  --id YOUR_HOSTED_ZONE_ID \
  --query "DelegationSet.NameServers"
```

Ejemplo de nameservers:
```
ns-123.awsdns-12.com
ns-456.awsdns-34.net
ns-789.awsdns-56.org
ns-012.awsdns-78.co.uk
```

Configura estos en tu registrador de dominios (GoDaddy, Namecheap, etc.)

## Recursos Adicionales

- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [ACM Documentation](https://docs.aws.amazon.com/acm/)
- [S3 Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
