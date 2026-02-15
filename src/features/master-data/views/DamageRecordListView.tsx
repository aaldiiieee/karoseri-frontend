import { useNavigate } from "react-router";
import { Upload } from "lucide-react";
import { DataTable } from "@/shared/components/DataTable";
import { useDamageRecords, useDeleteDamageRecord, useBulkImportDamageRecord } from "../hooks/useDamageRecord";
import { columns, actions } from "../components/DamageRecordColumns";
import { DatasetImportDialog } from "../components/DatasetImportDialog";
import { Button } from "@/shared/components/ui/button";
import { damageRecordService } from "../services/damageRecord.service";
import { usePaginationParams } from "@/shared/hooks";
import { useState } from "react";

export const DamageRecordListView = () => {
  const navigate = useNavigate();
  const { page, size, setPage, setSize } = usePaginationParams();

  const { data, isLoading } = useDamageRecords({ page, size });
  const deleteMutation = useDeleteDamageRecord();
  const importMutation = useBulkImportDamageRecord();
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
          onEdit: (item) => navigate(`/master-data/damage-record/${item.id}`),
        })}
        isLoading={isLoading}
        navigateToAdd="/master-data/damage-record/add"
        title="Data Kerusakan"
        extraActions={
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setImportOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Import Dataset
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
        title="Import Data Kerusakan"
        onImport={(file) => importMutation.mutateAsync(file)}
        onDownloadTemplate={() => damageRecordService.downloadTemplate()}
      />
    </>
  );
};

