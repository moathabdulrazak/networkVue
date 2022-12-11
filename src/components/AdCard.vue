<template>
  <div class="component">
    <h2>{{ ads }}</h2>

    <img :src="ads.tall" :alt="ads.tall">
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ad } from "../models/Ad.js";
import { adsService } from '../services/AdsService.js'
export default {


  setup(props) {
    return {
      ads: computed(() => AppState.ads),
    }
  }
};
</script>


<style lang="scss" scoped>

</style>