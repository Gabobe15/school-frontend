// ** MUI Imports
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// ** Next Import
import Link from 'next/link';

// ** Icons Imports
interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value } = props;

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ mb: 2 }} variant="h6">
        Students
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder="Search User"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Button
          sx={{ mb: 2 }}
          component={Link}
          variant="contained"
          href="/pages/dashboard/students/add"
        >
          New Student
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
