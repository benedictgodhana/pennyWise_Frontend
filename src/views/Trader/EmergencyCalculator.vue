<template>
      <v-app style="background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg');
    background-size: cover;
    background-position: center;">
    <div class="background-overlay"></div>
    <v-container>
      <v-card elevation="0" color="transparent">
        <v-card-title class="calculator-title text-center">
          Emergency Calculator
        </v-card-title>
        <br>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="initialAmount"
            :rules="amountRules"
            label="Initial Amount (Ksh)"
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
            v-model="interestRate"
            :rules="rateRules"
            label="Annual Interest Rate (%)"
            required
            variant="outlined"
            style="color:white;font-weight: 900;"
          ></v-text-field>
          <v-text-field
            v-model="years"
            :rules="yearsRules"
            label="Years"
            required
            variant="outlined"
            style="color:white;font-weight: 900;"
          ></v-text-field>
          <v-btn
            color="red"
            @click="calculateSavings"
            block
            style="text-transform: capitalize;"
          >
            <v-icon>mdi-calculator</v-icon> Calculate
          </v-btn>
        </v-form>
        <div v-if="totalSavings !== null" class="result">
          <h3 style="color:white">Total Savings after {{ years }} years: Ksh. {{ totalSavings }}</h3>
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
        initialAmount: null,
        monthlyContribution: null,
        interestRate: null,
        years: null,
        totalSavings: null,
        amountRules: [
          v => !!v || 'Amount is required',
          v => /^\d*\.?\d+$/.test(v) || 'Amount must be a number',
        ],
        rateRules: [
          v => !!v || 'Interest rate is required',
          v => /^\d*\.?\d+$/.test(v) || 'Interest rate must be a number',
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
      calculateSavings() {
        const P = parseFloat(this.initialAmount);
        const PMT = parseFloat(this.monthlyContribution);
        const r = parseFloat(this.interestRate) / 100 / 12;
        const n = parseInt(this.years) * 12;
  
        const totalSavings = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  
        this.totalSavings = totalSavings.toFixed(2);
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
  