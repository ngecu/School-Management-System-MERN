import request from "request";
import 'dotenv/config'
import {getTimestamp} from "../utils/timestamp.js";
import ngrok from 'ngrok'

// @desc initiate stk push
// @method POST
// @route /stkPush
// @access public
export const initiateSTKPush = async (req, res) => {
  try {
    const { amount, phone, Order_ID } = req.body;
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + req.safaricom_access_token;
  
    const timestamp = getTimestamp();
    console.log("time stamp is ", timestamp);
    const pass_key = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
    const bus_short_code = 174379
    const password = new Buffer.from(
      bus_short_code + pass_key + timestamp
    ).toString("base64");
    
    // create callback url
    const callback_url = await ngrok.connect(5000);
    console.log("call back is ", callback_url);
    const api = ngrok.getApi();
    await api.listTunnels();
  
    const requestObject = {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: phone,
        CallBackURL: `${callback_url}/api/stkPushCallback/${Order_ID}`,
        AccountReference: "School Manage System",
        TransactionDesc: "Paid online",
      },
    };
  
    const reqInstance = request(requestObject, function (error, response, body) {
      if (error) {
        console.error(error);
        res.status(503).send({
          message: "Error with the STK push",
          error: error,
        });
      } else if (body.ResponseCode === "0") {
        // STK push request is successful
        res.status(200).json(body);
      } else if (body.ResponseCode === "1") {
        console.log("user canceled");
        // User canceled the STK push request
        res.status(400).json({
          message: "Payment request cancelled by the user.",
        });
      } else {
        // Other error occurred
        res.status(503).send({
          message: "Error with the STK push",
          error: body,
        });
      }
    });

    // Handle 'error' event on the request object
    reqInstance.on('error', (err) => {
      console.error("Request error:", err);
      res.status(503).send({
        message: "Error with the STK push",
        error: err,
      });
    });
  } catch (error) {
    console.error("Error while trying to create LipaNaMpesa details", error);
    res.status(503).send({
      message:
        "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
      error: error,
    });
  }
};
  


// @desc callback route Safaricom will post transaction status
// @method POST
// @route /stkPushCallback/:Order_ID
// @access public
export const stkPushCallback = async(req, res) => {
    try{

    //    order id
        const {Order_ID} = req.params

        //callback details

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
                 }   = req.body.Body.stkCallback

    //     get the meta data from the meta
        const meta = Object.values(await CallbackMetadata.Item)
        const PhoneNumber = meta.find(o => o.Name === 'PhoneNumber').Value.toString()
        const Amount = meta.find(o => o.Name === 'Amount').Value.toString()
        const MpesaReceiptNumber = meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString()
        const TransactionDate = meta.find(o => o.Name === 'TransactionDate').Value.toString()

        // do something with the data
        console.log("-".repeat(20)," OUTPUT IN THE CALLBACK ", "-".repeat(20))
        console.log(`
            Order_ID : ${Order_ID},
            MerchantRequestID : ${MerchantRequestID},
            CheckoutRequestID: ${CheckoutRequestID},
            ResultCode: ${ResultCode},
            ResultDesc: ${ResultDesc},
            PhoneNumber : ${PhoneNumber},
            Amount: ${Amount}, 
            MpesaReceiptNumber: ${MpesaReceiptNumber},
            TransactionDate : ${TransactionDate}
        `)

        res.json(true)

    }catch (e) {
        console.error("Error while trying to update LipaNaMpesa details from the callback",e)
        res.status(503).send({
            message:"Something went wrong with the callback",
            error : e.message
        })
    }
}

// @desc Check from safaricom servers the status of a transaction
// @method GET
// @route /confirmPayment/:CheckoutRequestID
// @access public
export const confirmPayment = async(req, res) => {
    try{


        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        const auth = "Bearer " + req.safaricom_access_token

        const timestamp = getTimestamp()
        //shortcode + passkey + timestamp
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')


        request(
            {
                url: url,
                method: "POST",
                headers: {
                    "Authorization": auth
                },
                json: {
                    "BusinessShortCode":process.env.BUSINESS_SHORT_CODE,
                    "Password": password,
                    "Timestamp": timestamp,
                    "CheckoutRequestID": req.params.CheckoutRequestID,

                }
            },
            function (error, response, body) {
                if (error) {
                    console.log(error)
                    res.status(503).send({
                        message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
                        error : error
                    })
                } else {
                    res.status(200).json(body)
                }
            }
        )
    }catch (e) {
        console.error("Error while trying to create LipaNaMpesa details",e)
        res.status(503).send({
            message:"Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error : e
        })
    }
}