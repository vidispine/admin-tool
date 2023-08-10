import React from 'react';

import CardList from '../ui/CardList';
import ComponentCard from './ComponentCard';

export default function ComponentOverview(props) {
  const { componentDocument } = props;
  if (componentDocument === undefined) { return null; }
  return (
    <CardList>
      <ComponentCard {...props} />
    </CardList>
  );
}
