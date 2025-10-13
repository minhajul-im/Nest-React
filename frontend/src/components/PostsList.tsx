import { useQuery, useMutation } from "@apollo/client/react";
import { GET_POSTS, CREATE_POST } from "../graphql/queries";
import { useState } from "react";
import type { Post } from "../types/post";

interface GetPostsData {
  posts: Post[];
}

export const PostsList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, loading, error, refetch } = useQuery<GetPostsData>(GET_POSTS);

  const [createPostFn] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setTitle("");
      setDescription("");
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      try {
        await createPostFn({
          variables: {
            title: title.trim(),
            description: description.trim(),
          },
        });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading posts...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Posts Management (GraphQL CRUD)
      </h1>

      {/* Create Post Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post description"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold p-6 border-b">All Posts</h2>
        <div className="p-6">
          {data?.posts?.length === 0 ? (
            <p className="text-gray-500">
              No posts yet. Create your first post above!
            </p>
          ) : (
            <div className="space-y-4">
              {data?.posts?.map((post: Post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    ID: {post.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
