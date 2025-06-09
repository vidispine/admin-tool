import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Tooltip from '@material-ui/core/Tooltip';

import {
  file as api,
} from '@vidispine/vdt-api';
import { DOWNLOAD_STATES } from '../../const/FileStates';
import { withSnackbarNoRouter } from '../../hoc/withSnackbar';

export const onDownload = ({ fileId, fileName, openSnackBar }) => (
  api.getFile({
    fileId,
    queryParams: {
      methodMetadata: [
        { key: 'format', value: 'SIGNED-AUTO' },
        { key: 'contentDisposition', value: `attachment${fileName ? `;+filename=${fileName}` : undefined}` },
      ],
    },
  })
    .then((response) => {
      const { data } = response;
      const { uri: uriList = [] } = data;
      const [url] = uriList;
      if (url) {
        const messageContent = 'Download Started';
        if (openSnackBar) { openSnackBar({ messageContent }); }
        window.open(url, '_blank');
      } else {
        const messageContent = 'Error Loading Download URL';
        if (openSnackBar) { openSnackBar({ messageContent, messageColor: 'secondary' }); }
      }
    })
    .catch(() => {
      const messageContent = 'Error Loading Download URL';
      if (openSnackBar) { openSnackBar({ messageContent, messageColor: 'secondary' }); }
    })
);

const FileDownload = ({ fileDocument, openSnackBar }) => {
  if (fileDocument === undefined) { return null; }
  const { path, id: fileId, state } = fileDocument;
  const fileName = path.replace(/^.*(\\|\/|:)/, '');
  if (!DOWNLOAD_STATES.includes(state)) { return null; }
  const onClick = () => onDownload({ fileId, fileName, openSnackBar });
  return (
    <Tooltip title="Download">
      <IconButton onClick={onClick}>
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default withSnackbarNoRouter(FileDownload);
