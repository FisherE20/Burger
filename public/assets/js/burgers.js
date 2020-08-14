// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devour").on("click", (event) => {
      let id = $(this).data("id");
      let newDevour = $(this).data("newdevour");
  
      let newDevourState = {
        devoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevourState
      }).then(
        function() {
          console.log("changed devoured to", newDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
      $("#order-btn").on("click", (event) => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("Inside js");
  
      let newBurger = {
        burger_name: $("#ca").val().trim(),
        devoured: false
        
      };

      console.log("Burger Data js: "+newBurger);
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", (event) => {
      let id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  