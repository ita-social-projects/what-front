import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useActions, paths } from '@/shared';
import { fetchCourses, coursesSelector, currentUserSelector } from '@/models/index.js';
import { Card, Search, Button, WithLoading, Pagination } from '../../../components/index.js';
import Icon from '../../../icon.js';

export const ListOfCourses = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(12);

  const { data, isLoading } = useSelector(coursesSelector, shallowEqual);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const [loadCourses] = useActions([fetchCourses]);

  const history = useHistory();

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    setFilteredCourses(data);
  }, [data]);

  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);
    setFilteredCourses(data.filter(({ name }) => name.toUpperCase().includes(inputValue.toUpperCase())));
  };

  const addCourse = () => {
    history.push(paths.COURSE_ADD);
  };

  const courseDetails = (id) => {
    history.push(`${paths.COURSE_DETAILS}/${id}`);
  };

  const courseEdit = (id) => {
    history.push(`${paths.COURSE_EDIT}/${id}`);
  };

  const coursesList = () => {
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

    const courses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
      .map((course) => {
        return (
          <Card
            key={course.id}
            id={course.id}
            buttonName="Details"
            title={course.name}
            iconName={currentUser.role === 3 || currentUser.role === 4 ? "Edit" : null}
            onEdit={currentUser.role === 3 || currentUser.role === 4 ? () => courseEdit(course.id) : null}
            onDetails={() => courseDetails(course.id)}
          />
        );
      });

    if (!courses.length && searchValue) {
      return <h4>Course is not found</h4>;
    }
    return courses;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" style={{minHeight: 750}}>
      <div className="row">
        <div className="col-md-4 offset-md-4 col-12 text-center">
          <Search onSearch={handleSearch} placeholder="Course's name" />
        </div>
        {currentUser.role === 3 || currentUser.role === 4 &&
          <div className="col-md-4 col-12 text-right">
            <Button onClick={addCourse} variant="warning">
              <Icon icon="Plus" className="icon" />
              <span>Add a course</span>
            </Button>
          </div>
        }
      </div>
      <div>
        <hr className="col-8" />
        <div className="col-12 d-flex flex-row flex-wrap justify-content-center">
          <WithLoading isLoading={isLoading}>
            {
              coursesList()
            }
          </WithLoading>
        </div>
      </div>
      {filteredCourses.length > 12 && 
        <Pagination 
          itemsPerPage={coursesPerPage} 
          totalItems={filteredCourses.length} 
          paginate={paginate}
        />
      }
    </div>
  );
};
