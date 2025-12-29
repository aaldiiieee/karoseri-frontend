import { useNavigate } from "react-router";
import { DataTable } from "@/shared/components/DataTable";
import { useComponents } from "../hooks/useKaroseriComponent";
import { columns, actions } from "../components/KaroseriComponentColums";

export const KaroseriComponentListView = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useComponents();

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onDelete: (item) => console.log(item),
        onEdit: (item) => navigate(`/master-data/component/${item.id}`),
      })}
      isLoading={isLoading}
      navigateToAdd="/master-data/component/add"
      title="Component"
    />
  );
};
