import ResourceTable from './ResourceTable';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const columns = [
  { key: 'name', label: 'Student' },
  { key: 'email', label: 'Email' },
  { key: 'team_name', label: 'Team' },
  { key: 'favorite_activity', label: 'Favorite Activity' },
  { key: 'points', label: 'Points' },
];

function Users() {
  return (
    <ResourceTable
      columns={columns}
      description="Student profiles, teams, and favorite activities."
      endpoint={endpoint}
      title="Users"
    />
  );
}

export default Users;
