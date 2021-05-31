import React, { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const arrow = (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-arrow-left"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>
);

export const Tabs = ({ className, children, defaultIndex, linkBack }) => {
  const [tabs, setTabs] = useState({
    activeTabIndex: defaultIndex,
  });

  const { activeTabIndex } = tabs;

  const toggleActiveTab = (tabIndex) => {
    setTabs((prevState) => ({
      ...prevState,
      activeTabIndex: tabIndex,
    }));
  };

  const renderContent = () => {
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
  };

  const renderTabs = () =>
    React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        tabIndex: index,
        isActive: index === activeTabIndex,
        onClick: toggleActiveTab,
      })
    );

  return (
    <div className={className}>
      <div className="nav nav-tabs">
        {
          <Link
            className="nav-item nav-link d-flex align-items-center"
            to={linkBack}
          >
            {arrow}
          </Link>
        }
        {renderTabs()}
      </div>
      <div>{renderCondtent()}</div>
    </div>
  );
};

Tabs.propTypes = {
  className: propTypes.string,
  defaultIndex: propTypes.number,
  children: propTypes.node.isRequired,
  linkBack: propTypes.string.isRequired,
};

Tabs.defaultProps = {
  defaultIndex: 0,
};
