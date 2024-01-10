import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import request from "request";
import 'dotenv/config'
import axios from 'axios'

export const safaricomAccessToken = (req, res, next)=> {
    try{

        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        const auth = new Buffer.from(`Ymd4CxVpsTxSpaNGophpW4GLDaP73GH1:AX4Vzxi97QrlmmmR`).toString('base64');

        console.log(process.env.SAFARICOM_CONSUMER_KEY);
        console.log(auth);

        axios({
          method: 'get',
          url: url,
          headers: {
            "Authorization": "Basic " + auth
          },
          query:{
             "grant_type": "client_credentials"
            }
        })
          .then(response => {
            console.log(response.data);

            // Access the response data
            const responseBody = response.data;
            req.safaricom_access_token = responseBody.access_token;
            next();
          })
          .catch(error => {
            console.error("error is ", error);
            res.status(401).send({
              "message": 'Something went wrong when trying to process your payment',
              "error": error.message
            });
          });
    }catch (error) {

        console.error("Access token error ", error)
        res.status(401).send({
            "message": 'Something went wrong when trying to process your payment',
            "error":error.message
        })
    }

}


const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
