import { weekDays } from './add-schedule-data.js';

const findNameInObject = (arr, requiredParam) => (
  arr.find(({ name }) => name === requiredParam)
);

export const prepareToSubmit = (
  values,
  recurrencePatterns,
  allGroups,
  allThemes,
  allActiveMentors,
) => {
  const {
    patternType,
    interval,
    daysOfWeek,
    index,
    dates,
    startDate,
    finishDate,
    group,
    theme,
    mentor,
  } = values;

  const daysOfWeekForSend = daysOfWeek.map((el) => {
    if (el === 'Sunday') {
      return 0;
    }

    return weekDays.findIndex((item) => el === item) + 1;
  });

  const patternTypeforSend = recurrencePatterns.findIndex((item) => item === patternType);

  const groupID = findNameInObject(allGroups, group).id;
  const themeID = findNameInObject(allThemes, theme).id;
  const mentorID = allActiveMentors.find(({ firstName, lastName }) => `${firstName} ${lastName}` === mentor).id;

  const postData = {
    pattern: {
      type: patternTypeforSend,
      interval,
      daysOfWeek: daysOfWeekForSend,
      index,
      dates: [dates],
    },
    range: {
      startDate,
      finishDate,
    },
    context: {
      groupID,
      themeID,
      mentorID,
    },
  };

  return postData;
};

export const addDays = (days) => {
  const result = new Date();
  result.setDate(result.getDate() + days);

  return result;
};