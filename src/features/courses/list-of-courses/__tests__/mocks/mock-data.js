
export const mockAppState = {
  features: {
    counter: {
      counter: 0,
      isLoading: false,
      error: ''
    },
    listOfGroups: {
      searchGroup: '',
      groupStartDate: ''
    },
    alert: {
      messages: []
    }
  },
  models: {
    users: {
      currentUser: {
        currentUser: {
          fisrtName: 'James',
          lastName: 'Smith',
          role: 4,
          roleList: {
            admin: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIklkIjoiMSIsIkVtYWlsIjoiamFtZXMuc21pdGhAZXhhbXBsZS5jb20iLCJBY2NvdW50SWQiOiIxIiwibmJmIjoxNjM5ODI3NDQ3LCJleHAiOjE2Mzk4NzA2NDcsImlzcyI6Ik15QXV0aFNlcnZlciIsImF1ZCI6Ik15QXV0aENsaWVudCJ9.gelr3nqRJhAUw2m8IxAg2nGIdmWk8SabdJgeukHFJYA'
          },
          email: 'james.smith@example.com'
        },
        isLoading: false,
        loaded: false,
        error: ''
      },
      unAssignedlist: {
        data: [
          {
            id: 49,
            firstName: 'J',
            lastName: 'Eyre',
            email: 'J.Eyre@atair2.com',
            role: 0,
            isActive: true
          },
          {
            id: 50,
            firstName: 'Vova2000',
            lastName: 'Sidorenko',
            email: 'vova@test.com',
            role: 0,
            isActive: true
          },
          {
            id: 51,
            firstName: 'VovanVovanVovan2025%',
            lastName: 'Pertrov',
            email: 'vova@test2.com',
            role: 0,
            isActive: true
          },
          {
            id: 52,
            firstName: 'VovanVovanVovanVovanVovan2025%',
            lastName: 'Pertrov',
            email: 'vova@test3.com',
            role: 0,
            isActive: true
          },
          {
            id: 53,
            firstName: ' VovanVovanVovanVovanVovan',
            lastName: 'Pertrov',
            email: 'vova@test4.com',
            role: 0,
            isActive: true
          },
          {
            id: 54,
            firstName: '-VovanVovanVovanVovanVovan5',
            lastName: 'Pertrov',
            email: 'vova@test5.com',
            role: 0,
            isActive: true
          },
          {
            id: 59,
            firstName: 'Test',
            lastName: 'User',
            email: 'testmail@mail.com',
            role: 0,
            isActive: true
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      usersList: {
        users: [],
        isLoading: true,
        loaded: false,
        error: ''
      },
      registration: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      changePassword: {
        isLoading: false,
        isloaded: false,
        error: ''
      },
      forgotPassword: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      resetPassword: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    courses: {
      coursesActive: {
        data: [
          {
            id: 1,
            name: 'Soft Skills for Lecturers',
            isActive: true
          },
          {
            id: 2,
            name: 'C# Programming',
            isActive: true
          },
          {
            id: 3,
            name: '3D Modelling',
            isActive: true
          },
          {
            id: 4,
            name: 'Cybersecurity',
            isActive: true
          },
          {
            id: 5,
            name: 'Advanced Technical English',
            isActive: true
          },
          {
            id: 6,
            name: 'Intermediate Technical English',
            isActive: true
          },
          {
            id: 7,
            name: 'course1',
            isActive: true
          },
          {
            id: 8,
            name: 'course2',
            isActive: true
          },
          {
            id: 9,
            name: 'course3',
            isActive: true
          },
          {
            id: 10,
            name: 'course4',
            isActive: true
          },
          {
            id: 11,
            name: 'course5',
            isActive: true
          },
          {
            id: 12,
            name: 'course6',
            isActive: true
          },
          {
            id: 13,
            name: 'English for IT',
            isActive: true
          }
        ],
        isLoading: false,
        loaded: true,
        error: ''
      },
      coursesNotActive: {
        data: [
          {
            id: 14,
            name: 'fordelete',
            isActive: false
          }
        ],
        isLoading: false,
        loaded: true,
        error: ''
      },
      editedCourse: {
        data: {},
        isLoading: false,
        loaded: false,
        error: ''
      },
      createdCourse: {
        data: {},
        isLoading: false,
        loaded: false,
        error: ''
      },
      deletedCourse: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      reactivatedCourse: {
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    lessons: {
      lessons: {
        data: [
          {
            id: 6,
            themeName: 'API',
            mentorId: 6,
            studentGroupId: 1,
            lessonDate: '2021-12-14T20:59:52',
            lessonVisits: []
          },
          {
            id: 240,
            themeName: 'string',
            mentorId: 1,
            studentGroupId: 1,
            lessonDate: '2021-12-17T11:12:15',
            lessonVisits: []
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      studentLessons: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      lessonById: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      addLesson: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      editLesson: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    students: {
      students: {
        data: [
          {
            id: 1,
            email: 'david.brown@example.com',
            firstName: 'David',
            lastName: 'Brown',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/32f19972bebb42a689104071a11c5e33/11.jpg'
          },
          {
            id: 2,
            email: 'richard.thomas@example.com',
            firstName: 'Richard',
            lastName: 'Thomas',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/fbbfa551fede45f5940ca750a3f7986b/13.jpg'
          },
          {
            id: 3,
            email: 'joseph.evans@example.com',
            firstName: 'Joseph',
            lastName: 'Evans',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b1a46fee2f8c4fdbbffa53465641654c/15.jpg'
          },
          {
            id: 4,
            email: 'thomas.roberts@example.com',
            firstName: 'Thomas',
            lastName: 'Roberts',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/ade5fa3adb51431e848e0355cbaaec6c/17.jpg'
          },
          {
            id: 5,
            email: 'charles.johnson@example.com',
            firstName: 'Charles',
            lastName: 'Johnson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4bc338e6e98d489dbf170d719c74fe68/19.jpg'
          },
          {
            id: 6,
            email: 'christopher.wilson@example.com',
            firstName: 'Christopher',
            lastName: 'Wilson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4b5d7bf862b24ed0aaad07b5c916de0f/21.jpg'
          },
          {
            id: 7,
            email: 'daniel.robinson@example.com',
            firstName: 'Daniel',
            lastName: 'Robinson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/f742931ff3f74ff59efdee9433d3ac41/23.jpg'
          },
          {
            id: 8,
            email: 'matthew.wright@example.com',
            firstName: 'Matthew',
            lastName: 'Wright',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/cf512d51ac6b4cd982b3e5039aea664f/25.jpg'
          },
          {
            id: 9,
            email: 'anthony.wood@example.com',
            firstName: 'Anthony',
            lastName: 'Wood',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4a607d89efe4460580f694e10e23314d/27.jpg'
          },
          {
            id: 10,
            email: 'mark.thompson@example.com',
            firstName: 'Mark',
            lastName: 'Thompson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/7646d6d322434e8cbcd29fbf6dd030d2/29.jpg'
          },
          {
            id: 11,
            email: 'donald.hall@example.com',
            firstName: 'Donald',
            lastName: 'Hall',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/9ee0c7d8e01346ee844ae2893d7e4df7/31.jpg'
          },
          {
            id: 12,
            email: 'steven.green@example.com',
            firstName: 'Steven',
            lastName: 'Green',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e7de05778f1e4fd7b208451a94cc56d2/33.jpg'
          },
          {
            id: 13,
            email: 'paul.walker@example.com',
            firstName: 'Paul',
            lastName: 'Walker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/feeaecdd6aa347dfa5d4b0ddda771ec5/35.jpg'
          },
          {
            id: 14,
            email: 'andrew.hughes@example.com',
            firstName: 'Andrew',
            lastName: 'Hughes',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5680a096834f40f6b7ad6292151657bc/37.jpg'
          },
          {
            id: 15,
            email: 'joshua.edwards@example.com',
            firstName: 'Joshua',
            lastName: 'Edwards',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5a7bfffeeb9d47d68c1599eb68e32eae/39.jpg'
          },
          {
            id: 16,
            email: 'barbara.harris@example.com',
            firstName: 'Barbara',
            lastName: 'Harris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b2c214175eb74adabecd2b9747d8dc85/12.jpg'
          },
          {
            id: 17,
            email: 'susan.clark@example.com',
            firstName: 'Susan',
            lastName: 'Clark',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/630846a66d874499b529cb5ad4db82e2/14.jpg'
          },
          {
            id: 18,
            email: 'jessica.cooper@example.com',
            firstName: 'Jessica',
            lastName: 'Cooper',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1736a6ec4a4845349b38033b613982c9/16.jpg'
          },
          {
            id: 19,
            email: 'sarah.harrison@example.com',
            firstName: 'Sarah',
            lastName: 'Harrison',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/8c1a55663a94456ca3f6c58749bb90a7/18.jpg'
          },
          {
            id: 20,
            email: 'karen.ward@example.com',
            firstName: 'Karen',
            lastName: 'Ward',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/99e8d584c6af4ff793c13b174202cfd6/20.jpg'
          },
          {
            id: 21,
            email: 'nancy.martin@example.com',
            firstName: 'Nancy',
            lastName: 'Martin',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/17f4f623739b4adcb6d4e5fd1bae377c/22.jpg'
          },
          {
            id: 22,
            email: 'lisa.davis@example.com',
            firstName: 'Lisa',
            lastName: 'Davis',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/45873fc69dac423db15c04d9ddadee2b/24.jpg'
          },
          {
            id: 23,
            email: 'betty.baker@example.com',
            firstName: 'Betty',
            lastName: 'Baker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bf5f8faa55ad4faf947b2c7a5b636293/26.jpg'
          },
          {
            id: 24,
            email: 'margaret.morris@example.com',
            firstName: 'Margaret',
            lastName: 'Morris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5eb6b24a5e054e169c4e7074444ec950/28.jpg'
          },
          {
            id: 25,
            email: 'sandra.james@example.com',
            firstName: 'Sandra',
            lastName: 'James',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/d8e771dec4ab484abf5478285a822d37/30.jpg'
          },
          {
            id: 26,
            email: 'ashley.king@example.com',
            firstName: 'Ashley',
            lastName: 'King',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/672f926896aa4cba996f68c235ddd2d4/32.jpg'
          },
          {
            id: 27,
            email: 'kimberly.morgan@example.com',
            firstName: 'Kimberly',
            lastName: 'Morgan',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5558128d1c79495a934793bd0d63b2e2/34.jpg'
          },
          {
            id: 28,
            email: 'emily.allen@example.com',
            firstName: 'Emily',
            lastName: 'Allen',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/30c4b294f96e41b5b29b3709deb0b3e0/36.jpg'
          },
          {
            id: 29,
            email: 'donna.moore@example.com',
            firstName: 'Donna',
            lastName: 'Moore',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/70a21d6d5fb4467c81b812dc89ec3e58/38.jpg'
          },
          {
            id: 30,
            email: 'michelle.parker@example.com',
            firstName: 'Michelle',
            lastName: 'Parker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/db23452c773a4ec6a429f91538841d7a/40.jpg'
          },
          {
            id: 31,
            email: 'ilya@gmail.comn',
            firstName: 'iLYA',
            lastName: 'ILYA',
            avatarUrl: null
          },
          {
            id: 32,
            email: '3D Modelling',
            firstName: '3D Modelling - 2021/2',
            lastName: 'Andrew Hughes',
            avatarUrl: null
          },
          {
            id: 33,
            email: '',
            firstName: '',
            lastName: 'Donna Moore',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      activeStudents: {
        data: [
          {
            id: 1,
            email: 'david.brown@example.com',
            firstName: 'David',
            lastName: 'Brown',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/32f19972bebb42a689104071a11c5e33/11.jpg'
          },
          {
            id: 2,
            email: 'richard.thomas@example.com',
            firstName: 'Richard',
            lastName: 'Thomas',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/fbbfa551fede45f5940ca750a3f7986b/13.jpg'
          },
          {
            id: 3,
            email: 'joseph.evans@example.com',
            firstName: 'Joseph',
            lastName: 'Evans',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b1a46fee2f8c4fdbbffa53465641654c/15.jpg'
          },
          {
            id: 4,
            email: 'thomas.roberts@example.com',
            firstName: 'Thomas',
            lastName: 'Roberts',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/ade5fa3adb51431e848e0355cbaaec6c/17.jpg'
          },
          {
            id: 5,
            email: 'charles.johnson@example.com',
            firstName: 'Charles',
            lastName: 'Johnson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4bc338e6e98d489dbf170d719c74fe68/19.jpg'
          },
          {
            id: 6,
            email: 'christopher.wilson@example.com',
            firstName: 'Christopher',
            lastName: 'Wilson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4b5d7bf862b24ed0aaad07b5c916de0f/21.jpg'
          },
          {
            id: 7,
            email: 'daniel.robinson@example.com',
            firstName: 'Daniel',
            lastName: 'Robinson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/f742931ff3f74ff59efdee9433d3ac41/23.jpg'
          },
          {
            id: 8,
            email: 'matthew.wright@example.com',
            firstName: 'Matthew',
            lastName: 'Wright',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/cf512d51ac6b4cd982b3e5039aea664f/25.jpg'
          },
          {
            id: 9,
            email: 'anthony.wood@example.com',
            firstName: 'Anthony',
            lastName: 'Wood',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/4a607d89efe4460580f694e10e23314d/27.jpg'
          },
          {
            id: 10,
            email: 'mark.thompson@example.com',
            firstName: 'Mark',
            lastName: 'Thompson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/7646d6d322434e8cbcd29fbf6dd030d2/29.jpg'
          },
          {
            id: 11,
            email: 'donald.hall@example.com',
            firstName: 'Donald',
            lastName: 'Hall',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/9ee0c7d8e01346ee844ae2893d7e4df7/31.jpg'
          },
          {
            id: 12,
            email: 'steven.green@example.com',
            firstName: 'Steven',
            lastName: 'Green',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e7de05778f1e4fd7b208451a94cc56d2/33.jpg'
          },
          {
            id: 13,
            email: 'paul.walker@example.com',
            firstName: 'Paul',
            lastName: 'Walker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/feeaecdd6aa347dfa5d4b0ddda771ec5/35.jpg'
          },
          {
            id: 14,
            email: 'andrew.hughes@example.com',
            firstName: 'Andrew',
            lastName: 'Hughes',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5680a096834f40f6b7ad6292151657bc/37.jpg'
          },
          {
            id: 15,
            email: 'joshua.edwards@example.com',
            firstName: 'Joshua',
            lastName: 'Edwards',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5a7bfffeeb9d47d68c1599eb68e32eae/39.jpg'
          },
          {
            id: 16,
            email: 'barbara.harris@example.com',
            firstName: 'Barbara',
            lastName: 'Harris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b2c214175eb74adabecd2b9747d8dc85/12.jpg'
          },
          {
            id: 17,
            email: 'susan.clark@example.com',
            firstName: 'Susan',
            lastName: 'Clark',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/630846a66d874499b529cb5ad4db82e2/14.jpg'
          },
          {
            id: 18,
            email: 'jessica.cooper@example.com',
            firstName: 'Jessica',
            lastName: 'Cooper',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1736a6ec4a4845349b38033b613982c9/16.jpg'
          },
          {
            id: 19,
            email: 'sarah.harrison@example.com',
            firstName: 'Sarah',
            lastName: 'Harrison',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/8c1a55663a94456ca3f6c58749bb90a7/18.jpg'
          },
          {
            id: 20,
            email: 'karen.ward@example.com',
            firstName: 'Karen',
            lastName: 'Ward',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/99e8d584c6af4ff793c13b174202cfd6/20.jpg'
          },
          {
            id: 21,
            email: 'nancy.martin@example.com',
            firstName: 'Nancy',
            lastName: 'Martin',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/17f4f623739b4adcb6d4e5fd1bae377c/22.jpg'
          },
          {
            id: 22,
            email: 'lisa.davis@example.com',
            firstName: 'Lisa',
            lastName: 'Davis',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/45873fc69dac423db15c04d9ddadee2b/24.jpg'
          },
          {
            id: 23,
            email: 'betty.baker@example.com',
            firstName: 'Betty',
            lastName: 'Baker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bf5f8faa55ad4faf947b2c7a5b636293/26.jpg'
          },
          {
            id: 24,
            email: 'margaret.morris@example.com',
            firstName: 'Margaret',
            lastName: 'Morris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5eb6b24a5e054e169c4e7074444ec950/28.jpg'
          },
          {
            id: 25,
            email: 'sandra.james@example.com',
            firstName: 'Sandra',
            lastName: 'James',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/d8e771dec4ab484abf5478285a822d37/30.jpg'
          },
          {
            id: 26,
            email: 'ashley.king@example.com',
            firstName: 'Ashley',
            lastName: 'King',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/672f926896aa4cba996f68c235ddd2d4/32.jpg'
          },
          {
            id: 27,
            email: 'kimberly.morgan@example.com',
            firstName: 'Kimberly',
            lastName: 'Morgan',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5558128d1c79495a934793bd0d63b2e2/34.jpg'
          },
          {
            id: 28,
            email: 'emily.allen@example.com',
            firstName: 'Emily',
            lastName: 'Allen',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/30c4b294f96e41b5b29b3709deb0b3e0/36.jpg'
          },
          {
            id: 29,
            email: 'donna.moore@example.com',
            firstName: 'Donna',
            lastName: 'Moore',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/70a21d6d5fb4467c81b812dc89ec3e58/38.jpg'
          },
          {
            id: 30,
            email: 'michelle.parker@example.com',
            firstName: 'Michelle',
            lastName: 'Parker',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/db23452c773a4ec6a429f91538841d7a/40.jpg'
          },
          {
            id: 31,
            email: 'ilya@gmail.comn',
            firstName: 'iLYA',
            lastName: 'ILYA',
            avatarUrl: null
          },
          {
            id: 32,
            email: '3D Modelling',
            firstName: '3D Modelling - 2021/2',
            lastName: 'Andrew Hughes',
            avatarUrl: null
          },
          {
            id: 33,
            email: '',
            firstName: '',
            lastName: 'Donna Moore',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      studentById: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      studentByIdGroups: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      editStudent: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      addStudent: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      removeStudent: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      reactivateStudent: {
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    mentors: {
      mentors: {
        data: [
          {
            id: 1,
            email: 'michael.taylor@example.com',
            firstName: 'Michael',
            lastName: 'Taylor',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/28edbc17f2394a5c967e5f5568bc523a/7.jpg'
          },
          {
            id: 2,
            email: 'william.davies@example.com',
            firstName: 'William',
            lastName: 'Davies',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bd18d83832094662877fdd44ded8ca63/9.jpg'
          },
          {
            id: 3,
            email: 'david.brown@example.com',
            firstName: 'David',
            lastName: 'Brown',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/32f19972bebb42a689104071a11c5e33/11.jpg'
          },
          {
            id: 4,
            email: 'richard.thomas@example.com',
            firstName: 'Richard',
            lastName: 'Thomas',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/fbbfa551fede45f5940ca750a3f7986b/13.jpg'
          },
          {
            id: 5,
            email: 'joseph.evans@example.com',
            firstName: 'Joseph',
            lastName: 'Evans',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b1a46fee2f8c4fdbbffa53465641654c/15.jpg'
          },
          {
            id: 6,
            email: 'linda.jackson@example.com',
            firstName: 'Linda',
            lastName: 'Jackson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1d9a34a8b9494a57b5bf87fe87a14c1b/8.jpg'
          },
          {
            id: 7,
            email: 'elizabeth.hill@example.com',
            firstName: 'Elizabeth',
            lastName: 'Hill',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e80c2bd3e48a4d8b8eeb95d41fcb6e52/10.jpg'
          },
          {
            id: 8,
            email: 'barbara.harris@example.com',
            firstName: 'Barbara',
            lastName: 'Harris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b2c214175eb74adabecd2b9747d8dc85/12.jpg'
          },
          {
            id: 9,
            email: 'susan.clark@example.com',
            firstName: 'Susan',
            lastName: 'Clark',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/630846a66d874499b529cb5ad4db82e2/14.jpg'
          },
          {
            id: 10,
            email: 'jessica.cooper@example.com',
            firstName: 'Jessica',
            lastName: 'Cooper',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1736a6ec4a4845349b38033b613982c9/16.jpg'
          },
          {
            id: 11,
            email: 'fhfhg@mail.com',
            firstName: 'sertered',
            lastName: 'gfhgjfh',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      mentorsActive: {
        data: [
          {
            id: 1,
            email: 'michael.taylor@example.com',
            firstName: 'Michael',
            lastName: 'Taylor',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/28edbc17f2394a5c967e5f5568bc523a/7.jpg'
          },
          {
            id: 2,
            email: 'william.davies@example.com',
            firstName: 'William',
            lastName: 'Davies',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bd18d83832094662877fdd44ded8ca63/9.jpg'
          },
          {
            id: 3,
            email: 'david.brown@example.com',
            firstName: 'David',
            lastName: 'Brown',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/32f19972bebb42a689104071a11c5e33/11.jpg'
          },
          {
            id: 4,
            email: 'richard.thomas@example.com',
            firstName: 'Richard',
            lastName: 'Thomas',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/fbbfa551fede45f5940ca750a3f7986b/13.jpg'
          },
          {
            id: 5,
            email: 'joseph.evans@example.com',
            firstName: 'Joseph',
            lastName: 'Evans',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b1a46fee2f8c4fdbbffa53465641654c/15.jpg'
          },
          {
            id: 6,
            email: 'linda.jackson@example.com',
            firstName: 'Linda',
            lastName: 'Jackson',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1d9a34a8b9494a57b5bf87fe87a14c1b/8.jpg'
          },
          {
            id: 7,
            email: 'elizabeth.hill@example.com',
            firstName: 'Elizabeth',
            lastName: 'Hill',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e80c2bd3e48a4d8b8eeb95d41fcb6e52/10.jpg'
          },
          {
            id: 8,
            email: 'barbara.harris@example.com',
            firstName: 'Barbara',
            lastName: 'Harris',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/b2c214175eb74adabecd2b9747d8dc85/12.jpg'
          },
          {
            id: 9,
            email: 'susan.clark@example.com',
            firstName: 'Susan',
            lastName: 'Clark',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/630846a66d874499b529cb5ad4db82e2/14.jpg'
          },
          {
            id: 10,
            email: 'jessica.cooper@example.com',
            firstName: 'Jessica',
            lastName: 'Cooper',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/1736a6ec4a4845349b38033b613982c9/16.jpg'
          },
          {
            id: 11,
            email: 'fhfhg@mail.com',
            firstName: 'sertered',
            lastName: 'gfhgjfh',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      mentorById: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorByIdGroups: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorByIdCourses: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorByIdLessosns: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorsFiltredLessons: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorEditing: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorAdding: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorDeleting: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      mentorReactivating: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    schedules: {
      schedules: {
        data: [
          {
            id: 1,
            studentGroupId: 1,
            eventStart: '2021-07-05T10:00:00',
            eventFinish: '2021-12-24T11:00:00',
            pattern: 1,
            events: [],
            storage: 70368744178180
          },
          {
            id: 2,
            studentGroupId: 2,
            eventStart: '2021-07-05T12:00:00',
            eventFinish: '2021-12-24T13:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089354
          },
          {
            id: 3,
            studentGroupId: 3,
            eventStart: '2021-07-05T12:00:00',
            eventFinish: '2021-12-24T13:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089364
          },
          {
            id: 4,
            studentGroupId: 4,
            eventStart: '2021-07-05T10:00:00',
            eventFinish: '2021-12-24T11:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089384
          },
          {
            id: 5,
            studentGroupId: 5,
            eventStart: '2021-01-04T10:00:00',
            eventFinish: '2021-12-24T11:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089346
          },
          {
            id: 6,
            studentGroupId: 5,
            eventStart: '2021-01-04T10:00:00',
            eventFinish: '2021-12-24T11:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089360
          },
          {
            id: 7,
            studentGroupId: 6,
            eventStart: '2021-01-04T14:00:00',
            eventFinish: '2021-12-24T15:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089348
          },
          {
            id: 8,
            studentGroupId: 6,
            eventStart: '2021-01-04T12:00:00',
            eventFinish: '2021-12-24T13:00:00',
            pattern: 1,
            events: [],
            storage: 35184372089376
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      schedulesByGroupId: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      editedSchedule: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      createdSchedule: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      deletedSchedule: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    themes: {
      themes: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      createdTheme: {
        data: {},
        isLoading: false,
        isloaded: false,
        error: ''
      },
      editedTheme: {
        data: {},
        isLoading: false,
        isloaded: false,
        error: ''
      },
      deletedTheme: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    secretaries: {
      secretaries: {
        data: [
          {
            id: 1,
            email: 'robert.jones@edfxample.com',
            firstName: 'Robertdfsdf',
            lastName: 'Jones dfdf',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/c930fd8fc24c4ca1a25bc0883481a81f/3.jpg'
          },
          {
            id: 2,
            email: 'john.williams@example.com',
            firstName: 'John',
            lastName: 'Williams',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5c352117dab44eadabf54d42d29524dc/5.jpg'
          },
          {
            id: 3,
            email: 'william.davies@example.com',
            firstName: 'William',
            lastName: 'Davies',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bd18d83832094662877fdd44ded8ca63/9.jpg'
          },
          {
            id: 4,
            email: 'patricia.white@example.com',
            firstName: 'Patricia ааааа',
            lastName: 'White',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/be76c233ff764eed94bd693923b633a2/4.jpg'
          },
          {
            id: 5,
            email: 'jennifer.turner@example.com',
            firstName: 'Jennifer',
            lastName: 'Turner',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/24e4fe3f7c634a0093fe0050f01e9894/6.jpg'
          },
          {
            id: 6,
            email: 'elizabeth.hill@example.com',
            firstName: 'Elizabeth',
            lastName: 'Hill',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e80c2bd3e48a4d8b8eeb95d41fcb6e52/10.jpg'
          },
          {
            id: 11,
            email: 'J.tetenborg@atair.com',
            firstName: 'Jana ',
            lastName: 'Tetenborg',
            avatarUrl: null
          },
          {
            id: 12,
            email: 'J.Eyre@atair.com',
            firstName: 'J',
            lastName: 'Eyre',
            avatarUrl: null
          },
          {
            id: 13,
            email: 'J.Eyre@bronte.com',
            firstName: '@J',
            lastName: 'Eyre',
            avatarUrl: null
          },
          {
            id: 7,
            email: 'secretar-pecretar@gmail.gmail',
            firstName: 'Secretar',
            lastName: 'Pecretar',
            avatarUrl: null
          },
          {
            id: 8,
            email: '01Emailstartwithnull@andendwith.null',
            firstName: 'Amazing',
            lastName: 'Spidermannn',
            avatarUrl: null
          },
          {
            id: 9,
            email: 'starktony@starkindustries.com',
            firstName: 'Tonyy',
            lastName: 'Stark',
            avatarUrl: null
          },
          {
            id: 10,
            email: 'Thor@thor.thor',
            firstName: 'Thor',
            lastName: 'From Asguard',
            avatarUrl: null
          },
          {
            id: 14,
            email: 'Секретарь@меил.ком',
            firstName: 'Еще Один',
            lastName: 'Секретарь',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      activeSecretaries: {
        data: [
          {
            id: 1,
            email: 'robert.jones@edfxample.com',
            firstName: 'Robertdfsdf',
            lastName: 'Jones dfdf',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/c930fd8fc24c4ca1a25bc0883481a81f/3.jpg'
          },
          {
            id: 2,
            email: 'john.williams@example.com',
            firstName: 'John',
            lastName: 'Williams',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/5c352117dab44eadabf54d42d29524dc/5.jpg'
          },
          {
            id: 3,
            email: 'william.davies@example.com',
            firstName: 'William',
            lastName: 'Davies',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/bd18d83832094662877fdd44ded8ca63/9.jpg'
          },
          {
            id: 4,
            email: 'patricia.white@example.com',
            firstName: 'Patricia ааааа',
            lastName: 'White',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/be76c233ff764eed94bd693923b633a2/4.jpg'
          },
          {
            id: 5,
            email: 'jennifer.turner@example.com',
            firstName: 'Jennifer',
            lastName: 'Turner',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/24e4fe3f7c634a0093fe0050f01e9894/6.jpg'
          },
          {
            id: 6,
            email: 'elizabeth.hill@example.com',
            firstName: 'Elizabeth',
            lastName: 'Hill',
            avatarUrl: 'https://whatapistorageacc.blob.core.windows.net/e80c2bd3e48a4d8b8eeb95d41fcb6e52/10.jpg'
          },
          {
            id: 11,
            email: 'J.tetenborg@atair.com',
            firstName: 'Jana ',
            lastName: 'Tetenborg',
            avatarUrl: null
          },
          {
            id: 12,
            email: 'J.Eyre@atair.com',
            firstName: 'J',
            lastName: 'Eyre',
            avatarUrl: null
          },
          {
            id: 13,
            email: 'J.Eyre@bronte.com',
            firstName: '@J',
            lastName: 'Eyre',
            avatarUrl: null
          },
          {
            id: 7,
            email: 'secretar-pecretar@gmail.gmail',
            firstName: 'Secretar',
            lastName: 'Pecretar',
            avatarUrl: null
          },
          {
            id: 8,
            email: '01Emailstartwithnull@andendwith.null',
            firstName: 'Amazing',
            lastName: 'Spidermannn',
            avatarUrl: null
          },
          {
            id: 9,
            email: 'starktony@starkindustries.com',
            firstName: 'Tonyy',
            lastName: 'Stark',
            avatarUrl: null
          },
          {
            id: 10,
            email: 'Thor@thor.thor',
            firstName: 'Thor',
            lastName: 'From Asguard',
            avatarUrl: null
          },
          {
            id: 14,
            email: 'Секретарь@меил.ком',
            firstName: 'Еще Один',
            lastName: 'Секретарь',
            avatarUrl: null
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      createdSecretary: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      updatedSecretary: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      deletedSecretary: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      reactivatedSecretary: {
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    studentGroups: {
      addStudentGroup: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      editStudentGroup: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      loadStudentGroupById: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      loadStudentGroups: {
        data: [
          {
            id: 5,
            courseId: 5,
            name: 'Advanced Technical English - 2021',
            startDate: '2021-01-04T00:00:00',
            finishDate: '2021-12-24T00:00:00',
            studentIds: [
              5,
              6,
              7,
              8,
              9,
              19,
              20,
              21,
              22,
              23,
              24,
              4
            ],
            mentorIds: [
              2,
              7
            ]
          },
          {
            id: 6,
            courseId: 6,
            name: 'Intermediate Technical English - 2021',
            startDate: '2021-01-04T00:00:00',
            finishDate: '2021-12-24T00:00:00',
            studentIds: [
              10,
              11,
              12,
              13,
              14,
              15,
              25,
              26,
              27,
              28,
              29,
              30
            ],
            mentorIds: [
              2,
              7
            ]
          },
          {
            id: 1,
            courseId: 1,
            name: 'Soft Skills for Lecturers - 2021/2',
            startDate: '2021-07-05T00:00:00',
            finishDate: '2021-12-24T00:00:00',
            studentIds: [
              2,
              3,
              16,
              17,
              18,
              4,
              1
            ],
            mentorIds: [
              1,
              6
            ]
          },
          {
            id: 2,
            courseId: 2,
            name: 'C# Programming - 2021/2',
            startDate: '2021-07-05T00:00:00',
            finishDate: '2021-12-24T00:00:00',
            studentIds: [
              5,
              6,
              7,
              19,
              20,
              21,
              22,
              4
            ],
            mentorIds: [
              3,
              8
            ]
          },
          {
            id: 3,
            courseId: 3,
            name: 'string',
            startDate: '2021-07-05T00:00:00',
            finishDate: '2021-12-17T00:00:00',
            studentIds: [
              1
            ],
            mentorIds: [
              1
            ]
          },
          {
            id: 4,
            courseId: 4,
            name: 'Cybersecurity - 2021/2',
            startDate: '2021-07-05T00:00:00',
            finishDate: '2021-12-24T00:00:00',
            studentIds: [
              12,
              13,
              14,
              15,
              27,
              28,
              29,
              30
            ],
            mentorIds: [
              5,
              10
            ]
          }
        ],
        isLoading: false,
        isLoaded: true,
        error: ''
      },
      loadHWStudentGroupsById: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    dashboard: {
      postStudentGroupResult: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      postStudentClassbook: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      postStudentResultsReducer: {
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      postStudentsResults: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      postStudentsClassbook: {
        data: {},
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    attachments: {
      attachments: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      attachmentById: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      attachmentsCreating: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      attachmentDeleting: {
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    'import': {
      groups: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      students: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      },
      themes: {
        data: [],
        isLoading: false,
        isLoaded: false,
        error: ''
      }
    },
    homework: {
      homework: {
        data: {},
        isLoading: false,
        loaded: false,
        error: ''
      },
      updatedHomework: {
        data: {},
        isLoading: false,
        loaded: false,
        error: ''
      },
      addedHomework: {
        data: {},
        isLoading: false,
        loaded: false,
        error: ''
      }
    }
  }
}