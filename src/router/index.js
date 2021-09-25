import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categoria from '../components/Categoria.vue'
import SubCategoria from '../components/SubCategoria.vue'
import Proveedor from '../components/Proveedor'
import Cliente from '../components/Cliente'
import ClienteForm from '../components/ClienteForm'
import Deposito from '../components/Deposito'
import UnidadMedida from '../components/UnidadMedida'
import Articulo from '../components/Articulo'
import ArticuloForm from '../components/ArticuloForm'
import OrdenCompraList from '../components/Compra/OrdenCompraList'
import OrdenCompraForm from '../components/Compra/OrdenCompraForm'
import CompraList from '../components/Compra/CompraList'
import CompraForm from '../components/Compra/CompraForm'
import Login from '../components/Login.vue'
import axios from 'axios'
import { HTTP } from '@/utils/constants'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: Categoria,
    meta: { requiresAuth: true },
  },
  {
    path: '/proveedor',
    name: 'proveedor',
    component: Proveedor,
    meta: { requiresAuth: true },
  },
  {
    path: '/deposito',
    name: 'deposito',
    component: Deposito,
    meta: { requiresAuth: true },
  },
  {
    path: '/unidad_medidad',
    name: 'unidad',
    component: UnidadMedida,
    meta: { requiresAuth: true },
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: Cliente,
    meta: { requiresAuth: true },
  },
  {
    path: '/cliente/crear/',
    name: 'cliente_form',
    component: ClienteForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/cliente/:id',
    name: 'cliente_update',
    component: ClienteForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/articulo',
    name: 'articulo',
    component: Articulo,
    meta: { requiresAuth: true },
  },
  {
    path: '/articulo/crear/',
    name: 'articulo_form',
    component: ArticuloForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/articulo/:id',
    name: 'articulo_update',
    component: ArticuloForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/sub-categoria',
    name: 'sub-categoria',
    component: SubCategoria,
    meta: { requiresAuth: true },
  },
  {
    path: '/orden_compra',
    name: 'orden_compra',
    component: OrdenCompraList,
    meta: { requiresAuth: true },
  },
  {
    path: '/orden_compra/crear',
    name: 'orden_compra_create',
    component: OrdenCompraForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/orden_compra/:id',
    name: 'orden_compra_update',
    component: OrdenCompraForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/compra',
    name: 'compra',
    component: CompraList,
    meta: { requiresAuth: true },
  },
  {
    path: '/compra/crear',
    name: 'compra_create',
    component: CompraForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('access')
    if (token) {
      try {
        const validToken = await axios.post('/token/verify/', { token })
        if (validToken && validToken.status === HTTP.SUCCESS.OK) {
          next()
        } else {
          localStorage.clear()
          next({name:'login'})
        }
      } catch (e) {
        localStorage.clear()
        next({name:'login'})
      }
    } else {
      localStorage.clear()
      next()
    }
  } else {
    next()
  }

});

export default router
