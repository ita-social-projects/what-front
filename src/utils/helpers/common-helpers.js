export const commonHelpers = {

  capitalizeTheme: (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' '),

  transformDateTime: (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-GB').toString().replaceAll('/', '-'), // DD-MM-YYYY
      reverseDate: date.toLocaleDateString('en-GB').split('/').reverse().join('-'), // YYYY-MM-DD
      time: date.toLocaleTimeString('en-GB'), // hh:mm:ss
    };
  },

};
