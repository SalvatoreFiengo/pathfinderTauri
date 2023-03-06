import { DataGrid, GridAlignment } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Action } from "../../interfaces";

type Props = {
  rules: Partial<Action>[];
  filter: string;
  onClickRule: (id: string) => void;
  rowSelected?: string;
};
export const MainGrid = ({
  rules,
  filter,
  rowSelected,
  onClickRule,
}: Props) => {
  const columns = [
    {
      field: "name",
      headerName: "Rule Name",
      flex: 1,
      headerAlign: "center" as GridAlignment,
      align: "center" as GridAlignment,
      type: "singleSelect",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerAlign: "center" as GridAlignment,
      align: "center" as GridAlignment,
      type: "singleSelect",
    },
    {
      field: "traits",
      headerName: "Traits",
      flex: 1,
      headerAlign: "center" as GridAlignment,
      align: "center" as GridAlignment,
      type: "singleSelect",
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 25]}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            fontSize: 16,
          },
        }}
        rows={rules}
        columns={columns}
        rowSelectionModel={rowSelected}
        autoHeight
        rowHeight={40}
      />
    </div>
  );
};
