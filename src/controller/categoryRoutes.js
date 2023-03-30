let express = require('express');
let categoryRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.MongoUrl;
//const categoryCollection =require('./db').collection("category");

function router(menu){
    //default route of products
    categoryRouter.route('/')
        .get((req,res) => {
            mongodb.connect(url,function(err,dc){
                if(err){
                    console.log(err)
                  //  res.status(500).send('Error While kk Connecting')
              }else{
                  let dbObj = dc.db('marchnode');
                   dbObj.collection('category').find().toArray(function(err,data){
                        if(err){
                            res.status(300).send('Error While Fetching')
                        }else{
                            res.render('category',{title:'Category Page',catData:data,menu})
                        }
                    })
                }
           })
        })
        categoryRouter.route('/details')
        .get((req,res) => {
            res.send('Category Details')
        })
    return categoryRouter
}
module.exports = router;
