#!/bin/bash

# Configuración
BUCKET_NAME="finanzasalmando.com"
REGION="us-east-1"

echo "🔨 Building Next.js project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo ""
echo "📤 Uploading to S3 bucket: ${BUCKET_NAME}..."
echo ""

# Subir archivos con cache largo (assets estáticos)
echo "📦 Uploading static assets with long cache..."
aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.json" \
  --exclude "*.txt"

# Subir HTML y JSON sin cache
echo "📄 Uploading HTML/JSON files without cache..."
aws s3 sync out/ s3://${BUCKET_NAME}/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html" \
  --include "*.json" \
  --include "*.txt"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment complete!"
  echo "🌐 Website URL: http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
  echo ""
  echo "💡 Tip: Use CloudFront for HTTPS and better performance"
else
  echo "❌ Deployment failed!"
  exit 1
fi
