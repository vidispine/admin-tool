import React from 'react';
import { compose } from 'redux';
import { sequence as SequenceApi } from '@vidispine/vdt-api';

import { withRouterProps } from '../../hoc/withRouterProps';
import routes from '../../const/routes';
import withSnackbar from '../../hoc/withSnackbar';
import ItemSequenceCard from '../../components/item/ItemSequenceCard';
import ItemSequenceRemove from '../../components/item/ItemSequenceRemove';
import TitleMenu from '../../components/ui/TitleMenu';

const ITEM_SEQUENCE_REMOVE_DIALOG = 'ITEM_SEQUENCE_REMOVE_DIALOG';

class ItemSequence extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFetch = this.onFetch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onRefreshError = this.onRefreshError.bind(this);
    this.state = {
      sequenceDocument: undefined,
      contentType: undefined,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  UNSAFE_componentWillReceiveProps({ itemId, format }) {
    const { itemId: prevItemId, format: prevFormat } = this.props;
    if (prevItemId !== itemId || prevFormat !== format) {
      this.onFetch(itemId);
      document.title = `VidiCore Admin | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { itemId, format } = this.props;
    this.onFetch(itemId, format);
  }

  onFetch(itemId, format) {
    try {
      SequenceApi.getItemSequence({ itemId, format })
        .then((response) => this.setState({ sequenceDocument: response.data, contentType: response.headers['content-type'] }))
        .catch((error) => this.onRefreshError(error));
    } catch (error) {
      this.onRefreshError(error);
    }
  }

  onRefreshError() {
    const { openSnackBar } = this.props;
    const messageContent = 'Error Loading Item';
    openSnackBar({ messageContent, messageColor: 'secondary' });
  }

  render() {
    const {
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
      format,
      itemId,
      history,
    } = this.props;
    const { sequenceDocument, contentType } = this.state;
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={sequenceDocument}
            codeModal="SequenceDocument"
            helpTo="/ref/item/sequence.html"
            codeVariant={contentType}
            onRefresh={this.onRefresh}
            removeModal={ITEM_SEQUENCE_REMOVE_DIALOG}
            title={title}
            breadcrumbList={[
              {
                title: 'Sequence',
                to: routes.itemSequenceList({ itemId }),
              },
              { title: format },
            ]}
            actionComponent={(
              <TitleMenu
                menuItems={[
                  {
                    label: 'Delete Sequence',
                    color: 'secondary',
                    modalName: ITEM_SEQUENCE_REMOVE_DIALOG,
                  },
                ]}
              />
            )}
            addAccessControl={null}
            entityId={null}
          />
        )}
        {TabComponent && <TabComponent />}
        {sequenceDocument && (
          <ItemSequenceCard
            body={sequenceDocument}
            onRefresh={this.onRefresh}
            contentType={contentType}
            itemId={itemId}
            format={format}
          />
        )}
        <ItemSequenceRemove
          dialogName={ITEM_SEQUENCE_REMOVE_DIALOG}
          onSuccess={() => history.push(routes.itemSequenceList({ itemId }))}
          itemId={itemId}
          format={format}
        />
      </>
    );
  }
}

export default compose(withRouterProps, withSnackbar)(ItemSequence);
