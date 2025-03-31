// services/userService.ts
export function formatearRut(rut: string): string {
    return rut.replace(/\./g, '').replace('-', '');
  }
  
  export function esRutValido(rut: string): boolean {
    // Lógica simple de validación
    return /\d{7,8}-[\dkK]/.test(rut);
  }