import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/pages/home/HomeView.vue"
import AboutUs from "@/pages/AboutUs.vue"
import Applications from "@/pages/Applications.vue"
import Photos from "@/pages/Photos.vue"
import Mentorship from "@/pages/Mentorship.vue"
import NotFound from "@/pages/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutUs,
    },
    {
      path: '/applications',
      name: 'applications',
      component: Applications,
    },
    {
      path: '/photos',
      name: 'photos',
      component: Photos,
    },
    {
      path: '/mentorship',
      name: 'mentorship',
      component: Mentorship,
    },
    {
      path: '/:catchAll(.*)',
      name: "404",
      component: NotFound,
    }
  ],
})

export default router
