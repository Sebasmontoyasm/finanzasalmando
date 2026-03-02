#!/bin/bash

# Configuración
DOMAIN="finanzasalmando.com"
BUCKET_NAME="finanzasalmando.com"
REGION="us-east-1"

echo "🌐 Setting up Route 53 for ${DOMAIN}..."
echo ""

# Obtener el Hosted Zone ID
echo "🔍 Finding Route 53 Hosted Zone..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
  --dns-name ${DOMAIN} \
  --query "HostedZones[0].Id" \
  --output text | cut -d'/' -f3)

if [ -z "$HOSTED_ZONE_ID" ] || [ "$HOSTED_ZONE_ID" == "None" ]; then
  echo "❌ Error: Hosted Zone for ${DOMAIN} not found in Route 53"
  echo "   Please create a Hosted Zone first in Route 53 console"
  exit 1
fi

echo "✅ Found Hosted Zone ID: ${HOSTED_ZONE_ID}"
echo ""

# Crear archivo de configuración para el registro A
cat > route53-record.json <<EOF
{
  "Comment": "Create A record for S3 website",
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${DOMAIN}",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z3AQBSTGFYJSTF",
          "DNSName": "s3-website-us-east-1.amazonaws.com",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF

# Crear registro A en Route 53
echo "📝 Creating A record in Route 53..."
aws route53 change-resource-record-sets \
  --hosted-zone-id ${HOSTED_ZONE_ID} \
  --change-batch file://route53-record.json

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Route 53 configuration complete!"
  echo ""
  echo "📋 Summary:"
  echo "   Domain: ${DOMAIN}"
  echo "   Hosted Zone ID: ${HOSTED_ZONE_ID}"
  echo "   Points to: S3 website endpoint"
  echo ""
  echo "⏳ DNS propagation may take 5-10 minutes"
  echo "🌐 Your site will be available at: http://${DOMAIN}"
  echo ""
  echo "💡 Next steps:"
  echo "   1. Wait for DNS propagation"
  echo "   2. Test: http://${DOMAIN}"
  echo "   3. Consider adding CloudFront for HTTPS"
else
  echo "❌ Failed to create Route 53 record"
  exit 1
fi

# Limpiar archivo temporal
rm -f route53-record.json
