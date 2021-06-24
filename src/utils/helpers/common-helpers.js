export const commonHelpers = {

  capitalizeTheme: (str) => str.toLowerCase()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.substring(1)).join(' '),

  transformDateTime: ({ isDayTime=true, isRequest=false, dateTime }) => {
    let formalizedDate;
    let dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let timeOptions = { hour: '2-digit', minute: '2-digit' };

    if (isDayTime) {
      formalizedDate = dateTime ? new Date(`${dateTime}Z`) : new Date();
    } else {
      formalizedDate = dateTime ? new Date(dateTime) : new Date();
    }
    let date =  formalizedDate.toLocaleDateString('en-GB', dateOptions).toString().replaceAll('/', '.');
    let time = formalizedDate.toLocaleTimeString('en-GB', timeOptions);
    let reverseDate = date.split('.').reverse().join('-');

    return  {
      date: date, // DD.MM.YYYY
      time: time, // HH:mm
      reverseDate: reverseDate, // YYYY-MM-DD  preload date input value
      formDateTimeForRequest: isRequest && new Date(dateTime).toISOString(), // 2015-07-20T10:10:10
      formInitialValue: isDayTime ? `${reverseDate}T${time}` : `${reverseDate}`, // 2015-07-20T00:00:00
    };
  },
};
