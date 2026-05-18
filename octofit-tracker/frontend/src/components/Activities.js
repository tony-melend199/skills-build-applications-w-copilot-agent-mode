import ResourceTable from './ResourceTable';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const columns = [
  { key: 'user_name', label: 'Student' },
  { key: 'activity_type', label: 'Activity' },
  { key: 'duration_minutes', label: 'Minutes' },
  { key: 'calories_burned', label: 'Calories' },
];

function Activities() {
  return (
    <ResourceTable
      columns={columns}
      description="Recent fitness activities logged by OctoFit participants."
      endpoint={endpoint}
      title="Activities"
    />
  );
}

export default Activities;
