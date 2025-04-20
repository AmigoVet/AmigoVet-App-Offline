export const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };