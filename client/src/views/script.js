import CreateAccountVue from "./CreateAccount.vue";
import HomeVue from "./Home.vue";
export default {
  name: "Login",

  emits: ["loggedIn"],

  data() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },

  methods: {
    GoBack() {
      return this.$router.push(HomeVue);
    },

    GoSignup() {
      return this.$router.push(CreateAccountVue);
    },

    async logUserIn() {
      try {
        const response = await fetch("https://mevn-ecomerce-application.onrender.com/accounts/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.user),
          credentials: "include",
        });
        let user = await response.json();
        console.log(user)
        console.log(res)

        console.log("Login event detected", user);

        this.$emit("loggedIn", user);

        this.$router.push(HomeVue);
      } catch (err) {
        console.log(err.response);
      }
    },
  },
};
