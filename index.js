const exp = require("constants");
const express=require("express");
const app = express();
//console.dir(app);
const path=require("path");
const methodOverride=require("method-override");

let port=8080;

const { v4: uuidv4 } = require('uuid');

app.use(express.static("public"));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"Muskan Bharti",
        content:"i love coding now ,and my journey start from my college",
    },
    {
        id:uuidv4(),
        username:"Prince Bharti",
        content:"i love earning money ,and my journey start in my very small age",
    },
    {
        id:uuidv4(),
        username:"Pankaj Bharti",
        content:"i love networking ,and my journey start from my home pressure",
    },
    {
        id:uuidv4(),
        username:"Maya Bharti",
        content:"i love cooking now ,and my journey start from my marraige",
    },
];



app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post =posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post =posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post =posts.find((p)=>id===p.id);
    res.render("editing.ejs",{post});
});

app.listen(port,()=>{
    console.log("app is listening on port: ",port);
});