<template>
  <v-app>
    <v-app-bar app class="header white">
      <v-container fluid class="mt-3">
        <v-row align="center" justify="space-between" class="header-inner">
          <v-col cols="auto">
            <v-img
              alt="Zipmend Logo"
              class="logo"
              contain
              src="@/assets/logo.svg"
            />
          </v-col>

          <v-col cols="auto" class="right-content d-flex align-center">
            <v-row align="center" class="mr-12">
              <v-img
                alt="Check Icon"
                contain
                class="check-icon"
                src="@/assets/icon-check.png"
              />
              <span class="ml-2">100% Free</span>
            </v-row>

            <v-row align="center mb-3">
              <v-img
                alt="Check Icon"
                contain
                class="check-icon"
                src="@/assets/icon-check.png"
              />
              <span class="ml-2">Detailed route information</span>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <MainContainer/>

  </v-app>
</template>

<script>
import MainContainer from './components/MainContainer.vue';

export default {
  name: 'App',
  components:{
    MainContainer
  }
};
</script>

<style scoped>
body,
* {
  font-family: 'Lato', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  height: 77px !important;
}
.v-toolbar__content {
  height: 77px !important;
}
.header-inner {
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
}
.logo {
  height: 45px;
}
.check-icon {
  width: 24px;
  height: 24px;
}
.right-content {
  display: flex;
  align-items: center;
}
</style>
