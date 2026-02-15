import { useNavigate } from "react-router";
import { Upload } from "lucide-react";
import { DataTable } from "@/shared/components/DataTable";
import { useComponents, useDeleteComponent, useBulkImportComponent } from "../hooks/useKaroseriComponent";
import { columns, actions } from "../components/KaroseriComponentColums";
import { DatasetImportDialog } from "../components/DatasetImportDialog";
import { Button } from "@/shared/components/ui/button";
import { karoseriComponentService } from "../services/karoseriComponent.service";
import { usePaginationParams } from "@/shared/hooks";
import { useState } from "react";

export const KaroseriComponentListView = () => {
  const navigate = useNavigate();
  const { page, size, setPage, setSize } = usePaginationParams();

  const { data, isLoading } = useComponents({ page, size });
  const deleteMutation = useDeleteComponent();
  const importMutation = useBulkImportComponent();
  const [importOpen, setImportOpen] = useState(false);

  const handleDelete = async (item: any) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteMutation.mutateAsync(item.id);
    }
  };

  return (
    <>
      <DataTable
        data={data?.items ?? []}
        columns={columns}
        keyExtractor={(item) => item.id}
        actions={actions({
          onDelete: handleDelete,
          onEdit: (item) => navigate(`/master-data/component/${item.id}`),
        })}
        isLoading={isLoading}
        navigateToAdd="/master-data/component/add"
        title="Komponen"
        extraActions={
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setImportOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Import Komponen
          </Button>
        }
        pagination={{
          page: data?.page ?? 1,
          size: data?.size ?? 10,
          total: data?.total ?? 0,
          totalPages: data?.pages ?? 0,
          onPageChange: setPage,
          onSizeChange: setSize,
        }}
      />

      <DatasetImportDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Import Komponen"
        onImport={(file) => importMutation.mutateAsync(file)}
        onDownloadTemplate={() => karoseriComponentService.downloadTemplate()}
      />
    </>
  );
};
