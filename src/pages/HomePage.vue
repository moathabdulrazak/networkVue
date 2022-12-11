<template>
  <div class="ms-4 mt-3 ads container-fluid">
  </div>

  <section class="row justify-content-center container-fluid">
    <div class="col-3">
      <SearchBar />
    </div>
  </section>
  <!-- SECTION FORM -->


  <PostForm />




  <!-- SECTION POST CARD -->
  <div class="container-fluid">
    <div class="row container-fluid">

      <div v-for="p in posts" class="col-10 p-3">
        <PostCard :posts="p" />
      </div>
      <img class="col-2 d-flex" :src="ads[0]?.tall" alt="">
      <img class="col-2 d-flex" :src="ads[1]?.tall" alt="">
    </div>
  </div>
  <div class="row container-fluid">
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
  </div>
  <div>

  </div>
  <!-- SECTION CHANGE PAGE -->



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
    async function getPosts() {
      try {
        await postService.getPosts()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
      }
    }
    onMounted(() => {
      getPosts()
      getAds()
    })
    return {
      ads: computed(() => AppState.ads),
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url) {
        try {
          await postService.changePage(url);
        } catch (error) {
          console.log(error);
        }
      },
    }
  },
  // components: { AdCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
