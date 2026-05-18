import ResourceTable from './ResourceTable';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user_name', label: 'Student' },
  { key: 'team_name', label: 'Team' },
  { key: 'points', label: 'Points' },
];

function Leaderboard() {
  return (
    <ResourceTable
      columns={columns}
      description="Live leaderboard standings across students and teams."
      endpoint={endpoint}
      title="Leaderboard"
    />
  );
}

export default Leaderboard;
