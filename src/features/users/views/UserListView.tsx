import { useNavigate } from "react-router";
import { DataTable } from "@/shared/components/DataTable";
import { useUsers, useDeleteUser } from "../hooks/useUser";
import { columns, actions } from "../components/UserColumns";
import type { User } from "../types/user.type";

export const UserListView = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  const handleDelete = async (item: User) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      await deleteMutation.mutateAsync(item.id);
    }
  };

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onEdit: (item) => navigate(`/settings/team/${item.id}`),
        onDelete: handleDelete,
      })}
      isLoading={isLoading}
      title="Pengguna"
      navigateToAdd="/settings/team/add"
    />
  );
};
