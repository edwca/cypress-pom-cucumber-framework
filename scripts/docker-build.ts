import { execSync } from 'child_process';
import { config } from 'dotenv';
import path from 'path';

// Cargar variables desde .env.qa
config({ path: path.resolve('.env.qa') });

const secretKey = process.env.ENV_SECRET_KEY;

if (!secretKey) {
  console.error('❌ ENV_SECRET_KEY no está definido en .env.qa');
  process.exit(1);
}

try {
  console.log('🚧 Construyendo imagen Docker con ENV_SECRET_KEY...');
  execSync(`docker build -t cypress-tests --build-arg ENV_SECRET_KEY=${secretKey} .`, {
    stdio: 'inherit',
  });
  console.log('✅ Imagen construida correctamente: cypress-tests');
} catch (err) {
  console.error('❌ Error al construir la imagen Docker:', err);
  process.exit(1);
}
