<template>
    <v-app>
      <v-container>
        <v-card class="article-card" elevation="0">
          <v-toolbar color="orange">
            <v-btn @click="$router.go(-1)" color="primary" class="ma-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-card-title class="headline">Investing</v-card-title>
          </v-toolbar>
  
          <v-card-text>
            <p>
              Investing is a crucial step towards building wealth and achieving your financial goals. It involves putting your money into assets that have the potential to grow over time.
            </p>
            <p>
              A well-thought-out investment strategy can help you generate returns that outpace inflation and increase your financial security.
            </p>
            <v-divider class="my-4"></v-divider>
            <h4>Key Steps to Investing:</h4>
            <ul>
              <li>Understand your investment goals.</li>
              <li>Research various investment options.</li>
              <li>Diversify your portfolio to manage risk.</li>
              <li>Monitor your investments regularly.</li>
              <li>Be patient and stick to your strategy.</li>
            </ul>
            <v-divider class="my-4"></v-divider>
            <h4>Watch this video for more insights:</h4>
            <v-responsive aspect-ratio="16/9">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/your_video_id"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-responsive>
          </v-card-text>
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
    name: 'InvestingArticle',
    data() {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home', route: '/welcomePage' },
          { title: 'Articles', icon: 'mdi-newspaper', route: '/articles' },
          { title: 'Saving Calculator', icon: 'mdi-calculator', route: '/savingCalculator' },
          { title: 'Savings', icon: 'mdi-database', route: '/savings' },
          { title: 'Profile', icon: 'mdi-account', route: '/profile' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .article-card {
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .my-4 {
    margin: 20px 0;
  }
  </style>
  