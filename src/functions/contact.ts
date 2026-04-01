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
    let errorMessage = "Error al enviar el email";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Si no es JSON (ej. error 504 del proxy o servidor caído), usamos el statusText
      console.error("No se pudo parsear la respuesta de error como JSON:", e);
      errorMessage = `Error del servidor (${response.status}): ${response.statusText || 'No se pudo completar la conexión'}`;
    }
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    console.error("No se pudo parsear la respuesta de éxito como JSON:", e);
    throw new Error("Respuesta del servidor inválida");
  }
};
