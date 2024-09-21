<template>
  <div v-if="posts.length>= 1" v-for="post in posts" :key="post._id" >
    <ManageMyListing class="flex mx-auto" :key="post._id" :post="post" />
  <div v-if="post" class="md:mt-2 flex flex-col items-center">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
      <div class="">
        <img class="h-96 w-96 mb-6 rounded-xl object-cover shadow-md" alt="post image" :src="post.imgURL" />
      </div>
      <div class="space-y-4">
        <h2 class="text-dark-purple font-semibold text-2xl mb-4">
          {{ post.title }}
        </h2>
        <div class="text-dark-purple font-semibold text-lg my-4">
          <h3>
            Asking Price:
            {{
              (post.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            }}
          </h3>
          <h3>Condition: {{ post.condition }}</h3>
          <h3>Size: {{ post.size }}</h3>
          <h3>Location: {{ post.location }}</h3>
        </div>
        <div class="text-dark-purple font-semibold text-lg mb-4">
          <h3>Payment: {{ post.paymentType }}</h3>
          <h3>Shipping: {{ post.shippingOption }}</h3>
        </div>
        <h3 class="text-dark-purple font-semibold text-lg mb-10">
          Description:
          <h2 class="text-black font-epilogue font-medium">
            {{ post.description }}
          </h2>
        </h3>
      </div>
    </div>
  </div>
  </div>

<div v-else>
  <h1 class="text-center m-12">
    There are no available list item. All product added will be list here!
  </h1>
</div>

</template>

<script>
import ManageMyListing from '../components/ManageMyListing.vue';
import axios from 'axios';


export default {
  name: "MyListings",
  props: {
    user: Object,
  },
  components: {
    ManageMyListing,
    axios
  },
  data() {
    return {
      posts: []
    };
  },

  mounted() {
    this.getPosts();
  },

  computed: {},

  methods: {

    async getPosts() {
      axios.get("https://mevn-ecomerce-application.onrender.com/posts")
        .then((response) => {
          this.posts = response.data.result.filter(a=>a.author._id === this.user?.id)
          console.log("items", this.posts)




        })
        .catch((err) => {
          console.log(err)
        })

    },
  }


}

</script>

<style></style>