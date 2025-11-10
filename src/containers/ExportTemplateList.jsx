import { PureComponent } from 'react';

import { compose } from 'redux';

import { exportlocation as api } from '@vidispine/vdt-api';

import ExportLocationDialog from '../components/exportlocation/ExportLocationDialog';
import TitleHeader from '../components/ui/TitleHeader';
import UriListCard from '../components/ui/UriListCard';
import withUI from '../hoc/withSnackbar';

const EXPORTTEMPLATE_CREATE_MODAL = 'EXPORTTEMPLATE_CREATE_MODAL';

class ExportTemplateList extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      uriListDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
    document.title = 'VidiCore Admin | Export Template';
  }

  onRefresh() {
    try {
      api
        .getConfiguration()
        .then((response) => this.setState({ uriListDocument: response.data }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Export Templates';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const { uriListDocument } = this.state;
    const { history } = this.props;

    return (
      <>
        <TitleHeader
          title="Export Template"
          helpTo="/item/export-templates.html"
          createModal={EXPORTTEMPLATE_CREATE_MODAL}
          onRefresh={this.onRefresh}
          code={uriListDocument}
          codeModal="URIListDocument"
          menuList={[
            {
              label: 'Create Export Template',
              modalName: EXPORTTEMPLATE_CREATE_MODAL,
            },
          ]}
        />
        {uriListDocument && (
          <UriListCard
            uriListDocument={uriListDocument}
            linkTo={(uri) => `/export-template/${uri}/`}
            titleCase
          />
        )}
        <ExportLocationDialog
          dialogName={EXPORTTEMPLATE_CREATE_MODAL}
          onSuccess={(exportTemplate) => {
            history.push(`/export-template/${exportTemplate}`);
          }}
        />
      </>
    );
  }
}

export default compose(withUI)(ExportTemplateList);
