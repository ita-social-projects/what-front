export const scheduleMockData = {
  data: {
    id: 0,
    studentGroupId: 1,
    eventStart: "2021-10-06T12:35:52.1823221+00:00",
    eventFinish: "2021-10-06T12:35:52.1823223+00:00",
    pattern: 3,
    events: [
      {
        id: 1,
        eventOccuranceId: 1,
        studentGroupId: 1,
        themeId: 6,
        mentorId: 5,
        lessonId: null,
        eventStart: "2021-10-06T12:35:52.1823226+00:00",
        eventFinish: "2021-10-06T12:35:52.1823227+00:00",
      },
    ],
    storage: 30368744178210,
  },
  error: "",
  isLoaded: true,
  isLoading: false,
};

export const scheduleMockDataLoading = {
  data: {
    id: 0,
    studentGroupId: 1,
    eventStart: "2021-10-06T12:35:52.1823221+00:00",
    eventFinish: "2021-10-06T12:35:52.1823223+00:00",
    pattern: 3,
    events: [
      {
        id: 1,
        eventOccuranceId: 1,
        studentGroupId: 1,
        themeId: 6,
        mentorId: 5,
        lessonId: null,
        eventStart: "2021-10-06T12:35:52.1823226+00:00",
        eventFinish: "2021-10-06T12:35:52.1823227+00:00",
      },
    ],
    storage: 30368744178210,
  },
  error: "",
  isLoaded: false,
  isLoading: true,
};

export const studentGroupMockData = {
  data: {
    courseId: 9,
    finishDate: "2022-06-16T00:00:00",
    id: 1,
    mentorsIds: [9],
    name: "122-18-3",
    startDate: "2021-05-16T00:00:00",
    studentIds: [1, 2],
  },
  error: "",
  isLoaded: true,
  isLoading: false,
};

export const studentGroupMockDataLoading = {
  data: {
    courseId: 9,
    finishDate: "2022-06-16T00:00:00",
    id: 1,
    mentorsIds: [9],
    name: "122-18-3",
    startDate: "2021-05-16T00:00:00",
    studentIds: [1, 2],
  },
  error: "",
  isLoaded: false,
  isLoading: true,
};

export const mentorsMockData = {
  data: [
    {
      avatarUrl: null,
      email: "mentor@gmail.com",
      firstName: "mentor",
      id: 9,
      lastName: "mentor",
    },
    {
      avatarUrl: null,
      email: "Mentor@gmail.org",
      firstName: "Mentor",
      id: 3,
      lastName: "Mentor",
    },
  ],
  error: "",
  isLoaded: true,
  isLoading: false,
};

export const themesMockData = {
  data: [
    {
      id: 123,
      name: "Picking up of flowers",
    },
    {
      id: 133,
      name: "Drying of flowers",
    },
  ],
  error: "",
  isLoaded: true,
  isLoading: false,
};

export const submitValues = {
  pattern: {
    type: 3,
    interval: 2,
    daysOfWeek: [1, 5],
    index: 2,
    dates: null,
  },
  range: {
    startDate: "2021-10-06T12:35:52.1815682+00:00",
    finishDate: "2021-10-06T12:35:52.18157+00:00",
  },
  context: {
    groupID: 1,
    themeID: 6,
    mentorID: 5,
  },
};
