<template>
  <!-- <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="exampleInputEmail1">share your thoughts</label>
      <input type="text" class="form-control" v-model="editable.body" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder="your thoughts">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">got a pic with em thoughts?</label>
      <input type="url" class="form-control" v-model="editable.imgUrl" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder="your pic">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form> -->

  <section class="row container-fluid">


    <button class=" col-2 justify-content-center btn mdi mdi-plus selectable fs-5" type="button"
      data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"></button>

    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasTopLabel">posting</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <form @submit.prevent="createPost()">
          <div class="form-group">
            <label for="exampleInputEmail1">share your thoughts</label>
            <input type="text" class="form-control" v-model="editable.body" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="your thoughts">
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">got a pic with em thoughts?</label>
            <input type="url" class="form-control" v-model="editable.imgUrl" id="exampleInputEmail1"
              aria-describedby="emailHelp" placeholder="your pic">
          </div>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="offcanvas">Submit</button>
        </form>

      </div>
    </div>







  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { postService } from "../services/PostService.js";
export default {

  // props: { postData: { type: Object, default: {} } },
  setup() {

    onMounted(() => {
      // editable.value = props.postData
    })
    const editable = ref({})
    async function createPost() {
      try {
        await postService.createPost(editable.value)
        editable.value = {}
        Pop.toast('post uploaded', "success")
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      editable,
      createPost
    }
  }
};
</script>


<style lang="scss" scoped>

</style>