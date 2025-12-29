import { useNavigate } from "react-router";
import { DataTable } from "@/shared/components/DataTable";
import { useDamageRecords } from "../hooks/useDamageRecord";
import { columns, actions } from "../components/DamageRecordColumns";

export const DamageRecordListView = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDamageRecords();

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onDelete: (item) => console.log(item),
        onEdit: (item) => navigate(`/master-data/damage-record/${item.id}`),
      })}
      isLoading={isLoading}
      navigateToAdd="/master-data/damage-record/add"
      title="Damage Record"
    />
  );
};
