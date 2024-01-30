'use client';

import AddFee from '@/app/components/fees/add/AddFee';
import SearchStudent from '@/app/components/fees/add/SearchStudent';
import StudentConfirm from '@/app/components/fees/add/StudentConfirm';
// import StudentsViewLeft from '@/app/components/students/view/StudentViewLeft';
import { RootState } from '@/app/store';
import React from 'react';
import { useSelector } from 'react-redux';

const FeePage = () => {
  const store = useSelector((state: RootState) => state.students);
  const data = store.singleStudent;
  return (
    <div>
      <SearchStudent />
      {store.status === 'succeeded' ? (
        <>
          <StudentConfirm data={data} />
          <AddFee data={data} />
        </>
      ) : (
        <p>Not found!</p>
      )}
    </div>
  );
};

export default FeePage;
