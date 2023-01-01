const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const cookieParser = require('cookie-parser');
const registerRoute = require('./routes/registerRoute');
const doctorRoute = require('./routes/doctorRoute');
const adminRoutes = require('./routes/adminRoutes');
const logoutRoute = require('./routes/logoutRoute');
const { requireAdminAuth } = require('./middlewares/adminAuthMiddleware');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

dotenv.config({ path: './config.env' });

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

// console.log(dbURI);

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database!'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.get('/api/here', (req, res) =>
  res.status(200).json({ msg: 'Welcome to healthcare api!' })
);
app.use('/api', authRoutes);
app.use('/api', registerRoute);
app.use('/api', doctorRoute);
app.use('/api', patientRoutes);
app.use('/api', adminRoutes);
app.use('/api', logoutRoute);

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
