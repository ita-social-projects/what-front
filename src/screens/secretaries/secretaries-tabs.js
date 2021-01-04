import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, paths } from '@/shared/index.js';
import { fetchSecretaries } from '@models/index.js';
import { Tab, Tabs } from '@/components';
import { SecretarysDetails, EditSecretarysDetails } from '@/features';
import { number } from 'prop-types';

export const SecretariesTabs = ({ index }) => {
  const [loadSecretaries] = useActions([fetchSecretaries]);
  const { id } = useParams();

  useEffect(() => {
    loadSecretaries();
  }, [loadSecretaries]);

  return (
    <Tabs defaultIndex={index} className="container col-lg-6 col-md-8 col-sm-12" linkBack={paths.SECRETARIES}>
      <Tab title="Secretary's details" index={0}>
        <SecretarysDetails id={Number(id)} />
      </Tab>
      <Tab title="Edit secretary">
        <EditSecretarysDetails id={Number(id)} />
      </Tab>
    </Tabs>
  );
};

SecretariesTabs.propTypes = {
  index: number.isRequired,
};
