import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/fetchtodo";

export interface Todo {
  id: number;
  title: string;
  description: string;
  category: Category;
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
      <Card key={todo.id} className="w-[600px] h-[150px] flex flex-row justify-between items-center p-4">
        <div>
          <CardHeader className="p-0 mb-1">
            <CardTitle className="w-[400px] min-h-[60px] break-words text-lg font-semibold">
              {todo.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription>
              <div className="mb-1">{todo.description || "No description provided."}</div>
              <div className="mt-1 flex flex-row space-x-2">
                {todo.completed ? (
                  <Badge variant="default">Completed</Badge>
                ) : (
                  <Badge variant="destructive">Incomplete</Badge>
                )}
                {todo.category === Category.Acil && (
                  <Badge variant="destructive">{todo.category}</Badge>)}
                {todo.category === Category.Normal && (
                  <Badge variant="secondary">{todo.category}</Badge>)}
                {todo.category === Category.DusukOncelik && (
                  <Badge variant="outline">{todo.category}</Badge>)}
              </div>
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