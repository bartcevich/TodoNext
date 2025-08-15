import type { TaskList } from "@/entities/task-list/types";

interface TaskListCardProps {
  list: TaskList;
}

export const TaskListCard = ({ list }: TaskListCardProps) => {
  // console.log(list);
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium text-blue-500">создано: {list.createdAt}</h3>
      {/* <p className="text-sm text-gray-500">{list.tasks?.length || 0} задач</p> */}
    </div>
  );
};
