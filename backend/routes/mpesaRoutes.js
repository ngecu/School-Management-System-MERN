import express from 'express'
const router = express.Router()
import {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment,
    QRCode
} from "../controllers/mpesaControllers.js";
import { safaricomAccessToken} from '../middleware/authMiddleware.js'

router.route('/stkPush').post(safaricomAccessToken,initiateSTKPush)
router.route('/qrcode').get(safaricomAccessToken,QRCode)
router.route('/stkPushCallback/:Order_ID').post(stkPushCallback)
router.route('/confirmPayment/:CheckoutRequestID').post(safaricomAccessToken,confirmPayment)

export default router