<script setup>
import { AppState } from '@/AppState.js';
import BlogPost from '@/components/globals/BlogPost.vue';
import { blogsService } from '@/services/BlogsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getBlogs()
})

const blogs = computed(() => AppState.blogs)

async function getBlogs() {
  try {
    await blogsService.getBlogs()
  } catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="container">
    <section v-for="blog in blogs" :key="blog.id" class="row blog-post my-5">
      <BlogPost :blogProp="blog" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.blog-post {
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5em
}
</style>
