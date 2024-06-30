const express = require('express');
const sessions = require('express-session');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
// require('dotenv').config();

const { contentPolicyMiddleware } = require('./middleware/validation');
const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/')));
app.set('views', path.join(__dirname, './views'));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

app.use(sessions({
  secret: 'session-secret',
  csrfToken: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
}));

app.use(helmet());
app.use(cors({ origin: 'https://tech-upgrades-build.vercel.app' }));
app.use(contentPolicyMiddleware);

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
