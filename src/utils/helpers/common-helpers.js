export const commonHelpers = {

  capitalizeTheme: (str) => str.toLowerCase()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1)).join(' '),

  transformDateTime: ( index = 0 , dateTime ) => {
    const date = dateTime ? new Date(dateTime) : new Date();

    if(index === 0) {
      return {
        date: date.toLocaleDateString().toString().replaceAll('.', '-'), // DD-MM-YYYY
        time: date.toLocaleTimeString(), // hh:mm:ss
      }
    }
    if(index === 1) {
      return date.toLocaleDateString().toString().replaceAll('.', '-') // DD-MM-YYYY
    }
    if(index === 2) {
      return `${date.toLocaleDateString().split('.').reverse().join('-')}T${date.toLocaleTimeString()}` // 2015-07-20T00:00:00 format for dispatch (post/put requests)
    }
    if(index === 3) {
      return date.toLocaleDateString().split('.').reverse().join('-') // YYYY-MM-DD
    }
    if(index === 4) {
      return date.toLocaleDateString() // DD.MM.YYYY
    }

  },

};
