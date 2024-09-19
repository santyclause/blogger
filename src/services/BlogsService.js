import { api } from "./AxiosService.js";

class BlogsService {


  async getBlogs() {
    const response = await api.get('/api/blogs');
    console.log(response.data)
  }
}

export const blogsService = new BlogsService();