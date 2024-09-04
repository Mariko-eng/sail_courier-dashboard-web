import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import PropTypes from 'prop-types';
import { createColumnHelper } from '@tanstack/react-table';

// Create a column helper instance
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.row.original.companyUniqueNo,
    }),
    columnHelper.accessor('companyName', {
        header: 'Name',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('companyEmail', {
        header: 'Email',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('companyPhone', {
        header: 'phone',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('companyAddressPlaceName', {
        header: 'location',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('companyAddressPlaceId', {
        header: 'Cordinates',
        cell: info => `${info.row.original.companyAddressCordinatesLat} , ${info.row.original.companyAddressCordinatesLng}`,
    }),
    columnHelper.accessor('createdAt', {
        header: 'Created AT',
        cell: info => `${info.row.original.createdAt}`,
    }),
];

const CorporateCompaniesTable = ({ companies }) => {
    // Create the table instance

    const table = useReactTable({
        data : companies || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    return (
        <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    );
};

// Define PropTypes for the Table component
CorporateCompaniesTable.propTypes = {
    companies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            companyUniqueNo : PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            companyEmail: PropTypes.string.isRequired,
            companyPhone : PropTypes.string.isRequired,
            contactPersonName : PropTypes.string.isRequired,
            contactPersonPhone : PropTypes.string.isRequired,
            contactPersonEmail : PropTypes.string.isRequired,
            companyAddressPlaceId : PropTypes.string.isRequired,
            companyAddressPlaceName : PropTypes.string.isRequired,
            companyAddressCordinatesLat : PropTypes.number.isRequired,
            companyAddressCordinatesLng : PropTypes.number.isRequired,
            createdAt : PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CorporateCompaniesTable;
