import TextGrid from '../ui/TextGrid';

export function getJobAction(job = {}) {
  let jobTriggerAction;
  if (job === undefined) {
    return jobTriggerAction;
  }
  if ('update' in job) {
    jobTriggerAction = 'update';
  } else if ('stop' in job) {
    jobTriggerAction = 'stop';
  } else if ('finished' in job) {
    jobTriggerAction = 'finished';
  } else if ('fail' in job) {
    jobTriggerAction = 'fail';
  } else if ('create' in job) {
    jobTriggerAction = 'create';
  }
  return jobTriggerAction;
}

export function getTriggerEntity(trigger) {
  let triggerEntity;
  if (trigger === undefined) {
    return triggerEntity;
  }
  if ('job' in trigger) {
    triggerEntity = 'job';
  } else if ('metadata' in trigger) {
    triggerEntity = 'metadata';
  } else if ('collection' in trigger) {
    triggerEntity = 'collection';
  } else if ('item' in trigger) {
    triggerEntity = 'item';
  } else if ('storage' in trigger) {
    triggerEntity = 'storage';
  } else if ('file' in trigger) {
    triggerEntity = 'file';
  } else if ('group' in trigger) {
    triggerEntity = 'group';
  } else if ('shape' in trigger) {
    triggerEntity = 'shape';
  } else if ('access' in trigger) {
    triggerEntity = 'access';
  } else if ('quota' in trigger) {
    triggerEntity = 'quota';
  } else if ('document' in trigger) {
    triggerEntity = 'document';
  } else if ('deletionLock' in trigger) {
    triggerEntity = 'deletionLock';
  }
  return triggerEntity;
}

function JobTriggerType({ trigger: { job } }) {
  const triggerAction = getJobAction(job);
  return (
    <>
      <TextGrid title="Trigger Action" value={triggerAction} />
      <TextGrid title="Placeholder" value={job.placeholder} />
      {job.filter && (
        <>
          <TextGrid title="Type" value={job.filter.type} />
          <TextGrid title="Step" value={job.filter.step} />
          {job.filter.jobdata && (
            <>
              {job.filter.jobdata.key && (
                <TextGrid title="Job Data Key" value={job.filter.jobdata.key} />
              )}
              {job.filter.jobdata['key-regex'] && (
                <TextGrid title="Job Data Key Regex" value={job.filter.jobdata['key-regex']} />
              )}
              {job.filter.jobdata.value && (
                <TextGrid title="Job Data Value" value={job.filter.jobdata.value} />
              )}
              {job.filter.jobdata['value-regex'] && (
                <TextGrid title="Job Data Value Regex" value={job.filter.jobdata['value-regex']} />
              )}
            </>
          )}
        </>
      )}
      {job.contentFilters && (
        <TextGrid title="Content Filters" variant="list" value={job.contentFilters.contentFilter} />
      )}
    </>
  );
}

function MetadataTriggerType({ trigger: { metadata } }) {
  let triggerAction;
  if ('modify' in metadata) {
    triggerAction = 'modify';
  }
  return (
    <>
      <TextGrid title="Trigger Action" value={triggerAction} />
      {triggerAction === 'modify' && (
        <>
          <TextGrid title="Field" value={metadata.modify.field} />
          <TextGrid title="Language" value={metadata.modify.language} />
          <TextGrid title="Track" value={metadata.modify.track} />
          <TextGrid title="Interval" value={metadata.modify.interval} />
        </>
      )}
    </>
  );
}

