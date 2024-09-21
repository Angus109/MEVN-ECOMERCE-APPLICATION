<template>
    <div class="about mt-10 flex justify-center">
      <ProfileTile classNm="flex-row justify-center border-2 border-opacity-30 bg-white border-dark-purpleshadow-md rounded-xl px-10" :user="user" />
    </div>
  </template>
  
  <script>
  import ProfileTile from '../components/profileTile.vue';

  export default {
    name: "Account",
    props:{
        user: Object
    },
    components: {
        ProfileTile
    }
  }
  </script>
  
  <style>
  
  </style>
  