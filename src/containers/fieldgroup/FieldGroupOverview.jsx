import { PureComponent } from 'react';

import { compose } from 'redux';

import FieldGroupCard from '../../components/fieldgroup/FieldGroupCard';
import FieldGroupParams from '../../components/fieldgroup/FieldGroupParams';
import withFormActions from '../../hoc/withFormActions';
import withFormSelectors from '../../hoc/withFormSelectors';
import withUI from '../../hoc/withUI';

const FIELDGROUP_PARAMS_FORM = 'FIELDGROUP_PARAMS_FORM';

class FieldGroupOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      metadataFieldGroupDocument: undefined,
    };
  }

  componentDidMount() {
    const { groupName } = this.props;
    document.title = `VidiCore Admin | Field Group | ${groupName}`;
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ groupName }) {
    const { groupName: prevGroupName } = this.props;
    if (prevGroupName !== groupName) {
      this.onFetch(groupName);
    }
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(FIELDGROUP_PARAMS_FORM);
  }

  onSuccess(response) {
    this.setState({ metadataFieldGroupDocument: response?.data });
  }

  render() {
    const { groupName, titleComponent: TitleComponent, tabComponent: TabComponent } = this.props;
    const { metadataFieldGroupDocument } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={metadataFieldGroupDocument}
            codeModal="MetadataFieldGroupDocument"
            onRefresh={this.onRefresh}
          />
        )}
        {TabComponent && <TabComponent />}
        <FieldGroupParams
          groupName={groupName}
          form={FIELDGROUP_PARAMS_FORM}
          onSuccess={this.onSuccess}
        />
        {metadataFieldGroupDocument && (
          <FieldGroupCard
            metadataFieldGroupDocument={metadataFieldGroupDocument}
            groupName={groupName}
            onRefresh={this.onRefresh}
          />
        )}
      </>
    );
  }
}

export default compose(
  withUI,
  withFormActions,
  withFormSelectors,
)(FieldGroupOverview, FIELDGROUP_PARAMS_FORM);
