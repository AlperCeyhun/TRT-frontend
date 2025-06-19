import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoDatacardContextProps {
  todos: Todo[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoDatacardContext: React.FC<TodoDatacardContextProps> = ({ todos, onCheck, onDelete }) => (
  <>
    {todos.map((todo) => (
      <Card key={todo.id} className="w-[800px] h-[110px] flex flex-row justify-between items-center p-4">
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
          <Button variant="default" onClick={() => onCheck(todo.id)}>
            Update Task
          </Button>
          <Button
            variant="outline"
            className="ml-2 bg-red-600 text-white"
            onClick={() => onDelete(todo.id)}
          >
            Delete Task
          </Button>
        </div>
      </Card>
    ))}
  </>
);

export default TodoDatacardContext;