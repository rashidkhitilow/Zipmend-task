<template>
  <v-container fluid class="main-container">
    <v-row class="mt-0">
      <v-col class="side-panel" cols="4">
        <v-container class="side-panel-content">
          <FormContainer />
        </v-container>
      </v-col>

      <v-col class="map-container" cols="8" style="padding: 0;">
        <div class="map-placeholder">
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormContainer from './FormContainer.vue';

export default {
  name: 'MainContainer',
  components: {
    FormContainer
  }
};
</script>

<style scoped>
.main-container {
  margin-top: 77px; /* Offset for the app bar */
  height: calc(100vh - 89px); /* Adjust height to fill remaining space */
  display: flex; /* Use flexbox to align items */
}

.side-panel {
  padding: 24px 16px;
  overflow-y: auto; /* Allow scrolling in the side panel */
  height: 100%; /* Full height of the column */
  background-color: #FFF; /* Side panel background */
}

.map-container {
  height: 100%; /* Full height of the map container */
  overflow: hidden;
  position: relative;
}

.map-placeholder {
  position: absolute; /* Use absolute positioning to fix the map */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Full height of the map container */
  background-color: #E0E0E0; /* Placeholder background */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>