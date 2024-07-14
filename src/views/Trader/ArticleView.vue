<template>
  <v-app style="background-image: url('front-view-plant-growing-from-jar-with-coins-copy-space.jpg'); background-size: cover; background-position: center;">
    <div class="background-overlay">
      <v-container>
        <v-card elevation="0" color="transparent">
          <v-card-title class="calculator-title text-center">
            Financial Resources
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col v-for="article in articles" :key="article.id" cols="12" sm="6" md="4">
              <v-card class="my-4" elevation="2">
                <v-card-title>{{ article.title }}</v-card-title>
                <v-card-subtitle>{{ article.author }}</v-card-subtitle>
                <v-card-text>{{ article.content }}</v-card-text>
              </v-card>
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
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="6000">
          {{ snackbarMessage }}
        </v-snackbar>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import axiosInstance from '@/service/api';

export default {
  data() {
    return {
      articles: [],
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'error',
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
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await axiosInstance.get('/financial_literacy_resources');
        this.articles = response.data;
        if (this.articles.length === 0) {
          this.snackbarColor = 'info';
          this.snackbarMessage = 'No articles found.';
          this.snackbar = true;
        }
      } catch (error) {
        this.snackbarColor = 'error';
        this.snackbarMessage = 'Failed to fetch articles. Please try again later.';
        this.snackbar = true;
      }
    },
    navigate(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity (last value) to make it darker/lighter */
}

.calculator-title {
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 10px;
}

.my-4 {
  margin: 20px 0;
}
</style>
