#!/bin/bash

# Configuración
DOMAIN="finanzasalmando.com"
BUCKET_NAME="finanzasalmando.com"
REGION="us-east-1"

echo "☁️  Setting up CloudFront distribution for HTTPS..."
echo ""

# Verificar que existe un certificado SSL en ACM (us-east-1)
echo "🔍 Checking for SSL certificate in ACM (us-east-1)..."
CERT_ARN=$(aws acm list-certificates \
  --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='${DOMAIN}'].CertificateArn" \
  --output text)

if [ -z "$CERT_ARN" ]; then
  echo "⚠️  No SSL certificate found for ${DOMAIN}"
  echo ""
  echo "📝 To create a certificate:"
  echo "   1. Go to AWS Certificate Manager (ACM) in us-east-1"
  echo "   2. Request a public certificate for ${DOMAIN}"
  echo "   3. Validate via DNS (Route 53 makes this easy)"
  echo "   4. Wait for certificate to be issued"
  echo "   5. Run this script again"
  echo ""
  read -p "Do you want to request a certificate now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    aws acm request-certificate \
      --domain-name ${DOMAIN} \
      --validation-method DNS \
      --region us-east-1
    echo ""
    echo "✅ Certificate requested!"
    echo "   Go to ACM console to complete DNS validation"
    exit 0
  else
    exit 1
  fi
fi

echo "✅ Found certificate: ${CERT_ARN}"
echo ""

# Crear configuración de CloudFront
cat > cloudfront-config.json <<EOF
{
  "CallerReference": "$(date +%s)",
  "Comment": "CloudFront distribution for ${DOMAIN}",
  "Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-${BUCKET_NAME}",
        "DomainName": "${BUCKET_NAME}.s3-website-${REGION}.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only"
        }
      }
    ]
  },
  "DefaultRootObject": "index.html",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-${BUCKET_NAME}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "Aliases": {
    "Quantity": 1,
    "Items": ["${DOMAIN}"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "${CERT_ARN}",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "PriceClass": "PriceClass_100"
}
EOF

echo "📦 Creating CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json \
  --query 'Distribution.Id' \
  --output text)

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ CloudFront distribution created!"
  echo ""
  echo "📋 Distribution ID: ${DISTRIBUTION_ID}"
  echo ""
  echo "⏳ Distribution is being deployed (this takes 15-20 minutes)"
  echo ""
  echo "📝 Next steps:"
  echo "   1. Wait for distribution to deploy"
  echo "   2. Get CloudFront domain name:"
  echo "      aws cloudfront get-distribution --id ${DISTRIBUTION_ID}"
  echo "   3. Update Route 53 to point to CloudFront"
  echo "   4. Test HTTPS: https://${DOMAIN}"
else
  echo "❌ Failed to create CloudFront distribution"
  rm -f cloudfront-config.json
  exit 1
fi

# Limpiar archivo temporal
rm -f cloudfront-config.json

echo ""
echo "💡 To update Route 53 to use CloudFront:"
echo "   Run: ./update-route53-cloudfront.sh ${DISTRIBUTION_ID}"
