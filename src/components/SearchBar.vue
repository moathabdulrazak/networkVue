<template>
  <div class="component">

    <form action="" class="input-group" @submit.prevent="search()">
      <input placeholder="search profiles" type="text" class="form-control" v-model="searchTerm.query">
      <button class="btn btn-info w-25"><i class="mdi mdi-magnify"></i></button>
    </form>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { searchService } from "../services/SearchService.js";
import { useRouter } from "vue-router";
import { profileService } from "../services/ProfileService.js";

export default {

  setup() {
    const router = useRouter()
    const searchTerm = reactive({
      query: ''
    })
    return {
      searchTerm,
      async search() {
        try {
          await profileService.search(searchTerm)
          router.push({ name: 'Search', params: { searchTerm: searchTerm.query } })

          // router.push({ name: 'CarDetails', params: { id: props.car.id } }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>