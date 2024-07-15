<template>
  <v-app
    style="background-image: url('867.jpg'); background-size: cover; background-position: center;"
  >
    <v-container class="app-background" fluid>
      <v-card class="welcome-card" elevation="7">
        <v-toolbar dark>
          <v-card-title><v-icon></v-icon>Welcome, {{ user.name }}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.push('/profile')">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>

      <v-card v-if="userRole !== 'admin'" class="my-4 budget-overview-card" elevation="22">
        <v-card-title class="budget-title">
          Monthly Budget Overview
        </v-card-title>
        <v-card-text>
          <highcharts :options="chartOptions" :key="budgetSpent"></highcharts>
          <div class="budget-details">
            <h4>Budget: Ksh. 1000</h4>
            <h3>Spent: Ksh. {{ budgetSpent }}</h3>
            <h3>Remaining: Ksh. {{ budgetRemaining }}</h3>
          </div>
        </v-card-text>
      </v-card>

      <v-card v-else class="my-4 admin-dashboard-card" elevation="22">
        
        <v-card-text>
          <!-- Admin dashboard content goes here -->
          <div class="dashboard-details">
            <!-- Add more admin-specific components or details here -->
            <v-card class="user-count-card" elevation="10">
              <v-card-title class="user-count-title">
                Total Users
              </v-card-title>
              <v-card-text>
                <h3>{{ userCount }}</h3>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
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
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import axiosInstance from '@/service/api'; // Add axios for making API requests

export default {
  components: {
    highcharts: HighchartsVue.component,
  },
  data() {
    return {
      active: null,
      user: {},
      userRole: '',
      userCount: 0, // Add userCount data property
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/welcomePage' },
        { title: 'Articles', icon: 'mdi-newspaper', route: '/articles' },
        { title: 'Saving Calculator', icon: 'mdi-calculator', route: '/savingCalculator' },
        { title: 'Savings', icon: 'mdi-database', route: '/savings' },
        { title: 'Profile', icon: 'mdi-account', route: '/profile' },
      ],
      budgetSpent: 700,
      budgetRemaining: 300,
      chartOptions: {
        chart: {
          type: 'bar',
        },
        title: {
          text: 'Budget Allocation',
        },
        xAxis: {
          categories: ['Spent', 'Remaining'],
          title: {
            text: 'Categories',
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount (Ksh)',
          },
        },
        series: [{
          name: 'Amount',
          data: [this.budgetSpent, this.budgetRemaining],
          color: ['#FF5733', '#C4E538'],
        }],
      }
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route);
    },
    fetchUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.user = userData;
        if (userData.roles && userData.roles.length > 0) {
          this.userRole = userData.roles[0].name;
        }
        if (this.userRole === 'admin') {
          this.fetchUserCount();
        }
      }
    },
    async fetchUserCount() {
      try {
        const response = await axiosInstance.get('/userCount'); // Replace with your API endpoint
        this.userCount = response.data.count;
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    },
    animateProgress() {
      // Animation logic (if needed)
    },
  },
  mounted() {
    this.fetchUser();
    this.animateProgress();
  },
};

</script>

<style scoped>
.app-background {
  min-height: 100vh;
  padding-top: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

.budget-overview-card, .admin-dashboard-card {
  border-radius: 10px;
}

.budget-title, .dashboard-title, .user-count-title {
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.budget-details, .dashboard-details {
  text-align: center;
  margin-top: 20px;
}

.budget-details h3, .dashboard-details h4 {
  margin: 5px 0;
}

.user-count-card {
  margin-top: 20px;
  border-radius: 10px;
}

.user-count-title {
  background-color:orange;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.quick-links-card {
  border-radius: 10px;
}

.quick-links-title {
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 10px;
}

.v-btn span {
  display: block;
}

.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
