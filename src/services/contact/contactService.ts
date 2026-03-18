import axios from "axios";
import env from "@/config/env";
import { ContactRequest, ContactResponse } from "@/types/contact";

class ContactService {
  async sendContactMessage(payload: ContactRequest): Promise<ContactResponse> {
    const response = await axios.post<ContactResponse>(env.api.contact, payload);
    return response.data;
  }
}

const contactService = new ContactService();
export default contactService;
