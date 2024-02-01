// ** React Imports
import React, { useState, useEffect, forwardRef, MouseEvent } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridRowId } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
	CardContent,
	FormControl,
	InputLabel,
	Grid,
	MenuItem,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import PencilOutline from 'mdi-material-ui/PencilOutline';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import DeleteOutline from 'mdi-material-ui/DeleteOutline';
import Icon from '@/app/icon';

// ** Type Imports
import { AppDispatch, RootState } from '@/app/store';
import { FeeType } from '@/app/types/fee';
import { DateType } from '@/app/types/reactDatepickerTypes';

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux';
import { getStudentFees } from '@/app/store/fees';

// ** TableHeader
import FeesTableHeader from './FeesTableHeader';

// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import { NumericFormat } from 'react-number-format';

// ** Context
// import { useAuth } from 'src/hooks/useAuth';

import DatePickerWrapper from '@/app/core/react-datepicker';

// ** AddCreditDrawer and EDitCreditDrawer
// import AddCreditDrawer from 'src/views/apps/in/add/AddCreditDrawer';
// import EditCreditDrawer from 'src/views/apps/in/edit/EditCreditDrawer';

interface CustomInputProps {
	dates: Date[];
	label: string;
	end: number | Date;
	start: number | Date;
	setDates?: (value: Date[]) => void;
}

interface CellType {
	row: FeeType;
}

interface RowOptionsProps {
	id: number | string;
	handleClickOpen: () => void;
	setCreditId: any;
}

const RowOptions = (props: RowOptionsProps) => {
	// ** Props
	const { id, handleClickOpen, setCreditId } = props;

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
				<DotsVertical />
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
				<MenuItem
					onClick={() => {
						handleClickOpen(), handleRowOptionsClose(), setCreditId(id);
					}}
				>
					<DeleteOutline fontSize="small" sx={{ mr: 2 }} />
					Delete
				</MenuItem>
			</Menu>
		</>
	);
};

const defaultColumns = [
	{
		flex: 0.1,
		field: 'id',
		minWidth: 90,
		headerName: '# INID',
		renderCell: ({ row }: CellType) => (
			<Typography variant="body2">{row.id}</Typography>
		),
	},
	{
		flex: 0.2,
		minWidth: 90,
		field: 'amount',
		headerName: 'Amount',
		renderCell: ({ row }: CellType) => (
			<Typography variant="body2">
				<NumericFormat
					displayType="text"
					prefix=""
					value={row.amount}
					allowLeadingZeros
					thousandSeparator=","
				/>
			</Typography>
		),
	},
	{
		flex: 0.3,
		minWidth: 125,
		field: 'payment_date',
		headerName: 'Date Paid',
		renderCell: ({ row }: CellType) => (
			<Typography variant="body2">
				{format(new Date(row.payment_date), 'dd/MM/yyyy')}
			</Typography>
		),
	},
];

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
	const startDate =
		props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
	const endDate =
		props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;

	const value = `${startDate}${endDate !== null ? endDate : ''}`;
	props.start === null && props.dates.length && props.setDates
		? props.setDates([])
		: null;
	const updatedProps = { ...props };
	delete updatedProps.setDates;

	return (
		<TextField
			fullWidth
			inputRef={ref}
			{...updatedProps}
			label={props.label || ''}
			value={value}
		/>
	);
});
/* eslint-enable */

