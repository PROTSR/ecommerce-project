const express = require('express')
const mongoose = require('mongoose')

const connectDb = async ()=>{
    try {
       await mongoose.connect("mongodb://tsrbirade_db_user:tsrbirade0001@ac-raashn8-shard-00-00.xtrlaow.mongodb.net:27017,ac-raashn8-shard-00-01.xtrlaow.mongodb.net:27017,ac-raashn8-shard-00-02.xtrlaow.mongodb.net:27017/elite?ssl=true&replicaSet=atlas-rpm1gt-shard-0&authSource=admin&appName=Cluster0")
       console.log('connected to database')

    } catch (e) {
        console.log(e)
        process.exit(1)
    }

}

module.exports = connectDb