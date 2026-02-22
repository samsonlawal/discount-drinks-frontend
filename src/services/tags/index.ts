import axios from "axios";
import env from "@/config/env";

// import { IFetchTagQuery, ITag } from "@/types";

interface ICreateTagPayload {
  name: string;
  status?: string;
}

interface IUpdateTagPayload extends ICreateTagPayload {
  id: string;
}

class Service {
  fetchTags(queries?: Record<string, string | number>) {
    return axios.get(env.api.tags, {
      params: queries,
      withCredentials: true,
    });
  }

  createTag({ name, status }: ICreateTagPayload) {
    return axios.post(
      env.api.tags,
      {
        name,
        status,
      },
      {
        withCredentials: true,
      },
    );
  }

  updateTag({ id, name, status }: IUpdateTagPayload) {
    return axios.put(
      env.api.tags + `/` + id,
      {
        name,
        status,
      },
      {
        withCredentials: true,
      },
    );
  }

  deleteTag({ id }: { id: string }) {
    return axios.delete(`${env.api.tags}/${id}`, {
      withCredentials: true,
    });
  }

  getTagById({ tagId }: { tagId: string }) {
    return axios.get(`${env.api.tags}/${tagId}`, {
      withCredentials: true,
    });
  }
}

const TagsService = new Service();
export default TagsService;
