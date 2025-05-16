import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.qa' });

const key = process.env.ENV_SECRET_KEY;

if (!key) {
  console.error('❌ ENV_SECRET_KEY no definido. Asegúrate que exista en .env.qa');
  process.exit(1);
}

console.log('🚀 Lanzando contenedor con ENV_SECRET_KEY');
// execSync(`docker run --rm -e ENV_SECRET_KEY=${key} cypress-tests`, { stdio: 'inherit' });

execSync(`docker run --rm \
  -e ENV_SECRET_KEY=${key} \
  -v %cd%/reportes/allure-results:/app/allure-results \
  -v %cd%/reportes/allure-report:/app/allure-report \
  cypress-tests`, { stdio: 'inherit' });