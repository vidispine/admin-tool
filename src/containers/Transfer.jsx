import { PureComponent } from 'react';

import TransferCard from '../components/transfer/TransferCard';
import TransferFilterCard from '../components/transfer/TransferFilterCard';
import TransferTitle from '../components/transfer/TransferTitle';
import withFormActions from '../hoc/withFormActions';

const TRANSFER_FILTER_FORM = 'TRANSFER_FILTER_FORM';

class Transfer extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      transferListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Transfers';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(TRANSFER_FILTER_FORM);
  }

  onSuccess(response) {
    this.setState({ transferListDocument: response.data });
  }

  render() {
    const { transferListDocument } = this.state;
    return (
      <>
        <TransferTitle
          code={transferListDocument}
          codeModal="TransferListDocument"
          onRefresh={this.onRefresh}
        />
        <TransferFilterCard form={TRANSFER_FILTER_FORM} onSuccess={this.onSuccess} />
        {transferListDocument && (
          <TransferCard transferListDocument={transferListDocument} onSuccess={this.onRefresh} />
        )}
      </>
    );
  }
}

export default withFormActions(Transfer);
