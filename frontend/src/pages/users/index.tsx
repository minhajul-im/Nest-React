import { useState } from "react";
import { UserList } from "./UserList";
import { EditUserModal } from "./EditModal";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "@/graphql/queries";

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

interface GetUsersDataType {
  users: Array<UserType>;
}

export const UsersPage = () => {
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, loading, error } = useQuery<GetUsersDataType>(GET_USERS);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error.message}</div>;

  const handleEditUser = (user: UserType) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = async (user: UserType) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${user._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        await response.json();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-400">
            Sign up new users and manage existing ones
          </p>
        </div>

        <UserList
          users={(data?.users as UserType[]) || []}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

        <EditUserModal
          user={editingUser}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      </div>
    </div>
  );
};
