const mockAllGroups = [
  { id: 212, name: 'SX-13' },
  { id: 214, name: 'SX-15' },
];

const mockAllActiveMentors = [
  { id: 7, firstName: 'Elizabeth', lastName: 'Hill' },
  { id: 8, firstName: 'Barbara', lastName: 'Harris' },
  { id: 9, firstName: 'Susan', lastName: 'Clark' },
];

const mockAllThemes = [
  { id: 26, name: '3D Printing' },
  { id: 24, name: 'Animation' },
  { id: 29, name: 'Buffer Overflow Exploits and Defenses' },
];

export const mockedData = {
  groups: {
    data: mockAllGroups,
    isLoading: false,
    isLoaded: false,
    error: '',
  },
  mentors: {
    data: mockAllActiveMentors,
    isLoading: false,
    isLoaded: false,
    error: '',
  },
  themes: {
    data: mockAllThemes,
    isLoading: false,
    isLoaded: false,
    error: '',
  },
};