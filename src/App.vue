<script >
import { RouterLink, RouterView } from 'vue-router';
import header from '@/components/Header.vue';
export default{
  components:{
    header,
  },
}
</script>

<template>
  <header>
   
  </header>
  
  <main>
    <RouterView />

  </main>

</template>
