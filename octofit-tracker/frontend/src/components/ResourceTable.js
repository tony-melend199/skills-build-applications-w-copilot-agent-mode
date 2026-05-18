import { useEffect, useState } from 'react';

function ResourceTable({ columns, description, endpoint, title }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('Loading data...');

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        console.log(`${title} endpoint:`, endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(`${title} data:`, data);
        const normalizedItems = Array.isArray(data) ? data : data?.results || [];

        if (isMounted) {
          setItems(normalizedItems);
          setStatus(normalizedItems.length ? '' : 'No records available yet.');
        }
      } catch (error) {
        console.error(`${title} fetch failed:`, error);
        if (isMounted) {
          setStatus('Unable to load data from the API right now.');
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, title]);

  return (
    <section className="container py-4">
      <div className="card table-card">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
            <div>
              <h2 className="h3 mb-1">{title}</h2>
              <p className="text-secondary mb-0">{description}</p>
            </div>
            <a className="btn btn-outline-primary align-self-start" href={endpoint} rel="noreferrer" target="_blank">
              Open API
            </a>
          </div>

          <p className="status-text text-secondary">{status}</p>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render ? column.render(item) : item[column.key] ?? '—'}</td>
                    ))}
                  </tr>
                ))}
                {!items.length && !status && (
                  <tr>
                    <td className="text-center text-secondary" colSpan={columns.length}>
                      No records available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourceTable;
