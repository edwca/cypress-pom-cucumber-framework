import { generateRut, formatRut } from "@ftapiat/js-rut-utils";

export const obtenerRutValido = () => generateRut();

export const obtenerRutFormateado = () => formatRut(generateRut());

export function obtenerRutInvalido(): string {
  return "12a34b567"; // inválido
}
