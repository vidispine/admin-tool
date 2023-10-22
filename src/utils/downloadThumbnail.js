import { thumbnail as ThumbnailApi } from '@vidispine/vdt-api';
import downloadFile from './downloadFile';

export default function downloadThumbnail({
  resourceId, itemId, time, isPoster,
}) {
  const fileName = `${isPoster ? 'poster' : 'thumbnail'}_${itemId}_${time}.jpg`;
  const apiRequest = isPoster ? ThumbnailApi.getPoster : ThumbnailApi.getThumbnail;
  apiRequest({
    resourceId, itemId, time, responseType: 'blob',
  })
    .then(({ data }) => {
      downloadFile({ data, fileName });
    });
}
