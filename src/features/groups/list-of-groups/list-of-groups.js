import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  globalLoadStudentGroups,
  loadStudentGroupsSelector,
} from "@models/index.js";
import { paths, useActions } from "@/shared/index.js";

import {
  Button,
  Search,
  WithLoading,
  Pagination,
  DoubleDateFilter,
} from "@components/index.js";

import { inputGroupStartDate } from "@features/groups/list-of-groups/redux/actions";
import Icon from "@/icon.js";

import classNames from "classnames";
import { searchGroup, searchDate } from "./redux/index.js";
import styles from "./list-of-groups.scss";

import { Table } from "@components/table";
import { List } from "@components/list";
import { currentUserSelector } from "@models/index";

export const ListOfGroups = () => {
  const history = useHistory();

  const studentGroupsState = useSelector(
    loadStudentGroupsSelector,
    shallowEqual
  );
  const { data: groups, isLoading } = studentGroupsState;

  const [rawGroupsList, setRawGroupsList] = useState([]);
  const [filteredGroupsList, setFilteredGroupsList] = useState([]);

  const [visibleGroups, setVisibleGroups] = useState([]);

  const [searchGroupValue, setSearchGroupValue] = useState("");
  const [showBlocks, setShowBlocks] = useState(false);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  const searchGroupName = useSelector(searchGroup, shallowEqual);
  const searchStartDate = useSelector(searchDate, shallowEqual);

  const [fetchListOfGroups] = useActions([globalLoadStudentGroups]);

  const INITIAL_CATEGORIES = [
    { id: 0, name: "name", sortedByAscending: false, tableHead: "Group Name" },
    {
      id: 1,
      name: "quantity",
      sortedByAscending: false,
      tableHead: "Quantity of students",
    },
    {
      id: 2,
      name: "startDate",
      sortedByAscending: false,
      tableHead: "Date of start",
    },
    {
      id: 3,
      name: "finishDate",
      sortedByAscending: false,
      tableHead: "Date of finish",
    },
  ];

  const [sortingCategories, setSortingCategories] =
    useState(INITIAL_CATEGORIES);

  useEffect(() => {
    fetchListOfGroups();
  }, [fetchListOfGroups]);

  useEffect(() => {
    if (groups.length && !isLoading) {
      let newGroups = groups.map((group, index) => ({
        index,
        quantity: group.studentIds.length,
        ...group,
      }));
      setRawGroupsList(newGroups);
      setFilteredGroupsList(newGroups);
    }

    setSortingCategories(INITIAL_CATEGORIES);
  }, [groups, isLoading]);

  useEffect(() => {
    const searchedGroups = rawGroupsList.filter((group) =>
      group.name.toLowerCase().includes(searchGroupValue.toLowerCase())
    );
    setFilteredGroupsList(searchedGroups);
  }, [searchGroupValue]);

  const handleAddGroup = useCallback(() => {
    history.push(paths.GROUP_ADD);
  }, [history]);

  const handleSearch = (inputValue) => {
    setSearchGroupValue(inputValue);
  };

  const handleEdit = useCallback(
    (event, id) => {
      event.stopPropagation();
      history.push(`${paths.GROUP_EDIT}/${id}`);
    },
    [history]
  );

  const handleDetails = useCallback(
    (id) => {
      history.push(`${paths.GROUPS_DETAILS}/${id}`);
    },
    [history]
  );

  const handleCalendarChange = (event) => {
    const date = event.target.value;
    inputGroupStartDate(date);
  };

  const changeActiveCategory = (categories, activeCategoryName) =>
    categories.map((category) => {
      if (category.name === activeCategoryName) {
        return { ...category, sortedByAscending: !category.sortedByAscending };
      }
      return { ...category, sortedByAscending: false };
    });

  const handleSortByParam = (data, categoryParams) => {
    const sortedGroups = data;
    setSortingCategories(
      changeActiveCategory(sortingCategories, categoryParams.sortingParam)
    );
    setFilteredGroupsList(sortedGroups);
  };

  const downloadGroups = () => {
    history.push(paths.GROUPS_DOWNLOAD);
  };

  const listProps = {
    data: visibleGroups,
    handleDetails,
    handleEdit,
    errors: [
      {
        message: "Group is not found",
        check: [
          (!visibleGroups.length && searchGroupName) || searchStartDate,
          !filteredGroupsList.length,
        ],
      },
    ],
    access: true,
    fieldsToShow: ["name", "studentIds", "startDate", "finishDate", "edit"],
  };

  return (
    <div className={classNames("container pt-5", styles.block)}>
      <div className="row justify-content-between align-items-center mb-3">
        <h2 className="col-6">Groups</h2>
        <div className="col-2 text-right">
          {!isLoading &&
            `${visibleGroups.length} of ${filteredGroupsList.length} groups`}
        </div>
      </div>
      <div className="row mr-0">
        <div className="col-12 card shadow p-3 mb-5 bg-white ml-2 mr-2">
          <div className="row align-items-center justify-content-between mt-2 mb-3">
            <div className={classNames("col-2", styles["change-view"])}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={!showBlocks}
                  onClick={() => setShowBlocks(false)}
                >
                  <Icon icon="List" color="#2E3440" size={25} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={showBlocks}
                  onClick={() => setShowBlocks(true)}
                >
                  <Icon icon="Card" color="#2E3440" size={25} />
                </button>
              </div>
            </div>
            <div className={classNames("col-3", styles["blabla"])}>
              <Search onSearch={handleSearch} placeholder="Group's name" />
            </div>
            <div className="col-2">
              <input
                className={classNames(
                  "form-control ",
                  styles["calendar-input"]
                )}
                type="date"
                name="group_date"
                required
                onChange={handleCalendarChange}
                placeholder="Start Date"
              />
            </div>
            
            <div className={classNames("col-4 text-right")}>
              <Button
                onClick={downloadGroups}
                type="button"
                className={classNames(
                  "btn m-0 btn-warning ",
                  styles["left-add-btn"]
                )}
              >
                Upload Group('s)
              </Button>
              <Button
                onClick={handleAddGroup}
                className={classNames(
                  "btn m-0 ml-2 btn-warning ",
                  styles["left-add-btn"]
                )}
              >
                <span>Add a group</span>
              </Button>
            </div>
          </div>
          <div className="row align-items-center justify-content-end mb-3">
            <div className="col-6 offset-4">
              {
                <DoubleDateFilter
                  rawItemsList={rawGroupsList}
                  setFilteredItemsList={setFilteredGroupsList}
                />
              }
            </div>
          </div>
          <WithLoading isLoading={isLoading} className="d-block mx-auto">
            {showBlocks ? (
              <div className="container d-flex flex-wrap">
                <List listType={"block"} props={listProps} />
              </div>
            ) : (
              <Table
                sortingCategories={sortingCategories}
                onClick={handleSortByParam}
                currentUser={currentUser}
                data={filteredGroupsList}
                access={{ unruledUser: [1], unassigned: "" }}
              >
                <List listType={"list"} props={listProps} />
              </Table>
            )}
          </WithLoading>
        </div>
        <div
          className={classNames(
            "row justify-content-between align-items-center mb-3",
            styles.paginate
          )}
        >
          <Pagination
            items={filteredGroupsList}
            setVisibleItems={setVisibleGroups}
          />
        </div>
      </div>
    </div>
  );
};
