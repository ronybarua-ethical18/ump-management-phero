import express, { Router } from 'express'
import authRoute from '../modules/users/auth.route'
import userRoutes from '../modules/users/users.route'
import cowRoutes from '../modules/cows/cows.route'

const router = express.Router()

type IRoute = {
  path: string
  route: Router
}

const routeList: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/cows',
    route: cowRoutes,
  },
]

routeList.forEach(route => {
  router.use(route.path, route.route)
})

export default router
