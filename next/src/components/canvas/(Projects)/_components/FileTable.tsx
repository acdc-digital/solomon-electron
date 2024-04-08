import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function FileTable({ caption, files }) {
  const columns = [
    { header: 'Filename', accessor: 'filename', className: 'w-1/3' },
    { header: 'Type', accessor: 'type', className: 'w-1/3' },
    { header: 'Date Added', accessor: 'dateAdded', className: 'w-1/3 text-right' },
  ];

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessor} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.accessor} className={column.cellClassName}>
                {file[column.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}