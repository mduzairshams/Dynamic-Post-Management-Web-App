const express = require("express")
const app = express()
const path = require("path")
const methodOverride = require("method-override")
const port = 8080
const { v4: uuidv4 } = require('uuid');
  

app.use(express.urlencoded({extended: true}))

app.set("view engine" , "ejs" );
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"))

let posts = [
    {
        id:uuidv4() ,
        username: "apnacollege",
        content: "happy to share my new achievment at Github do check out my new post!"
    },
    {
        id: uuidv4() ,
        username: "MohammedUzairShams",
        content: "Happy to join Google from next week"
    },
    {
        id: uuidv4() ,
        username: "MrKhanna",
        content: "My new Business outlet has been opened in Bengaluru"
    },

]

app.get("/posts",(req,res)=>{           //Main Index Page of Quora
    res.render("home.ejs" , {posts})
})

app.get("/posts/new",(req,res)=>{       // New Form page for creating new Post
    res.render("new.ejs")
})

app.post("/posts",(req,res)=>{          // Now adding created post to /posts(i.e Index Page) page
    let {username, content} = req.body
    let id = uuidv4() 
    posts.push({id,username, content})
    res.redirect("./posts")
})

app.get("/posts/:id",(req,res)=>{          //Returning Specific ID Details for See Details button
    let {id} = req.params
    let post = posts.find((p)=> id === p.id)
    res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{         //Making patch request that is update by the help of MethodOverride NPM Package used upside as it can't be done manually in HTML Forms we can't write method = "Patch" for update or "DELETE" for destroying any route
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p)=> id === p.id)
    post.content = newContent
    console.log(post )
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{          //This is Edit Post Page it will render edit.ejs page
    let {id} = req.params
    let post = posts.find((p)=> id === p.id)
    res.render("edit.ejs",{post})
})  
app.post("/posts",(req,res)=>{      //This for redirecting page to Main Page after Edit Post Page
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
     let {id} = req.params
    posts = posts.filter((p)=> id !== p.id)
    res.redirect("/posts")
})
app.listen(port , ()=>{
    console.log("We are listening you act something")
})