// Set express to be used
var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var camps = [
 {name: "Bentley Copse", image: "https://fastly.4sqi.net/img/general/600x600/2152463_lldOYWMbxHLw1bifnR6lv-KHK2is_WlM9U7_V-w0ud4.jpg"},
 {name: "Walton Firs", image: "https://waltonfirs.co.uk/media/content/images/Pod%20website%20small.jpg"},
 {name: "Willow's End", image: "http://www.willowmillcampsite.com/imageHandler.ashx?BackgroundImageID=4"}
]

// This so we can remove the filetype
app.set("view engine", "ejs");

// Root Route for home page.
app.get("/", function(req, res){
 res.render("home");
});

// Route to Campgrounds page
app.get("/campgrounds", function(req, res){
 res.render("campgrounds", {camps: camps});
});



// Route for post request to create a new campground
app.post("/campgrounds", function(req, res){
 // get data from form
 var name = req.body.newcamp;
 var image = req.body.newcampimg;
 var newCamp = {name: name, image: image}
 camps.push(newCamp); 
 // redirect to campgrounds
 res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req,res) => {
 res.render("new")
})
// Set port to Localhost
app.listen(80, function(){
 console.log("The YelpCamp server has started!");
});
 
 