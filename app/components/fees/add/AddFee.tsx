'use client';

// ** React Imports
import React, { MouseEvent, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, CardHeaderProps, Grid, Collapse } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// ** Store & Actions Imports
import { AppDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { getSingleStudentByRegNo } from '@/app/store/students';

// ** Axios
import axios from 'axios';

import { signIn } from 'next-auth/react';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports
// import Icon from '../../../../icon'

import { useRouter, usePathname } from 'next/navigation';
import Icon from '@/app/icon';

interface StudentData {
  amount: string;
}

const schema = yup.object().shape({
  amount: yup
    .string()
    .typeError('Registration Number field is required')
    .required(),
});

const defaultValues = {
  amount: '',
};

const StyledCardHeader = styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const AddFee = ({ data }) => {
  // ** State
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    // resolver: yupResolver(schema)
  });

  const onSubmit = async (data: StudentData) => {
    dispatch(getSingleStudentByRegNo(data))
      .unwrap()
      .then(() => {
        // setMessage("Student found!")
      })
      .catch(() => {
        setMessage('Student not found!');
        setOpen(true);
      });

    reset();
  };

  return (
    <div>
      <Card sx={{ ml: 9, m: 5 }}>
        <StyledCardHeader
          title="Fees payment"
          sx={{
            pb: 4,
            mt: '27px',
            '& .MuiCardHeader-title': { letterSpacing: '.15px' },
          }}
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={10}>
                <FormControl fullWidth>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type="string"
                        value={value}
                        label="amount"
                        onChange={onChange}
                        placeholder="ksh 0.0"
                        error={Boolean(errors.amount)}
                      />
                    )}
                  />
                  {errors.amount && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      {errors.amount.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                <Button variant="contained" type="submit" sx={{ mr: 3 }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddFee;
