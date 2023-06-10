<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :center="center"
    :useGlobalLeaflet="false"
  >
    <l-tile-layer :url="url" :name="name" layer-type="base" />

    <l-marker
      v-for="hydrant in hydrants"
      :key="hydrant.id"
      :lat-lng="{ lng: hydrant.coordinates.lat, lat: hydrant.coordinates.long }"
      @click="$emit('showHydrant', hydrant)"
    ></l-marker>
  </l-map>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { mapActions, mapState } from "vuex";
import { map } from "leaflet";

export default {
  name: "SmapaMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  computed: {
    ...mapState("hydrants", ["hydrants"]),
  },

  data: () => ({
    zoom: 15,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    name: "SMAPA-MAP",
    center: [-33.5162105, -70.7525183, 15], // Maipu
  }),

  methods: {
    ...mapActions("hydrants", ["fetchHydrants"]),
  },

  async mounted() {
    await this.fetchHydrants();
    console.log("Mounted map");
    // get dots from firebase
    // console.log(this.hydrants);
  },
};
</script>
