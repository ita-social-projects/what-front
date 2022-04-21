import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { number } from 'prop-types';

import { useActions, paths } from '@/shared/index.js';
import { currentUserSelector, fetchSecretaries } from '@models/index.js';

import { Tab, Tabs } from '@/components';
import { SecretarysDetails, EditSecretarysDetails } from '@/features';

export const SecretariesTabs = ({ index }) => {
  const { id } = useParams();

  const [loadAllSecretaries] = useActions([fetchSecretaries]);
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  useEffect(() => {
    loadAllSecretaries();
  }, [loadAllSecretaries]);

  if (currentUser.role === 4) {
    return (
      <Tabs
        defaultIndex={index}
        className="container col-lg-6 col-md-8 col-sm-12 pt-5"
        linkBack={paths.SECRETARIES}
      >
        <Tab title="Secretary's details" index={0}>
          <SecretarysDetails id={Number(id)} />
        </Tab>
        <Tab title="Edit secretary">
          <EditSecretarysDetails id={Number(id)} />
        </Tab>
      </Tabs>
    );
  }
  return <SecretarysDetails id={Number(id)} />;
};

SecretariesTabs.propTypes = {
  index: number.isRequired,
};
