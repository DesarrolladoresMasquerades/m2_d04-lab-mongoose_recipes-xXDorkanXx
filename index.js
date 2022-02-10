require("dotenv/config");

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = `mongodb+srv://${process.env.MG_USERNAME}:${process.env.MG_PASSWORD}@cluster0.5zqfb.mongodb.net/recipe-app?authSource=admin&replicaSet=atlas-ffdmfo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    Recipe.deleteMany()
    .then(() => {
      Recipe.create({
        title: "Pollo empanao con papas",
        level: "Easy Peasy",
        ingredients: [
          "1 pechuga de pollo",
          "pan rallao",
          "2 huevos",
          "aceite de oliva extra",
          "2 limones",
          "3 papas",
          "sal al gusto"
        ],
        cuisine: "Española",
        dishType: "main_course",
        image: "https://eldoradomalaga.com/wp-content/uploads/2020/05/pollo_empanado_con_patatas.jpg",
        duration: 30,
        creator: "Receta de la abuela"
      })
      .then(()=>{
        Recipe.insertMany(data)
        .then(()=>{
          Recipe.findOneAndUpdate(
            {title: "Rigatoni alla Genovese"},
            {duration: 100},
            {new: true})
          .then(async ()=>{
            await Recipe.deleteOne({title: "Carrot Cake"})
            await mongoose.connection.close()
          })
        })
      })
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//mongoose.connection.close();