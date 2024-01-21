import { DataGrid, GridLoadingOverlay } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';

const Analytics = () => {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 500,
    maxColumns: 15,
  });
  return (
    <>
      <h1>Analytics</h1>
      <p>
        The best data available here at your finger tips in table form. This
        could be a whole section of data that is available for users to deep
        dive further into the numbers/stats
      </p>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          slots={{ loadingOverlay: LinearProgress }}
          loading={!data}
          {...data}
        />
      </div>
    </>
  );
};

export default Analytics;
