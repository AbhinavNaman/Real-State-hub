// utils/toBase64.js
export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // returns full data:image/jpeg;base64,...
      reader.onerror = (error) => reject(error);
    });
  