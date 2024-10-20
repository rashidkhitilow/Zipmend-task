<template>
      <l-map :zoom="6" :center="[48.8566, 2.3522]" style="height: 88vh;">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <l-polyline :lat-lngs="routeCoordinates" color="blue" />
      </l-map>
  </template>
  
  <script>
  import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'RouteMap',
    components: {
      LMap,
      LTileLayer,
      LPolyline,
    },
    props: {
      routeCoordinates: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  