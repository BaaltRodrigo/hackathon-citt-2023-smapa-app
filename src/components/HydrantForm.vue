<template>
  <v-form>
    <v-text-field
      v-model="hydrant.address"
      variant="outlined"
      label="Ubicacion"
    ></v-text-field>
    <v-radio-group v-model="hydrant.status">
      <template v-slot:label>
        <div>Estado del Grifo</div>
      </template>
      <v-radio label="Bueno" value="BUENO"></v-radio>
      <v-radio label="Danado" value="DANADO"></v-radio>
      <v-radio label="No esta el grifo" value="NO ESTA EL GRIFO"></v-radio>
    </v-radio-group>
    <v-textarea
      variant="outlined"
      v-model="hydrant.information"
      label="Observaciones"
    ></v-textarea>
  </v-form>

  <v-container fluid class="d-flex justify-space-between">
    <v-btn @click="$emit('close')" class="text-none rounded-lg" color="warning">
      Cancelar
    </v-btn>
    <v-btn
      @click="sendInformation"
      class="text-none rounded-lg"
      color="success"
    >
      Enviar Invitacion
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HydrantForm",

  computed: {
    ...mapState("hydrants", ["hydrant"]),
  },

  watch: {
    hydrant() {
      console.log("change hydrant");
      this.address = this.hydrant.address;
      this.state = this.hydrant.state;
      this.information = this.hydrant.information ?? "";
      this.id = this.hydrant.id;
      console.log(this.hydrant);
    },
  },

  data: () => ({
    address: "TEST ADRESS no firebase",
    state: "BUENO",
    information: "Algo extra que no esta en firebase",
    id: "",
  }),

  methods: {
    ...mapActions("hydrants", ["updateHydrant"]),
    async sendInformation() {
      await this.updateHydrant(this.hydrant);
      this.$emit("close");
    },
  },
};
</script>
