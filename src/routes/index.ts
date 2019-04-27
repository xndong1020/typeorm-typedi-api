import userController from '../controllers/userController'

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/users',
    method: 'get',
    action: userController.getAll
  },
  {
    path: '/users/:id',
    method: 'get',
    action: userController.getById
  },
  {
    path: '/users',
    method: 'post',
    action: userController.create
  },
  {
    path: '/users/:id',
    method: 'put',
    action: userController.update
  },
  {
    path: '/users/:id',
    method: 'delete',
    action: userController.delete
  }
]
