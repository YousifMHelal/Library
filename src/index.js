import cors from 'cors'
import dotenv from 'dotenv'
import cookie from 'cookie-parser'
import express from 'express'
import homeRouter from './modules/home/routers/home.router.js'
import profileRouter from './modules/profile/routers/profile.router.js'
import authenticationRouter from './modules/authentication/routers/authentication.router.js'
import historicalRouter from './modules/historical/routers/historical.router.js'
import libraryRouter from './modules/library/routers/library.router.js'

import { initializeAdminUserIfNotExists } from './utils/starter.utils.js'

dotenv.config()

const port = process.env.PORT ?? 3000
const app = express()

app.use(cors())
app.use(cookie())
app.use(express.json())

app.use(express.static('src/modules/common/assets'))
app.use(express.static('src/modules/home/assets'))
app.use(express.static('src/modules/library/assets'))
app.use(express.static('src/modules/authentication/assets'))


app.use(homeRouter)
app.use(profileRouter)
app.use(libraryRouter)
app.use(historicalRouter)
app.use(authenticationRouter)


app.get('*', (_, response) => (response.status(404).render('../src/modules/common/views/not.found.view.ejs')))

app.listen(port, () => console.log(`Server is running on port ${port}`))

initializeAdminUserIfNotExists()