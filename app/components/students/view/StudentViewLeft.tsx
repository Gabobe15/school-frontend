import React, { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Chip } from '@mui/material';

import profile from '../../../../public/images/profile.jpg';

// ** Custom Components
// import CustomChip from 'src/@core/components/mui/chip'
// import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { StudentType } from '@/app/types/student';

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { deactivateReactivateStd } from '@/app/store/students';

// ** Store Imports
import { useDispatch } from 'react-redux';
// import { AppDispatch } from 'src/store'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

// ** Context
import { AppDispatch } from '@/app/store';
import Icon from '@/app/icon';
import Image from 'next/image';

interface Props {
  data: StudentType | null;
}

// interface ColorsType {
//   [key: string]: ThemeColor
// }

// const roleColors: ColorsType = {
//   director: 'error',
//   manager: 'info',
//   teller: 'warning',

//   // maintainer: 'success',
//   // subscriber: 'primary'
// }

// const statusColors: ColorsType = {
//   true: 'success',
//   false: 'secondary'
// }

const StudentViewLeft = ({ data }: Props) => {
  // state
  const [open, setOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  // const { data: session } = useSession();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  //  const auth = useAuth()

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const id = data ? data.id : null;

  const handleConfirmation = () => {
    setUserInput('yes');
    setSecondDialogOpen(true);
    setOpen(false);

    const is_active = data ? (data.is_active ? false : true) : '';

    dispatch(deactivateReactivateStd({ id, is_active }));
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

  const status = data ? (data.is_active ? 'true' : 'false') : '';

  //   const renderUserAvatar = () => {
  //     if (data) {
  //         return (
  //           <CustomAvatar
  //             skin='light'
  //             variant='rounded'
  //             color={data.avatarColor as ThemeColor}
  //             sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem', textTransform: 'capitalize' }}
  //           >
  //             {/* {getInitials(data.first_name)} */}
  //             {getInitials(data.first_name ? data.first_name : 'John Doe')}
  //           </CustomAvatar>
  //         )
  //     } else {
  //       return null
  //     }
  //   }

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 15,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Image
                src={profile}
                alt="profile picture"
                height={200}
                width={200}
                style={{ borderRadius: '50%' }}
              />
              {/* {renderUserAvatar()} */}
              {/* <Avatar
                src={profile}
                alt="Profile picture"
                sx={{ width: 100, height: 100 }}
              /> */}
              {/* <Typography
                variant="h6"
                sx={{ mb: 4, textTransform: 'capitalize' }}
              >
                profile picture
              </Typography> */}
            </CardContent>
            <CardContent>
              <Typography variant="h6">Details</Typography>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    Reg no:
                  </Typography>
                  <Typography variant="body2">{data.regno}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Names:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {data.fullname}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: 'text.primary' }}
                  >
                    Email:
                  </Typography>
                  <Typography variant="body2">{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Course:
                  </Typography>
                  <Typography variant="body2">{data.course}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    School of:
                  </Typography>
                  <Typography variant="body2">{data.role}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    Tel:
                  </Typography>
                  <Typography variant="body2">{data.contact}</Typography>
                </Box>
              </Box>
              <br />
              <Divider />
              <br />
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 2, color: 'text.primary' }}
                >
                  Status:
                </Typography>
                {data.is_active ? (
                  <Chip label="active" color="success" />
                ) : (
                  <Chip label="inactive" color="warning" />
                )}
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              {data.is_active ? (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  Re-activate
                </Button>
              )}
              <br />
              <br />
              <br />
              <br />
            </CardActions>

            {/* Deactivate Account Dialogs */}
            <Dialog
              fullWidth
              maxWidth="xs"
              open={open}
              onClose={handleCancelDialog}
            >
              <DialogContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {data.is_active ? (
                    <Box
                      sx={{
                        maxWidth: '85%',
                        textAlign: 'center',
                        '& svg': { mb: 4, color: 'warning.main' },
                      }}
                    >
                      <Icon icon="mdi:alert-circle-outline" fontSize="5.5rem" />
                      <Typography>
                        Are you sure you would like to deactivate this account?
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        maxWidth: '85%',
                        textAlign: 'center',
                        '& svg': { mb: 4, color: 'warning.main' },
                      }}
                    >
                      <Icon icon="mdi:alert-circle-outline" fontSize="5.5rem" />
                      <Typography>
                        Are you sure you would like to re-activate this account?
                      </Typography>
                    </Box>
                  )}
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
              {!data.is_active ? (
                <DialogContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      '& svg': {
                        mb: 14,
                        color:
                          userInput === 'yes' ? 'success.main' : 'error.main',
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
                      {userInput === 'yes' ? 'Deactivated!' : 'Cancelled!'}
                    </Typography>
                    <Typography>
                      {userInput === 'yes'
                        ? 'Account has been deactivated.'
                        : 'Account deactivation cancelled!'}
                    </Typography>
                  </Box>
                </DialogContent>
              ) : (
                <DialogContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      '& svg': {
                        mb: 14,
                        color:
                          userInput === 'yes' ? 'success.main' : 'error.main',
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
                      {userInput === 'yes' ? 'Re-activated!' : 'Cancelled!'}
                    </Typography>
                    <Typography>
                      {userInput === 'yes'
                        ? 'Account has been re-activated!'
                        : 'Account re-activation cancelled!'}
                    </Typography>
                  </Box>
                </DialogContent>
              )}
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
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default StudentViewLeft;
