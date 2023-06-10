<template>
  <v-container class="mt-16 d-flex justify-center">
    <!-- TODO: Check if there is a better way to center this -->
    <v-card variant="outlined" class="rounded-lg" width="400">
      <v-card-text>
        <login-form />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "LoginView",

  components: {
    LoginForm,
  },

  data: () => ({
    email: "",
    password: "",
  }),
};
</script>
