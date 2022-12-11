<template>
  <div class="about row bg-black container-fluid">

    <img class="justify-content-center col-6 container-fluid"
      src="https://i.dailymail.co.uk/1s/2022/12/08/03/65362875-11515013-Showing_skin_DJ_Khaled_bared_his_belly_in_a_new_set_of_online_pr-a-92_1670470768860.jpg"
      alt="">
    <p class="text-center col-6 p-2 text-light">Lorem Khaled Ipsum is a major key to success. Cloth talk. Cloth talk.
      Another one.
      The
      weather is amazing, walk
      with me through the pathway of more success. Take this journey with me, Lion! The key is to enjoy life, because
      they don’t want you to enjoy life. I promise you, they don’t want you to jetski, they don’t want you to smile.
      Surround yourself with angels. The key is to enjoy life, because they don’t want you to enjoy life. I promise you,
      they don’t want you to jetski, they don’t want you to smile.

      Hammock talk come soon. The key to success is to keep your head above the water, never give up. You do know, you
      do know that they don’t want you to have lunch. I’m keeping it real with you, so what you going do is have lunch.
      We the best. Special cloth alert. We don’t see them, we will never see them. The key to success is to keep your
      head above the water, never give up. They don’t want us to win. To be successful you’ve got to work hard, to make
      history, simple, you’ve got to make it. Celebrate success right, the only way, apple.</p>
  </div>

  <img class="col-2 d-flex" :src="ads[0]?.tall" alt="">
  <img class="col-2  d-flex" :src="ads[1]?.tall" alt="">
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";
import { adsService } from "../services/AdsService.js";
import { postService } from "../services/PostService.js";
import Pop from "../utils/Pop.js";
// import AdCard from "../components/AdCard.vue.js";
export default {
  props: {
    ads: {
      type: Ad,
      required: true
    }
  },
  setup() {
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
      ads: computed(() => AppState.ads),
    }
  }
}
</script>
