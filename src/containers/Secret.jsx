import React from 'react';
import { compose } from 'redux';
import { secret as SecretApi } from '@vidispine/vdt-api';

import { withRouterProps } from '../hoc/withRouterProps';
import routes from '../const/routes';
import withSnackbar from '../hoc/withSnackbar';
import withDialogProps from '../hoc/withDialogProps';
import SecretRemove from '../components/secret/SecretRemove';
import SecretValueUpdate from '../components/secret/SecretValueUpdate';
import SecretValueRemove from '../components/secret/SecretValueRemove';
import SecretCard from '../components/secret/SecretCard';
import TitleMenu from '../components/ui/TitleMenu';
import TitleHeader from '../components/ui/TitleHeader';

const SECRET_REMOVE_DIALOG = 'SECRET_REMOVE_DIALOG';
const SECRET_VALUE_REMOVE_DIALOG = 'SECRET_VALUE_REMOVE_DIALOG';
const SECRET_VALUE_UPDATE_DIALOG = 'SECRET_VALUE_UPDATE_DIALOG';

class Secret extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      secretDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ alias }) {
    const { alias: prevAlias } = this.props;
    if (prevAlias !== alias) {
      this.onFetch(alias);
      document.title = `VidiCore Admin | Secret | ${alias}`;
    }
  }

  onRefresh() {
    const { alias } = this.props;
    this.onFetch(alias);
  }

  async onFetch(alias) {
    try {
      const { data: secretDocument } = await SecretApi.getSecret({ alias });
      this.setState({ secretDocument });
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Secret';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      alias, history, onOpen, dialogProps,
    } = this.props;
    const secretKey = dialogProps?.secretKey;
    const { secretDocument } = this.state;
    return (
      <>
        <TitleHeader
          code={secretDocument}
          codeModal="SecretDocument"
          helpTo="/ref/secret.html"
          onRefresh={this.onRefresh}
          removeModal={SECRET_REMOVE_DIALOG}
          breadcrumbList={[
            {
              title: 'Secret',
              to: routes.secretList(),
            },
            {
              title: alias,
            },
          ]}
          actionComponent={(
            <TitleMenu
              menuItems={[
                {
                  label: 'Delete Secret',
                  color: 'secondary',
                  modalName: SECRET_REMOVE_DIALOG,
                },
              ]}
            />
          )}
          addAccessControl={null}
          entityId={null}
        />
        {secretDocument && (
          <SecretCard
            secretDocument={secretDocument}
            onRefresh={this.onRefresh}
            alias={alias}
            onRemove={onOpen(SECRET_VALUE_REMOVE_DIALOG)}
            onUpdate={onOpen(SECRET_VALUE_UPDATE_DIALOG)}
          />
        )}
        <SecretRemove
          dialogName={SECRET_REMOVE_DIALOG}
          onSuccess={() => history.push(routes.secretList())}
          alias={alias}
        />
        <SecretValueUpdate
          dialogName={SECRET_VALUE_UPDATE_DIALOG}
          onSuccess={this.onRefresh}
          alias={alias}
          secretKey={secretKey}
        />
        <SecretValueRemove
          dialogName={SECRET_VALUE_REMOVE_DIALOG}
          onSuccess={this.onRefresh}
          alias={alias}
          secretKey={secretKey}
        />
      </>
    );
  }
}

export default compose(withDialogProps, withRouterProps, withSnackbar)(Secret);
