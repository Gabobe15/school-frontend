'use client';

// ** Demo Components Imports

import StudentViewPage from '../../../../../components/students/view/StudentViewPage';

const StudentView = ({ params }: any) => {
  return <StudentViewPage id={params.id} />;
};

export default StudentView;
