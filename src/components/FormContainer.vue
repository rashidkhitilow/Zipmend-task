<template>
  <v-container class="route-config" fluid>
    <v-form>
      <v-row class="route-header " dense>
        <v-col cols="12">
          <h3>Route configuration</h3>
        </v-col>
      </v-row>

      <v-row class="" dense>
        <v-col cols="12" class="d-flex justify-space-between">
          <h4 class="section-title">Loading</h4>
          <p class="clickable-text" @click="addLoadingSpot">Add loading spot</p>
        </v-col>

        <v-col v-for="(spot, index) in loadingSpots" :key="index" cols="12">
          <v-row>
            <v-col cols="3">
              <v-select v-model="spot.country" :items="countries" label="Country" dense />
            </v-col>

            <v-col cols="9" class="position-relative">
              <v-autocomplete
                v-model="spot.address"
                :items="autocompleteItems"
                label="Address"
                dense
                @focus="fetchAutocompleteSuggestions(spot.address, index, 'loading')"
                :loading="loadingAutocomplete"
              >
                <template v-slot:item="{ item }">
                  <div>{{ item.description }}</div>
                </template>
              </v-autocomplete>

              <v-img
                v-if="index > 0"
                src="@/assets/icon-close.png"
                alt="remove"
                @click="removeLoadingSpot(index)"
                class="remove-icon clickable"
                width="24"
                height="24"
                style="position: absolute; right: -20px; top: 12px;"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="" dense>
        <v-col cols="12" class="d-flex justify-space-between">
          <h4 class="section-title">Unloading</h4>
          <p class="clickable-text" @click="addUnloadingSpot">Add unloading spot</p>
        </v-col>

        <v-col v-for="(spot, index) in unloadingSpots" :key="index" cols="12">
          <v-row>
            <v-col cols="3">
              <v-select v-model="spot.country" :items="countries" label="Country" dense />
            </v-col>

            <v-col cols="9" class="position-relative">
              <v-autocomplete
                v-model="spot.address"
                :items="autocompleteItems"
                label="Address"
                dense
                @focus="fetchAutocompleteSuggestions(spot.address, index, 'unloading')"
                :loading="loadingAutocomplete"
              >
                <template v-slot:item="{ item }">
                  <div>{{ item.description }}</div>
                </template>
              </v-autocomplete>

              <v-img
                v-if="index > 0"
                src="@/assets/icon-close.png"
                alt="remove"
                @click="removeUnloadingSpot(index)"
                class="remove-icon clickable"
                width="24"
                height="24"
                style="position: absolute; right: -20px; top: 12px;"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="" dense>
        <v-col cols="12">
          <h4 class="pb-2">More features</h4>
          <v-select
            v-model="avoidCountries"
            :items="countries"
            label="Avoid countries"
            dense
            multiple
          />
        </v-col>
      </v-row>

      <v-row justify="center" class="pb-8">
        <v-col cols="12">
          <button class="primary-btn" @click="calculateRoute">
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

      <!-- Route Details Section -->
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
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'FormContainer',
  data() {
    return {
      loadingSpots: [{ country: 'DE', address: '' }],
      unloadingSpots: [{ country: 'DE', address: '' }],
      countries: ['DE', 'CH', 'FR'],
      avoidCountries: '',
      distance: '531',
      drivingTime: '7 h 35 min',
      autocompleteItems: [],
      loadingAutocomplete: false,
    };
  },
  methods: {
    addLoadingSpot() {
      this.loadingSpots.push({ country: 'DE', address: '' });
    },
    removeLoadingSpot(index) {
      this.loadingSpots.splice(index, 1);
    },
    addUnloadingSpot() {
      this.unloadingSpots.push({ country: 'DE', address: '' });
    },
    removeUnloadingSpot(index) {
      this.unloadingSpots.splice(index, 1);
    },
    calculateRoute() {
      // Add route calculation logic here
    },
    async fetchAutocompleteSuggestions(address) {
      if (!address) return;
      this.loadingAutocomplete = true;
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

.remove-icon {
  cursor: pointer;
}

.position-relative {
  position: relative;
}

.primary-btn {
  width: 100%;
  padding: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 4px;
  background-color: #e50043;
  opacity: 1;
}

.btn-text {
  font-size: 12px;
  font-weight: 700;
  color: #fff !important;
}

.clickable-text {
  text-decoration: underline;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}

.route-details {
  margin-top: 24px;
}

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
  line-height: 19.2px;
  text-align: left;
}

.route-details-txt2 {
  font-size: 24px;
  font-weight: 500;
  line-height: 28.8px;
  text-align: left;
}
</style>
