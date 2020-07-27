require('dotenv/config');
const admin = require("firebase-admin");
const { firestore } = require('firebase-admin');
const { ApolloError } = require('apollo-server-express');
serviceAccount = require('../develop-volun-7fd889af4eb6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const resolvers = {
    Query: {
        async users() {
            try {
                console.log('foi')
                const users = await admin
                    .firestore()
                    .collection('users')
                    .get()
                return users.docs.map(user => user.data());
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
    Mutation: {
        async createUser(user) {
            try {
                const newUser = await admin
                        .firestore()
                        .collection('users')
                        .add({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                })
                return newUser;
            } catch (error) {
                throw new ApolloError(error);
            }
        }
    }
}

module.exports = resolvers;