import ResourceTable from './ResourceTable';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'goal', label: 'Goal' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'description', label: 'Description' },
];

function Workouts() {
  return (
    <ResourceTable
      columns={columns}
      description="Suggested workout plans tailored to different fitness goals."
      endpoint={endpoint}
      title="Workouts"
    />
  );
}

export default Workouts;
