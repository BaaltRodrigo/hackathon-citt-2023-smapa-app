<template>
  <l-map
    ref="map"
    v-model:zoom="zoom"
    :center="center"
    :useGlobalLeaflet="false"
  >
    <l-tile-layer :url="url" :name="name" layer-type="base" />
  </l-map>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  name: "SmapaMap",
  components: {
    LMap,
    LTileLayer,
  },

  data: () => ({
    zoom: 15,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    name: "SMAPA-MAP",
    center: [-33.5162105, -70.7525183, 15], // Maipu
  }),

  mounted() {
    console.log("Mounted map");
  },
};
</script>
