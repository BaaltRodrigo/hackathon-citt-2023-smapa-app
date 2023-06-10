<template>
  <v-app>
    <the-sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TheSidebar from "./components/TheSidebar.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    TheSidebar,
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
