<template>
  <v-container fluid class="main-container">
    <v-row class="mt-0">
      <v-col class="side-panel" cols="4">
        <v-container class="side-panel-content">
          <v-container class="route-config" fluid>
            <v-form>
              <v-row class="route-header" dense>
                <v-col cols="12">
                  <h3>Route configuration</h3>
                </v-col>
              </v-row>
              <spot-list
                title="Loading"
                :spots="loadingSpots"
                :countries="countries"
                @addSpot="addLoadingSpot"
                @removeSpot="removeLoadingSpot"
                @fetchAutocomplete="fetchAutocompleteSuggestions"
                :loading-autocomplete="loadingAutocomplete"
                :autocomplete-items="loadingSpotsAutocompleteItems"
              />
              <spot-list
                title="Unloading"
                :spots="unloadingSpots"
                :countries="countries"
                @addSpot="addUnloadingSpot"
                @removeSpot="removeUnloadingSpot"
                @fetchAutocomplete="fetchAutocompleteSuggestions"
                :loading-autocomplete="loadingAutocomplete"
                :autocomplete-items="unloadingSpotsAutocompleteItems"
              />

              <v-row class="" dense>
                <v-col cols="12">
                  <h4 class="pb-2">More features</h4>
                  <v-select v-model="avoidCountries" :items="countries" label="Avoid countries" dense multiple />
                </v-col>
              </v-row>

              <v-row justify="center" class="pb-8">
                <v-col cols="12">
                  <button class="primary-btn" @click="onCalculateRoute">
                    <span class="btn-text">Calculate Route</span>
                  </button>
                </v-col>
              </v-row>

              <v-row class="pb-10">
                <v-col cols="12">
                  <hr style="border: 1px solid #9E9E9E; color: #9E9E9E" />
                </v-col>
              </v-row>
              <v-row dense class="pb-6">
                <v-col cols="12">
                  <h3>Route details</h3>
                </v-col>
              </v-row>
              <route-details :distance="distance" :driving-time="drivingTime" />
            </v-form>
          </v-container>
        </v-container>
      </v-col>

      <v-col class="map-container" cols="8" style="padding: 0;">
        <div class="map-placeholder">
          <route-map :routeCoordinates="routeCoordinates" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { calculateRoute, fetchPlaceSuggestions } from '@/services/api';
import SpotList from '@/components/SpotList.vue';
import RouteDetails from '@/components/RouteDetails.vue';
import RouteMap from '@/components/RouteMap.vue'; // Import your RouteMap component

const countries = ['DE', 'CH', 'AT', 'NL', 'BE', 'FR', 'ES', 'PL'];

export default {
  name: 'FormContainer',
  components: {
    SpotList,
    RouteDetails,
    RouteMap,
  },
  data() {
    return {
      loadingSpots: [{ country: 'DE', address: '', autocompleteItems: [] }],
      unloadingSpots: [{ country: 'DE', address: '', autocompleteItems: [] }],
      countries,
      avoidCountries: '',
      distance: '',
      drivingTime: '',
      routeCoordinates: [],
      loadingAutocomplete: false,
      loadingSpotsAutocompleteItems: [],
      unloadingSpotsAutocompleteItems: [],
    };
  },
  methods: {
    addLoadingSpot() {
      this.loadingSpots.push({ country: 'DE', address: '', autocompleteItems: [] });
    },
    removeLoadingSpot(index) {
      this.loadingSpots.splice(index, 1);
    },
    addUnloadingSpot() {
      this.unloadingSpots.push({ country: 'DE', address: '', autocompleteItems: [] });
    },
    removeUnloadingSpot(index) {
      this.unloadingSpots.splice(index, 1);
    },
    async onCalculateRoute() {
      try {
        const waypoints = [
          ...this.loadingSpots.map((spot) => this.getCoordinates(spot)),
          ...this.unloadingSpots.map((spot) => this.getCoordinates(spot)),
        ];

        const routeData = await calculateRoute(waypoints, this.avoidCountries);
        const route = routeData.routes[0];

        this.routeCoordinates = route.geometry.coordinates.map((coord) => [coord[1], coord[0]]); // [lat, lng]
        this.distance = (route.summary.distance / 1000).toFixed(2); // Convert meters to km
        this.drivingTime = this.formatDuration(route.summary.duration); // Convert seconds to h:mm format
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    },
    async fetchAutocompleteSuggestions({ address, index, type }) {
      if (!address) return;

      this.loadingAutocomplete = true;
      try {
        const countryCode =
          type === 'loadingSpots' ? this.loadingSpots[index]?.country : this.unloadingSpots[index]?.country || 'DE';
        const suggestions = await fetchPlaceSuggestions(address, countryCode);
        const items = suggestions.map((item) => ({
          description: item.description,
          placeId: item.place_id,
        }));

        if (type === 'loadingSpots') {
          this.loadingSpots[index].autocompleteItems = items;
        } else {
          this.unloadingSpots[index].autocompleteItems = items;
        }
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      } finally {
        this.loadingAutocomplete = false;
      }
    },
    getCoordinates(spot) {
      console.log(spot);
      return [48.8566, 2.3522];
    },
    formatDuration(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    },
  },
};
</script>

<style scoped>
.route-config {
  max-width: 520px;
  margin: 0 auto;
}

.route-header {
  margin-bottom: 12px;
}

.primary-btn {
  width: 100%;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 4px;
  background-color: #e50043;
}

.btn-text {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.main-container {
  padding: 0 !important;
  margin-top: 77px;
  height: calc(100vh - 89px);
  display: flex;
}

.side-panel {
  padding: 24px 16px;
  overflow-y: auto;
  height: 100%;
  background-color: #FFF;
}

.map-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.map-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
