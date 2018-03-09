const express = require('express'),
        hbs   = require('hbs'),
        fs    = require('fs'); 
    var app   = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Express Middeleware

 app.use((req,res,next) => {
     var now = new Date().toString();

     var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '/n',(err) =>{
        if(err){
            console.log('unable to append to server.log');
        }
    });

  
     
    next()
 });

// app.use((req,res,next) =>{
//     res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));

//Hbs Helpers
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req,res) => {
    // res.send('<h1>Welcome to fun town</h1>')
    // res.send({
    //     name: 'Pelumi',
    //     likes: [
    //         'comic books',
    //         'video game',
    //         'web development'
    //     ]
    // });
    res.render('home',{
        pageTitle: 'Home Page',
        welcomeMessage: 'hello, and welcome to my app'
    });
});

app.get('/about', (req, res) => {
  res.render('about',{
      pageTitle:'About Page'
  })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'ALPHAPROTOCOLFAILED'
    })
});

app.listen(3000,() => {
    console.log('server is up on port 3000');
    
});