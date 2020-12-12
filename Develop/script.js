//Creating an Object that contains the current Date and Time
var theDate = luxon.DateTime.local();

//using c.l() to see what I'm grabbing
// console.log(theDate);
//Assign the Date to the Heading
$("#currentDay").text(theDate.weekdayLong + ", " + theDate.monthLong + " " + theDate.day + " " + theDate.year);

function plannerSkeleton() {
    //For loop creates the Planner itself
    //if grading late at night : change var i = 0 and i < 24 to see functionality
    for (var i = 9; i < 18; i++) {
        var divRow = $("<div>", { "class": "row", "id": (i) });
        var divTime = $("<div>", { "class": "col-2 time-block hour" });
        var divDescriptions = $("<textarea>", { "class": "col-8 description", "value": "" });
        var divSaveBtn = $("<button>", { "class": "col-2 saveBtn" });

        //Assign the Time: Using if statements and index to assign the correct number and am/pm 
        if (i === 0) {
            divTime.text(12 + " AM");
        }
        else if (i > 0 && i < 12) {
            divTime.text(i + " AM");
        }
        else if (i === 12) {
            divTime.text(12 + " PM");
        }
        else {
            divTime.text((i - 12) + " PM");
        }
        //Using time comparison function to assign css (PAST : PRESENT : FUTURE)
        timeComparison(divRow.attr("id"), divDescriptions);
        //If local storage has something print out what is save
        //otherwise print nothing
        if (localStorage.getItem(divTime.text()) !== null) {
            divDescriptions.text(localStorage.getItem(divTime.text()));
        } else {
            divDescriptions.text("");
        }
        //APPEND IT ALL TOGETHER TO CREATE FINAL PRODUCT
        divSaveBtn.html("<i class='fas fa-save'></i>");
        divRow.append(divTime);
        divRow.append(divDescriptions);
        divRow.append(divSaveBtn);
        $(".container").append(divRow);
    }

}

//HOW timeComparison works
//Pass in the ID of the current time-block row and Pass in the Description of the time-block row
function timeComparison(theRow, description) {
    //using the current time. Parse both the current 
    //time and ID so that comparison operators work as intended
    //then assign a class (PAST : PRESENT : FUTURE) to the 
    //passed in description from function plannerSkeleton()
    if (JSON.parse(theDate.c.hour) > JSON.parse(theRow)) {
        description.addClass("past");
    }
    else if (JSON.parse(theDate.c.hour) === JSON.parse(theRow)) {
        description.addClass("present");
    }
    else {
        description.addClass("future");
    }
}

//Call the function
plannerSkeleton();

//Using JQuery click event handler to use the save button to save user input
$(".saveBtn").on("click", function () {
    //grab the text of the time and description
    var userTime = $(this).siblings(".hour").text();
    var userText = $(this).siblings(".description").val();

    // for help with what i'm pulling with the $(this) operator
    // console.log(userTime);
    // console.log(userText);

    //save the time and description 
    localStorage.setItem(userTime, userText);
})