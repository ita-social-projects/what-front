import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { Tab, Tabs } from '@/components';
import { HomeworkDetails, HomeworkEdit } from '@/features/homework';

export const HomeworkTabs = ({ index }) => (
  <Tabs defaultIndex={index} className="container w-50" linkBack="/homework">
    <Tab title="Homework details">
      <HomeworkDetails />
    </Tab>
    <Tab title="Edit homework details">
      <HomeworkEdit />
    </Tab>
  </Tabs>
);
