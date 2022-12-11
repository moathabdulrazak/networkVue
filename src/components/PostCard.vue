<template>





  <!-- SECTION post card -->
  <div class="row container-fluid justify-content-center">
    <div class=" movin-body col-6 elevation-1 justify-content-center">
      <img v-if="!posts.img" class="img-size-body justify-content-center movin-pic" :src="posts.imgUrl" alt="">
      <h4 class="text-center">{{ posts.body }}</h4>
      <router-link v-if="route.name == 'Home'" :to="{ name: 'Profile', params: { profileId: posts?.creatorId } }">
        <div class="">
          <img class="rounded-circle img-size" :src="posts.creator.picture" alt="">
          <h4>{{ posts.creator.name }}</h4>
        </div>
      </router-link>

      <button @click.prevent="createLikes" class="mdi mdi-heart bg-danger btn-btn-">{{ posts.likes?.length }}</button>
      <div>
        <h6> {{ posts.createdAt.slice(0, 10) }}</h6>
      </div>
      <button v-if="(posts.creatorId == account.id)" @click="deletePost()"
        class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>
    </div>
  </div>








</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post.js";
import Pop from "../utils/Pop.js";
import { postService } from "../services/PostService.js";
import { useRoute } from "vue-router";
export default {
  props: {
    posts: {
      type: Post,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),

      async deletePost() {
        try {
          console.log(props, "this is the props");
          await postService.deletePost(props.posts.id)
        } catch (error) {
          Pop.error(error)
        }
      },
      async createLikes() {
        try {
          await postService.createLikes(props.posts.id)
        } catch (error) {
          Pop.error()
        }
      }
    }
  }


};
</script>


<style lang="scss" scoped>
.img-size {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.movin-body {
  margin-left: 15em;
}

.card-size {
  width: 200px;
  height: 200px;
}


.movin-pic {
  margin-left: 6em;
}

.img-size-body {
  width: 55vh;
  height: 50vh;
  position: center;
  object-fit: cover;
  padding-right: 3em;
  margin-block-start: 2em;
}
</style>