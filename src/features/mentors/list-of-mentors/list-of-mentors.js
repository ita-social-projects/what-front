import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { currentUserSelector, fetchActiveMentors, mentorsActiveSelector } from '@/models';

import { Button, Pagination, Search, WithLoading } from '@/components';
import Icon from '@/icon.js';

import classNames from 'classnames';
import styles from './list-of-mentors.scss';


const editIcon = (
  <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className={classNames("bi bi-pencil", styles.scale)} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
    <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg>
);

const icon1 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
    <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
  </svg>
);

const icon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
  </svg>
);

export const ListOfMentors = () => {
  const history = useHistory();

  const [mentorsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMentorValue, setSearchMentorValue] = useState('');
  const [filteredMentorList, setFilteredMentorList] = useState([]);
  const [sortingCategories, setSortingCategories] = useState([
    { id: 0, name: 'index', sortedByAscending: true, tableHead: '#' },
    { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
    { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
    { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  ]);
  const [visibleMentors, setVisibleMentors] = useState([]);

  const { data, isLoading } = useSelector(mentorsActiveSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const loadActiveMentors = useActions(fetchActiveMentors);

  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;

  useEffect(() => {
    loadActiveMentors();
  }, [loadActiveMentors]);

  useEffect(() => {
    const mentors = data.map((mentor, index) => ({ index, ...mentor }))
      .filter((mentor) => `${mentor.firstName} ${mentor.lastName}`.toUpperCase()
      .includes(searchMentorValue.toUpperCase()));
    setFilteredMentorList(mentors);
  }, [data, searchMentorValue]);

  useEffect(() => {
    setVisibleMentors(filteredMentorList.slice(indexOfFirstMentor, indexOfLastMentor));
  }, [currentPage, filteredMentorList]);

  const mentorList = () => {

    const mentors = visibleMentors
      .map(({ id, index, firstName, lastName, email}) => {
        return (
          <tr onClick={() => mentorDetails(id)} key={id} className={styles.pointer} data-mentor-id={id}>
            <td className="text-center">{index + 1}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            {currentUser.role !== 2 ? <td className="text-center" data-mentor-id={id} onClick={(event) => mentorEdit(event, mentor.id) }>{editIcon}</td> : null}
          </tr>
        );
      })

    if (!mentors.length && searchMentorValue) {
      return <tr><td colSpan="5" className="text-center">Mentor is not found</td></tr>;
    }
    return mentors;
  };

  const handleSortByParam = (event) => {
    const { sortingParam, sortedByAscending } = event.target.dataset;
    const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

    const sortedMentors = [...visibleMentors].sort((prevMentor, currentMentor) => {
      if (prevMentor[sortingParam] > currentMentor[sortingParam]) {
        return sortingCoefficient * -1;
      }
      return sortingCoefficient;
    });

    setSortingCategories(sortingCategories.map((category) => {
      if (category.name === sortingParam) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    }));

    setVisibleMentors(sortedMentors)
  };

  const handleSearch = (inputValue) => {
    setSearchMentorValue(inputValue);
  };

  const addMentor = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const mentorDetails = useCallback((id) => {
    history.push(`${paths.MENTORS_DETAILS}/${id}`);
  });

  const mentorEdit = useCallback((event, id) => {
    event.stopPropagation();
    history.push(`${paths.MENTOR_EDIT}/${id}`);
  });

  const paginate = (pageNumber) => {
    if(currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = (pageNumber) => {
    const totalPages = Math.ceil(data?.length / mentorsPerPage);
    setCurrentPage((prev) => {
      if (prev === totalPages) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  const prevPage =(pageNumber) => {
    setCurrentPage((prev) => {
      if (prev - 1 === 0) {
        return prev;
      } else {
        return pageNumber;
      }
    });
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <div className="col-6"><h2>Mentors</h2></div>
        {filteredMentorList.length > 1 ? <span className="col-2 text-right">{filteredMentorList.length} mentors</span> : null}
        <div className="col-4 d-flex align-items-center justify-content-end">
          {filteredMentorList.length > mentorsPerPage && !isLoading &&
            <Pagination
              itemsPerPage={mentorsPerPage}
              totalItems={filteredMentorList.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          }
          
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-12 shadow p-3 mb-5 bg-white rounded">
            <div className="px-3 py-2 mb-2">
              <div className="row align-items-center">
                <div className="col-2">
                  <button className="btn">{icon1}</button>
                  <button className="btn">{icon2}</button>
                </div>
                <div className="col-4">
                  <Search onSearch={handleSearch} placeholder="Mentor's name" />
                </div>
                <div className="custom-control custom-switch col-2 offset-2">
                  <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                  <label className="custom-control-label" htmlFor="customSwitch1">Disabled Mentors</label>
                </div>
                <div className="col-2">
                  {currentUser.role !== 2 &&
                    <Button onClick={addMentor} className={styles.btn}>
                      <Icon icon="Plus" className="icon" />
                      <span>Add a mentor</span>
                    </Button>
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <WithLoading isLoading={isLoading} className="d-block mx-auto m-0">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
                        <th
                          key={id}
                          onClick={handleSortByParam}
                          data-sorting-param={name}
                          data-sorted-by-ascending={Number(sortedByAscending)}
                        >
                          {tableHead}
                        </th>
                      ))}
                      {currentUser.role !== 2 ? <th scope="col" className="text-center">Edit</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mentorList()
                    }
                  </tbody>
                </table>
              </WithLoading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// export const ListOfStudents = () => {
//   const {
//     data: activeStudents,
//     isLoading: areActiveStudentsLoading,
//   } = useSelector(activeStudentsSelector, shallowEqual);

//   const {
//     data: allStudents,
//     isLoading: areAllStudentsLoading,
//   } = useSelector(studentsSelector, shallowEqual);

//   const [
//     dispatchLoadStudents,
//     dispatchLoadActiveStudents,
//   ] = useActions([loadStudents, loadActiveStudents]);

//   const history = useHistory();

//   const [students, setStudents] = useState([]);
  // const [sortingCategories, setSortingCategories] = useState([
  //   { id: 0, name: 'index', sortedByAscending: false, tableHead: '#' },
  //   { id: 1, name: 'firstName', sortedByAscending: false, tableHead: 'Name' },
  //   { id: 2, name: 'lastName', sortedByAscending: false, tableHead: 'Surname' },
  //   { id: 3, name: 'email', sortedByAscending: false, tableHead: 'Email' },
  // ]);

//   useEffect(() => {
//     dispatchLoadActiveStudents();
//     dispatchLoadStudents();
//   }, [dispatchLoadActiveStudents, dispatchLoadStudents]);

  // useEffect(() => {
  //   if (activeStudents.length && !areActiveStudentsLoading) {
  //     setStudents(activeStudents.map((student, index) => ({ index, ...student })));
  //   }
  // }, [activeStudents, areActiveStudentsLoading]);

  // const handleSortByParam = (event) => {
  //   const { sortingParam, sortedByAscending } = event.target.dataset;
  //   const sortingCoefficient = Number(sortedByAscending) ? 1 : -1;

  //   const sortedStudents = [...students].sort((prevStudent, currentStudent) => {
  //     if (prevStudent[sortingParam] > currentStudent[sortingParam]) {
  //       return sortingCoefficient * -1;
  //     }
  //     return sortingCoefficient;
  //   });

  //   setSortingCategories(sortingCategories.map((category) => {
  //     if (category.name === sortingParam) {
  //       return { ...category, sortedByAscending: !category.sortedByAscending };
  //     }
  //     return { ...category, sortedByAscending: false };
  //   }));

  //   setStudents(sortedStudents);
  // };

//   const handleShowDisabled = (event) => {
//     if (event.target.checked) {
//       setStudents(allStudents.map((student, index) => ({ index, ...student })));
//     } else {
//       setStudents(activeStudents.map((student, index) => ({ index, ...student })));
//     }
//   };

//   const handleEdit = (event, id) => {
//     event.preventDefault();
//     history.push(`${paths.STUDENT_EDIT}/${id}`);
//   };

//   const handleDetails = (id) => {
//     history.push(`${paths.STUDENTS_DETAILS}/${id}`);
//   };

//   return (
//     <div className="container card shadow">
//       <WithLoading isLoading={areActiveStudentsLoading} className="d-block mx-auto my-2">
//         <div className="row">
//           <div className="custom-control custom-switch">
//             <input type="checkbox" className="custom-control-input" id="show-disabled-check" onChange={handleShowDisabled} />
//             <label className="custom-control-label" htmlFor="show-disabled-check">Show disabled</label>
//           </div>
//         </div>
//         <table className="table table-hover">
//           <thead>
//             <tr>
              // {sortingCategories.map(({ id, name, tableHead, sortedByAscending }) => (
              //   <th
              //     key={id}
              //     onClick={handleSortByParam}
              //     data-sorting-param={name}
              //     data-sorted-by-ascending={Number(sortedByAscending)}
              //   >
              //     {tableHead}
              //   </th>
              // ))}
//               <th>Edit</th>
//             </tr>
//           </thead>
//           <tbody>
            // {students.map(({ id, index, firstName, lastName, email }) => (
            //   <tr key={id} onClick={() => handleDetails(id)} data-student-id={id}>
            //     <td>{index + 1}</td>
            //     <td>{firstName}</td>
            //     <td>{lastName}</td>
            //     <td>{email}</td>
            //     <td onClick={(event) => handleEdit(event, id)} data-student-id={id}>Edit</td>
            //   </tr>
            // ))}
//           </tbody>
//         </table>
//       </WithLoading>
//     </div>
//   );
// };