<script setup>
import { Blog } from '@/models/Blog.js';


defineProps({
  blogProp: { type: Blog, required: true }
})

</script>


<template>
  <div v-if="blogProp" class="col-8">
    <div class="d-flex flex-column justify-content-between h-100">
      <div>
        <div class="d-flex gap-3 align-items-end mb-3">
          <img :src="blogProp.creator.picture" :alt="blogProp.creator.name" class="user-image">
          <p class="fs-5">{{ blogProp.creator.name }}</p>
        </div>
        <h4>{{ blogProp.title }}</h4>
        <p>{{ blogProp.body }}</p>
      </div>
      <p>{{ blogProp.createdAt?.toLocaleString() }}</p>
    </div>
  </div>
  <div v-if="blogProp" class="col-4">
    <img :src="blogProp.imgUrl" :alt="blogProp.title" class="blog-image">
  </div>
</template>


<style lang="scss" scoped>
p {
  margin: 0;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>