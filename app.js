const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));


let items = [];


app.get('/', (req, res) => {
    res.render('index', { items });
});


app.post('/add', (req, res) => {
    const newItem = req.body.item.trim();
    if (newItem) {
        items.push(newItem); 
    }
    res.redirect('/'); 
});


app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: items[id], id });
});


app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body.item.trim();
    if (updatedItem) {
        items[id] = updatedItem; 
    }
    res.redirect('/'); 
});


app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    items.splice(id, 1);
    res.redirect('/'); 
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
