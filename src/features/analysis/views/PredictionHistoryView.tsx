import { DataTable } from "@/shared/components/DataTable";
import { usePredictionHistory } from "../hooks/usePrediction";
import {
  columns,
  actions,
} from "../components/PredictionHistoryColumns";

export const PredictionHistoryView = () => {
  const { data, isLoading } = usePredictionHistory();

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onView: (item) => console.log("View prediction:", item.id),
        onDelete: (item) => console.log("Delete prediction:", item.id),
      })}
      isLoading={isLoading}
      title="Riwayat Prediksi"
    />
  );
};
