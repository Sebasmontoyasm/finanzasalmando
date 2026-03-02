#!/bin/bash

# Configuración
BUCKET_NAME="finanzasalmando.com"
REGION="us-east-1"

echo "📹 Uploading videos to S3..."
echo ""

# Verificar que los archivos existan
if [ ! -f "hero-background.mp4" ]; then
  echo "⚠️  Warning: hero-background.mp4 not found"
fi

# Subir video del hero
if [ -f "hero-background.mp4" ]; then
  echo "📤 Uploading hero-background.mp4..."
  aws s3 cp hero-background.mp4 s3://${BUCKET_NAME}/hero-background.mp4 \
    --content-type video/mp4 \
    --cache-control "public, max-age=31536000"
fi

# Subir videos del carousel
for i in {1..5}; do
  if [ -f "video${i}.mp4" ]; then
    echo "📤 Uploading video${i}.mp4..."
    aws s3 cp video${i}.mp4 s3://${BUCKET_NAME}/video${i}.mp4 \
      --content-type video/mp4 \
      --cache-control "public, max-age=31536000"
  else
    echo "⚠️  Warning: video${i}.mp4 not found"
  fi
done

# Subir thumbnails si existen
if [ -d "thumbnails" ]; then
  echo ""
  echo "🖼️  Uploading thumbnails..."
  aws s3 sync thumbnails/ s3://${BUCKET_NAME}/thumbnails/ \
    --content-type image/jpeg \
    --cache-control "public, max-age=31536000"
fi

echo ""
echo "✅ Video upload complete!"
echo ""
echo "📝 Uploaded files:"
echo "   - hero-background.mp4"
echo "   - video1.mp4 to video5.mp4"
echo "   - thumbnails/ (if available)"
echo ""
echo "🔗 Videos are accessible at:"
echo "   https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/video1.mp4"
