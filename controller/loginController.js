const { db } = require("../database/db");

const setUserLogin=async(req,res)=>{
    const {userid,password}=req.body;
    const chechUserQ="Select * from tbl_editor where editor_id=? and password_hash=?";
    try{
        const[rowData]=await db.promise().query(chechUserQ,[userid,password]);
        if(rowData.length==0){
            return res.status(400).send({msg:"Invalid Credentials"});
        }
        return res.status(200).send({msg:"login successfull",data:rowData});
    }catch(error){
        return res.status(500).send({msg:error});
    }
}




module.exports={setUserLogin}