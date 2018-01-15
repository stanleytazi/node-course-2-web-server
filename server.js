const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});
hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcomem to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.get('/project', (req, res) => {
    res.render('project.hbs', {
       pageTitle: 'Project Page' 
    });
});

app.get('/bad', (req, res) => {
    res.send({
        msg: 'goodjob',
        name: 'chun',
        favorite: [
            'cake',
            'coffee'
        ]
});
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);   
});