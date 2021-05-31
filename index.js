const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid'); // call it uuid instead of v4
const methodOverride = require('method-override');




app.use(express.urlencoded({ extended: true })) // make post  requests work
app.use(express.json()) // parse json
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE
app.set('views', path.join(__dirname, 'views'));  // path sets an absolute path
app.set('view engine', 'ejs')

let comments = [ //use let because in delete we resassgned comments, otherwise would have used const
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments }) // {comments} passes in all the comments
    // comments folder- index.ejs file

})

// get info from form- new
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// post info from form somewhere else- create
app.post('/comments', (req, res) => {
    const { username, comment } = req.body; // take the username and comment key value pair from data
    comments.push({ username, comment, id: uuid() }) // push data onto comments array
    //res.send("IT WORKED!");
    res.redirect('/comments');
})


app.get('/comments/:id', (req, res) => {
    const { id } = req.params; // request.params.id
    // const comment = comments.find(c => c.id === parseInt(id)); parseInt(id) to turn id from string to integer
    const comment = comments.find(c => c.id === id) // find gives first matchimg id
    res.render('comments/show', { comment }) // {comment} so can use it in page
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id); // find gives first matchimg id
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id); // filter out everything that isn't linked to that id
    res.redirect('/comments')
})

// app.get('/tacos', (req, res) => {
//     res.send('GET /tacos response')
// })

// app.post('/tacos', (req, res) => {
//     // console.log(req.body)
//     const { meat, qty } = req.body;
//     res.send(`OK, here are your ${qty} ${meat}`)
// })


app.listen(3000, () => {
    console.log('ON PORT 3000')
})