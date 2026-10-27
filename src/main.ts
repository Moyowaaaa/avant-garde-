import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import CaseView from './views/CaseView.vue'
import LabView from './views/LabView.vue'
import './tokens.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/work/rouge-noir', name: 'case', component: CaseView },
    { path: '/lab', name: 'lab', component: LabView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
