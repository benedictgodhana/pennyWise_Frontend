<template>
    <v-app style="background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg');
      background-size: cover;
      background-position: center;">
      <div class="background-overlay"></div>
      <v-container>
        <v-card elevation="0" color="transparent">
          <v-card-title class="calculator-title text-center">
            Investment Calculator
          </v-card-title>
          <br>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="initialInvestment"
              :rules="amountRules"
              label="Initial Investment (Ksh)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-text-field
              v-model="monthlyContribution"
              :rules="amountRules"
              label="Monthly Contribution (Ksh)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-text-field
              v-model="annualReturnRate"
              :rules="rateRules"
              label="Expected Annual Return Rate (%)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-text-field
              v-model="years"
              :rules="yearsRules"
              label="Investment Duration (Years)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-btn
              color="red"
              @click="calculateInvestment"
              block
              style="text-transform: capitalize;"
            >
              <v-icon>mdi-calculator</v-icon> Calculate
            </v-btn>
          </v-form>
          <div v-if="totalInvestment !== null" class="result">
            <h3 style="color:white">Total Investment Value after {{ years }} years: Ksh. {{ totalInvestment }}</h3>
          </div>
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
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        initialInvestment: null,
        monthlyContribution: null,
        annualReturnRate: null,
        years: null,
        totalInvestment: null,
        amountRules: [
          v => !!v || 'Amount is required',
          v => /^\d*\.?\d+$/.test(v) || 'Amount must be a number',
        ],
        rateRules: [
          v => !!v || 'Return rate is required',
          v => /^\d*\.?\d+$/.test(v) || 'Return rate must be a number',
        ],
        yearsRules: [
          v => !!v || 'Years are required',
          v => /^\d+$/.test(v) || 'Years must be a whole number',
        ],
  
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
      calculateInvestment() {
        const P = parseFloat(this.initialInvestment);
        const PMT = parseFloat(this.monthlyContribution);
        const r = parseFloat(this.annualReturnRate) / 100 / 12;
        const n = parseInt(this.years) * 12;
  
        const totalInvestment = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  
        this.totalInvestment = totalInvestment.toFixed(2);
      },
      navigate(route) {
        this.$router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  .calculator-title {
    background-color: #ff9800;
    color: white;
    font-weight: bold;
    padding: 10px;
  }
  
  .result {
    margin-top: 20px;
  }
  </style>
  