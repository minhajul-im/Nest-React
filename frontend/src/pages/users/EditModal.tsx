import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserType {
  _id: string;
  name: string;
  email: string;
}

interface EditUserModalProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await response.json();
      onUserUpdated(); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white">
              Update User
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
