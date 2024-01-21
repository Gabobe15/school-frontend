import React from 'react';
import { Paper, Grid } from '@mui/material';
import scss from './TransactionBottomRow.module.scss';
import DataChart from '../../DataChart';
import { doughnutChartData } from '../../mockData';

const TransactionBottomRow = () => {
  return (
    <Grid container className={scss.bottomRow}>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Transaction per user type</p>
          <DataChart type={'doughnut'} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Transaction per user type</p>
          <DataChart type={'doughnut'} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Transaction per user type</p>
          <DataChart type={'doughnut'} data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={scss.dataCard}>
          <p>Transaction per user type</p>
          <DataChart type={'doughnut'} data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TransactionBottomRow;
