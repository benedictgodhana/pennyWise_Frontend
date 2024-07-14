<template>
  <v-app style="background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg');
    background-size: cover;
    background-position: center;">
    <div class="background-overlay">
      <v-container>
        <v-card elevation="0" color="transparent">
          <v-card-title class="calculator-title text-center">
            Savings Calculator
          </v-card-title>
          <br>
          <v-row>
            <v-col cols="" md="3" class="mt-16">
              <v-btn color="orange" block @click="navigateTo('/basicCalculator')" rounded elevation="12" style="text-transform: capitalize;">
               <v-icon>mdi-database</v-icon> Basic Savings Calculator
              </v-btn>
            </v-col>
            <v-col cols="" md="3">
              <v-btn color="orange" block @click="navigateTo('/emergencyFundCalculator')" rounded elevation="12" style="text-transform: capitalize;">
               <v-icon>mdi-car-emergency</v-icon> Emergency Fund Calculator
              </v-btn>
            </v-col>
            <v-col cols="" md="3">
              <v-btn color="orange" block @click="navigateTo('/businessInvestmentCalculator')" rounded elevation="12" style="text-transform: capitalize;">
                <v-icon>mdi-skype-business</v-icon>Business Investment Calculator
              </v-btn>
            </v-col>
            <v-col cols="" md="3">
              <v-btn color="orange" block @click="navigateTo('/retirementCalculator')" rounded elevation="12" style="text-transform: capitalize;">
               <v-icon>mdi-account-credit-card</v-icon>  Retirement Savings Calculator
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-bottom-navigation
          v-model="active"
          color="primary"
          grow
          rounded
          app
        >
          <v-btn
            v-for="item in items"
            :key="item.title"
            :to="item.route"
            @click="navigate(item.route)"
            icon
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-container>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/welcomePage' },
        { title: 'Articles', icon: 'mdi-newspaper', route: '/articles' },
        { title: 'Saving Calculator', icon: 'mdi-calculator', route: '/savingCalculator' },
        { title: 'Savings', icon: 'mdi-database', route: '/savings' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
      ],
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.app-background {
  background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 20px;
}

.calculator-title {
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 10px;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity (last value) to make it darker/lighter */
}

</style>
