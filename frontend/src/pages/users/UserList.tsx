import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UserType } from ".";

interface UserListProps {
  users: UserType[];
  onEditUser: (user: UserType) => void;
  onDeleteUser: (user: UserType) => void;
}

export const UserList = ({
  users,
  onEditUser,
  onDeleteUser,
}: UserListProps) => {
  if (users.length === 0) {
    return (
      <Card className="w-full max-w-6xl mx-auto bg-gray-900 border-gray-800">
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 text-lg">No users found</div>
          <div className="text-gray-500 text-sm mt-2">
            Be the first to sign up!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-medium">{user.name}</div>
                <div className="text-gray-400 text-sm">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditUser(user)}
                className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDeleteUser(user)}
                className="bg-red-700 border-red-600 text-red-300 hover:bg-red-600">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
