<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <h1> {{ account.bio }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.class }}</p>
    <!-- <p>{{ account.graduated }}</p> -->
  </div>
  <img class="col-2 d-flex p-1" :src="ads[0]?.tall" alt="">
  <img class="col-2  d-flex p-1" :src="ads[1]?.tall" alt="">

  <div class="container-fluid">
    <div class="row justify-content-center container-fluid">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">class</label>
            <input v-model="editable.class" type="text" required class="form-control" id="class">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">github</label>
            <input v-model="editable.github" :href="account.github" type="url" required class="form-control"
              id="github">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">coverImg</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
          </div>
          <!-- <div class="mb-3">
            <label for="graduated" class="form-label">graduated</label>
            <input checkbox v-model="editable.graduated" type="check" required class="form-control" id="coverImg">
          </div> -->
          <!-- <div class="form-check">
            <input v-modal="editable.graduated" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              graduated
            </label>
          </div> -->
          <div class=" d-flex align-items-center">
            <label class=" mt-2 " for="graduated">
              <div text="Graduated">
                <i class="mdi mdi-account-school-outline fs-2"></i>
              </div>
            </label>
            <div>
              <input class="form-check-input checkbox" type="checkbox" name="graduated" v-model="editable.graduated" />
            </div>
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">resume</label>
            <input v-model="editable.resume" type="url" required class="form-control" id="coverImg">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <button class="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>



</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { onMounted } from "vue";
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { adsService } from "../services/AdsService.js";
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
      }
    }
    onMounted(() => {
      getAds()
    })
    return {
      editable,
      ads: computed(() => AppState.ads),
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          debugger
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
