import React, { useEffect, useState } from 'react';
import { fetchTodos, Todo } from '@/lib/fetchtodo';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loadTodos } from "@/lib/loadtodo";
import { deleteTodo } from '@/lib/deletetodo';

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

	const HandleCheck = ()=> {
		console.log("Check Task");
	}

	const HandleDelete = async (id: number) => {
		try {
			await deleteTodo(id);
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("Delete Task failed", error);
		}
	};

  useEffect(() => {
    loadTodos(setTodos, setError, setLoading);
  }, []);

  if (loading) return <p className="text-gray-500">Loading your quests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-4 text-white">📝 Fetched Todos</h2>
      <ul className="space-y-1">
        {todos.map((todo) => (
          <Card key={todo.id} className="w-[600px] h-[110px] flex flex-row justify-between items-center p-4">
          	<div>
          	  <CardHeader className="p-0 mb-1">
              <CardTitle className="w-[400px] min-h-[60px] break-words text-lg font-semibold">
                  {todo.title}
              </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
              <CardDescription>
                  {todo.completed ? (
            	      <Badge variant="default">Completed</Badge>
                  ) : (
                    <Badge variant="destructive">Incomplete</Badge>
                  )}
              </CardDescription>
              </CardContent>
            </div>
            <div>
                <Button variant="default" onClick={HandleCheck}>Check Task</Button>
								<Button variant="outline" className="ml-2 bg-red-600 text-white" onClick={() => HandleDelete(todo.id)}>Delete Task</Button>									
            </div>
            </Card>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
