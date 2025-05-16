import { execSync } from 'child_process';

const IMAGE_NAME = process.argv[2] || 'cypress-tests';

function runCommand(command: string) {
  try {
    return execSync(command).toString().trim();
  } catch (error: any) {
    console.error(`❌ Error al ejecutar '${command}':`, error.message);
    process.exit(1);
  }
}

function removeDockerImage(imageName: string) {
  console.log(`🔍 Buscando contenedores para la imagen '${imageName}'...`);

  const containerList = runCommand(`docker ps -a --filter ancestor=${imageName} --format "{{.ID}}"`)
    .split('\n')
    .filter(Boolean);

  if (containerList.length > 0) {
    console.log(`🧼 Eliminando ${containerList.length} contenedor(es)...`);
    containerList.forEach((id) => {
      runCommand(`docker rm -f ${id}`);
      console.log(`🗑️ Contenedor eliminado: ${id}`);
    });
  } else {
    console.log('✅ No hay contenedores asociados.');
  }

  console.log(`🗑️ Eliminando imagen '${imageName}'...`);
  runCommand(`docker rmi ${imageName}`);
  console.log('✅ Imagen eliminada correctamente.');
}

removeDockerImage(IMAGE_NAME);
