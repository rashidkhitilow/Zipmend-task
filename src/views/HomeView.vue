<template>
    <v-main style="padding: 0 !important;">
        <HeaderSection/>    
        <FormContainer />
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

  </style>