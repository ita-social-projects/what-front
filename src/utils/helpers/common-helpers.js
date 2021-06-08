export const commonHelpers = {

  capitalizeTheme: (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' '),

  transformDateTime: ( index = 0 , dateTime ) => {
    const date = dateTime ? new Date(dateTime) : new Date();
    // let DateOptions = { year: 'numeric', month: 'short', day: '2-digit', weekday: 'long'};
    let dateOptions = {  year: 'numeric', month: '2-digit', day: '2-digit'};
    let timeOptions = { hour: '2-digit', minute: '2-digit' };

    const dateTimeObject = {
      date: date.toLocaleDateString('en-GB', dateOptions).toString().replaceAll('/', '-'), // DD-MM-YYYY
      time: date.toLocaleTimeString('en-GB', timeOptions), // HH:mm
    };
    const reverseDate = dateTimeObject.date.split('-').reverse().join('-'); // YYYY-MM-DD
//
    // provides data-time obj for lists
    if(index === 0) return dateTimeObject;

    // format for 1. date-time format as initial value for Formik 2. dispatch (post/put requests)
    if(index === 1) return `${reverseDate}T${dateTimeObject.time}`; // 2015-07-20T00:00:00

    // date format as initial value for Formik
    if(index === 2) return reverseDate;

    // transform server iso format into local
    if(index === 3) return new Date(`${dateTime}Z`).toLocaleTimeString();

    if(index === 4) {
      return date.toLocaleDateString(); // DD.MM.YYYY
    }
    if(index === 5) {
      return date.toLocaleTimeString()
    }
  },


};
