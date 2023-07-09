const express = require('express');
const cors = require('cors'); // Cors modülü bu şekilde tanımlanmalı
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors()); // Cors modülü burada kullanılmalı
app.use(bodyParser.urlencoded({limit: '30mb', extended: true })); // for parsing application/xwwwform
app.use(bodyParser.json({limit: '30mb', extended: true })); // for parsing json data

app.use(cookieParser());

const HotelRouter = require('./routers/Hotel');
const RoomRouter = require('./routers/Room');
const AuthRouter = require('./routers/Auth');
const UserRouter = require('./routers/User');

app.use(HotelRouter);
app.use(RoomRouter);
app.use(AuthRouter);
app.use(UserRouter);

mongoose.connect('mongodb+srv://uygar:uygareren123@cluster0.sg1tnmy.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('CONNECTED!')
    }).catch((err) => {
        console.log(err)
    })

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
