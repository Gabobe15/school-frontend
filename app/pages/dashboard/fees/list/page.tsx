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

import MoreVertIcon from '@mui/icons-material/MoreVert';

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
import { fetchData } from '../../../../store/fees';

// ** Types Imports
import { RootState, AppDispatch } from '../../../../store';
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
      <AvatarWithImageLink href={`/apps/fees/view/${row.id}`}>
        {/* <CustomAvatar src={row.photo} sx={{ mr: 3, width: 34, height: 34 }} /> */}
      </AvatarWithImageLink>
    );
  } else {
    return (
      <AvatarWithoutImageLink href={`/apps/fees/view/${row.id}`}>
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
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const defaultColumns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'amount',
    amount: 'Amount',
    renderCell: ({ row }: CellType) => {
      const { id, amount } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Typography
            noWrap
            component="a"
            variant="subtitle2"
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              textTransform: 'capitalize',
            }}
          >
            {amount}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'student',
    headerName: 'Full Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2" sx={{ textTransform: 'capitalize' }}>
          {row.student}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: 'amount',
    minWidth: 150,
    headerName: 'Payment Date',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            noWrap
            sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
          >
            {row.amount}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant="body2">
          {row.amount}
        </Typography>
      );
    },
  },
  //   {
  //     flex: 0.1,
  //     minWidth: 110,
  //     field: 'status',
  //     headerName: 'Status',
  //     renderCell: ({ row }: CellType) => {
  //       const status = row.is_active ? 'active' : 'inactive'

  //   return (
  //     <CustomChip
  //       skin='light'
  //       size='small'
  //       label={status}
  //       color={userStatusObj[status]}
  //       sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
  //     />
  //   )
  //     }
  //   }
];

const FeesList = () => {
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
    pageSize: 100,
  });

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const store = useSelector((state: RootState) => state.fees);

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
    const is_active = false;
    const id = userId;

    // dispatch(deactivateUser({id}))
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
      <Grid container spacing={6}>
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
                  {/* {row.amount} */}
                  hello world!!!
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default FeesList;
