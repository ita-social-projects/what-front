import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { Tab, Tabs } from '@/components';
import { HomeworkDetails, HomeworkEdit } from '@/features/homework';

export const HomeworkTabs = ({ index }) => {
  
  const { id } = useParams();

  return (
    <Tabs defaultIndex={index} className="container w-50 pt-5" linkBack="/homework">
      <Tab title="Homework details">
        <HomeworkDetails id={Number(id)}/>
      </Tab>
      <Tab title="Edit homework details">
        <HomeworkEdit id={Number(id)}/>
      </Tab>
    </Tabs>
  );
}
