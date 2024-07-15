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
                <v-card-title style="background-color:orange;font-weight: 400;font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">{{ article.title }}</v-card-title>
                <br>
                <v-card-text>{{ article.content }}</v-card-text>
                <v-card-actions>
                  <v-btn @click="navigateToArticle(article.link)" style="text-transform: capitalize;background-color: orange;" width="100%">Read More</v-btn>
                </v-card-actions>
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
export default {
  data() {
    return {
      articles: [
        { id: 1, title: 'Understanding Budgeting', author: 'John Doe', content: 'Learn the basics of budgeting...', link: '/articles/budgeting' },
        { id: 2, title: 'Saving for the Future', author: 'Jane Smith', content: 'Discover tips for saving money...', link: '/articles/saving' },
        { id: 3, title: 'Investment Strategies', author: 'Mike Johnson', content: 'Explore various investment strategies...', link: '/articles/investing' },
        // Add more articles as needed
      ],
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'info', // Default to info since we no longer have a fetch error
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
    navigateToArticle(link) {
      this.$router.push(link);
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
  background-color: rgba(0, 0, 0, 0.5);
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
