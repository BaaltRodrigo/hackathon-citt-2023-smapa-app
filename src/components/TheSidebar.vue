<template>
  <v-navigation-drawer app permanent rail>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        value="dashboard"
      ></v-list-item>

      <v-list-item prepend-icon="mdi-forum" value="messages"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheSidebar",

  components: {
    //
  },

  data: () => ({
    //
  }),

  mounted() {
    console.log("Mounted TheSidebar");
  },
};
</script>
