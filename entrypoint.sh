#!/bin/sh

echo "🔐 Verificando ENV_SECRET_KEY..."

if [ -z "$ENV_SECRET_KEY" ]; then
  echo "❌ ENV_SECRET_KEY no está definida"
  exit 1
fi

echo "🔓 Desencriptando variables..."
npx tsx scripts/decrypt-env.ts

echo "🚀 Ejecutar pruebas y crear allure results..."
npm run test:qa-sr

echo "📦 Comprimiendo reporte..."
zip -r allure-report.zip allure-report

echo "✅ Pruebas finalizadas. Puedes abrir el reporte desde:"
echo "👉 reportes/allure-report/index.html"

