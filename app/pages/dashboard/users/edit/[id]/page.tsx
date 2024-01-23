'use client';

// ** Demo Components Imports
import EditUserForm from '@/app/components/users/edit/EditUserForm';

const UserEdit = ({ params }: any) => {
  return <EditUserForm id={params.id} />;
};

export default UserEdit;
