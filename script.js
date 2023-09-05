$(function () {
  // Function to display the current date in the header
  function displayCurrentDate() {
    const currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);
  }

  // Function to apply past, present, or future classes to time blocks
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

  // Function to load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const savedEvent = localStorage.getItem(timeBlockId);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Function to save user input to local storage
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

// Dynamically create time blocks from 10 AM to 5 PM
for (let i = 10; i <= 17; i++) {
  const timeBlockId = `hour-${i}`;
  const $timeBlock = $(`#${timeBlockId}`);

  // Calculate the corresponding time label (e.g., "10AM", "11AM", etc.)
  const timeLabel = i < 12 ? `${i}AM` : i === 12 ? "12PM" : `${i - 12}PM`;

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
