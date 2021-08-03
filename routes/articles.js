const express=require("express");
const Article=require("./../models/articles");
const router=express.Router();
router.get("/new",(req,res)=>{
  res.render("articles/new",{article:new Article()});
})

router.get("/:slug",async(req,res)=>{
        await Article.findOne({slug:req.params.slug}).then((data)=>{
        res.render("articles/show",{data});
    }).catch((e)=>{
        res.redirect("/");
    });
    
    
})


router.get("/",(req,res)=>{
    res.render("articles/index");
})

const saveData=(path)=>{
    return async (req,res)=>{
        let article=req.article;
        article.title=req.body.title;
        article.description=req.body.description;
        article.markdown=req.body.markdown;

        article.save().then((data)=>{
            res.redirect(`/articles/${article.slug}`);
        }).catch((error)=>{
            res.render(`articles/${path}`,{article});
        });
    }
}



router.post("/",async (req,res,next)=>{
    req.article=new Article();
    next()
},saveData('new'));

router.delete("/:id",async (req,res)=>{
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
})

router.get('/edit/:id',async (req,res)=>{
   const article = await Article.findById(req.params.id);
   res.render("articles/edit",{article});
  })

router.put("/:id",async (req,res,next)=>{
    req.article =await Article.findById(req.params.id);
    next();
  },saveData('edit'))

module.exports=router;