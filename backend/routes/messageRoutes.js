import express from 'express'

import { allMessages, sendMessage } from '../controllers/messageControllers.js'

const router = express.Router();

router.route("/:chatId").get(allMessages);
router.route("/").post(sendMessage);

export default router
