<template>
  <div class="component">
    <!-- 
    <router-link :to="{ name: 'Profile', params: { id: profile.account.id } }" v-for="p in profiles.account" :key="p.id"
      :profile.account="p">
      <img class="rounded-circle img-size" :src="posts.creator.picture" alt="">
      <h4>{{ posts.creator.name }}</h4>
    </router-link> -->

    <div class="card" v-for="profiles in profiles">
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

  <img class="col-2 d-flex" :src="ads[0]?.tall" alt="">
  <img class="col-2  d-flex" :src="ads[1]?.tall" alt="">
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