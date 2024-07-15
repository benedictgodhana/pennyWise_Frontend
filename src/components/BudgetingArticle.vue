<template>
    <v-app>
      <v-container>
        <v-card class="article-card" elevation="0">
            <v-toolbar color="orange">
                <v-btn @click="$router.go(-1)" color="primary" class="ma-2"><v-icon>mdi-chevron-left</v-icon></v-btn>
                <v-card-title class="headline" > Budgeting</v-card-title>

            </v-toolbar>

          <v-card-text>
            <p>
              Budgeting is a fundamental skill that everyone should develop. It helps you manage your finances effectively and plan for the future.
            </p>
            <p>
              A budget is a plan for your money. It helps you track your income and expenses and ensures that you have enough to cover your essential needs while saving for your goals.
            </p>
            <v-divider class="my-4"></v-divider>
            <h4>Key Steps to Budgeting:</h4>
            <ul>
              <li>Identify your income sources.</li>
              <li>List all expenses (fixed and variable).</li>
              <li>Set financial goals (short-term and long-term).</li>
              <li>Track your spending to stay within your budget.</li>
              <li>Adjust your budget as needed to meet your goals.</li>
            </ul>
            <v-divider class="my-4"></v-divider>
            <h4>Watch this video for more insights:</h4>
            <v-responsive aspect-ratio="16-9">
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
   name: 'BudgetingArticle',
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
  