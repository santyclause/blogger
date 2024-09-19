<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState.js';
import { blogsService } from '@/services/BlogsService.js';
import Pop from '@/utils/Pop.js';
import { accountService } from '@/services/AccountService.js';

const account = computed(() => AppState.account)
const blogs = computed(() => AppState.blogs)
const formData = ref({
  title: '',
  body: '',
  imgUrl: ''
})
const userFormData = ref({
  name: '',
  picture: ''
})

watch(account, () => {
  if (!account.value) return
  userFormData.value.name = account.value.name
  userFormData.value.picture = account.value.picture
}, { immediate: true })

onMounted(getBlogsByUser)

async function getBlogsByUser() {
  try {
    // @ts-ignore
    const accountId = AppState.identity.id
    await blogsService.getBlogsByUser(accountId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function createPost() {
  try {
    await blogsService.createPost(formData.value)
    formData.value = {
      title: '',
      body: '',
      imgUrl: ''
    }
  }
  catch (error) {
    Pop.error(error);
  }

}

async function updateAccount() {
  try {
    await accountService.updateAccount(userFormData.value);
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div v-if="account" class="container">
    <section class="row my-5">
      <div class="col-3">
        <div class="d-flex flex-row justify-content-end">
          <img :src="account.picture" :alt="account.name" class="img-fluid user-img">
        </div>
      </div>
      <div class="col-9">
        <div class="d-flex align-items-center h-100">
          <h3 id="userName" class="collapse show shrug">{{ account.name }}</h3>
          <div id="collapseExample" class="collapse shrug">
            <form @submit.prevent="updateAccount()">
              <div class="d-flex flex-column gap-3">
                <div class="d-flex flex-column">
                  <label>Nickname</label>
                  <input type="text" v-model="userFormData.name" id="nickname" name="nickname">
                </div>
                <div class="d-flex flex-column">
                  <label>Image URL</label>
                  <input type="url" v-model="userFormData.picture" id="imgUrl" name="imgUrl">
                </div>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
          <button data-bs-toggle="collapse" data-bs-target=".shrug" class="btn btn-outline-primary mx-3"
            aria-expanded="false" aria-controls="collapseExample"><i class="mdi mdi-pen"></i></button>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <form @submit.prevent="createPost()">
          <div>
            <label for="title" class="form-label fs-3">Title</label>
            <input v-model="formData.title" type="text" name="title" id="title" class="form-control" maxlength="100"
              required>
          </div>
          <div>
            <label for="imgUrl" class="form-label fs-3">Image</label>
            <input v-model="formData.imgUrl" type="url" name="imgUrl" id="imgUrl" class="form-control" maxlength="500">
          </div>
          <div>
            <label for="body" class="form-label fs-3">Body</label>
            <textarea v-model="formData.body" name="body" id="body" class="form-control" maxlength="10000"
              required></textarea>
          </div>
          <div>
            <button class="btn btn-outline-primary my-3" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
    <section v-for="blog in blogs" :key="blog.id" class="row blog-post my-5">
      <BlogPost :blogProp="blog" />
    </section>
  </div>
</template>

<style scoped lang="scss">
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
