import React from 'react';
import { GetServerSidePropsContext } from 'next';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoDetailsProps {
  todo: Todo;
}

export default function TodoDetails({ todo }: TodoDetailsProps) {
  return (
    <div>
      <h1>Todo Detail</h1>
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const todoId = params?.todoId as string | undefined; // Use optional chaining and type assertion
  if (!todoId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  const todo = await res.json();

  return {
    props: {
      todo,
    },
  };
}
