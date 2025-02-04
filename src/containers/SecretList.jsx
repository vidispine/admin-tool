import React from 'react';
import { compose } from 'redux';

import { secret as SecretApi } from '@vidispine/vdt-api';
import TitleHeader from '../components/ui/TitleHeader';
import routes from '../const/routes';

import SecretCreate from '../components/secret/SecretCreate';
import SecretListCard from '../components/secret/SecretListCard';
import withSnackbar from '../hoc/withSnackbar';
import withFormActions from '../hoc/withFormActions';

const SECRET_CREATE_MODAL = 'SECRET_CREATE_MODAL';

class SecretList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      secretListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Secrets';
    this.onRefresh();
  }

  async onRefresh() {
    const { openSnackBar } = this.props;
    try {
      const { data: secretListDocument } = await SecretApi.listSecret();
      this.setState({ secretListDocument });
    } catch (error) {
      const messageContent = 'Error Loading Secret List';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { history } = this.props;
    const { secretListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Secret"
          helpTo="/ref/secret.html"
          onRefresh={this.onRefresh}
          code={secretListDocument}
          codeModal="SecretListDocument"
          createModal={SECRET_CREATE_MODAL}
        />
        {secretListDocument && (
          <SecretListCard secretListDocument={secretListDocument} />
        )}
        <SecretCreate
          dialogName={SECRET_CREATE_MODAL}
          onSuccess={({ data: { alias } }) => history.push(routes.secret({ alias }))}
        />
      </>
    );
  }
}

export default compose(withFormActions, withSnackbar)(SecretList);
