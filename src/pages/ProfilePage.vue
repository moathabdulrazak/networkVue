<template>

  <div class="component container-fluid">


    <PostForm />
    <div class="container-fluid">

      <div v-if="profile" class="row container-fluid cover-img" :style="`background-image: url(${profile.coverImg})`">
        <div class="col-12 d-flex align-items-center justify-content-around">
          <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
          <div class="bg-transparent rounded elevation-5 p-5">
            <h1 class="elevation-1">
              {{ profile.name }}
            </h1>
            <h2>
              {{ profile.bio }}
            </h2>
            <h2>
              graduated: {{ profile.graduated }}
            </h2>
            <h2>
              {{ profile.linkedin }}
            </h2>

            <h2>
              class:{{ profile.class }}
            </h2>
            <a v-if="profile.github" :href="profile.github" class="text-light" :disabled="profile.github">
              <i :class="profile.github ? '' : 'text-dark opacity-80 disabled'"
                class="mdi mdi-github fs-1 editAccount"></i>
            </a>
            <a v-if="profile.linkedin" :href="profile.linkedin" class="text-light" :disabled="profile.linkedin">
              <i :class="profile.linkedin ? '' : 'text-dark opacity-80 '" class="mdi mdi-linkedin fs-1 editAccount"></i>
            </a>
            <a v-if="profile.resume" :href="profile.resume" class="text-light" :disabled="profile.resume"
              target="_blank">
              <i :class="profile.resume ? '' : 'text-dark opacity-80 disabled'"
                class="mdi mdi-text fs-1 editAccount"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="row container-fluid">
        <div v-for="p in posts" class="col-md- col-12 p-4">
          <PostCard :posts="p" />
        </div>
      </div>
    </div>
  </div>

  <img class="col-2 d-flex" :src="ads[0]?.tall" alt="">
  <img class="col-2  d-flex" :src="ads[1]?.tall" alt="">
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfileService.js";
import { postService } from "../services/PostService.js";
import { useRoute } from "vue-router";
import { Account } from "../models/Account.js";
import { Ad } from "../models/Ad.js";
import { adsService } from "../services/AdsService.js";
export default {
  props: {
    profile: { type: Account, required: true }
  },
  props: {
    ads: {
      type: Ad,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    async function getProfileById() {
      try {
        await profileService.getProfileById(route.params.profileId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getPostsByCreatorId() {
      try {
        await postService.getPostsByCreatorId(route.params.profileId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
      }
    }
    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
      getAds()
    })
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.ac),
      ads: computed(() => AppState.ads)

    }
  }
};
</script>


<style lang="scss" scoped>
.cover-img {
  min-height: 50vh;
  background-size: cover;
  background-position: center;
}

.profile-picture {
  height: 30vh;
  width: 30vh;
}

.bg-transparent {
  background-color: rgba(222, 184, 135, 0.185);
  text-shadow: 1px 1px white;
}
</style>