<template>
    <v-main style="padding: 0 !important;">
        <HeaderSection/>    
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
    </v-main>
  </template>
  
  <script>
import HeaderSection from '@/components/HeaderSection.vue';
import FormContainer from '@/components/FormContainer.vue';

  export default {
    name: 'HomeView',
    components: {
        FormContainer,
        HeaderSection
    }
  };
  </script>
  
  <style scoped>
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