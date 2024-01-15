/**
 * Represents a utility class for calculating the difference between two dates in (aYears bMonths cDays)(aY bM cD) format.
 *
 * @class
 */
class DatesYMD {
  /**
   * Creates an instance of DatesYMD.
   *
   * @constructor
   * @param {string} firstDate - The first date in the format 'yyyy-mm-dd' or 'yyyy/mm/dd' or yyyy.mm.dd .
   * @param {string} secondDate - The second date in the format 'yyyy-mm-dd' or 'yyyy/mm/dd'or yyyy.mm.dd .
   */
  constructor(firstDate, secondDate) {
    this.firstDate = firstDate;
    this.secondDate = secondDate;
  }

  /**
   * Calculates the difference between two dates and returns an array containing Y, M, D, and a formatted 'aY bM cD' difference string.
   *
   * @method
   * @returns {Array} An array containing the calculated years, months, days, and the formatted difference.
   */
  diffArray() {
    var datesDiff, year, month, day, firstD, secondD, monthAdjuster;

    // Handle empty date inputs by defaulting to the current date
    if (this.firstDate === '' && this.secondDate === '') {
      firstD = new Date();
      secondD = new Date();
    } else if (this.firstDate === '') {
      firstD = new Date();
      secondD = new Date(this.secondDate);
    } else if (this.secondDate === '') {
      firstD = new Date(this.firstDate);
      secondD = new Date();
    } else {
      firstD = new Date(this.firstDate);
      secondD = new Date(this.secondDate);
    }

    // Swap dates if the first date is smaller than the second date
    if (firstD.getTime() < secondD.getTime()) {
      var negativeHandle = firstD;
      firstD = secondD;
      secondD = negativeHandle;
    }

    // Extract year, month, and date components of the two dates
    var yearS = secondD.getFullYear();
    var yearF = firstD.getFullYear();

    var monthS = secondD.getMonth() + 1;
    var monthF = firstD.getMonth() + 1;

    var dateS = secondD.getDate();
    var dateF = firstD.getDate();

    // Calculate the difference in years, months, and days
    if (monthF >= monthS && dateF >= dateS) {
      year = yearF - yearS;
      month = monthF - monthS;
      day = dateF - dateS;
    } else if (monthF < monthS && dateF >= dateS) {
      // Handle the case where the months are different, and the first date's day is greater than or equal to the second date's day
      day = dateF - dateS;
      month = monthF + 12 - monthS;
      year = yearF - 1 - yearS;
    } else if (monthF > monthS && dateF < dateS) {
      // Handle the case where the months are different, and the first date's day is less than the second date's day
      month = monthF - monthS - 1;
      year = yearF - yearS;

      // Save the first last month of monthF for correct aY bM cD following mathematical finding algorithm for calculating aY bM cD correctly like if 2020-05-22 to 2021-03-20, then firstly decide monthAdjuster which is (greaterDate month - 1), that is 03 - 1 = 02, then find month from 20-05 to 21-02(02 is monthAdjuster) i.e 9M, and  then decide days from 2021-02-22 to 2021-03-20
      monthAdjuster = monthF - 1; // for getting intuitively correct - aY bM cD in all cases

      // Further adjustments based on specific conditions
      if (monthAdjuster === 2) {
        // Handle February
        if (yearF % 4 === 0) {
          // Leap year logic
          day = dateF > 29 ? dateF : 29 - dateS + dateF;
        } else {
          // Non-leap year logic
          day = dateF > 28 ? dateF : 28 - dateS + dateF;
        }
      } else if (
        // handle 30 days months
        monthAdjuster === 4 ||
        monthAdjuster === 6 ||
        monthAdjuster === 8 ||
        monthAdjuster === 11
      ) {
        // Handle months with 30 days
        day = dateF > 30 ? dateF : 30 - dateS + dateF;
      } else {
        // Handle months with 31 days
        day = 31 - dateS + dateF;
      }
    } else if (monthF <= monthS && dateF < dateS) {
      // Handle the case where the months are either different or equal, and the first date's day is less than the second date's day
      month = monthF + 11 - monthS;
      year = yearF - 1 - yearS;
      monthAdjuster = monthF - 1; // for getting intuitively correct - aY bM cD

      // Further adjustments based on specific conditions
      if (monthAdjuster === 2) {
        // Handle February
        if (yearF % 4 === 0) {
          // Leap year logic
          day = dateF > 29 ? dateF : 29 - dateS + dateF;
        } else {
          // Non-leap year logic
          day = dateF > 28 ? dateF : 28 - dateS + dateF;
        }
      } else if (
        // handle 30 days months
        monthAdjuster === 4 ||
        monthAdjuster === 6 ||
        monthAdjuster === 8 ||
        monthAdjuster === 11
      ) {
        // Handle months with 30 days
        day = dateF > 30 ? dateF : 30 - dateS + dateF;
      } else {
        // Handle months with 31 days
        day = 31 - dateS + dateF;
      }
    }

    // Format the difference and return the result
    const diffFormat = year + 'Y ' + month + 'M ' + day + 'D';
    datesDiff = [year, month, day, diffFormat];
    return datesDiff;
  }

  /**
   * Returns the formatted difference between two dates.
   *
   * @method
   * @returns {string} The formatted difference in the format 'aY bM cD'.
   */
  formattedYMD() {
    return this.diffArray()[3];
  }
}

// Export the DatesYMD class for use in other modules
module.exports = DatesYMD;