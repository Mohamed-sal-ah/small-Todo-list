import { gql } from "@apollo/client";

export const TODO_QUERY = gql`
  query TodoType {
    todos {
      id
      text
      status
    }
  }
`;

export const ADD_TODO = gql`
  mutation ADD_TODO($text: String!) {
    addTodo(text: $text) {
      id
      text
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      text
      status
    }
  }
`;

export const EDIT_TODO = gql`
  mutation EditTodo($id: ID!, $text: String) {
    editTodo(id: $id, text: $text) {
      id
      text
      status
    }
  }
`;

export const CHANGE_STATUS_TODO = gql`
  mutation ChangeStatus($id: ID!) {
    changeStatus(id: $id) {
      id
      text
      status
    }
  }
`;
