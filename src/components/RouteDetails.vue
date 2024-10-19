<template>
  <div class="route-details-container">
    <div class="route-card">
      <div>
        <v-icon small left>mdi-map-marker-distance</v-icon>
        <span class="route-details-txt1">Distance</span>
      </div>
      <p class="route-details-txt2">{{ distance }} km</p>
    </div>

    <div class="route-card">
      <div>
        <v-icon small left>mdi-clock-time-twelve-outline</v-icon>
        <span class="route-details-txt1">Driving Time</span>
      </div>
      <p class="route-details-txt2">{{ drivingTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteDetails',
  props: {
    distance: String,
    drivingTime: String,
  },
};
</script>

<style scoped>
.route-details-container {
  display: flex;
  justify-content: space-between;
}

.route-card {
  height: 80px;
  width: 48%;
  border-radius: 8px;
  border: 1px solid #333;
  padding: 8px;
}

.route-details-txt1 {
  font-size: 12px;
  font-weight: 400;
  text-align: left;
}

.route-details-txt2 {
  font-size: 24px;
  font-weight: 500;
  text-align: left;
}
</style>
