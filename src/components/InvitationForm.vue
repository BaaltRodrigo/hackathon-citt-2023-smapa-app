<template>
  <v-form>
    <v-text-field
      v-model="email"
      variant="outlined"
      label="Email"
    ></v-text-field>
    <v-text-field
      v-model="institution"
      variant="outlined"
      label="Institucion"
    ></v-text-field>
  </v-form>
  <v-btn
    @click="sendInformation"
    block
    size="large"
    class="text-none rounded-lg"
    color="success"
  >
    Enviar Invitacion
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "InvitationForm",

  components: {
    //
  },

  data: () => ({
    email: "",
    institution: "",
  }),

  methods: {
    ...mapActions(["sendInvitation"]),
    async sendInformation() {
      await this.sendInvitation({
        email: this.email,
        institution: this.institution,
      });
      this.$emit("close");
    },
  },
};
</script>
