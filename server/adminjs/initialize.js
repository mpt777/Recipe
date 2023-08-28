import AdminJS from 'adminjs'
import AdminJSExpress from "@adminjs/express"
import { Database, Resource } from '@adminjs/mongoose' // or any other adapter
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}

const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

export function initialize(app, db) {

    AdminJS.registerAdapter({ Database, Resource })

    const admin = new AdminJS( {
        databases: [db],
    })
    
    const sessionStore =  MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "session",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 1
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'sessionsecret',
            },
            null,
            {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: 'sessionsecret',
            cookie: {
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
            },
            name: 'adminjs',
            }
    )

    app.use(admin.options.rootPath, adminRouter)
}