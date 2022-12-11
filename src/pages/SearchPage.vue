<template>
  <div class="component">
    <!-- 
    <router-link :to="{ name: 'Profile', params: { id: profile.account.id } }" v-for="p in profiles.account" :key="p.id"
      :profile.account="p">
      <img class="rounded-circle img-size" :src="posts.creator.picture" alt="">
      <h4>{{ posts.creator.name }}</h4>
    </router-link> -->
    <div class="row container-fluid">
      <img class="col-2 d-flex" :src="ads[0]?.tall" alt="">
      <img class="col-2  d-flex" :src="ads[1]?.tall" alt="">
    </div>
    <div class="card col-3 rounded" v-for="profiles in profiles">
      <h1>{{ profiles.name }}</h1>
      <img class="img-size" :src="profiles.picture" alt="">
      <h4>graduated:{{ profiles.graduated }}</h4>
      <h4>class:{{ profiles.class }}</h4>

    </div>
  </div>

  <!-- <router-link :to="{ name: 'Profile', params: { id: profile.account.id } }" v-for="p in profiles.account" :key="p.id"
    :profile.account="p">
    <div class="card elevation-3 mx-4 my-2">
      <div class="d-flex justify-content-center">
        <img :src="profile.picture" alt="" class="img-fluid rounded  elevation-4" />
      </div>
    </div>
  </router-link> -->
  <div class="row container-fluid">
    <div class="col-md-6">
      <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-outline-info text-dark w-50">
        Previous
      </button>
    </div>

    <div class="col-md-6 justify-content-end d-flex">
      <button @click="changePage(nextPage)" class="btn btn-outline-info text-dark w-50">
        Next
      </button>
    </div>
  </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import { Ad } from "../models/Ad.js";
import { adsService } from "../services/AdsService.js";
export default {

  setup() {
    const route = useRoute()
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
      route,
      profiles: computed(() => AppState.searchProfiles),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads),
      async changePage(url) {
        try {
          await postService.changePage(url);
        } catch (error) {
          console.log(error);
        }
      },
    }
  },
};
</script>


<style lang="scss" scoped>
.img-size {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>