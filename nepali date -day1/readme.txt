function toNepaliDate() {
  let year = currYear; // Use the full value of the current year in English
  let month = currMonth + 1; // Months are 0-based, so add 1 for Nepali format
  let nepaliMonth = months[currMonth]; // Get the corresponding Nepali month
  let englishMonth = new Date(currYear, currMonth, 1).toLocaleString('en-US', { month: 'short' }); // Get the abbreviated English month
  
  // Convert the year to Nepali numerals using the toNepaliNumber() function
  let nepaliYear = toNepaliNumber(year);

  return `${nepaliYear} ${nepaliMonth} [${englishMonth}]`;
}