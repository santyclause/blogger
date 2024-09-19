<script setup>
import { AppState } from '@/AppState.js';
import BlogPost from '@/components/globals/BlogPost.vue';
import { blogsService } from '@/services/BlogsService.js';
import { usersService } from '@/services/UsersService.js';
import Pop from '@/utils/Pop.js';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const user = computed(() => AppState.activeProfile)
const blogs = computed(() => AppState.blogs)

watch(() => route.params.userId, () => {
  getUserById()
  getBlogsByUser()
}, { immediate: true })

async function getUserById() {
  try {
    const userId = route.params.userId;
    await usersService.getUserById(userId);
  } catch (error) {
    Pop.error(error)
  }
}
async function getBlogsByUser() {
  try {
    const userId = route.params.userId
    await blogsService.getBlogsByUser(userId)
  }
  catch (error) {
    Pop.error(error);
  }

}


</script>


<template>
  <div v-if="user" class="container">
    <section class="row my-5">
      <div class="col-3">
        <div class="d-flex flex-row">
          <img :src="user.picture" :alt="user.name" class="img-fluid user-img">
        </div>
      </div>
      <div class="col-9">
        <div class="d-flex align-items-end h-100">
          <h3>{{ user.name }}</h3>
        </div>
      </div>
    </section>
    <section v-for="blog in blogs" :key="blog.id" class="row blog-post my-5">
      <BlogPost :blogProp="blog" />
    </section>
  </div>
</template>


<style lang="scss" scoped>
.user-img {
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.blog-post {
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5em
}
</style>