import axios from "axios";
import env from "@/config/env";
import { NewsletterRequest, NewsletterResponse } from "@/types/newsletter";

class NewsletterService {
  async subscribe(payload: NewsletterRequest): Promise<NewsletterResponse> {
    const response = await axios.post<NewsletterResponse>(
      env.api.newsletter + "/subscribe",
      payload
    );
    return response.data;
  }
}

const newsletterService = new NewsletterService();
export default newsletterService;
