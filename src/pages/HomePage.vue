<script setup>
import { blogsService } from '@/services/BlogsService.js';
import Pop from '@/utils/Pop.js';
import { onMounted } from 'vue';

onMounted(() => {
  getBlogs()
})

async function getBlogs() {
  try {
    await blogsService.getBlogs()
  } catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
