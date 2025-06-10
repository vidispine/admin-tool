import { PureComponent } from 'react';

import { item as ItemApi, debug as DebugApi, utils as VidiCoreApi } from '@vidispine/vdt-api';

import ItemThumbnailSpritesheetDisplay from '../../components/item/ItemThumbnailSpritesheetDisplay';
import ItemThumbnailSpritesheetImage from '../../components/item/ItemThumbnailSpritesheetImage';
import ItemThumbnailSpritesheetParams from '../../components/item/ItemThumbnailSpritesheetParams';
import CodeDisplay from '../../components/ui/CodeDisplay';
import withFormActions from '../../hoc/withFormActions';

const ITEM_THUMBNAILSPRITESHEET_FORM = 'ITEM_THUMBNAILSPRITESHEET_FORM';

class ItemSpritesheet extends PureComponent {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      thumbnailSpriteSheetDocument: undefined,
      codeVariant: 'application/json',
    };
  }

  componentDidMount() {
    const { codeVariant } = this.state;
    const { itemId } = this.props;
    const path = `/API/item/${itemId}/thumbnail/spritesheet`;
    const params = { 'noauth-url': true };
    const headers = { accept: codeVariant };
    const isJson = codeVariant.toLowerCase() === 'application/json';
    if (isJson) headers.accept = 'application/xml';
    ItemApi.getItem({
      itemId,
      path,
      params,
      headers,
    })
      .then((response) => {
        if (isJson) return DebugApi.echo({ xmlDocument: response.data });
        return Promise.resolve(response);
      })
      .then((response) =>
        this.setState({
          thumbnailSpriteSheetDocument: response.data,
        }),
      );
  }

  UNSAFE_componentWillReceiveProps({ itemId }) {
    const { itemId: prevItemId } = this.props;
    if (prevItemId !== itemId) {
      this.onRefresh(itemId);
      document.title = `VidiCore Admin | Item | ${itemId}`;
    }
  }

  onRefresh() {
    const { submitForm } = this.props;
    submitForm(ITEM_THUMBNAILSPRITESHEET_FORM);
  }

  render() {
    const {
      itemId,
      titleComponent: TitleComponent,
      tabComponent: TabComponent,
      title,
    } = this.props;
    const { thumbnailSpriteSheetDocument, codeVariant } = this.state;
    const isJson =
      typeof codeVariant === 'string' && codeVariant.toLowerCase() === 'application/json';
    return (
      <>
        {TitleComponent && (
          <TitleComponent
            code={thumbnailSpriteSheetDocument}
            codeModal="ThumbnailSpriteSheetDocument"
            codeVariant={codeVariant}
            onRefresh={this.onRefresh}
            title={title}
          />
        )}
        {TabComponent && <TabComponent />}
        <ItemThumbnailSpritesheetParams
          itemId={itemId}
          form={ITEM_THUMBNAILSPRITESHEET_FORM}
          initialValues={{
            headers: { accept: codeVariant },
            queryParams: { 'noauth-url': true },
          }}
          onSuccess={(response) =>
            this.setState({
              thumbnailSpriteSheetDocument: response.data,
              codeVariant: response.headers['content-type'],
            })
          }
        />
        {thumbnailSpriteSheetDocument &&
          (isJson ? (
            <>
              <ItemThumbnailSpritesheetImage
                thumbnailSpriteSheetDocument={thumbnailSpriteSheetDocument}
                baseUrl={VidiCoreApi?.defaultClient?.defaults?.baseURL}
              />
              <ItemThumbnailSpritesheetDisplay
                thumbnailSpriteSheetDocument={thumbnailSpriteSheetDocument}
              />
            </>
          ) : (
            <CodeDisplay code={thumbnailSpriteSheetDocument} variant={codeVariant} />
          ))}
      </>
    );
  }
}

export default withFormActions(ItemSpritesheet);
