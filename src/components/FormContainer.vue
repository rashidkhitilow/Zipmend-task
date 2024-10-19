<template>
    <v-container class="route-config" fluid>
      <v-form>
        <v-row class="route-header " dense>
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
          :autocomplete-items="autocompleteItems"
          :loading-autocomplete="loadingAutocomplete"
        />
        <spot-list
          title="Unloading"
          :spots="unloadingSpots"
          :countries="countries"
          @addSpot="addUnloadingSpot"
          @removeSpot="removeUnloadingSpot"
          @fetchAutocomplete="fetchAutocompleteSuggestions"
          :autocomplete-items="autocompleteItems"
          :loading-autocomplete="loadingAutocomplete"
        />
  
        <v-row class="" dense>
          <v-col cols="12">
            <h4 class="pb-2">More features</h4>
            <v-select v-model="avoidCountries" :items="countries" label="Avoid countries" dense multiple />
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
        <route-details :distance="distance" :driving-time="drivingTime" />
      </v-form>
    </v-container>
  </template>
  
  <script>
  import SpotList from '@/components/SpotList.vue';
  import RouteDetails from '@/components/RouteDetails.vue';
  
  export default {
    name: 'FormContainer',
    components: {
      SpotList,
      RouteDetails,
    },
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
  </style>
  