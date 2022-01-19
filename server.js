const dotenv = require('dotenv');
dotenv.config();

const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const database = require('./src/database');
const routes = require('./src/routes');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const AccountRepository = require('./src/database/repository/account_repo');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        let aRepo = AccountRepository();
        let account = await aRepo.findByUsername(username);

        if (account.length == 0) {
            return done(null, false, {message: 'Usuário não encontrado'});
        }
        
        bcrypt.compare(password, account[0].password, (err, result) => {
            
            if (err) {
                return done(err);
            }
            if(!result) {
                return done(null, false, {message: 'Senha Inválida'});
            }

            return done(null, account);
        });

    }
));

passport.serializeUser((user, done) => {
    done(null, {id: user.id})
});

passport.deserializeUser( async (id, done) => {
    let aRepo = AccountRepository();
    let account = await aRepo.findById(id);
    return done(null, account);
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 's3cr3t',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(port, async () => {
    await database.sync({ force: true });
    console.log(`Servidor está executando na porta ${port} `);

//    try {
//      await sequelize.authenticate();
//    console.log('Connection has been established successfuly.');
//    }catch (error) {
//        console.error('Unable to connect to the database:', error);
//    }
    

})
