import React from 'react';
import { Todo } from '@/types/Todo';

interface TodosPageProps {
  todos: Todo[];
}

export default function TodosPage({ todos }: TodosPageProps) {
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <a href={`/todos/${todo.id}`}>{todo.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos: Todo[] = await res.json();

  return {
    props: {
      todos,
    },
  };
}
