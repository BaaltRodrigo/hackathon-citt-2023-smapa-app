<template>
  <v-container class="mt-16 d-flex justify-center">
    <v-card
      variant="outlined"
      class="rounded-lg"
      width="400"
      title="Aceptar Invitacion"
    >
      <v-card-text v-if="invitation.email">
        <v-form>
          <v-text-field
            class="text-black"
            readonly
            label="email"
            v-model="invitation.email"
          ></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-form>
        <v-btn
          block
          size="large"
          class="rounded-lg"
          color="success"
          @click="submitForm"
        >
          Crear e ingresar
        </v-btn>
      </v-card-text>
      <v-card-text v-else> No se pudo encontrar la invitacion </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "InvitationView",

  components: {},

  computed: {
    ...mapState(["invitation"]),
    ...mapState("auth", ["user"]),
  },

  data: () => ({
    password: "",
  }),

  methods: {
    ...mapActions(["fetchInvitation"]),
    ...mapActions("auth", ["registration"]),
    async submitForm() {
      await this.registration({
        email: this.invitation.email,
        password: this.password,
      });

      if (this.user) {
        console.log("user created");
        this.$router.push("/");
      }
    },
  },

  async created() {
    await this.fetchInvitation(this.$route.params.id);
  },
};
</script>
