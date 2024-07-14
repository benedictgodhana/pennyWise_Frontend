<template>
   <v-app
     style=" background-image: url('867.jpg');
   background-size: cover;
   background-position: center;"
   >
     <v-container>
       <v-card class="welcome-card" elevation="7">
         <v-toolbar dark>
           <v-card-title><v-icon>mdi-menu</v-icon></v-card-title>
         </v-toolbar>
         <!-- Main content of the page -->
       </v-card>
 
       <v-card class="my-4 budget-overview-card" elevation="22">
         <v-card-title class="budget-title">
           Monthly Budget Overview
         </v-card-title>
         <v-card-text>
           <!-- Add budget overview details here -->
           <div>
             <v-row>
               <v-col cols="6" class="text-center">
                 <br>
                 <div class="pie-chart">
                   <v-progress-circular
                     :rotate="-90"
                     :size="120"
                     :width="15"
                     :value="segment1"
                     color="green"
                     class="animated-progress"
                   >
                   </v-progress-circular>
                   <v-progress-circular
                     :rotate="segment1 * 3.6 - 90"
                     :size="120"
                     :width="15"
                     :value="segment2"
                     color="orange"
                     class="animated-progress"
                   >
                   </v-progress-circular>
                   <v-progress-circular
                     :rotate="(segment1 + segment2) * 3.6 - 90"
                     :size="120"
                     :width="15"
                     :value="segment3"
                     color="red"
                     class="animated-progress"
                   >
                   </v-progress-circular>
                 </div>
               </v-col>
               <v-col cols="6">
                 <div >
                   <h4>Budget: Ksh. 1000</h4>
                   <h3>Spent: Ksh.{{ budgetSpent }}</h3>
                   <h3>Remaining: Ksh.{{ budgetRemaining }}</h3>
                 </div>
               </v-col>
             </v-row>
           </div>
         </v-card-text>
       </v-card>
 
       <v-card class="my-4 quick-links-card" elevation="12">
         <v-card-title class="quick-links-title">
           Quick Links
         </v-card-title>
         <v-card-text>
           <v-row>
             <v-col cols="4">
               <br>
               <v-btn
                 color="orange"
                 block
                 @click="navigate('/savingCalculator')"
               >
                 <v-icon>mdi-calculator</v-icon>
               </v-btn>
             </v-col>
             <v-col cols="4">
               <br>
               <v-btn
                 color="orange"
                 block
                 @click="navigate('/articles')"
               >
                 <v-icon>mdi-newspaper</v-icon>
               </v-btn>
             </v-col>
             <v-col cols="4">
               <br>
               <v-btn
                 color="orange"
                 block
                 @click="navigate('/profile')"
               >
                 <v-icon>mdi-account</v-icon>
               </v-btn>
             </v-col>
           </v-row>
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
       segment1: 50, // Example value, should be dynamic
       segment2: 30, // Example value, should be dynamic
       segment3: 20, // Example value, should be dynamic
       budgetSpent: 700, // Example value, should be dynamic
       budgetRemaining: 300, // Example value, should be dynamic
     };
   },
   methods: {
     navigate(route) {
       this.$router.push(route);
     },
   },
   mounted() {
     this.animateProgress();
   },
   methods: {
     navigate(route) {
       this.$router.push(route);
     },
     animateProgress() {
       let value1 = 0;
       let value2 = 0;
       let value3 = 0;
       const interval1 = setInterval(() => {
         if (value1 >= this.segment1) {
           clearInterval(interval1);
           const interval2 = setInterval(() => {
             if (value2 >= this.segment2) {
               clearInterval(interval2);
               const interval3 = setInterval(() => {
                 if (value3 >= this.segment3) {
                   clearInterval(interval3);
                 } else {
                   value3++;
                   this.segment3 = value3;
                 }
               }, 20);
             } else {
               value2++;
               this.segment2 = value2;
             }
           }, 20);
         } else {
           value1++;
           this.segment1 = value1;
         }
       }, 20);
     },
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
 
 .budget-overview-card {
   border-radius: 10px;
 }
 
 .budget-title {
   background-color: #ff9800;
   color: white;
   font-weight: bold;
   padding: 10px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
 }
 
 .budget-details h3 {
   margin: 5px 0;
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
 
 .animated-progress {
   transition: stroke-dashoffset 0.35s;
   transform: rotate(-90deg);
   transform-origin: center center;
 }
 
 .pie-chart {
   position: relative;
 }
 
 .pie-chart > .v-progress-circular {
   position: absolute;
   top: 0;
   left: 0;
 }
 </style>
 