import axios from "axios";
import env from "@/config/env";

// import { IFetchTagQuery, ITag } from "@/types";

class Service {
  fetchTags(queries?: any) {
    return axios.get(env.api.tags, {
      params: queries,
      withCredentials: true,
    });
  }

  createTag({ name, status }: any) {
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

  updateTag({ id, name, status }: any) {
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
