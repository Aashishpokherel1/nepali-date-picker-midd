    // Function to convert numbers to Nepali numerals
    function toNepaliNumber(number) {
      const nepaliNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return number.toString().replace(/\d/g, (digit) => nepaliNumerals[digit]);
    }





    // Function to convert Nepali year to English year
    function toEnglishYear(nepaliYear) {
      const yearOffset = 57; // Correct year offset for the Nepali calendar
      return nepaliYear - yearOffset;
    }


  


    
    // Getting new date, current year, and month
    let date = new Date();
    let currYear = 2080; // Set the year to 2080
    let currMonth = date.getMonth();

    // Storing full name of all months in array
    const months = [
      "बैशाख", "जेष्ठ", "अषाढ", "श्रावण", "भाद्र", "असोज", "कार्तिक",
      "मंसिर", "पुष", "माघ", "फाल्गुन", "चैत्र"
    ];
    const daysOfWeek = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];

    // Total days in each month (varying days to make 365 days in a year)
    const daysInEachMonth = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30];
    //start form  baishak to chitra------ total days 365------

    const nepaliDatesTag = document.querySelector(".nepalidates");
    const currentDate = document.querySelector(".current-date");
    const prevNextIcon = document.querySelectorAll(".icons span");

    // Function to convert Nepali year and month format
    function toNepaliDate() {
      let year = currYear; // Use the full value of the current year
      let month = currMonth + 1; // Months are 0-based, so add 1 for Nepali format
      let nepaliMonth = months[currMonth]; // Get the corresponding Nepali month
      let englishMonth = new Date(currYear, currMonth, 1).toLocaleString('en-US', { month: 'short' }); // Get the abbreviated English month
      return `${toNepaliNumber(year)} ${nepaliMonth} [${englishMonth}]`;
    }

    const renderCalendar = () => {
      let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // Day of the week for the first day of the month
      let lastDateOfMonth = daysInEachMonth[currMonth];
      let lastDayOfMonth = (firstDayOfMonth + lastDateOfMonth - 1) % 7;
      let liTag = "";

      for (let i = 0; i < firstDayOfMonth; i++) {
        liTag += `<li class="inactive"><span></span><span></span></li>`;
      }

      for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday =
          i === date.getDate() &&
          currMonth === new Date().getMonth() &&
          currYear === new Date().getFullYear()
            ? "active"
            : "";
        liTag += `<li class="${isToday}"><span>${toNepaliNumber(i)}</span><span>${i}</span></li>`;
      }

      for (let i = lastDateOfMonth + 1; i <= 42 - lastDayOfMonth; i++) {
        liTag += `<li class="inactive"><span></span><span></span></li>`;
      }

      currentDate.innerText = toNepaliDate();
      nepaliDatesTag.innerHTML = liTag;
    };

    renderCalendar();

    prevNextIcon.forEach(icon => {
      icon.addEventListener("click", () => {
        if (icon.id === "prev") {
          currMonth -= 1;
          if (currMonth < 0) {
            currYear -= 1;
            currMonth = 11; // Set the month to December (11) when going to the previous year
          }
        } else {
          currMonth += 1;
          if (currMonth > 11) {
            currYear += 1;
            currMonth = 0; // Set the month to January (0) when going to the next year
          }
        }

        if (currYear > 2080) {
          // Limit the year to 2080
          currYear = 2080;
        } else if (currYear < 2078) {
          // Limit the year to 2078
          currYear = 2078;
        }

        // Call renderCalendar only after checking and limiting the year
        renderCalendar();
      });
    });

    const inputField = document.getElementById("datepicker");
    const calendarWrapper = document.querySelector(".wrapper");

    // Function to toggle the visibility of the calendar wrapper
    function toggleCalendar() {
      calendarWrapper.classList.toggle("show");
    }

    // Function to close the calendar
    function closeCalendar() {
      calendarWrapper.classList.remove("show");
    }

    // Add a click event listener to the input field
    inputField.addEventListener("click", toggleCalendar);

    // Function to convert Nepali date to English date
    function nepaliToEnglishDate(nepaliYear, nepaliMonth, nepaliDay) {
      // Calculate the English year by subtracting the offset
      const englishYear = toEnglishYear(nepaliYear);

      // This is a simplified conversion logic. Replace it with a more accurate algorithm if available.
      // For this example, I'll assume the format is the same as the English date (Month Day, Year).
      const englishMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const englishMonth = englishMonths[nepaliMonth - 1]; // Month is 1-based, so subtract 1 for English format

      const englishDate = `${englishMonth} ${nepaliDay}, ${englishYear}`;
      return englishDate;
    }

    function handleDateSelection(event) {
      // Get the selected date from the clicked calendar date
      const selectedDateNepali = event.target.textContent.trim();
    
      // Convert the selected Nepali date to English date
      const selectedDateEnglish = nepaliToEnglishDate(currYear, currMonth + 1, parseInt(selectedDateNepali));
    
      // Update the input field value with the selected date in English
      inputField.value = selectedDateEnglish;
    
      // Close the calendar after date selection
      closeCalendar();
    }
    

    // Add click event listener to each date
    nepaliDatesTag.addEventListener("click", handleDateSelection);