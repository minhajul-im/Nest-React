import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      description
      image
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      title
      description
      image
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $description: String!, $image: String) {
    createPost(title: $title, description: $description, image: $image) {
      id
      title
      description
      image
    }
  }
`;
