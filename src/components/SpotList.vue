<template>
  <v-row dense>
    <v-col cols="12" class="d-flex justify-space-between">
      <h4 class="section-title">{{ title }}</h4>
      <p class="clickable-text" @click="addSpot">Add {{ title.toLowerCase() }} spot</p>
    </v-col>

    <v-col v-for="(spot, index) in spots" :key="index" cols="12">
      <v-row>
        <v-col cols="3">
          <v-select v-model="spot.country" :items="countries" item-text="countryCode" item-value="countryId"
            label="Country" dense />
        </v-col>

        <v-col cols="9" class="position-relative">
          <v-autocomplete v-model="spot.search" label="Address" dense outlined :items="spot.autocompleteItems"
            :item-text="'description'" :item-value="'placeId'" :loading="loadingAutocomplete" hide-no-data hide-selected
            @input="onInputChange($event, index)" @update:search-input="onAddressChange($event, index)" />

          <v-img v-if="index > 0" src="@/assets/icon-close.png" alt="remove" @click="removeSpot(index)"
            class="remove-icon clickable" width="24" height="24" style="position: absolute; right: -20px; top: 12px;" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'SpotList',
  props: {
    title: String,
    spots: Array,
    countries: Array,
    loadingAutocomplete: Boolean,
  },
  methods: {
    addSpot() {
      this.$emit('addSpot');
    },
    removeSpot(index) {
      this.$emit('removeSpot', index);
    },
    onInputChange(placeId, index) {
      let type = this.title.toLowerCase() === 'loading' ? 'loadingSpots' : 'unloadingSpots';
      this.$emit('addressSelected', { index, placeId, type });
    },
    onAddressChange(searchInput, index) {
      console.log(searchInput, "searchinput");

      if (searchInput) {
        let type = this.title.toLowerCase() === 'loading' ? 'loadingSpots' : 'unloadingSpots';
        this.$emit('fetchAutocomplete', { address: searchInput, index, type });
      }
    },
  }
};
</script>

<style scoped>
.remove-icon {
  cursor: pointer;
}

.clickable-text {
  text-decoration: underline;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}

.position-relative {
  position: relative;
}
</style>
