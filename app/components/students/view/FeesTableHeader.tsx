// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// ** Third Party Imports
// import { NumericFormat } from 'react-number-format';

interface FeesTableHeaderProps {
	clientTotalDeposits: number;
	currency: string;
	toggle: () => void;
}

const FeesTableHeader = (props: FeesTableHeaderProps) => {
	// ** Props
	const { clientTotalDeposits, currency, toggle } = props;

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
			<Typography variant="h6">Fees</Typography>
			{/* <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
				<Typography sx={{ mr: 2 }} variant="body1">
					Total:
				</Typography>
				<Typography variant="h6">
					{currency !== '' ? (
						<NumericFormat
							displayType="text"
							prefix={currency.toUpperCase() + ' '}
							value={clientTotalDeposits}
							allowLeadingZeros
							thousandSeparator=","
						/>
					) : (
						0
					)}
				</Typography>
			</Box> */}
			<Button onClick={toggle} variant="contained">
				Add fee
			</Button>
		</Box>
	);
};

export default FeesTableHeader;
