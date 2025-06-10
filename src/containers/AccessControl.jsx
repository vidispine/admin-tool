import { PureComponent } from 'react';

import { compose } from 'redux';

import AccessControlList from '../components/access/AccessControlList';
import AccessControlParams, { ACCESS_PARAMS_FORM } from '../components/access/AccessControlParams';
import AccessControlRemove from '../components/access/AccessControlRemove';
import withFormActions from '../hoc/withFormActions';
import withUI from '../hoc/withUI';

const ACCESSCONTROL_REMOVE_MODAL = 'ACCESSCONTROL_REMOVE_MODAL';

class AccessControl extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.openRemove = this.openRemove.bind(this);
    this.state = {
      accessControlListDocument: undefined,
    };
  }

  componentDidMount() {
    const { setOnRefresh } = this.props;
    if (setOnRefresh) setOnRefresh(this.onRefresh);
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ACCESS_PARAMS_FORM);
  }

  openRemove(accessId) {
    const { onOpen } = this.props;
    return () => onOpen({ modalName: ACCESSCONTROL_REMOVE_MODAL, accessId });
  }

  render() {
    const { accessControlListDocument } = this.state;
    const {
      entityType,
      entityId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            onRefresh={this.onRefresh}
            codeModal="AccessControlListDocument"
            code={accessControlListDocument}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        <AccessControlParams
          entityId={entityId}
          entityType={entityType}
          onSuccess={(response) => this.setState({ accessControlListDocument: response.data })}
        />

        <AccessControlList
          accessControlListDocument={accessControlListDocument}
          entityType={entityType}
          entityId={entityId}
          onRefresh={this.onRefresh}
          openRemove={this.openRemove}
        />
        <AccessControlRemove
          dialogName={ACCESSCONTROL_REMOVE_MODAL}
          entityId={entityId}
          entityType={entityType}
          onSuccess={this.onRefresh}
        />
      </>
    );
  }
}

export default compose(withFormActions, withUI)(AccessControl);
