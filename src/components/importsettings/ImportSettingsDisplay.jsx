import { Fragment } from 'react';

import Divider from '@material-ui/core/Divider';

import { AccessControlType } from '../access/AccessControlDisplay';
import TextGrid from '../ui/TextGrid';

export default function ImportSettingsDisplay({ importSettingsDocument = {} }) {
  const { access: accessList = [] } = importSettingsDocument;
  return (
    <>
      <TextGrid title="ID" value={importSettingsDocument.id} />
      {accessList.map((access, index) => (
        <Fragment
          key={index} // eslint-disable-line react/no-array-index-key
        >
          <Divider />
          <AccessControlType access={access} />
        </Fragment>
      ))}
    </>
  );
}
