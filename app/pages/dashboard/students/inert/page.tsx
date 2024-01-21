'use client';

// ** React Imports
import React, {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  ReactElement,
} from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

// ** Icons Imports
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import Icon from '../../../../icon';

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components Imports
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, reactivate } from '../../../../store/inertstudents';

// ** Types Imports
import { RootState, AppDispatch } from '../../../../store';
import Chip from '@mui/material/Chip';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { ThemeColor } from 'src/@core/layouts/types'
// import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Components Imports
// import TableHeader from 'src/views/apps/user/list/TableHeader'

// import BlankLayout from 'src/@core/layouts/BlankLayout'

interface UserRoleType {
  [key: string]: ReactElement;
}

// interface UserStatusType {
//   [key: string]: ThemeColor
// }

interface RowOptionsProps {
  id: number | string;
  handleClickOpen: () => void;
  setUserId: any;
}

interface CellType {
  //   row: UsersType
  row: any;
}

// const userStatusObj: UserStatusType = {
//   active: 'success',
//   inactive: 'secondary'
// }

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3),
}));

// ** renders client column
const renderClient = (row: any) => {
  if (row.photo) {
    return (
      <AvatarWithImageLink href={`/apps/user/view/${row.id}`}>
        {/* <CustomAvatar src={row.photo} sx={{ mr: 3, width: 34, height: 34 }} /> */}
      </AvatarWithImageLink>
    );
  } else {
    return (
      <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
        {/* <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem', textTransform: 'capitalize' }}
        >
          {getInitials(row.first_name ? row.first_name : 'John Doe')}
        </CustomAvatar> */}
      </AvatarWithoutImageLink>
    );
  }
};

// ** Styled component for the link inside menu
const MenuItemLink = styled(Link)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary,
}));

const RowOptions = (props: RowOptionsProps) => {
  // ** Props
  const { id, handleClickOpen, setUserId } = props;

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ p: 0 }} onClick={handleRowOptionsClose}>
          <MenuItemLink href={`/pages/dashboard/users/edit/${id}`} passHref>
            {/* <PencilOutline fontSize='small' sx={{ mr: 2 }} /> */}
            Edit
          </MenuItemLink>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClickOpen(), handleRowOptionsClose(), setUserId(id);
          }}
        >
          {/* <DeleteOutline fontSize='small' sx={{ mr: 2 }} /> */}
          Activate
        </MenuItem>
      </Menu>
    </>
  );
};

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 250,
    field: 'regno',
    headerName: 'Registration number',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2" sx={{ textTransform: 'capitalize' }}>
          {row.regno}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'fullname',
    headerName: 'Full name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2" sx={{ textTransform: 'capitalize' }}>
          {row.fullname}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'course',
    headerName: 'Course',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.course}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.email}
        </Typography>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'contact',
    headerName: 'Contact',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.contact}
        </Typography>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      const status = row.is_active ? 'active' : 'inactive';

      return <Chip label="in active" variant="outlined" />;
    },
  },
];

const StudentList = () => {
  // ** State
  const [role, setRole] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [userId, setUserId] = React.useState<number | string>('');
  const [open, setOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');

  const [pageState, setPageState] = useState({
    isLoading: false,
    total: 0,
    page: 1,
    pageSize: 10,
  });

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const store = useSelector((state: RootState) => state.inertstudents);

  // Whenever there is a change in the following states, fetchData
  useEffect(() => {
    setPageState((old) => ({ ...old, isLoading: true }));
    dispatch(
      fetchData({
        q: value,
        page: pageState.page,
        pageSize: pageState.pageSize,
      })
    );
    setPageState((old) => ({ ...old, isLoading: false, total: store?.total }));
  }, [dispatch, role, value, pageState.page, pageState.pageSize, store?.total]);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleRoleChange = (e: SelectChangeEvent) => {
    setRole(e.target.value);
    setPageState({
      ...pageState,
      page: 1,
    });
  };

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirmation = () => {
    setUserInput('yes');
    setSecondDialogOpen(true);
    setOpen(false);

    // const client = id
    const is_active = true;
    const id = userId;

    dispatch(reactivate({ id }));
  };

  // Close dialog
  const handleCancelDialog = () => {
    setUserInput('no');
    setSecondDialogOpen(true);
    setOpen(false);
  };

  const handleSecondDialogClose = () => {
    setSecondDialogOpen(false);
  };

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RowOptions
            id={row.id}
            setUserId={setUserId}
            handleClickOpen={handleClickOpen}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={6} sx={{ paddingTop: 10 }}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Search Filters"
              sx={{
                pb: 4,
                '& .MuiCardHeader-title': { letterSpacing: '.15px' },
              }}
            />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select">Category</InputLabel>
                    <Select
                      fullWidth
                      value={role}
                      id="select-role"
                      label="Select Role"
                      labelId="role-select"
                      onChange={handleRoleChange}
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value="">Computer</MenuItem>
                      <MenuItem value="manager">IGSCE</MenuItem>
                      <MenuItem value="teller">MADRASA</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {/* <TableHeader value={value} handleFilter={handleFilter} /> */}
            <DataGrid
              autoHeight
              pagination
              paginationMode="server"
              rows={store.data}
              columns={columns}
              // checkboxSelection
              //   disableSelectionOnClick
              pageSize={pageState.pageSize}
              rowsPerPageOptions={[5, 10, 30, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              // onSelectionModelChange={rows => setSelectedRows(rows)}
              rowCount={pageState.total}
              loading={pageState.isLoading}
              page={pageState.page - 1}
              //   onPageChange={(newPage) => setPageState(old => ({ ...old, page: newPage + 1 }))}
              //   onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleCancelDialog}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                maxWidth: '85%',
                textAlign: 'center',
                '& svg': { mb: 4, color: 'warning.main' },
              }}
            >
              <Icon icon="mdi:alert-circle-outline" fontSize="5.5rem" />
              <Typography>
                Are you sure you would like to activate this student?
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleConfirmation}>
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main',
              },
            }}
          >
            <Icon
              fontSize="5.5rem"
              icon={
                userInput === 'yes'
                  ? 'mdi:check-circle-outline'
                  : 'mdi:close-circle-outline'
              }
            />
            <Typography variant="h4" sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Activated!' : 'Cancelled!'}
            </Typography>
            <Typography>
              {userInput === 'yes'
                ? 'Student has been reactivated.'
                : 'Student activation cancelled!'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSecondDialogClose}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentList;
