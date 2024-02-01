'use client';
import { useEffect } from 'react';

import React from 'react';
import AddFee from '@/app/components/fees/add/AddFee';
import SearchStudent from '@/app/components/fees/add/SearchStudent';
import StudentConfirm from '@/app/components/fees/add/StudentConfirm';
// import StudentsViewLeft from '@/app/components/students/view/StudentViewLeft';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';


const FeePage = () => {
  const store = useSelector((state: RootState) => state.students);
  const data = store && store.singleStudent;
  const feeStore = useSelector((state: RootState) => state.fees);


  // feeStore.feeStatus === 'succeeded'
  //   ? redirect('/pages/dashboard/fees/add')
  //   : null;
  
  return (
		<div>
			<SearchStudent />
			{store.singleStudent ? (
				<>
					<StudentConfirm data={data} />
					<AddFee student={data?.id} />
				</>
			)
      :
      null 
    }
		</div>
	);
};

export default FeePage;
