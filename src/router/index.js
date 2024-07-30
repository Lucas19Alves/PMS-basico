// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Quartos from '../views/Quartos.vue';
import Cadastros from '../views/Cadastros.vue';
import Reservas from '../views/Reservas.vue';
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Quartos',
    component: Quartos
  },
  {
    path: '/cadastros',
    name: 'Cadastros',
    component: Cadastros
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/reservas',
    name: 'Reservas',
    component: Reservas
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
