export const mockedData = [
  {
    id: 1,
    name: 'Soft Skills for Lecturers',
    isActive: true,
  },
  {
    id: 2,
    name: 'C# Programming',
    isActive: true,
  },
  {
    id: 3,
    name: '3D Modelling',
    isActive: true,
  },
  {
    id: 4,
    name: 'Cybersecurity',
    isActive: true,
  },
  {
    id: 5,
    name: 'Advanced Technical English',
    isActive: true,
  },
  {
    id: 6,
    name: 'Intermediate Technical English',
    isActive: true,
  },
  {
    id: 7,
    name: 'course1',
    isActive: true,
  },
  {
    id: 8,
    name: 'course2',
    isActive: true,
  },
  {
    id: 9,
    name: 'course3',
    isActive: true,
  },
  {
    id: 10,
    name: 'course4',
    isActive: true,
  },
  {
    id: 11,
    name: 'course5',
    isActive: true,
  },
  {
    id: 12,
    name: 'course6',
    isActive: true,
  },
  {
    id: 13,
    name: 'English for IT',
    isActive: true,
  },
];

export const useStates = {
  fileName: '',
  setFileName: jest.fn(),
};

export const useStateMock = {
  default: jest
    .fn()
    .mockReturnValue([useStates.fileName, useStates.setFileName]),
};

export const fileMock = [
  {
    lastModified: 10000,
    lastModifiedDate: 100000,
    name: 'downloadFile.xlsx',
    size: 50,
    webkitRelativePath: 'C:UsersNairaDownloads',
    type: 'text',
  },
];
