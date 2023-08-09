import express from "express";
import { deleteUser, getUser, getUsers, updatedUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


// router.get("/checkauthentication",verifyToken , (req,res,next)=>{
//     res.send("Hello user you are authenticated");
// });

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello user you are logedin and u can delele anything");
// });

// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin you are logedin and u can delele all anything");
// });

//Update
router.put("/:id",verifyUser,updatedUser);

//Delete
router.delete("/:id",verifyUser,deleteUser);

//Get
router.get("/:id",verifyUser,getUser);

//Get All
router.get("/",verifyAdmin,getUsers);


export default router;