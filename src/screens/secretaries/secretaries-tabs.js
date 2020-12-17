import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions, paths } from '@/shared/index.js';
import { fetchSecretaries } from '@models/index.js';
import { Tab, Tabs } from '@/components';
import { SecretarysDetails, EditSecretarysDetails } from '@/features';

export const SecretariesTabs = () => {
  const [loadSecretaries] = useActions([fetchSecretaries]);
  const { id } = useParams();

  useEffect(() => {
    loadSecretaries();
  }, [loadSecretaries]);

  return (
    <Tabs defaultIndex={0} className="container col-lg-6 col-md-8 col-sm-12" linkBack={paths.SECRETARIES}>
      <Tab title="Secretary's details" index={0}>
        <SecretarysDetails id={Number(id)} />
      </Tab>
      <Tab title="Edit secretary" index={1}>
        <EditSecretarysDetails id={Number(id)} />
      </Tab>
    </Tabs>
  );
};
