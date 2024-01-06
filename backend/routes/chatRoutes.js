import express from 'express'

import  {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
}  from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").post( accessChat);
router.route("/").get( fetchChats);
router.route("/createGroup").post( createGroupChat);
router.route("/fetchGroups").get( fetchGroups);
router.route("/groupExit").put( groupExit);

export default router
