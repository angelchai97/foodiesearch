const express = require('express');
const app = express();
const axios = require('axios');
const Recipe = require('./Recipe').Recipe;
const Search = require('./Recipe').search;
const YOUR_APP_ID = "1af0d863";
const YOUR_APP_KEY = "d5bee6cc4077f779ee5e5191c0656475";

app.get('/getRecipe', (req,res)=>{
  var search = req.query.search == '' ? 'chicken' : req.query.search;
  
  if(req.query.search.trim() !==''){
      var model = new Search({search: req.query.search, created: new Date().toISOString().slice(0, 19).replace('T', ' ')});
      model.save();
  }
  const querystr = `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  axios.get(querystr).then(response =>{
    
    res.send(response.data)
  }).catch(err=>{
      res.send(err)
  })

})
app.get('/saveRecipe', (req,res)=>{
  var save = req.query.save;
  
  const querystr = `https://api.edamam.com/search?q=${save}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  axios.get(querystr).then(response =>{
    const recipe = new Recipe({
      food :  response.data.hits
    });

    recipe
      .save()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res.status(400).json(error);
      });
  }).catch(err=>{
      res.send(err)
  })

})

app.post('/searchHistory',async (req,res)=>{
  var data = await Search.find({});
  res.send(data);
})


app.get('/getAllRecipe', (req, res) => {
  Recipe.find({})  
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});


app.get('/deleteSearch', async (req, res) => {
  try{
    var a = req.query.search;
    res.send(await Search.findByIdAndDelete(req.query.search));
  }catch(err){
    res.send(err)
  } 
});

app.post('/deleteAll',async (req,res)=>{
  var a = await Search.find({}).remove();
  res.send(a)
})
app.listen(5000, () => {
  console.log('server listening on port 5000');
});
