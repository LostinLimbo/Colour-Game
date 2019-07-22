// CLICK TO COMPLETE TO-DO
$("ul").on("click", "li", function(){
 $(this).toggleClass("completed");
});

// DELETE BUTTON
$("ul").on("click", "span", function(event){
 $(this).parent().fadeOut(500, function(){
  $(this).remove();
 });
 event.stopPropagation();
});

// INPUT A NEW TO-DO
$("input[type='text']").keypress(function(event){
 if(event.which === 13){
  var todoText = $(this).val();
  $(this).val("");
  $("ul").append("<li><span class='delete'><i class='fas fa-cut'></i></span> " + todoText + "</li>");
 }
});

//  DROPDOWN
$(".toggle").on("click", function(){
  if($("li, input").css("display") === "none"){
    $("li, input").slideDown("fast");
    }  else{
       $("li, input").slideUp("fast");
       }  
}) 
      
   
   
// REPLACED LINES, IDEAS I HAD THAT GOT REPLACED (FOR REFERENCE)

// DROPDOWN
// $(".toggle").on("click", function(){
  //  $("li").toggleClass("drop-down");
  //  $("input").toggleClass("drop-down");
// }

// DELETE BUTTON DISPLAY
// CHANGED FOR PURE CSS
// $("ul").on("mouseover", "li", function(){
//   $(this).children().css("display", "inline");
//  });
// $("ul").on("mouseout", "li", function(){
//   $(this).children().css("display", "none");
//  });











