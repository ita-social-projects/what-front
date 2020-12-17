import React from 'react';
import { Routes } from '@features/index.js';
import Icon from './icon.js';

export const App = () => (
  <>
    <h1>Hello, I`m App Component!</h1>
    <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
    <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />
  </>
);
