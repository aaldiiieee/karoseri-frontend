import { DataTable } from "@/shared/components/DataTable";
import { useUsers } from "../hooks/useUser";
import { columns, actions } from "../components/UserColumns";

export const UserListView = () => {
  const { data, isLoading } = useUsers();

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onEdit: (item) => console.log("Edit user:", item.id),
        onDelete: (item) => console.log("Delete user:", item.id),
      })}
      isLoading={isLoading}
      title="Team"
    />
  );
};
