const mongoose =require("mongoose");
const marked=require("marked");
const slugify=require("slugify");
const {JSDOM}=require("jsdom");
const createDomPurify=require("dompurify");
const domPurify=createDomPurify(new JSDOM().window);


const articlesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String
    },
    markdown:{
        type:String,
        required:true
    }, 
    date:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHTML:{
        type:String,
        required:true
    }
});
articlesSchema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true});
    }
    
    if(this.markdown){
        this.sanitizedHTML=domPurify.sanitize(marked(this.markdown))
    }
    next();
});

module.exports=mongoose.model('Article',articlesSchema);