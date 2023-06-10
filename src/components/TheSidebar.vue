<template>
  <v-navigation-drawer app permanent rail>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account-plus"
        value="dashboard"
      ></v-list-item>
    </v-list>

    <template #append>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-logout" value="messages"></v-list-item>
      </v-list>
    </template>
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
