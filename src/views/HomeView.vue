<template>
  <the-sidebar @showInvitation="showInvitation = true"></the-sidebar>
  <smapa-map @showHydrant="handleHydrant" />

  <v-dialog v-model="showInvitation" min-width="340px" width="120px">
    <v-card variant="outlined" class="bg-white rounded-lg">
      <v-card-text>
        <invitation-form />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showHydrantForm" min-width="340px" width="120px">
    <v-card variant="outlined" class="bg-white rounded-lg">
      <v-card-text>
        <hydrant-form @close="showHydrantForm = false" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import InvitationForm from "../components/InvitationForm.vue";
import HydrantForm from "../components/HydrantForm.vue";
import SmapaMap from "../components/SmapaMap.vue";
import TheSidebar from "../components/TheSidebar.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",

  components: {
    InvitationForm,
    HydrantForm,
    SmapaMap,
    TheSidebar,
  },

  computed: {
    ...mapState("hydrants", ["hydrant"]),
  },

  methods: {
    ...mapMutations("hydrants", ["setHydrant"]),
    handleHydrant(hydrant) {
      this.setHydrant(hydrant); // To change form values
      this.showHydrantForm = true;
    },
  },

  data: () => ({
    showInvitation: false,
    showHydrantForm: false,
  }),
};
</script>
