import React from 'react';

import { analyzepreset as AnalyzePresetApi } from '@vidispine/vdt-api';

import TitleHeader from '../components/ui/TitleHeader';
import AnalyzePresetCard from '../components/analyzepreset/AnalyzePresetCard';
import AnalyzePresetRemove from '../components/analyzepreset/AnalyzePresetRemove';

import withSnackbar from '../hoc/withSnackbar';

const ANALYZEPRESET_REMOVE_MODAL = 'ANALYZEPRESET_REMOVE_MODAL';

class AnalyzePreset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      analyzePresetDocument: undefined,
    };
  }

  componentDidMount() {
    const { preset } = this.props;
    document.title = `VidiCore Admin | Analyze Preset | ${preset}`;
    this.onRefresh();
  }

  onRefresh() {
    const { openSnackBar, preset } = this.props;
    try {
      AnalyzePresetApi.getAnalyzePreset({ preset })
        .then((response) => this.setState({
          analyzePresetDocument: response.data,
        }));
    } catch (error) {
      const messageContent = 'Error Getting Analyze Preset';
      openSnackBar({ messageContent, messageColor: 'secondary' });
    }
  }

  render() {
    const { preset, history } = this.props;
    const { analyzePresetDocument } = this.state;
    return (
      <>
        <TitleHeader
          title={preset}
          parentTitle="Analyze Preset"
          parentTo="/analyze-preset/"
          helpTo="/ref/analyze-preset.html"
          onRefresh={this.onRefresh}
          code={analyzePresetDocument}
          codeModal="AnalyzePresetDocument"
          removeModal={ANALYZEPRESET_REMOVE_MODAL}
        />

        {analyzePresetDocument
        && (
        <AnalyzePresetCard
          preset={preset}
          analyzePresetDocument={analyzePresetDocument}
          onRefresh={this.onRefresh}
        />
        )}
        <AnalyzePresetRemove
          dialogName={ANALYZEPRESET_REMOVE_MODAL}
          preset={preset}
          onSuccess={() => history.push('/analyze-preset/')}
        />
      </>
    );
  }
}

export default withSnackbar(AnalyzePreset);
