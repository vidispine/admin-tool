import { PureComponent } from 'react';

import StitchCard from '../components/stitch/StitchCard';
import TitleHeader from '../components/ui/TitleHeader';

export default class Stitch extends PureComponent {
  constructor(props) {
    super(props);
    document.title = 'VidiCore Admin | Stitch';
    this.state = {
      url: undefined,
    };
  }

  render() {
    const { url } = this.state;
    return (
      <>
        <TitleHeader title="Stitch Images" helpTo="/ref/misc/stitching.html" />
        <StitchCard
          url={url}
          onSuccess={(newUrl) => this.setState({ url: newUrl })}
          onFail={() => this.setState({ url: undefined })}
        />
      </>
    );
  }
}
