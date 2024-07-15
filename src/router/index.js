import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import WelcomePage from '@/views/Trader/WelcomePage.vue'
import CalculatorPage from '@/views/Trader/CalculatorView.vue'
import ArticlePage from '@/views/Trader/ArticleView.vue'
import BasicCalculatorPage from '@/views/Trader/BasicCalculator.vue'
import EmergencyFundCalculator from '@/views/Trader/EmergencyCalculator.vue';
import BusinessInvestmentCalculator from '@/views/Trader/BusinessInvestmentCalculator.vue';
import Profile from '@/views/Trader/Profile.vue';
import BudgetingArticle from '@/components/BudgetingArticle.vue';
import SavingArticle from '@/components/SavingArticle.vue';
import InvestingArticle from '@/components/InvestingArticle.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path:'/register',
      name:'register',
      component:RegisterView
    },

    { path: '/articles/budgeting',
     component: BudgetingArticle,
     meta: { requiresAuth: true },

   },
    { path: '/articles/saving', 
    component: SavingArticle,
    meta: { requiresAuth: true },

  },
    { path: '/articles/investing',
     component: InvestingArticle,
     meta: { requiresAuth: true },
 
    },

    {
      path: '/emergencyFundCalculator',
      name: 'EmergencyFundCalculator',
      component: EmergencyFundCalculator,
      meta: { requiresAuth: true },

    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true },

    },

    {
      path: '/businessInvestmentCalculator',
      name: 'BusinessInvestmentCalculator',
      component: BusinessInvestmentCalculator,
      meta: { requiresAuth: true },

    },
    {
      path:'/welcomepage',
      name:'welcomePage',
      component:WelcomePage,
      meta: { requiresAuth: true },
    },
    {
      path:'/articles',
      name:'Article',
      component:ArticlePage,
      meta: { requiresAuth: true },
    },
    {
      path:'/savingCalculator',
      name:'calculatorPage',
      component:CalculatorPage,
      meta: { requiresAuth: true },

    },
    {
      path:'/BasicCalculator',
      name:'Basiccalculator',
      component:BasicCalculatorPage,
      meta: { requiresAuth: true },

    },
    {
      path:'/login',
      name:'login',
      component:LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
