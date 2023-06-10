<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(["fetchLocation"]),
  },

  async mounted() {
    // fetch location from browser
    await this.fetchLocation();

    // fetch hydrants from firebase
  },
};
</script>
