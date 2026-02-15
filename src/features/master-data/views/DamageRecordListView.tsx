import { useNavigate } from "react-router";
import { DataTable } from "@/shared/components/DataTable";
import { useDamageRecords, useDeleteDamageRecord } from "../hooks/useDamageRecord";
import { columns, actions } from "../components/DamageRecordColumns";

export const DamageRecordListView = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDamageRecords();
  const deleteMutation = useDeleteDamageRecord();

  const handleDelete = async (item: any) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await deleteMutation.mutateAsync(item.id);
    }
  };

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onDelete: handleDelete,
        onEdit: (item) => navigate(`/master-data/damage-record/${item.id}`),
      })}
      isLoading={isLoading}
      navigateToAdd="/master-data/damage-record/add"
      title="Damage Record"
    />
  );
};
