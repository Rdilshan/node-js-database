const express = require("express")
const mongoose = require("mongoose");
const newuser = require("./model/user")
const bodyParsar = require("body-parser")


mongoose.set('strictQuery', false);
const url = "mongodb://127.0.0.1:27017";
const app = express()
app.use(express.static("public"))
app.use(bodyParsar.urlencoded({extended: false}));

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
    res.sendFile('index.html', { root: __dirname });
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

//add user db
app.post("/index",function(req,res){
    const FullNamername = req.body.FullName;
    const email = req.body.email;
    const username = req.body.username;
    const passward = req.body.password;
    console.log(FullNamername + " " + email  + " " +username  + " " + passward)
    newuser.create({fullname:FullNamername,email:email,username:username,passward:passward})
    res.sendFile("index.html", { root: __dirname })

})

//login user

async function login(name,password,res){
    try{
        
        const user1 = await newuser.find({username:name,passward:password})
        console.log(user1)
        //how to check user have value or no values
        if(user1=== null || user1===[]){
            console.log("No user")
            res.sendFile("index.html", { root: __dirname })
            
        }else{
            console.log("login successfull..")
            res.sendFile("profile.html", { root: __dirname })
        }
        
    }catch(err){
        console.log(err)
    }

}