const StudentFees = ({ id }: any) => {
	// ** State
	const [currency, setCurrency] = useState<string>('');
	const [dates, setDates] = useState<Date[]>([]);
	const [endDateRange, setEndDateRange] = useState<DateType>(null);
	const [startDateRange, setStartDateRange] = useState<DateType>(null);
	const [addCreditOpen, setAddCreditOpen] = useState<boolean>(false);
	const [editCreditOpen, setEditCreditOpen] = useState<boolean>(false);
	const [creditId, setCreditId] = React.useState<number | string>('');
	const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
	const [open, setOpen] = useState(false);
	const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<string>('');

	// ** Hooks
	const dispatch = useDispatch<AppDispatch>();
	const store: any = useSelector((state: RootState) => state.fees);
	// const auth = useAuth();

	// Open dialog
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleConfirmation = () => {
	// 	setUserInput('yes');
	// 	setSecondDialogOpen(true);
	// 	setOpen(false);

	// 	const client = id;
	// 	const is_active = false;
	// 	const cId = creditId;

	// 	dispatch(
	// 		deactivateReactivateDeposit({ cId, is_active, client, currency, dates })
	// 	);
	// };

	// Close dialog
	// const handleCancelDialog = () => {
	// 	setUserInput('no');
	// 	setSecondDialogOpen(true);
	// 	setOpen(false);
	// };

	// const handleSecondDialogClose = () => {
	// 	setSecondDialogOpen(false);
	// };

	const [pageState, setPageState] = useState({
		isLoading: false,
		page: 1,
		pageSize: 10,
		total: 0,
	});

	// Whenever there is a change in the following states, fetchData
	useEffect(() => {
		setPageState((old) => ({ ...old, isLoading: true }));
		dispatch(
			getStudentFees({
				dates,
				id,
				page: pageState.page,
				pageSize: pageState.pageSize,
			})
		);
		setPageState((old) => ({ ...old, isLoading: false, total: store.total }));
	}, [
		dispatch,
		id,
		currency,
		dates,
		pageState.page,
		pageState.pageSize,
		store.total,
	]);

	// Get total
	// useEffect(() => {
	// 	if (currency !== '') {
	// 		dispatch(
	// 			getClientTotalDeposits({
	// 				dates,
	// 				id,
	// 				currency,
	// 			})
	// 		);
	// 	}
	// }, [dispatch, id, currency, dates]);

	const handleCurrencyChange = (e: SelectChangeEvent) => {
		setCurrency(e.target.value);
		setPageState({
			...pageState,
			page: 1,
		});
	};

	const handleOnChangeRange = (dates: any) => {
		const [start, end] = dates;
		if (start !== null && end !== null) {
			setDates(dates);
		}
		setStartDateRange(start);
		setEndDateRange(end);

		setPageState({
			...pageState,
			page: 1,
		});
	};

	const toggleAddCreditDrawer = () => setAddCreditOpen(!addCreditOpen);
	const toggleEditCreditDrawer = () => setEditCreditOpen(!editCreditOpen);

	// const columns = [
	// 	...defaultColumns,
	// 	{
	// 		flex: 0.1,
	// 		minWidth: 130,
	// 		sortable: false,
	// 		field: 'actions',
	// 		headerName: 'Actions',
	// 		renderCell: ({ row }: CellType) => (
	// 			<Box sx={{ display: 'flex', alignItems: 'center' }}>
	// 				<Tooltip title="Edit">
	// 					<IconButton
	// 						size="small"
	// 						sx={{ mr: 0.5 }}
	// 						onClick={() => {
	// 							toggleEditCreditDrawer(), setCreditId(row.id);
	// 						}}
	// 					>
	// 						<PencilOutline />
	// 					</IconButton>
	// 				</Tooltip>
	// 				<RowOptions
	// 					id={row.id}
	// 					setCreditId={setCreditId}
	// 					handleClickOpen={handleClickOpen}
	// 				/>
	// 			</Box>
	// 		),
	// 	},
	// ];

	return (
		<>
			<DatePickerWrapper>
				<Card sx={{ mb: 4 }}>
					<CardHeader title="Filters" />
					<CardContent>
						<Grid container spacing={6}>
							<Grid item xs={12}>
								<DatePicker
									isClearable
									selectsRange
									monthsShown={2}
									endDate={endDateRange}
									selected={startDateRange}
									startDate={startDateRange}
									shouldCloseOnSelect={false}
									id="date-range-picker-months"
									onChange={handleOnChangeRange}
									customInput={
										<CustomInput
											dates={dates}
											setDates={setDates}
											label="Date Paid"
											end={endDateRange as number | Date}
											start={startDateRange as number | Date}
										/>
									}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				<Card>
					<FeesTableHeader
						clientTotalDeposits={store.clientTotalDeposits}
						currency={currency}
						toggle={toggleAddCreditDrawer}
					/>
					<DataGrid
						rows={store.data}
						columns={defaultColumns}
						initialState={{}}
						pageSizeOptions={[5, 50, 100]}
					/>
					{/* <DataGrid
						autoHeight
						pagination
						// paginationMode="server"
						rows={store.data}
						columns={defaultColumns}
						// checkboxSelection
						// disableSelectionOnClick
						pageSize={pageState.pageSize}
						rowsPerPageOptions={[5, 10, 30, 50]}
						sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
						onSelectionModelChange={(rows: any) => setSelectedRows(rows)}
						rowCount={pageState.total}
						loading={pageState.isLoading}
						page={pageState.page - 1}
						onPageChange={(newPage: any) =>
							setPageState((old) => ({ ...old, page: newPage + 1 }))
						}
						onPageSizeChange={(newPageSize: any) =>
							setPageState((old) => ({ ...old, pageSize: newPageSize }))
						}
					/> */}
				</Card>
			</DatePickerWrapper>

			{/* <AddCreditDrawer
				id={id}
				open={addCreditOpen}
				dates={dates}
				currency={currency}
				toggle={toggleAddCreditDrawer}
			/>
			<EditCreditDrawer
				id={creditId}
				open={editCreditOpen}
				dates={dates}
				currency={currency}
				toggle={toggleEditCreditDrawer}
			/> */}

			{/* Deactivate Account Dialogs */}
			{/* <Dialog fullWidth maxWidth="xs" open={open} onClose={handleCancelDialog}>
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
								Are you sure you would like to delete this credit?
							</Typography>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center' }}>
					<Button variant="contained" onClick={handleConfirmation}>
						Yes
					</Button>
                            <Icon
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
							fontSize="5.5rem"
							icon={
								userInput === 'yes'
									? 'mdi:check-circle-outline'
									: 'mdi:close-circle-outline'
							}
						/>
						<Typography variant="h4" sx={{ mb: 8 }}>
							{userInput === 'yes' ? 'Deleted!' : 'Cancelled!'}
						</Typography>
						<Typography>
							{userInput === 'yes'
								? 'Credit has been deleted.'
								: 'Credit deletion cancelled!'}
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
			</Dialog> */}
		</>
	);
};

export default StudentFees;
