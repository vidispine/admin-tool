import Grid from '@material-ui/core/Grid';
import Panorama from '@material-ui/icons/Panorama';

function PlaceholderThumbnail() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Panorama style={{ fontSize: 200 }} />
      </Grid>
    </Grid>
  );
}

export default PlaceholderThumbnail;
