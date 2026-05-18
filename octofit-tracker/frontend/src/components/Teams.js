import ResourceTable from './ResourceTable';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'coach', label: 'Coach' },
  { key: 'points', label: 'Points' },
];

function Teams() {
  return (
    <ResourceTable
      columns={columns}
      description="Team rosters and challenge points for the current competition."
      endpoint={endpoint}
      title="Teams"
    />
  );
}

export default Teams;
