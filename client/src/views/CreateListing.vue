<template class="">
  <div class="w-full">
    <BackToListings />
    <form @submit.prevent="createPost" class="mx-auto my-12 box-border p-4 flex flex-col">
      <h1 class="text-bright-purple text-3xl self-center mb-12">
        Create Listings
      </h1>
      <div class="flex-cols lg:flex">
        <div class="item-image flex-1 p-4 mt-4 border-2 flex flex-col">
          <div class="image flex-1">
            <img :src="imgURL" alt="" />
          </div>
          <input ref="inputRef" type="file" accept="image/*" class="hidden border-2 lg:m-4 p-4"
            @change="handleFileChange" required />
          <div v-if="loading" class="loadingSpinner"></div>
          <button v-else @click="imageBtnClick" class="
              border-2 border-bright-purple
              rounded-lg
              cursor-pointer
              w-full
              p-2
            ">
            Upload Image
          </button>
        </div>
        <div class="item-info flex-1 flex flex-col p-4">
          <div class="form-group my-2">
            <label for="">Listing Title</label>
            <input type="text" v-model="title" class="
                w-full
                mt-2
                block
                py-1
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required />
          </div>
          <div class="form-group my-2">
            <label for="">Listing Price</label>
            <input type="number" step=".01" v-model="price" class="
                w-full
                mt-2
                block
                py-1
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required />
          </div>
          <div class="form-group">
            <label for="">Category</label>
            <select name="" id="" v-model="category" class="
                my-2
                w-full
                block
                py-2
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required>
              <option selected disabled value="Category">Select Catgory</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Children">Children</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Condition</label>
            <select name="" id="" v-model="condition" class="
                my-2
                w-full
                block
                py-2
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required>
              <option selected disabled value="Select Condition">Select Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div class="form-group my-4">
            <label for="">Item Size</label>
            <input type="text" v-model="size" class="
                mt-2
                w-full
                block
                py-1
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required />
          </div>
          <div class="form-group">
            <label for="">location</label>
            <select name="" id="" v-model="location" class="
                my-2
                w-full
                block
                py-2
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required>
              <option selected disabled value="Select Location">Select Location</option>
              <option value="Auckland">Auckland</option>
              <option value="Hamilton">Hamilton</option>
              <option value="Tauranga">Tauranga</option>
              <option value="Christchurch">Christchurch</option>
              <option value="Wellington">Wellington</option>
              <option value="Rotorua">Rotorua</option>
              <option value="Dunedin">Dunedin</option>
              <option value="Queenstown">Queenstown</option>
              <option value="New Plymouth">New Plymouth</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Payment Type</label>
            <select name="" v-model="paymentType" id="" class="
                my-2
                w-full
                block
                py-2
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required>
              <option selected disabled value="Select Payment Type">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Debit, Credit card">Debit, Credit card</option>
              <option value="Cash &amp; Card">Cash &amp; Card</option>
            </select>
          </div>
          <div class="form-group">
            <label for="">Shipping Option</label>
            <select name="" v-model="shippingOption" id="" class="
                my-2
                w-full
                block
                py-2
                px-4
                border-2
                outline-none
                border-light-purple
                rounded-lg
                text-gray-700
              " required>
              <option selected disabled value="Select Shipping Option">Select Shipping Option</option>
              <option value="NZ Post">NZ Post</option>
              <option value="NZ Couriers">NZ Couriers</option>
              <option value="Pick up">Pick up</option>
            </select>
          </div>
        </div>
      </div>
      <div class="item-description p-4">
        <div class="form-group flex flex-col">
          <label for="">Description</label>
          <textarea v-model="description" class="
              my-2
              p-2
              border-2
              outline-none
              border-light-purple
              rounded-lg
              text-gray-700
            " cols="10" rows="5"
            placeholder="Please enter a description for this listing. Character limit of 500 characters applies."
            required>
          </textarea>
        </div>
      </div>
      <button type="submit" class="
          w-32
          self-end
          mr-4
          bg-bright-purple
          text-white text-lg
          p-2
          rounded-md
          cursor-pointer
          hover:scale-105
          transition
          transform
          duration-200
        ">
        <svg v-show="isloading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        Create Listing
      </button>
    </form>
  </div>
</template>

<script>
import BackToListings from "../components/BackToListings";
import axios from "axios";
import { toast } from 'vue3-toastify';

export default {
  name: "CreateListing",
  components: {
    BackToListings,
    axios
  },
  props: {
    user: Object,
  },

  setup() {

const notify = (message) => {
  toast(message, {
    autoClose: 1000,
  });
};

return { notify };
},
  mounted(){
   
  },
  data() {
    return {
      title: null,
      price: null,
      imgURL: null,
      category: null,
      condition: null,
      size: null,
      location: null,
      paymentType: null,
      shippingOption: null,
      description: null,
      comments: [],
      loading: false,
      isloading: false
    };
  },
  methods: {
    imageBtnClick(e) {
      e.preventDefault();
      this.$refs.inputRef.click();
    },

    //upload image logic
    async handleFileChange(e) {
      const cloudinaryURL = "https://api.cloudinary.com/v1_1/dilkjksbn/upload";
      const uploaded = e.target.files[0];
      this.loading = true;
      const data = new FormData();
      data.append("file", uploaded);
      data.append("upload_preset", "vwodzywe");
      const response = await fetch(cloudinaryURL, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log(result)
      if (result) {
        this.loading = false;
      }
      this.imgURL = result.url;
    },

    //upload post to database
   async createPost() {
    console.log("User2:", this.user.token);
    console.log(this.imgURL)
       this.isloading= true
      let post = {
        title: this.title,
        price: this.price * 100,
        imgURL: this.imgURL,
        userId: this.user.id,
        category: this.category,
        condition: this.condition,
        size: this.size,
        location: this.location,
        paymentType: this.paymentType,
        shippingOption: this.shippingOption,
        description: this.description,
        comments: [],
      };

      axios.post("https://mevn-ecomerce-application.onrender.com/posts",
       post, {
        waithCredentials:true,
        headers:{ "Content-Type": "application/json", "Authorization":`Bearer ${this.user.token}`}
       }
      ).then((response) => {
        console.log(response)
        this.notify(response.data.message || "uploaded succesfully");
        this.isloading= false
        this.$router.push("/");
      }).catch((err) => {
        console.log(err)
        this.notify(err.response.data.message || "fail to upload");
        this.isloading= false
      })
    },
  },
};

</script>

<style scoped>
.item-info .form-group {
  display: flex;
  align-items: center;
}

.item-info .form-group label {
  flex: 50%;
}

input {
  cursor: pointer;
}

select {
  cursor: pointer;
}

.loadingSpinner {
  margin: 0 auto;
  padding: 0.5em;

  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;
  border: 2px solid lightgray;
  border-top: 1.5px solid purple;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
