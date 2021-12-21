const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const app = express();


//import process.env settings
const PATH = path.resolve(__dirname, "./.env");
require('dotenv').config({path:PATH});

const PORT = process.env.PORT || 9000;
const { Client } = require('pg');
const dbParams = require('./db.js');
const db = new Client(dbParams);
db.connect();
app.use(cors({
  origin: ["http://localhost:3002"], //The front end
  methods: ["GET", "POST"],
  credentials: true,
}))
// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(
  cookieSession({
    name: 'session',
    keys: ['user_id'],
    secret: 'subscribe',
    overwrite: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//import routes
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const clientRoute = require('./routes/client');
const companyRoute = require('./routes/company');
const questionRoute = require('./routes/questions');
const areaRoute = require('./routes/areas')
const groupRoute = require('./routes/groups');
const interviewRoute = require('./routes/interview');
const sessionQuestions = require('./routes/session-questions');

//use routes
app.use('/', indexRoute);
app.use('/api/login', loginRoute(db));
app.use('/api/users', usersRoute(db));
app.use('/api/clients', clientRoute(db));
app.use('/api/company', companyRoute(db));
app.use('/api/questions', questionRoute(db));
app.use('/api/areas', areaRoute(db));
app.use('/api/groups', groupRoute(db));
app.use('/api/interview', interviewRoute(db));
app.use('/api/session-questions', sessionQuestions(db));

app.get('/', (req, res) => {
  res.send('test');
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})

// module.exports = app;
