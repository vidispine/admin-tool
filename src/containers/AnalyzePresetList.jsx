import React from 'react';
import { compose } from 'redux';

import TitleHeader from '../components/ui/TitleHeader';
import AnalyzePresetListCard from '../components/analyzepreset/AnalyzePresetListCard';
import AnalyzePresetListParams, { ANALYSEPRESETLISTPARAMS_FORM } from '../components/analyzepreset/AnalyzePresetListParams';
import AnalyzePresetDialog from '../components/analyzepreset/AnalyzePresetDialog';
import withSnackbar from '../hoc/withSnackbar';
import withFormActions from '../hoc/withFormActions';

const ANALYZEPRESET_CREATE_MODAL = 'ANALYZEPRESET_CREATE_MODAL';

class AnalyzePresetList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      analyzePresetListDocument: undefined,
    };
  }

  componentDidMount() {
    document.title = 'VidiCore Admin | Analyze Presets';
    this.onRefresh();
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ANALYSEPRESETLISTPARAMS_FORM);
  }

  onSuccess(response) {
    const { data: analyzePresetListDocument } = response;
    this.setState({
      analyzePresetListDocument,
    });
  }

  render() {
    const { history } = this.props;
    const { analyzePresetListDocument } = this.state;
    return (
      <>
        <TitleHeader
          title="Analyze Preset"
          helpTo="/ref/analyze-preset.html"
          onRefresh={this.onRefresh}
          code={analyzePresetListDocument}
          codeModal="AnalyzePresetListDocument"
          createModal={ANALYZEPRESET_CREATE_MODAL}
        />
        <AnalyzePresetListParams
          form={ANALYSEPRESETLISTPARAMS_FORM}
          onSuccess={this.onSuccess}
        />
        { analyzePresetListDocument
        && (
        <AnalyzePresetListCard
          analyzePresetListDocument={analyzePresetListDocument}
        />
        )}
        <AnalyzePresetDialog
          dialogName={ANALYZEPRESET_CREATE_MODAL}
          onSuccess={({ data }) => history.push(`/analyze-preset/${data.name}`)}
        />
      </>
    );
  }
}

export default compose(withFormActions, withSnackbar)(AnalyzePresetList);
