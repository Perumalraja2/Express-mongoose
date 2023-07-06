const express =require('express')
const router = express.Router()
const{mongodb,dbName,dbUrl}=require('../config/dbconfig')
const { ObjectId } = require('mongodb')

const MongoClient = mongodb.MongoClient
const client = new MongoClient(dbUrl)

router.get('/',async (req,res)=>{
    await client.connect()
try{

let db = await client.db(dbName)
let data =await db.collection('users').find().toArray()
res.status(200).send({
    message:"Data fetched scuccesfully ",
    data
})


}catch(error){
   res.status(500).send({
    message:"internal server error"
   })
}finally{
    client.close()
}

})

router.post('/',async (req,res)=>{
    await client.connect()
    try{
    
    let db = await client.db(dbName)
    let data =await db.collection('users').insertOne(req.body)
    res.status(200).send({
        message:"Data Saved scuccesfully ",
        data
    })
    
    
    }catch(error){
       res.status(500).send({
        message:"internal server error"
       })
    }finally{
    client.close()
    }
    
    })


    router.put('/:id',async (req,res)=>{
        await client.connect()
    try{
    
    let db = await client.db(dbName)
    let data =await db.collection('users').updateOne({_id:new ObjectId(req.params.id)},{$set:req.body})
    res.status(200).send({
        message:"Data Updated scuccesfully ",
        data
    })
    
    
    }catch(error){
       res.status(500).send({
        message:"internal server error"
       })
    }finally{
        client.close()
    }
    
    })

    router.delete('/:id',async (req,res)=>{
        await client.connect()
    try{
    
    let db = await client.db(dbName)
    let data =await db.collection('users').deleteOne({_id:new ObjectId(req.params.id)})
    res.status(200).send({
        message:"Data Deleted scuccesfully ",
        data
    })
    
    
    }catch(error){
       res.status(500).send({
        message:"internal server error"
       })
    }finally{
        client.close()
    }
    
    })


module.exports = router