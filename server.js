const express = require("express");
const app=express();
const mongoose=require("mongoose");
const Articles=require("./models/articles");
const methodOverride=require("method-override");
require('dotenv').config();

mongoose.connect(`mongodb+srv://mar:${process.env.API_PWD}@cluster0.3a4rk.mongodb.net/articles?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true},(error)=>{
    console.log(error);
});


const articleRouter=require("./routes/articles");

app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use("/articles",articleRouter);

app.get('/', async (req,res) => {
    const articles = await Articles.find().sort({date:"desc"});
    res.render("./articles/index",{articles});
});
 

app.listen(process.env.PORT || 5000,()=>{
    console.log("server started !");
});