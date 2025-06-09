import { PureComponent } from 'react';

import AccessControlMergedList from '../components/access/AccessControlMergedList';
import AccessControlMergedParams, { ACCESS_MERGED_PARAMS_FORM } from '../components/access/AccessControlMergedParams';
import withFormActions from '../hoc/withFormActions';

class AccessControlMerged extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      accessControlMergedDocument: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ACCESS_MERGED_PARAMS_FORM);
  }

  render() {
    const {
      accessControlMergedDocument,
    } = this.state;
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      entityId,
      entityType,
      title,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            codeModal="AccessControlMergedDocument"
            code={accessControlMergedDocument}
            title={title}
          />
        )}
        {TabComponent && (
          <TabComponent />
        )}
        <AccessControlMergedParams
          entityId={entityId}
          entityType={entityType}
          onSuccess={(response) => this.setState({ accessControlMergedDocument: response.data })}
        />
        <AccessControlMergedList
          accessControlMergedDocument={accessControlMergedDocument}
        />
      </>
    );
  }
}

export default withFormActions(AccessControlMerged);
