'use client';

import EditStudentForm from "@/app/components/students/edit/EditStudentForm";

// ** Demo Components Imports

const StudentEdit = ({ params }: any) => {
  return <EditStudentForm id={params.id} />;
};

export default StudentEdit;
