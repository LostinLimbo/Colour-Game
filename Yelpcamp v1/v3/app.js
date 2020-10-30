// Set express to be used
var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    // Comment     = require("./models/comment"),
    // User        = require("./models/user");

seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Campground.create(
//   { 
//     name: "Walton Firs", 
//     image: "https://waltonfirs.co.uk/media/content/images/Pod%20website%20small.jpg",
//     description: "Lovely site, quite a few trees, seperate toilet block and even a few shower cubicles, albeit a little mouldy"
  
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     } else{
//         console.log("Newly created Campground");
//         console.log(campground);
//     }
//   });

// temp camp array


// This so we can remove the filetype
app.set("view engine", "ejs");

// Root Route for home page.
app.get("/", function(req, res){
 res.render("home");
});


// INDEX Route - Shows all campgrounds
// Route to Campgrounds page
app.get("/campgrounds", function(req, res){
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
        res.render("index", {camps: allCampgrounds});
    }
  })
});


// CREATE Route - Adds new camps to database
// Route for post request to create a new campground
app.post("/campgrounds", function(req, res){
 // get data from form
 var name = req.body.newcamp;
 var image = req.body.newcampimg;
 var description = req.body.newcampinfo;
 var newCamp = {name: name, image: image, description: description}

  // NEW - Show form to create new camp
  // Create new campground and save to DB
 Campground.create(newCamp, function(err, newlyCreated){
   if(err){
     console.log(err);
   }  else {
          // redirect to campgrounds
          res.redirect("/campgrounds");
   }
 })
});

// Route - new campground form
app.get("/campgrounds/new", (req,res) => {
 res.render("new")
});


//SHOW Route - Will be the Show page - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // Find the camp by ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else  {
      console.log("found campgrounds");
      // Render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  })
});


// Route - login form
app.get("/login", (req, res) => {
  res.render("login");
});




// app.listen(process.env.PORT, process.env.IP, function(){
//  console.log("The YelpCamp server has started!");
// });
// Set port to Localhost
app.listen(80, function(){
 console.log("The YelpCamp server has started!");
});
 
 