import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths, useActions } from '@/shared/index.js';
import { loadActiveStudents, activeStudentsSelector } from '@/models/index.js';
import { Card, Search, Button, WithLoading, Pagination } from '@/components/index.js';
import Icon from '@/icon.js';

export const ListOfStudents = () => {
  const [fetchStudents] = useActions([loadActiveStudents]);

  const [filteredStudentsList, setFilteredStudentsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(9);

  const { data, isLoading } = useSelector(activeStudentsSelector, shallowEqual);

  const history = useHistory();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    setFilteredStudentsList(data);
  }, [data]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredStudentsList(data.filter(({ firstName, lastName }) => {
      const name = `${firstName} ${lastName}`;

      return name.toLowerCase().includes(inputValue.toLowerCase());
    }));
    setCurrentPage(1);
  };

  const addStudent = () => {
    history.push(paths.UNASSIGNED_USERS);
  };

  const studentDetails = (id) => {
    history.push(`${paths.STUDENTS_DETAILS}/${id}`);
  };

  const studentEditing = (id) => {
    history.push(`${paths.STUDENT_EDIT}/${id}`);
  };

  const getStudents = () => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

    const students = filteredStudentsList.slice(indexOfFirstStudent, indexOfLastStudent)
      .map(({ id, firstName, lastName }) => (
        <Card
          key={id}
          id={id}
          buttonName="Details"
          iconName="Edit"
          onEdit={() => studentEditing(id)}
          onDetails={() => studentDetails(id)}
        >
          <div className="w-75">
            <p className="mb-2  pr-2 font-weight-bolder">{firstName}</p>
            <p className="font-weight-bolder">{lastName}</p>
          </div>
        </Card>
      ));

    if (!students.length && searchValue) {
      return <h4>Student is not found</h4>;
    }
    return students;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" style={{minHeight: 750}}>
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 text-center">
          <Search onSearch={handleSearch} placeholder="Student's name" />
        </div>
        <div className="col-md-4 col-12 text-right">
          <Button onClick={addStudent} variant="warning">
            <Icon icon="Plus" className="icon" />
            <span>Add a student</span>
          </Button>
        </div>
      </div>
      <div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              getStudents()
            }
          </WithLoading>
        </div>
      </div>
        {filteredStudentsList.length > 9 && 
          <Pagination 
            itemsPerPage={studentsPerPage} 
            totalItems={filteredStudentsList.length} 
            paginate={paginate}
          />
        }
    </div>
  );
};
