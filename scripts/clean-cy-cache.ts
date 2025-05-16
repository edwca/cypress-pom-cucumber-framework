/* eslint-disable no-console */

import { rimraf } from "rimraf";
import path from "path";
import os from "os";
import { rmSync } from "fs";


const projectCacheDir = path.join(
  os.homedir(),
  "AppData",
  "Roaming",
  "Cypress",
  "cy",
  "production",
  "projects"
);

try {
  rmSync(projectCacheDir, { recursive: true, force: true });
  console.log("✅ Proyecto en caché de Cypress eliminado correctamente.");
} catch (error) {
  console.error("❌ Error al eliminar proyecto en caché:", error);
}
