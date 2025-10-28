export interface createServices {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

class ContactService {
  private baseURL = "/api";

  constructor() {
    this.baseURL = "/api";
  }

  async SendContact(data: createServices): Promise<ContactResponse> {
    try {
      const response = await fetch(`${this.baseURL}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Network error occurred Contact Form API",
      };
    }
  }
}

export const sendContact = new ContactService();

export default sendContact;
