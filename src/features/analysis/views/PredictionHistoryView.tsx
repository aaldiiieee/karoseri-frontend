import { useNavigate } from "react-router";
import { DataTable } from "@/shared/components/DataTable";
import {
  useDeletePrediction,
  usePredictionHistory,
} from "../hooks/usePrediction";
import { columns, actions } from "../components/PredictionHistoryColumns";
import { usePaginationParams } from "@/shared/hooks";

export const PredictionHistoryView = () => {
  const navigate = useNavigate();
  const deleteData = useDeletePrediction();
  const { page, size, setPage, setSize } = usePaginationParams();
  const { data, isLoading } = usePredictionHistory({ page, size });

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteData.mutateAsync(id);
    }
  };

  return (
    <DataTable
      data={data?.items ?? []}
      columns={columns}
      keyExtractor={(item) => item.id}
      actions={actions({
        onDetail: (item) => navigate(`/analysis/${item.id}`),
        onDelete: (item) => handleDelete(item.id),
      })}
      isLoading={isLoading}
      title="Klasifikasi Kerusakan"
      navigateToAdd="/analysis/add"
      // extraActions={handleTrainModel()}
      pagination={{
        page: data?.page ?? 1,
        size: data?.size ?? 10,
        total: data?.total ?? 0,
        totalPages: data?.pages ?? 0,
        onPageChange: setPage,
        onSizeChange: setSize,
      }}
    />
  );
};
