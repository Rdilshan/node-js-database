//npm install mysql

const connection = require("./auth/authsql")
const   express = require ("express")
const bodyParser = require('body-parser')
const ejs = require('ejs');


const app  = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen('8000',function(){
    console.log("stating app...")
})

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
})


// Route for sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
  });




  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });

  


app.post('/index',function(req,res){
    const name =req.body.fullname
    const email = req.body.email
    const username = req.body.username
    const passward = req.body.password
    if (name === undefined) {
        res.redirect('/')
    }else{

    
    connection.query(
        "INSERT INTO info (`fullname`, `email`, `username`, `passward`) VALUES (?,?,?,?)",
     [name, email, username, passward],
     (error, results, fields) => {
        
        console.log( "registation successful..");
    });
    res.redirect('/')

}

})

// app.get('/index',(req,res)=>{
//     res.sendFile(__dirname + '/index.html');
// }
// )
app.post('/profile', (req, res) => {
    
    const username1 = req.body.username;
    const password1 = req.body.password;
    const id = req.body.btn;


    if (id === undefined) {
        connection.query('SELECT * FROM info WHERE username = ? AND passward = ?', [username1, password1], (error, results, fields) => {
            if(results.length == 0){
                console.log("No user")
            }else{
                console.log("successfull login..")
                res.render('profile', { fullname: results[0].fullname, email: results[0].email,id:results[0].id });
    
            }
        }); 
      } else {
        const fullname = req.body.fullname;
        const email = req.body.email;

        connection.query("UPDATE info SET fullname = ? ,email= ? WHERE id=? ", [fullname, email,id], (error, results, fields) => {
            connection.query('SELECT * FROM info WHERE id = ?', [id], (error, results, fields) => {
                        res.render('profile', { fullname: results[0].fullname, email: results[0].email,id:results[0].id });
                }); 
            });
        
      }

  })  

  app.post('/edit',(req,res)=>{
    const id =req.body.btn
    console.log("editing page..")

    connection.query('SELECT * FROM info WHERE id = ?', [id], (error, results, fields) => {
        res.render('edit', { fullname: results[0].fullname, email: results[0].email,id:results[0].id });

    }); 

  })

