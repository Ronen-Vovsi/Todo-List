// Initialization of variables
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// Function to authenticate logins
function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No user with that username' })
        }
        // Compare a known login to the user inputed login
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        }catch (e) {
            return done(e)
        }

    }
    // Authenticates the user
    passport.use(new LocalStrategy({ usernameField: 'username'}, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize