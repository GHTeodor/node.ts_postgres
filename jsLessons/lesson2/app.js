const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");
require("./users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.get("/", (req, res) => {
    res.render("login", {users});
});

app.post("/", (req, res) => {
    users.push(req.body);
    res.end();
});

app.use((req, res) => res.redirect("/"));

const PORT = 5200;
app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT} ...🚀🚀🚀`));