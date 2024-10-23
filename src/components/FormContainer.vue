<template>
  <v-container fluid class="main-container">
    <v-row class="mt-0">
      <v-col class="side-panel" cols="12" md="4">
        <v-container class="side-panel-content">
          <v-container class="route-config" fluid>
            <v-form>
              <v-row class="route-header" dense>
                <v-col cols="12">
                  <h3>Route configuration</h3>
                </v-col>
              </v-row>
              <spot-list title="Loading" :spots="loadingSpots" :countries="countries" @addSpot="addLoadingSpot"
                @removeSpot="removeLoadingSpot" @fetchAutocomplete="fetchAutocompleteSuggestions"
                @addressSelected="onAddressSelect" :loading-autocomplete="loadingAutocomplete"
                :autocomplete-items="loadingSpotsAutocompleteItems" />
              <spot-list title="Unloading" :spots="unloadingSpots" :countries="countries" @addSpot="addUnloadingSpot"
                @removeSpot="removeUnloadingSpot" @fetchAutocomplete="fetchAutocompleteSuggestions"
                @addressSelected="onAddressSelect" :loading-autocomplete="loadingAutocomplete"
                :autocomplete-items="unloadingSpotsAutocompleteItems" />

              <v-row class="" dense>
                <v-col cols="12">
                  <h4 class="pb-2">More features</h4>
                  <v-select v-model="avoidCountries" :items="countries" item-text="countryCode" item-value="countryId"
                    label="Avoid countries" dense multiple />
                </v-col>
              </v-row>

              <v-row justify="center" class="pb-8">
                <v-col cols="12">
                  <button type="button" class="primary-btn" @click="onCalculateRoute"
                    :disabled="isCalculateButtonDisabled">
                    <span class="btn-text">Calculate Route</span>
                  </button>
                </v-col>
              </v-row>
              <template v-if="distance && drivingTime">
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
              </template>
            </v-form>
            <v-overlay :value="loading" absolute class="align-center justify-center" style="z-index:999;">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </v-overlay>
          </v-container>
        </v-container>
      </v-col>

      <v-col class="map-container" cols="12" md="8" style="padding: 0;">
        <div class="map-placeholder">
          <route-map :center="center" :routeCoordinates="routeCoordinates" :loadingSpots="loadingSpots"
            :unloadingSpots="unloadingSpots" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { calculateRoute, fetchPlaceSuggestions, getCoordinatesForPlaceId } from '@/services/api'; // Updated API for geocoding
import SpotList from '@/components/SpotList.vue';
import RouteDetails from '@/components/RouteDetails.vue';
import RouteMap from '@/components/RouteMap.vue'; // Import your RouteMap component
import polyline from '@mapbox/polyline';
const countries = [
  { countryCode: 'DE', countryId: 74 },
  { countryCode: 'CH', countryId: 193 },
  { countryCode: 'AT', countryId: 11 },
  { countryCode: 'NL', countryId: 141 },
  { countryCode: 'BE', countryId: 17 },
  { countryCode: 'FR', countryId: 70 },
  { countryCode: 'ES', countryId: 187 },
  { countryCode: 'PL', countryId: 159 }
];


export default {
  name: 'FormContainer',
  components: {
    SpotList,
    RouteDetails,
    RouteMap,
  },
  data() {
    return {
      loadingSpots: [{ country: 74, address: '', placeId: '', autocompleteItems: [], coordinates: [] }],
      unloadingSpots: [{ country: 74, address: '', placeId: '', autocompleteItems: [], coordinates: [] }],
      countries,
      avoidCountries: '',
      distance: '',
      drivingTime: '',
      routeCoordinates: [],
      loadingAutocomplete: false,
      loadingSpotsAutocompleteItems: [],
      unloadingSpotsAutocompleteItems: [],
      loading: false,
      center:  [52.5200066, 13.404954]
    };
  },
  methods: {
    addLoadingSpot() {
      this.loadingSpots.push({ country: 74, address: '', placeId: '', autocompleteItems: [], coordinates: [] });
    },
    removeLoadingSpot(index) {
      this.loading = true;
      let val = this.loadingSpots[index].placeId ? true : false
      this.loadingSpots.splice(index, 1);
      if(val) this.onCalculateRoute();
      this.loading = false;
    },
    addUnloadingSpot() {
      this.unloadingSpots.push({ country: 74, address: '', placeId: '', autocompleteItems: [], coordinates: [] });
    },
    removeUnloadingSpot(index) {
      this.loading = true;
      let val = this.unloadingSpots[index].placeId ? true : false
      this.unloadingSpots.splice(index, 1);
      if(val) this.onCalculateRoute();
      this.loading = false;
    },
    getCountryCode(countryId) {
      const country = countries.find(item => item.countryId === countryId);
      return country ? country.countryCode : 'DE';
    },
    async onCalculateRoute() {
      this.loading = true;
      try {
        const loadingCoordinates = await Promise.all(
          this.loadingSpots.map(async (spot) => await getCoordinatesForPlaceId(spot.placeId))
        );
        const unloadingCoordinates = await Promise.all(
          this.unloadingSpots.map(async (spot) => await getCoordinatesForPlaceId(spot.placeId))
        );

        const waypoints = [...loadingCoordinates, ...unloadingCoordinates];
        const reorderedWaypoints = waypoints.map(([lat, lon]) => [lon, lat]);
        const routeData = await calculateRoute(reorderedWaypoints, this.avoidCountries);

        const route = routeData.routes[0];
        const decodedCoordinates = polyline.decode(route.geometry);
        this.routeCoordinates = decodedCoordinates.map(coord => [coord[0], coord[1]]);

        this.distance = (route.summary.distance / 1000).toFixed(2);
        this.drivingTime = this.formatDuration(route.summary.duration);

        if (waypoints.length > 0) {
          const midIndex = Math.floor(waypoints.length / 2);
          this.center = waypoints[midIndex];
        }

      } catch (error) {
        console.error('Error calculating route:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAutocompleteSuggestions({ address, index, type }) {
      if (!address) return;

      this.loadingAutocomplete = true;
      try {
        const countryCode = type === 'loadingSpots' ? this.getCountryCode(this.loadingSpots[index]?.country) : this.getCountryCode(this.unloadingSpots[index]?.country);
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
    formatDuration(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    },


    async onAddressSelect({ index, placeId, type }) {
      if (placeId) {
        this.routeCoordinates = []
        const coordinates = await getCoordinatesForPlaceId(placeId);
        if (type === 'loadingSpots') {
          this.$set(this.loadingSpots, index, { ...this.loadingSpots[index], placeId, coordinates });
        } else {
          this.$set(this.unloadingSpots, index, { ...this.unloadingSpots[index], placeId, coordinates });
        }
      }
    }

  },
  computed: {
    isCalculateButtonDisabled() {
      const hasLoadingPlaceId = this.loadingSpots.some(spot => spot.placeId.trim() !== '');
      const hasUnloadingPlaceId = this.unloadingSpots.some(spot => spot.placeId.trim() !== '');
      return !hasLoadingPlaceId || !hasUnloadingPlaceId;
    }
  }

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

.primary-btn:disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
}

@media only screen and (max-width: 600px) {
  .side-panel {
    padding: 12px 8px;
    height: 300px;
  }

  .main-container {
    flex-direction: column;
  }

  .map-container {
    height: 500px;
  }
}
</style>
