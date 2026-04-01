export interface ContactFormData {
  from_name: string;
  reply_to: string;
  company?: string;
  phone: string;
  province: string;
  locality: string;
  location?: string;
  subject: string;
  message: string;
}

export const sendContactForm = async (data: ContactFormData) => {
  // En local, Vite redirigirá esto al puerto 3001 gracias al proxy
  // En Vercel, se ejecutará automáticamente como una Serverless Function
  const API_URL = "/api/contact";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al enviar el email");
  }

  return await response.json();
};
