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

$(function () {
  // Display the current date in the header
  function displayCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);
  }

  // Apply past, present, or future class to time blocks
  function updateTimeBlocks() {
    const currentHour = dayjs().hour();

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
  }

  // Load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const savedEvent = localStorage.getItem(timeBlockId);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Save user input to local storage
  $(".saveBtn").on("click", function () {
    const timeBlockId = $(this).closest(".time-block").attr("id");
    const userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Initialize the application
  displayCurrentDate();
  updateTimeBlocks();
  loadSavedEvents();

  // Update the time blocks every minute to reflect the current time
  setInterval(function () {
    updateTimeBlocks();
  }, 60000);
});

// To apply past, present, or future classes to time blocks, you can use a loop.
for (let i = 10; i <= 17; i++) {
  const timeBlockId = `hour-${i}`;
  const $timeBlock = $(`#${timeBlockId}`);
  
  // Calculate the corresponding time label (e.g., "10AM", "11AM", etc.)
  const timeLabel = (i < 12) ? `${i}AM` : (i === 12) ? "12PM" : `${i - 12}PM`;

  // Create the HTML for the time block
  const timeBlockHTML = `
    <div class="col-2 col-md-1 hour text-center py-3">${timeLabel}</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
    </button>
  `;

  // Set the HTML for the time block
  $timeBlock.html(timeBlockHTML);
}
