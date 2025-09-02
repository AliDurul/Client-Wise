'use client';
import { capitalize, formatDate } from '@/lib/utility/functions';
import { Customer, Lead, Pagination } from '@/types';
import { LuMousePointerClick } from "react-icons/lu";
import Image from 'next/image';
import { DeleteIcon, EditIcon, PreviewIcon } from '@/icons';
import { use, useState, useMemo } from 'react';
import type { DataTableColumn, DataTableProps } from 'mantine-datatable';
import { DataTable } from 'mantine-datatable';
import SearchInput from '@/components/shared/SearchInput';
import { delMultiCustomer } from '@/lib/features/customer/customerActions';
import { useDataTable } from '@/hooks/useDataTable';
import { delData, delMultiData } from '@/lib/features/shared/actionUtils';
import Dropdown from '@/components/layout/Dropdown';
import { useUrlParams } from '@/hooks/useUrlParams';
import ColumnChooser from '@/components/shared/ColumnChooser';

interface CustomerMainProps {
  leads: Pagination<Lead>
}

export default function LeadTable({ leads }: CustomerMainProps) {
  const { getParam, updateUrlParams } = useUrlParams()

  const {
    selectedRecords,
    userInfo,
    isPendingSingle,
    deletingId,
    isPendingMulti,
    handleEdit,
    handlePreview,
    handleDelete,
    handleMultiDelete,
    getTableProps,
    getRowExpansionProps,
    hiddenColumns,
  } = useDataTable<Lead>({
    deleteAction: delData,
    deleteMultiAction: delMultiData,
  });


  // Data table 

  const renderActions: DataTableColumn<Lead>['render'] = (record) => (
    <div className="mx-auto flex w-max items-center gap-4">
      <button
        className="flex hover:text-primary"
        onClick={(e) => { handlePreview(`/leads/action/?s=r&id=${record._id}`, e); }}
      >
        <PreviewIcon />
      </button>
      {
        userInfo?.role !== 'admin' && (
          <>
            <button
              className="flex hover:text-info"
              onClick={(e) => { handleEdit(`/leads/action/?s=e&id=${record._id}`, e); }}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="flex hover:text-danger"
              disabled={isPendingSingle}
              onClick={(e) => { handleDelete({ url: 'leads', id: record._id }, e); }}>
              {
                deletingId === record._id
                  ? <div className="animate-spin rounded-full size-5 border-b-2 border-red-500" />
                  : <DeleteIcon />
              }
            </button>
          </>
        )
      }
    </div>
  );

  // const rowExpansion: DataTableProps<Lead>['rowExpansion'] = {
  //   ...getRowExpansionProps(),
  //   content: ({ record: { full_name, assigned_agent, address, profile_pic, phone_number } }) => (
  //     <div className='flex items-center gap-4'>
  //       <Image
  //         width={32}
  //         height={32}
  //         className="h-8 w-8 rounded-full object-cover"
  //         src={profile_pic ? profile_pic : '/assets/images/profile-pic.png'} alt="profile picture" />
  //       <p>
  //         {full_name}, phone number is {phone_number} and assigned agent is {assigned_agent}.
  //         <br />
  //         His office address is {address?.street}, {address?.city}, {address?.state}.
  //       </p>
  //     </div>
  //   ),
  // };

  const allColumns: DataTableProps<Lead>['columns'] = [
    {
      accessor: 'company_name',
      title: 'Company Name',
      render: (record: Lead) => record.company_name ?? '-',
      sortable: true,
    },
    {
      accessor: 'person_name',
      title: 'Person Name',
      render: (record: Lead) => record.person_name ?? '-',
      sortable: true,
    },
    {
      accessor: 'email',
      title: 'Email',
      render: (record: Lead) => record.email ?? '-',
      sortable: true,
    },
    {
      accessor: 'mobile_number',
      title: 'Mobile',
      render: (record: Lead) => record.mobile_number ?? '-',
      sortable: true,
    },
    {
      accessor: 'lead_source',
      title: 'Source',
      render: (record: Lead) => record.lead_source ?? '-',
      sortable: true,
    },
    {
      accessor: 'product',
      title: 'Product',
      render: (record: Lead) => record.product ?? '-',
      sortable: true,
    },
    {
      accessor: 'pipeline_stage',
      title: 'Stage',
      render: (record: Lead) => record.pipeline_stage ?? '-',
      sortable: true,
    },
    {
      accessor: 'deal_value',
      title: 'Deal Value',
      render: (record: Lead) => record.deal_value?.toLocaleString() ?? '-',
      sortable: true,
    },
    {
      accessor: 'expected_revenue',
      title: 'Expected Revenue',
      render: (record: Lead) => record.expected_revenue?.toLocaleString() ?? '-',
      sortable: true,
    },
    {
      accessor: 'follow_up_date',
      title: 'Follow Up',
      render: (record: Lead) =>
        record.follow_up_date ? new Date(record.follow_up_date).toLocaleDateString() : '-',
      sortable: true,
    },
    {
      accessor: 'close_date',
      title: 'Close Date',
      render: (record: Lead) =>
        record.close_date ? new Date(record.close_date).toLocaleDateString() : '-',
      sortable: true,
    },
    {
      accessor: 'location',
      title: 'Location',
      render: (record: Lead) =>
        record.location
          ? `${record.location.province ?? ''} ${record.location.town ?? ''} ${record.location.address ?? ''}`.trim()
          : '-',
      sortable: false,
    },
    {
      accessor: 'converted_to_invoice',
      title: 'Converted',
      render: (record: Lead) => (record.converted_to_invoice ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      accessor: 'status',
      title: 'Status',
      render: (record: Lead) => record.status ?? '-',
      sortable: true,
    },
    {
      accessor: 'probability',
      title: 'Probability',
      render: (record: Lead) => record.probability != null ? `${record.probability}%` : '-',
      sortable: true,
      hidden: hiddenColumns.includes('probability')
    },
    {
      accessor: 'actions',
      title: (
        <div className="flex items-center justify-center">
          <LuMousePointerClick />
        </div>
      ),
      width: '0%',
      render: renderActions,
    },
  ];

  const columns = useMemo(() => allColumns.filter(col => !hiddenColumns.includes(col.accessor as string)),
    [hiddenColumns]);

  console.log(columns);
  const columnChooserCols = allColumns
    .filter(col => col.accessor !== 'actions')
    .map(col => ({ accessor: col.accessor as string, title: typeof col.title === 'string' ? col.title : 'Actions' }));
  console.log(columnChooserCols);

  return (
    <div className="panel mt-5  border-white-light dark:border-[#1b2e4b]">
      <div className="pl-1 datatables pagination-padding">
        {/* Loading Overlay */}
        {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
          <p className="text-gray-700 dark:text-gray-300 font-medium">Processing...</p>
        </div>
      </div> */}


        <div className='flex justify-between items-center md:flex-row md:items-center mb-3'>
          <div className="flex flex-wrap items-center justify-around gap-2 pl-3">
            {
              selectedRecords.length >= 1 &&
              <button
                type="button"
                className="btn btn-danger gap-2"
                onClick={() => handleMultiDelete('leads')} disabled={isPendingMulti}
              >
                <DeleteIcon />
                Delete
              </button>
            }
          </div>
          <ColumnChooser cols={columnChooserCols} />

          <SearchInput />
        </div>
        <DataTable
          {...getTableProps()}
          // rowExpansion={rowExpansion}
          records={leads?.result || []}
          columns={columns}
          totalRecords={leads?.details.totalRecords || 0}
          idAccessor="_id"
        />
      </div>
    </div>
  )
}
