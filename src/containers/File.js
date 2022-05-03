import React from 'react';
import List from '@material-ui/core/List';
import { compose } from 'redux';

import FileTitle from '../components/file/FileTitle';

import FileOverview from './file/FileOverview';
import FileShape from './file/FileShape';
import DrawerContainer from '../components/ui/DrawerContainer';
import DrawerListItem from '../components/ui/DrawerListItem';
import withTabs from '../hoc/withTabs';
import withUI from '../hoc/withUI';

const FILE_OVERVIEW_TAB = 'FILE_OVERVIEW_TAB';
const FILE_SHAPE_TAB = 'FILE_SHAPE_TAB';

const TAB_TITLE = [
  { tab: FILE_OVERVIEW_TAB, listText: 'Overview', component: FileOverview },
  { tab: FILE_SHAPE_TAB, listText: 'Shape', component: FileShape },
];

const listComponent = ({ onChangeTab, tabValue }) => (
  <List>
    {TAB_TITLE.map(({ tab, listText }) => (
      <DrawerListItem
        key={listText}
        listText={listText}
        listItemProps={{
          onClick: () => onChangeTab(null, tab),
          selected: tabValue === tab || undefined,
        }}
      />
    ))}
  </List>
);

class File extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.setOnRefresh = this.setOnRefresh.bind(this);
    this.state = {
      onRefresh: undefined,
    };
  }

  componentDidMount() {
    const { fileId } = this.props;
    document.title = `VidiCore Admin | File | ${fileId}`;
    this.onRefresh();
  }

  onRefresh() {
    const { onRefresh } = this.state;
    if (onRefresh) { onRefresh(); }
  }

  setOnRefresh(onRefresh) {
    this.setState({ onRefresh });
  }

  render() {
    const {
      fileId, onChangeTab,
      tabValue,
    } = this.props;
    const tabInfo = TAB_TITLE.find((thisTab) => thisTab.tab === tabValue) || TAB_TITLE[0];
    const { listText, component: mainComponent } = tabInfo;
    const titleComponent = (props) => (
      <FileTitle
        title={listText}
        fileId={fileId}
        {...props}
      />
    );
    return (
      <DrawerContainer
        onChangeTab={onChangeTab}
        tabValue={tabValue}
        fileId={fileId}
        mainComponent={mainComponent}
        listComponent={listComponent}
        defaultOpen
        titleComponent={titleComponent}
        setOnRefresh={this.setOnRefresh}
      />
    );
  }
}

export default compose(withTabs(FILE_OVERVIEW_TAB), withUI)(File);
