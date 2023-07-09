const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// Token doğrulama middleware'ı
const verifyToken = (req, res, next) => {
  // Token al
  const token = req.cookies.token

  // Token yoksa hata dön
  if (!token) {
    return res.status(401).json({ message: 'Not Login!' });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            res.status(500).json({message: 'İnvalid Token!'})
        }
        req.user = user

        // Sonraki adıma geç
        next();
    })

    
  } catch (error) {
    res.status(401).json({ message: 'Invalid token!' });
  }
};

// Kullanıcı doğrulama middleware'ı
const verifyUser = async (req, res, next) => {
  verifyToken((req,res,next) => {
    if(req.user.id == req.params.id || req.user.isAdmin){
        next();
    }else{
        res.status(401).json({message: "You are not get login"})
    }
  })
};


const verifyAdmin = async (req, res, next) => {
    verifyToken((req,res,next) => {
      if(req.user.isAdmin){
          next();
      }else{
          res.status(401).json({message: "You are not Admin"})
      }
    })
  };
module.exports = { verifyToken, verifyUser, verifyAdmin };
