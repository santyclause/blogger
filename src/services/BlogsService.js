import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Blog } from "@/models/Blog.js";

class BlogsService {


  async getBlogs() {
    const response = await api.get('/api/blogs');
    const newBlogs = response.data.map(blog => new Blog(blog));
    AppState.blogs = newBlogs;
  }
}

export const blogsService = new BlogsService();