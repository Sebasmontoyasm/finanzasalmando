#!/bin/bash

# Configuración
BUCKET_NAME="finanzasalmando.com"
REGION="us-east-1"

echo "🚀 Setting up S3 bucket for static website hosting..."
echo ""

# 1. Crear bucket
echo "📦 Creating S3 bucket: ${BUCKET_NAME}..."
aws s3 mb s3://${BUCKET_NAME} --region ${REGION}

if [ $? -ne 0 ]; then
  echo "⚠️  Bucket might already exist or name is taken. Continuing..."
fi

# 2. Configurar hosting estático
echo "🌐 Configuring static website hosting..."
aws s3 website s3://${BUCKET_NAME} \
  --index-document index.html \
  --error-document 404.html

# 3. Desbloquear acceso público
echo "🔓 Enabling public access..."
aws s3api put-public-access-block \
  --bucket ${BUCKET_NAME} \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 4. Aplicar política del bucket
echo "📋 Applying bucket policy..."
aws s3api put-bucket-policy \
  --bucket ${BUCKET_NAME} \
  --policy file://bucket-policy.json

# 5. Configurar CORS
echo "🔄 Configuring CORS..."
aws s3api put-bucket-cors \
  --bucket ${BUCKET_NAME} \
  --cors-configuration file://cors-config.json

echo ""
echo "✅ S3 bucket setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Upload your videos to S3:"
echo "      aws s3 cp your-video.mp4 s3://${BUCKET_NAME}/video1.mp4"
echo ""
echo "   2. Build and deploy your site:"
echo "      ./deploy.sh"
echo ""
echo "🌐 Your website will be available at:"
echo "   http://${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com"
