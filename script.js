// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Find the parent time-block and get its id
    const timeBlockId = $(this).closest(".time-block").attr("id");
    
    // Get the user input from the corresponding textarea
    const userInput = $(this).siblings(".description").val();
    
    // Save the user input to local storage using the time block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // TODO: Add code to apply the past, present, or future class to each time block.
  const currentHour = dayjs().format("H");
  $(".time-block").each(function () {
    const blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // TODO: Add code to get user input from localStorage and set textarea values.
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const userInput = localStorage.getItem(timeBlockId);
    if (userInput) {
      $(this).find(".description").val(userInput);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  const currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});
