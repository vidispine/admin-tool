import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { utils as VidiCoreApi } from '@vidispine/vdt-api';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TitleHeader from '../components/ui/TitleHeader';

const VIDICORE_OPENAPI_URLS = [
  {
    name: '24.1.1',
    url: 'https://vidispine.github.io/vidicore-openapi-generator/24.1.1/VidiCore%20-%2024.1.1.openapi.json',
  },
];

const useStyles = makeStyles((theme) => ({
  Swagger: {
    '& *[class^="opblock"]': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .opblock-title': {
      color: '#3b4151 !important',
    },
    '& .parameter__in': {
      color: `${theme.palette.text.primary}`,
    },
    '& *[class^="opblock"] p': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& *[class^="opblock"] li': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& *[class^="opblock"] td': {
      color: `${theme.palette.text.secondary} !important`,
    },
    '& *[class^="opblock"] h4': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& *[class^="opblock"] h5': {
      color: `${theme.palette.text.secondary} !important`,
    },
    '& .authorization__btn': {
      display: 'none',
    },
    '& .copy-to-clipboard': {
      display: 'none',
    },
    '& .opblock .opblock-section-header h4 ': {
      color: `${theme.palette.text.primary} !important`,
    },
  },
  Filter: {
    '& .filter-container input': {
      borderRadius: theme.shape.borderRadius,
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    '& .filter': {
      padding: 0,
    },
  },
  Operations: {},
}));

const SwaggerLayout = ({ getComponent }) => {
  const Operations = getComponent('operations', true);
  const Filter = getComponent('FilterContainer', true);
  const classes = useStyles();

  return (
    <div className={clsx(['swagger-ui', classes.Swagger])}>
      <div className={classes.Filter}>
        <Filter />
      </div>
      <div className={classes.Operations}>
        <Operations />
      </div>
    </div>
  );
};

const LayoutPlugin = () => ({
  components: { SwaggerLayout },
});

const onComplete = (system) => {
  const { baseURL } = VidiCoreApi.defaultClient.defaults;
  const spec = { ...system.getState().toJSON().spec.json };
  spec.servers = [{ url: baseURL }];
  return system.specActions.updateJsonSpec(spec);
};

const requestInterceptor = (req) => {
  if (req.loadSpec) return req;
  const { Authorization, RunAs } = VidiCoreApi.defaultClient.defaults.headers;
  req.headers.Authorization = Authorization;
  if (RunAs) req.headers.RunAs = RunAs;
  return req;
};

const Swagger = () => (
  <>
    <TitleHeader
      title="Swagger"
      linkTo="https://swagger.io/docs/specification/about/"
    />
    <Card>
      <CardContent>
        <SwaggerUI
          url={VIDICORE_OPENAPI_URLS[0].url}
          docExpansion={false}
          filter
          tryItOutEnabled
          plugins={[LayoutPlugin]}
          layout="SwaggerLayout"
          onComplete={onComplete}
          requestInterceptor={requestInterceptor}
        />
      </CardContent>
    </Card>
  </>
);

export default Swagger;
