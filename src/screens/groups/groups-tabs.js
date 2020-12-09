import React from 'react';
import { useParams } from 'react-router-dom';

import { Tabs, Tab } from '../../components/index.js';
import { EditGroup, GroupDetails } from '../../features/index.js';

export const GroupsTabs = () => {
  const { id } = useParams();

  return (
    <Tabs defaultIndex={0} linkBack="/groups" className="container w-50">
      <Tab title="Group details" tabIndex={0}>
        <GroupDetails id={Number(id)} />
      </Tab>
      <Tab title="Edit group" tabIndex={1}>
        <EditGroup id={Number(id)} />
      </Tab>
    </Tabs>
  );
};
