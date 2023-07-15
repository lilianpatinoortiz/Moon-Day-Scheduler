// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".calendar") // get the calendar
    .find(".row") // find all the rows inside the calendar
    .each(function () {
      // for each...
      var innerDivId = $(this).attr("id"); // get id of the current row
      var saveButton = $(this).find("button")[0]; // get the button inside the row
      saveButton.setAttribute("id", innerDivId + "_button"); // assign the id to be used when clicked
      saveButton.children[0].setAttribute("id", innerDivId + "_icon"); // assign the id to the icon to be used if clicked
      saveButton.addEventListener("click", saveClicked); // add the event listener to call the save  event function
    });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var today = new Date(); // get todays date
  var currentHour = today.getHours(); // sve the current hour - to be used for coloring each row

  $(".calendar") // get the calendar
    .find(".row") // find all the rows inside the calendar
    .each(function () {
      var innerDivId = $(this).attr("id");
      var hour = innerDivId.split("hour-")[1]; // get the hour of the row
      if (hour == currentHour) {
        // add present class
        this.classList.add("present");
      } else if (hour > currentHour) {
        // add future class
        this.classList.add("future");
      } else {
        // add past class
        this.classList.add("past");
      }
    });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function saveClicked(event) {
    var element = event.srcElement; // element selected
    var idNeeded = element.id.split("_")[0]; // we need the id of the parent div
    var eventElement = document.querySelectorAll("#" + idNeeded + "> textarea"); // we search for the div and then inside for the textarea
    var eventText = eventElement.value(); // we get the value inside the textarea for that specific hour
    saveEvent(eventText, idNeeded);
  }

  // update the local storage
  function saveEvent(event, hour) {
    ack();
  }

  // show notification of saved
  function ack() {}

  function getEvents() {}

  // Display current time in the header and update every second!
  function whatTimeIsIt() {
    timerInterval = setInterval(function () {
      var today = dayjs();
      $("#currentDay").text(
        "Date & Time in Earth ➤ " +
          today.format("dddd  MMMM D, YYYY  | HH:mm:ss ")
      );
    }, 1000);
  }

  $(document).ready(function () {
    whatTimeIsIt();
    getEvents();
  });
});
