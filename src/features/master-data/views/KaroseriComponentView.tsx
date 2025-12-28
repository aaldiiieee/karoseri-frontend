import { DataTable } from "@/shared/components/DataTable";
import { useComponents } from "../hooks/useKaroseriComponent";
import { columns } from "../components/KaroseriComponentColums";

export const KaroseriComponentView = () => {
  const { data } = useComponents();

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
    />
  );
};
