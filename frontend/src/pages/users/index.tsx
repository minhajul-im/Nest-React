import { useEffect, useState } from "react";
import { SignupForm } from "./Form";
import { UserList } from "./UserList";
import { EditUserModal } from "./EditModal";

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
        fetchUsers();
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <SignupForm onUserCreated={fetchUsers} />
          </div>
          <div className="flex justify-center">
            <UserList
              users={users}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </div>
        </div>

        <EditUserModal
          user={editingUser}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUserUpdated={fetchUsers}
        />
      </div>
    </div>
  );
};
