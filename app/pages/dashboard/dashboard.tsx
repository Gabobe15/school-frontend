import React from 'react';
import { Box, Grid } from '@mui/material';
import scss from './Dashboard.module.scss';
import DataRibbon from '@/app/components/Dashboard/DataRibbon';
import TransactionsPerDay from '@/app/components/Dashboard/TransactionsPerDay';
import TransactionBottomRow from '@/app/components/Dashboard/TransactionBottomRow';

const Dashboard = () => {
  return (
    <Box className={scss.dashboard}>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
        <TransactionsPerDay />
      </Grid>
      <TransactionBottomRow />
    </Box>
  );
};

export default Dashboard;
