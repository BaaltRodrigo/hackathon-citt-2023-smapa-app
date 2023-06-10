<template>
  <v-form ref="form">
    <v-text-field
      v-model="email"
      density="comfortable"
      variant="outlined"
      label="Email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      density="comfortable"
      variant="outlined"
      label="Contraseña"
    ></v-text-field>
    <v-btn
      @click="submitForm"
      block
      color="success"
      variant="flat"
      class="text-none"
    >
      Ingresar
    </v-btn>
  </v-form>
  <!-- <v-container class="text-center mb-n1 mt-2">
    <router-link to="/forgot-password">Olvide mi contraseña</router-link>
  </v-container> -->
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LoginForm",

  components: {},

  computed: {
    ...mapState("auth", ["user"]),
  },

  data: () => ({
    email: null,
    password: null,
  }),

  methods: {
    ...mapActions("auth", ["login"]),
    async submitForm() {
      // TODO: Implement
      console.log("submitForm");

      await this.login({
        email: this.email,
        password: this.password,
      });

      if (this.user) {
        console.log("Correct Login");
        this.$router.push("/");
      }
    },

    validateForm() {
      // TODO: Implement
    },
  },
};
</script>
