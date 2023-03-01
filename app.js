const express = require("express")
const mongoose = require("mongoose");
const newuser = require("./model/user")
const bodyParsar = require("body-parser")
const { json } = require("express");

mongoose.set('strictQuery', false);
const url = "mongodb://127.0.0.1:27017";
const app = express()
app.use(express.static("public"))
app.use(bodyParsar.urlencoded({extended: false}));
app.set('view engine','ejs');

mongoose.connect(url, {useNewUrlParser: true})
.then(()=>console.log("connected.."))
.catch((e)=>console.log(e))




// console.log(newuser.find())
async function finduser() {
   const users = await newuser.find();
   console.log(users);
}
//ddnewuser()

app.get('/', function(req, res) {
    // res.sendFile('index.html', { root: __dirname });
    res.render('index',{data :{name : null}})
                    

});

app.listen("8000",()=>{
    console.log("8000 runing app...")
}
)
app.post("/profile",function(req,res){
    const username = req.body.username;
    const passward = req.body.password;
    login(username,passward,res)
    .catch((err)=>console.log(err))
    
})


app.get('/signup', function(req, res) {
    res.sendFile('signup.html', { root: __dirname });
});

app.get('/profile', function(req, res) {
    res.render('profile')
                    
});
//add user db
app.post("/index",function(req,res){
    const FullNamername = req.body.FullName;
    const email = req.body.email;
    var username = req.body.username;
    const passward = req.body.password;
    console.log(FullNamername + " " + email  + " " +username  + " " + passward)
    newuser.create({fullname:FullNamername,email:email,username:username,passward:passward})
    res.sendFile("index.html", { root: __dirname })
    

})

//login user

async function login(name,password,res){
    newuser.findOne({username:name,passward:password},(err,user1)=>{
        if (err) {throw(err)}
        
        try{
                if(user1 != null){
                    console.log("login successfull..")
                    res.render('profile',{data :{name : user1.fullname,email:user1.email,id:user1._id}})
                    // res.sendFile("profile.html", { root: __dirname })
                    console.log(user1._id)
        
                    
                }else{
                    console.log("No user")
                    res.render('index',{data :{name : "no user"}})
                    
                    // res.sendFile("index.html", { root: __dirname })
                }
                
            }catch(err){
                console.log(err)
            }
        
    })

    
}

//edit page
app.post("/edit",function(req,res){
    const id = req.body.btn
    
    newuser.findById(id,(err,user1)=>{
        if (!err) {
            res.render('edit',{data :{name : user1.fullname,email:user1.email,id:user1._id}})
        }
    })
    // 
                    
    
})

app.post("/editprofile",function(req,res){
    const id = req.body.btn
    const name = req.body.name
    const email = req.body.email
    console.log(name,email)
    newuser.findByIdAndUpdate(id,{fullname:name,email:email},function(err){
        newuser.findById(id,(err,user1)=>{
            if (!err) {
                res.render('profile',{data :{name : user1.fullname,email:user1.email,id:user1._id}})
            }
        })
        
    })
    //
})

app.get('/sign-out', (req, res) => {
    console.log("this is signout page");
    // req.session.destroy((err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     res.redirect('/');
    //   }
    // });
  });