function ItemTriggerType({ trigger: { item } }) {
  let triggerAction;
  if ('modify' in item) {
    triggerAction = 'modify';
  } else if ('create' in item) {
    triggerAction = 'create';
  } else if ('delete' in item) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function CollectionTriggerType({ trigger: { collection } }) {
  let triggerAction;
  if ('modify' in collection) {
    triggerAction = 'modify';
  } else if ('create' in collection) {
    triggerAction = 'create';
  } else if ('delete' in collection) {
    triggerAction = 'delete';
  } else if ('item' in collection) {
    triggerAction = 'item';
  } else if ('metadata' in collection) {
    triggerAction = 'metadata';
  }
  return (
    <>
      <TextGrid title="Trigger Action" value={triggerAction} />
      {triggerAction === 'metadata' && (
        <MetadataTriggerType trigger={{ metadata: collection.metadata }} />
      )}
      {triggerAction === 'item' && (
        <ItemTriggerType trigger={{ trigger: { item: collection.item } }} />
      )}
    </>
  );
}

function StorageTriggerType({ trigger: { storage } }) {
  let triggerAction;
  if ('filename' in storage) {
    triggerAction = 'filename';
  } else if ('create' in storage) {
    triggerAction = 'create';
  } else if ('delete' in storage) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function FileTriggerType({ trigger: { file } }) {
  let triggerAction;
  if ('new' in file) {
    triggerAction = 'new';
  } else if ('change' in file) {
    triggerAction = 'change';
  } else if ('hash' in file) {
    triggerAction = 'hash';
  } else if ('close' in file) {
    triggerAction = 'close';
  } else if ('delete' in file) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function GroupTriggerType({ trigger: { group } }) {
  let triggerAction;
  if ('modify' in group) {
    triggerAction = 'modify';
  } else if ('create' in group) {
    triggerAction = 'create';
  } else if ('delete' in group) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function ShapeTriggerType({ trigger: { shape } }) {
  let triggerAction;
  if ('modify' in shape) {
    triggerAction = 'modify';
  } else if ('create' in shape) {
    triggerAction = 'create';
  } else if ('delete' in shape) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function AccessTriggerType({ trigger: { access } }) {
  let triggerAction;
  if ('change' in access) {
    triggerAction = 'change';
  } else if ('create' in access) {
    triggerAction = 'create';
  } else if ('delete' in access) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function QuotaTriggerType({ trigger: { quota } }) {
  let triggerAction;
  if ('warning' in quota) {
    triggerAction = 'warning';
  } else if ('create' in quota) {
    triggerAction = 'create';
  } else if ('delete' in quota) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function DocumentTriggerType({ trigger: { document } }) {
  let triggerAction;
  if ('create' in document) {
    triggerAction = 'create';
  } else if ('delete' in document) {
    triggerAction = 'delete';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

function DeletionLockTriggerType({ trigger: { deletionLock } }) {
  let triggerAction;
  if ('create' in deletionLock) {
    triggerAction = 'create';
  } else if ('delete' in deletionLock) {
    triggerAction = 'delete';
  } else if ('modify' in deletionLock) {
    triggerAction = 'modify';
  } else if ('effective' in deletionLock) {
    triggerAction = 'effective';
  } else if ('expire' in deletionLock) {
    triggerAction = 'expire';
  }
  return <TextGrid title="Trigger Action" value={triggerAction} />;
}

export default function NotificationTrigger({ trigger = {} }) {
  let TriggerComponent = null;
  const triggerEntity = getTriggerEntity(trigger);
  switch (triggerEntity) {
    case 'job':
      TriggerComponent = JobTriggerType;
      break;
    case 'metadata':
      TriggerComponent = MetadataTriggerType;
      break;
    case 'collection':
      TriggerComponent = CollectionTriggerType;
      break;
    case 'item':
      TriggerComponent = ItemTriggerType;
      break;
    case 'storage':
      TriggerComponent = StorageTriggerType;
      break;
    case 'file':
      TriggerComponent = FileTriggerType;
      break;
    case 'group':
      TriggerComponent = GroupTriggerType;
      break;
    case 'shape':
      TriggerComponent = ShapeTriggerType;
      break;
    case 'access':
      TriggerComponent = AccessTriggerType;
      break;
    case 'quota':
      TriggerComponent = QuotaTriggerType;
      break;
    case 'document':
      TriggerComponent = DocumentTriggerType;
      break;
    case 'deletionLock':
      TriggerComponent = DeletionLockTriggerType;
      break;
    default:
      break;
  }

  return (
    <>
      <TextGrid title="Trigger Entity" value={triggerEntity} />
      <TriggerComponent trigger={trigger} />
    </>
  );
}
