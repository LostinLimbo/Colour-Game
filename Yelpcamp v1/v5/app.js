const campground = require("./models/campground");

// Set express to be used
const express     = require("express"),
      app         = express(),
      mongoose    = require("mongoose"),
      bodyParser  = require("body-parser"),
      Campground  = require("./models/campground"),
      Comment     = require("./models/comment");
    // seedDB      = require("./seeds");
    // User        = require("./models/user");
// console.dir(app);
// seedDB();

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
        res.render("campgrounds/index", {camps: allCampgrounds});
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
 res.render("campgrounds/new")
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
      res.render("campgrounds/show", {campground: foundCampground});
    }
  })
});


// Route - login form
app.get("/login", (req, res) => {
  res.render("login");
});

// =========================================================================
// Comment Routes
// =========================================================================

app.get("/campgrounds/:id/comments/new", (req, res) =>{
  Campground.findById(req.params.id, (err, campground) =>{
    if (err){
      console.log(err);
    } else{
      res.render("comments/new", {campground: campground}); 
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) =>{
  // lookup campground using id
  Campground.findById(req.params.id, (err, campground) =>{
    if(err){
      console.log("err");
      res.redirect("/campgrounds");
    } else {
      // create new comment
      Comment.create(req.body.comment, (err, comment) =>{
        if(err){
          console.log(err);
          res.redirect("/campgrounds/:id/comments/new");
        } else{
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});


app.listen(process.env.PORT || 80, process.env.IP, function(){
 console.log("The YelpCamp server has started!");
});
// Set port to Localhost
// app.listen(80, function(){
//  console.log("The YelpCamp server has started!");
// });
 
 