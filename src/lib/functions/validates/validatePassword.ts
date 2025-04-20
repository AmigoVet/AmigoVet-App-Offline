export const validatePassword = (password: string) => {
  const missingElements: string[] = [];
  if (!/[A-Z]/.test(password)) missingElements.push('una letra mayúscula');
  if (!/\d/.test(password)) missingElements.push('un número');
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) missingElements.push('un símbolo');
  if (password.length < 6) missingElements.push('mínimo 6 caracteres');
  return missingElements;
};