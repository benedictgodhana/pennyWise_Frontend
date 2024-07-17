<template>
    <v-app style="background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg'); background-size: cover; background-position: center;">
      <div class="background-overlay"></div>
      <v-container>
        <v-card elevation="0" color="transparent">
          <v-card-title class="tracker-title text-center">Budget Tracker</v-card-title>
          <br>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="income"
              :rules="amountRules"
              label="Monthly Income (Ksh)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-text-field
              v-model="newExpense.amount"
              :rules="amountRules"
              label="Expense Amount (Ksh)"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-text-field
              v-model="newExpense.description"
              :rules="[v => !!v || 'Description is required']"
              label="Expense Description"
              required
              variant="outlined"
              style="color:white;font-weight: 900;"
            ></v-text-field>
            <v-btn color="red" @click="addExpense" block style="text-transform: capitalize;">
              <v-icon>mdi-plus</v-icon> Add Expense
            </v-btn>
          </v-form>
          <div v-if="expenses.length" class="expenses-list">
            <v-card v-for="(expense, index) in expenses" :key="index" class="expense-item" color="white">
              <v-card-text>
                <strong>{{ expense.description }}</strong>: Ksh. {{ expense.amount }}
                
<br>
<br>

              <v-btn small @click="removeExpense(index)" width="100%" color="orange" style="text-transform: capitalize">
                  <v-icon>mdi-delete</v-icon>Delete
                </v-btn>
              </v-card-text>

            </v-card>
          </div>
          <div class="result">
            <h3 style="color:white">Total Expenses: Ksh. {{ totalExpenses }}</h3>
            <h3 style="color:white">Remaining Budget: Ksh. {{ remainingBudget }}</h3>
          </div>
        </v-card>
  
        <v-bottom-navigation v-model="active" color="primary" grow rounded app>
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
        income: null,
        newExpense: {
          amount: null,
          description: '',
        },
        expenses: [],
        amountRules: [
          v => !!v || 'Amount is required',
          v => /^\d*\.?\d+$/.test(v) || 'Amount must be a number',
        ],
        items: [
          { title: 'Home', icon: 'mdi-home', route: '/welcomePage' },
          { title: 'Articles', icon: 'mdi-newspaper', route: '/articles' },
          { title: 'Saving Calculator', icon: 'mdi-calculator', route: '/savingCalculator' },
          { title: 'Savings', icon: 'mdi-database', route: '/savings' },
          { title: 'Profile', icon: 'mdi-account', route: '/profile' },
          { title: 'Budget Tracker', icon: 'mdi-cash', route: '/budgetTracker' },
        ],
      };
    },
    computed: {
      totalExpenses() {
        return this.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
      },
      remainingBudget() {
        return (parseFloat(this.income) - this.totalExpenses).toFixed(2);
      },
    },
    methods: {
      addExpense() {
        if (this.$refs.form.validate()) {
          this.expenses.push({ ...this.newExpense });
          this.newExpense.amount = null;
          this.newExpense.description = '';
        }
      },
      removeExpense(index) {
        this.expenses.splice(index, 1);
      },
      navigate(route) {
        this.$router.push(route);
      },
    },
  };
  </script>
  
  <style scoped>
  .tracker-title {
    background-color: #ff9800;
    color: white;
    font-weight: bold;
    padding: 10px;
  }
  
  .expenses-list {
    margin-top: 20px;
  }
  
  .expense-item {
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
  
  .result {
    margin-top: 20px;
  }
  </style>
  