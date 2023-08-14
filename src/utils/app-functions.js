/* eslint-disable no-useless-escape */
const capitalize = (sentence) => {
  sentence = sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  return sentence;
};

const validateEmail = (email) => {
  if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return true;
  } else {
    return false;
  }
};

const formatNumberWithCommas = (price) => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const removeCommas = (price) => {
  return parseInt(price.replace(/,/g, ''));
};

const getMonth = (month) => {
  let monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthsArray[parseInt(month) - 1];
};

const getDate = (day) => {
  let dayAsNumber = parseInt(day);
  if (dayAsNumber === 1) {
    return 1 + 'st';
  } else if (dayAsNumber === 2) {
    return 2 + 'nd';
  } else if (dayAsNumber === 3) {
    return 3 + 'rd';
  } else if (dayAsNumber === 21) {
    return 21 + 'st';
  } else if (dayAsNumber === 22) {
    return 22 + 'nd';
  } else if (dayAsNumber === 23) {
    return 23 + 'rd';
  } else if (dayAsNumber === 31) {
    return 31 + 'st';
  } else {
    return dayAsNumber + 'th';
  }
};

const formatTo12Hour = (time) => {
  var hours = time.split(':')[0];
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  var minutes = time.split(':')[1];
  var finalTime = hours + ':' + minutes + AmOrPm;
  return finalTime;
};

const prettyDate = (timestamp) => {
  let year = timestamp.split('-')[0];
  let month = timestamp.split('-')[1];
  let dayTime = timestamp.split('-')[2];
  let day = dayTime.split('T')[0];
  let time = dayTime.split('T')[1];
  let timeWithoutMicroseconds = time.split('.')[0];
  var splittedTimeWithoutMicroseconds = timeWithoutMicroseconds.split(':');

  timeWithoutMicroseconds = splittedTimeWithoutMicroseconds.slice(0, -1).join(':');

  let monthString = getMonth(month);
  let dateString = getDate(day);

  let formattedTime = formatTo12Hour(timeWithoutMicroseconds);

  return monthString + ' ' + dateString + ',' + year + '. ' + formattedTime;
};

export { capitalize, validateEmail, formatNumberWithCommas, removeCommas, prettyDate };
