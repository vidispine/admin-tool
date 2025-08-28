import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import FieldGroupPermissionTable from '../fieldgroup/FieldGroupPermissionTable';
import MetadataFieldPermissionTable from '../metadatafield/MetadataFieldPermissionTable';
import CardList from '../ui/CardList';

import { AccessControlMergedType } from './AccessControlMergedDisplay';
import AccessControlMergedQueryTable from './AccessControlMergedQueryTable';

export default function AccessControlMergedList({ accessControlMergedDocument = {} }) {
  const {
    access: accessList,
    field: metadataFieldPermissionList,
    fieldGroup: metadataFieldGroupPermissionList,
    query: queryList,
  } = accessControlMergedDocument;
  return (
    <CardList>
      {Array.isArray(accessList)
        ? accessList.map((access) => (
            <Card key={JSON.stringify(access)}>
              <CardContent>
                <AccessControlMergedType access={access} />
              </CardContent>
            </Card>
          ))
        : null}
      {Array.isArray(metadataFieldPermissionList) ? (
        <Card>
          <CardContent>
            <MetadataFieldPermissionTable
              metadataFieldPermissionList={metadataFieldPermissionList}
            />
          </CardContent>
        </Card>
      ) : null}
      {Array.isArray(metadataFieldGroupPermissionList) ? (
        <Card>
          <CardContent>
            <FieldGroupPermissionTable
              metadataFieldGroupPermissionList={metadataFieldGroupPermissionList}
            />
          </CardContent>
        </Card>
      ) : null}
      {Array.isArray(queryList) ? (
        <Card>
          <CardContent>
            <AccessControlMergedQueryTable queryList={queryList} />
          </CardContent>
        </Card>
      ) : null}
    </CardList>
  );
}
