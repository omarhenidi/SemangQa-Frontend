import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TopCreatorTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <Card extra={"h-full w-full"}>
      {/* Top Creator Header */}
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white pt-4 shadow-2xl shadow-gray-100 ">
        <h4 className="text-lg font-bold text-navy-700">
          Top Performers
        </h4>

      </div>

      {/* Top Creator Body */}
      <div className="flex bg-white">
        <div className="w-full overflow-x-scroll  md:overflow-x-hidden" style={{ display: "inline" }}>
          <table
            {...getTableProps()}
            className="w-full min-w-[500px] overflow-x-scroll"
          >
            <tbody {...getTableBodyProps()} className="">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      let data = "";
                      if (cell.column.Header === "Name") {
                        data = (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="h-[30px] w-[30px] rounded-full">
                                <img
                                  src={cell.value[2]}
                                  className="h-full w-full rounded-full"
                                  alt=""
                                />
                              </div>

                              <br />
                              <div>
                                <p className="text-md mt-2">
                                  {cell.value[0]} <br />
                                  <p className="text-sm text-gray-600">{cell.value[1]}</p>
                                </p>
                              </div>
                            </div>

                          </>
                        );
                      } else if (cell.column.Header === "Email") {
                        data = (
                          <p className="text-md font-medium text-gray-600 ">
                            {cell.value}
                          </p>
                        );
                      } else if (cell.column.Header === "Rating") {
                        data = (
                          <div class="flex font-bold">
                            {cell.value}%
                          </div>
                        );
                      }
                      return (
                        <td
                          className="py-3 text-sm"
                          key={index}
                        >
                          {data}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>


        </div>
        <div className="image px-4 h-175 pt-2" style={{ backgroundColor: "black", borderRadius: "20px", width: "175px" }}>
          <h4 className="text-white text-[24px]" >Upgrade Your Crowd</h4>
          <h5 className="text-gray-400 text-[16px]" >Pro plan for better results</h5>

          <div className="relative">
            <img
              className="absolute left-0 top-0"
              alt="Ellipse"
              src="https://generation-sessions.s3.amazonaws.com/90c790cbcb3ff69efaf7abf3d11cf943/img/ellipse-22.png"
            />
            <img
              className="absolute left-0 top-0"
              alt="Ellipse"
              src="https://generation-sessions.s3.amazonaws.com/90c790cbcb3ff69efaf7abf3d11cf943/img/ellipse-23.png"
            />
            <img
              className="absolute top-0 left-0"
              alt="Ellipse"
              src="https://generation-sessions.s3.amazonaws.com/90c790cbcb3ff69efaf7abf3d11cf943/img/ellipse-24.png"
            />
            <img
              className="absolute top-0 left-0"
              alt="Now"
              src="https://generation-sessions.s3.amazonaws.com/90c790cbcb3ff69efaf7abf3d11cf943/img/now.png"
            />
          </div>

        </div>
      </div>





    </Card>
  );
}

export default TopCreatorTable;
