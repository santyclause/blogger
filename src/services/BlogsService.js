import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Blog } from "@/models/Blog.js";
import { logger } from "@/utils/Logger.js";

class BlogsService {
  async getBlogsByUser(userId) {
    const response = await api.get(`api/blogs?creatorId=${userId}`)
    logger.log(response.data)
    const newBlogs = response.data.map(blog => new Blog(blog));
    AppState.blogs = newBlogs;
    
  }
  
  async getBlogs() {
    const response = await api.get('/api/blogs');
    const newBlogs = response.data.map(blog => new Blog(blog));
    AppState.blogs = newBlogs;
  }
  
  async createPost(formData) {
    const response = await api.post('/api/blogs', formData)
    const newBlog =  new Blog(response.data)
    AppState.blogs.push(newBlog)
  }
}

export const blogsService = new BlogsService();