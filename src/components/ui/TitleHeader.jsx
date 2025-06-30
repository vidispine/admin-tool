import { Fragment, useState, useEffect } from 'react';

import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import CheckIcon from '@material-ui/icons/Check';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CodeIcon from '@material-ui/icons/Code';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Help from '@material-ui/icons/Help';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Refresh from '@material-ui/icons/Refresh';
import { Link } from 'react-router-dom';

import withUI from '../../hoc/withUI';
import ExternalIdLink from '../externalid/ExternalIdLink';

import CodeModal from './CodeModal';
import CopyIcon from './CopyIcon';
import Menu, { MenuItem } from './Menu';

function CopyCodeIcon({ code }) {
  const [isCopied, setIsCopied] = useState(false);
  const onClick = () => {
    navigator.clipboard.writeText(typeof code === 'object' ? JSON.stringify(code, null, 2) : code);
    setIsCopied(true);
  };
  useEffect(() => {
    if (isCopied === false) return undefined;
    const timerId = setTimeout(() => setIsCopied(false), 3000); // 2-second delay
    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);
  return (
    <Tooltip title={isCopied === true ? 'Copied' : 'Copy to clipboard'}>
      <IconButton onClick={onClick}>{isCopied ? <CheckIcon /> : <CopyIcon />}</IconButton>
    </Tooltip>
  );
}

function TitleMenu({ menuList = [], onOpen }) {
  if (!Array.isArray(menuList) || menuList.length < 1) return null;
  return (
    <Menu>
      {menuList.map(
        ({ menuComponent, onClick, modalName, color = 'inherit', label }) =>
          menuComponent ||
          (label ? (
            <MenuItem
              key={label}
              onClick={onClick || (modalName && onOpen) ? () => onOpen({ modalName }) : undefined}
            >
              <Typography color={color}>{label}</Typography>
            </MenuItem>
          ) : null),
      )}
    </Menu>
  );
}

function TitleHeader({
  title,
  openCode,
  openAction,
  actionComponent,
  iconList,
  breadcrumbList,
  parentTitle,
  grandParentTo,
  grandParentTitle,
  parentTo,
  entityId,
  entityType,
  onRefresh,
  autoRefresh,
  onChangeAutoRefresh,
  autoRefreshLabel = 'Background Refresh',
  helpTo,
  linkTo,
  linkToTitle,
  codeModal,
  onOpen: openModal,
  createModal,
  createModalTitle = 'New',
  removeModal,
  downloadModal,
  code,
  codeVariant,
  titleChip,
  addAccessControl,
  menuList,
  style = {},
}) {
  const breadcrumb = (
    <Grid container alignItems="center">
      {Array.isArray(breadcrumbList) ? (
        breadcrumbList
          .filter((thisBreadcrumb) => thisBreadcrumb !== undefined && thisBreadcrumb !== null)
          .map((thisBreadcrumb, idx, arr) => {
            const isLastBreadCrumb = idx + 1 === arr.length;
            const breadcrumbColor = isLastBreadCrumb ? 'inherit' : 'textSecondary';
            let textComponent = null;
            let spacerComponent = null;
            if (thisBreadcrumb.to) {
              const { to: breadCrumbTo, title: breadcrumbTitle = '' } = thisBreadcrumb;
              textComponent = (
                <Typography
                  variant="h5"
                  color={breadcrumbColor}
                  component={Link}
                  to={breadCrumbTo}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {breadcrumbTitle}
                </Typography>
              );
            } else if (thisBreadcrumb.title) {
              textComponent = (
                <Typography variant="h5" color={breadcrumbColor}>
                  {thisBreadcrumb.title}
                </Typography>
              );
            } else {
              textComponent = (
                <Typography variant="h5" color={breadcrumbColor}>
                  {thisBreadcrumb}
                </Typography>
              );
            }
            if (isLastBreadCrumb === false) {
              spacerComponent = (
                <Grid item>
                  <IconButton disabled>
                    <ArrowForwardIos />
                  </IconButton>
                </Grid>
              );
            }
            return (
              <Fragment key={thisBreadcrumb.to || thisBreadcrumb.title || thisBreadcrumb}>
                {textComponent}
                {spacerComponent}
              </Fragment>
            );
          })
      ) : (
        <>
          {grandParentTitle && (
            <Grid item>
              {grandParentTo ? (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  component={Link}
                  to={grandParentTo}
                  style={{ textDecoration: 'none' }}
                >
                  {grandParentTitle}
                </Typography>
              ) : (
                <Typography variant="h5" color="textSecondary">
                  {grandParentTitle}
                </Typography>
              )}
            </Grid>
          )}
          {grandParentTitle && parentTitle ? (
            <Grid item>
              <IconButton disabled>
                <ArrowForwardIos />
              </IconButton>
            </Grid>
          ) : null}
          {parentTitle ? (
            <Grid item>
              {parentTo ? (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  component={Link}
                  to={parentTo}
                  style={{ textDecoration: 'none' }}
                >
                  {parentTitle}
                </Typography>
              ) : (
                <Typography variant="h5" color="textSecondary">
                  {parentTitle}
                </Typography>
              )}
            </Grid>
          ) : null}
          {parentTitle && title && (
            <Grid item>
              <IconButton disabled>
                <ArrowForwardIos />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        </>
      )}
      {titleChip && <Chip label={titleChip} />}
    </Grid>
  );
  let openCodeComponent;
  if (openCode) {
    openCodeComponent = (
      <Tooltip title="Code">
        <IconButton onClick={openCode}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
    );
  } else if (codeModal) {
    openCodeComponent = (
      <Tooltip title="Code">
        <IconButton onClick={() => openModal({ modalName: codeModal })}>
          <CodeIcon />
        </IconButton>
      </Tooltip>
    );
  }
  let copyCodeComponent;
  if (code) {
    copyCodeComponent = <CopyCodeIcon code={code} />;
  }
  const autoRefreshSwitch = onChangeAutoRefresh && (
    <FormControlLabel
      control={<Switch checked={autoRefresh} onChange={onChangeAutoRefresh} />}
      label={autoRefreshLabel}
    />
  );
  const refeshAction = onRefresh && (
    <Tooltip title="Refresh">
      <IconButton onClick={onRefresh}>
        <Refresh />
      </IconButton>
    </Tooltip>
  );
  let defaultAction;
  if (openAction) {
    defaultAction = (
      <IconButton onClick={openAction}>
        <PlaylistAdd />
      </IconButton>
    );
  } else if (createModal) {
    defaultAction = (
      <Tooltip title={createModalTitle}>
        <IconButton onClick={() => openModal({ modalName: createModal })}>
          <PlaylistAdd />
        </IconButton>
      </Tooltip>
    );
  }
  const openHelp = helpTo && (
    <Tooltip title="API Guide">
      <a
        href={`https://apidoc.vidispine.com/latest${helpTo}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton>
          <Help />
        </IconButton>
      </a>
    </Tooltip>
  );
  const openLink = linkTo && (
    <Tooltip title={linkToTitle || linkTo}>
      <a href={linkTo} target="_blank" rel="noopener noreferrer">
        <IconButton>
          <Help />
        </IconButton>
      </a>
    </Tooltip>
  );
  const openRemove = removeModal && (
    <Tooltip title="Delete">
      <IconButton onClick={() => openModal({ modalName: removeModal })}>
        <DeleteForever />
      </IconButton>
    </Tooltip>
  );
  const openDownload = downloadModal && (
    <Tooltip title="Download">
      <IconButton onClick={() => openModal({ modalName: downloadModal })}>
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
  const openExternalId = entityId && <ExternalIdLink entityId={entityId} entityType={entityType} />;
  const openAddAccess = addAccessControl && (
    <Tooltip title="Add ACL">
      <IconButton onClick={() => openModal({ modalName: addAccessControl })}>
        <AccessibilityIcon />
      </IconButton>
    </Tooltip>
  );
  const action = actionComponent || defaultAction;
  const menu = menuList ? <TitleMenu menuList={menuList} onOpen={openModal} /> : null;
  return (
    <div style={style}>
      <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
        <Grid item>{breadcrumb}</Grid>
        <Grid item>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            {autoRefreshSwitch}
            {openDownload}
            {openRemove}
            {openHelp}
            {openLink}
            {openAddAccess}
            {openExternalId}
            {copyCodeComponent}
            {openCodeComponent}
            {refeshAction}
            {iconList}
            {action}
            {menu}
          </Grid>
        </Grid>
      </Grid>
      {code && (
        <CodeModal dialogName={codeModal} code={code} title={codeModal} variant={codeVariant} />
      )}
    </div>
  );
}

export default withUI(TitleHeader);
