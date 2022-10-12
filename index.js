const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    //res.send("HI")
    res.render('home')

})

app.get('/about', (req, res) => {
 // res.send("hiiiii")
  //console.log('hiiiiiiiiiii')
    res.render('about')
})

app.get('/projects', (req, res) => {
    res.render('projects')
})
 


app.listen(3000, ()=>{
    console.log("Listennning")
})
