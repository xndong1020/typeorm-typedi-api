import 'reflect-metadata'
import { createConnection, useContainer } from 'typeorm'
import { Container } from 'typedi'
import * as express from 'express'
import { AppRoutes } from './routes'

// Configure in your app TypeORM to use TypeDI Container, before you create a connection
useContainer(Container)
createConnection()
  .then(async connection => {
    // create express app
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // register all application routes
    AppRoutes.forEach(route => {
      app[route.method](
        route.path,
        (
          request: express.Request,
          response: express.Response,
          next: Function
        ) => {
          route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err))
        }
      )
    })

    // run app
    app.listen(3000, () =>
      console.log('Express application is up and running on port 3000')
    )
  })
  .catch(error => console.log(error))
