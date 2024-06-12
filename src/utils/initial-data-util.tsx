export const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getRandomBool = (): boolean => Math.random() < 0.5;

export const getRandomString = (length: number): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};

export const getRandomRole = (): string => {
  const roles = ['Manager', 'Sale'];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

export const getRandomName = (): string => {
  return `Employee${generateUniqueId()}`;
};

export const getRandomPhone = (): string => {
  return `+1 ${Math.floor(Math.random() * 1000000000)}`;
};
