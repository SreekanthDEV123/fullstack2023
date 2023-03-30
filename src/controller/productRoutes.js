let express = require('express');
let productRouter = express.Router();
const mongodb = require('mongodb').MongoClient;
const url = process.env.MongoUrl;

function router(menu){
    //default route of products
    productRouter.route('/')
        .get((req,res) => {
            mongodb.connect(url,function(err,dc){
                if(err){
                    res.status(500).send('Error While kk Connecting')
                }else{
                    let dbObj = dc.db('marchnode');
                    dbObj.collection('products').find().toArray(function(err,products){
                        if(err){
                            res.status(300).send('Error While Fetching')
                        }else{
                            res.render('product',{title:'Products Page',products,menu})
                        }
                    })
                }
            })
        })
        productRouter.route('/details')
        .get((req,res) => {
            res.send('Product Details')
        })
    return productRouter
}
module.exports = router;
