import { deleteTodo } from "@/pages/api/todos";
import { LoaderSpinner } from "@/components/loader/LoaderSpinner";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  todo: { _id: number; completeStatus: boolean };
}

const DeleteTodo = ({ todo }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.refetchQueries([`todo`]);
      queryClient.refetchQueries([`todos`]);
    },
    onError: (error) => {
      console.error("Error of POST-request:", error);
    },
  });

  const onDataChange = () => {
    mutate({
      id: todo._id,
      todoData: { completeStatus: !todo.completeStatus },
    });
  };

  return (
    <button onClick={onDataChange} disabled={isLoading}>
      {isLoading ? <LoaderSpinner /> : "Delete todo"}
    </button>
  );
};

export default DeleteTodo;