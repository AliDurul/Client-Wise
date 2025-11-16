'use client';
import { formatDate, truncateText } from '@/lib/utility/functions';
import { Lead, Pagination } from '@/types';
import { LuMousePointerClick } from "react-icons/lu";
import { DeleteIcon, EditIcon, PreviewIcon } from '@/icons';
import { useMemo } from 'react';
import type { DataTableColumn, DataTableProps } from 'mantine-datatable';
import { DataTable } from 'mantine-datatable';
import SearchInput from '@/components/shared/SearchInput';
import { useDataTable } from '@/hooks/useDataTable';
import { delData, delMultiData } from '@/lib/features/shared/actionUtils';
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
      {/* <button
        className="flex hover:text-primary"
        onClick={(e) => { handlePreview(`/leads/action/?s=r&id=${record._id}`, e); }}
      >
        <PreviewIcon />
      </button> */}
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
      render: ({ company_name }: Lead) => company_name ?? '-',
      sortable: true,
    },
    {
      accessor: 'person_name',
      title: 'Person Name',
      render: ({ person_name }: Lead) => person_name ?? '-',
      sortable: true,
    },
    {
      accessor: 'email',
      title: 'Email',
      render: ({ email }: Lead) => email ?? '-',
      sortable: true,
    },
    {
      accessor: 'mobile_number',
      title: 'Mobile',
      render: ({ mobile_number }: Lead) => mobile_number ?? '-',
      sortable: true,
    },
    {
      accessor: 'lead_source',
      title: 'Source',
      render: ({ lead_source }: Lead) => lead_source ?? '-',
      sortable: true,
    },
    // {
    //   accessor: 'product',
    //   title: 'Product',
    //   render: ({ product }: Lead) => product ?? '-',
    //   sortable: true,
    // },
    {
      accessor: 'status',
      title: 'Status',
      render: ({ status }: Lead) => {
        let colorClass = 'badge-outline-info';
        if (status === 'Closed-Won') colorClass = 'badge-outline-success';
        else if (status === 'Closed-Lost') colorClass = 'badge-outline-danger';
        else if (status === 'In Progress') colorClass = 'badge-outline-warning';
        else if (status === 'Open') colorClass = 'badge-outline-info';

        return (
          <span className={`badge ${colorClass} cursor-pointer`}>{status}</span>
        );
      },
      sortable: true,
    },

    {
      accessor: 'deal_value',
      title: 'Deal Value',
      render: ({ deal_value }: Lead) => deal_value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? '-',
      sortable: true,
    },
    {
      accessor: 'expected_revenue',
      title: 'Expected Revenue',
      render: ({ expected_revenue }: Lead) => expected_revenue?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) ?? '-',
      sortable: true,
    },
    {
      accessor: 'pipeline_stage',
      title: 'Stage',
      render: ({ pipeline_stage }: Lead) => {
        let colorClass = 'bg-primary';
        if (pipeline_stage === 'Proposal|Quotation') colorClass = 'bg-info';
        else if (pipeline_stage === 'Negotiation' || pipeline_stage === 'Pending Approval') colorClass = 'bg-warning';
        else if (pipeline_stage === 'Closed-Won') colorClass = 'bg-success';
        else if (pipeline_stage === 'Closed-Lost') colorClass = 'bg-danger';

        return (
          <span className={`badge ${colorClass}`}>{pipeline_stage}</span>
        );
      },
      sortable: true,
    },
    {
      accessor: 'follow_up_date',
      title: 'Follow Up',
      render: ({ follow_up_date }: Lead) => follow_up_date ? formatDate(follow_up_date) : '-',
      sortable: true,
    },
    {
      accessor: 'close_date',
      title: 'Close Date',
      render: ({ close_date }: Lead) =>
        close_date ? formatDate(close_date) : '-',
      sortable: true,
    },
    {
      accessor: 'location',
      title: 'Location',
      render: ({ location }: Lead) =>
        location
          ? `${truncateText(`${location.province ?? ''} ${location.town ?? ''} ${location.address ?? ''}`, 20)}`.trim()
          : '-',
      sortable: false,
    },
    {
      accessor: 'converted_to_invoice',
      title: 'Converted',
      render: ({ converted_to_invoice }: Lead) => (<span className={`${converted_to_invoice ? 'text-success' : 'text-danger'}`}>{converted_to_invoice ? 'Yes' : 'No'}</span>),
      sortable: true,
    },
    {
      accessor: 'probability',
      title: 'Probability',
      render: ({ probability }: Lead) => {
        const raw = Number(probability ?? 0);
        const value = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;
        let bgColor = 'bg-danger';
        if (value > 75) bgColor = 'bg-success';
        else if (value > 50) bgColor = 'bg-primary';
        else if (value > 25) bgColor = 'bg-warning';

        return (
          <div className='w-48'>
            <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full">
              <div
                className={`${bgColor} h-4 rounded-full flex items-center justify-center overflow-hidden text-white`}
                style={{ width: `${value}%`, fontSize: value > 20 ? 11 : 10 }}
              >
                {value}%
              </div>
            </div>
          </div>
        );
      },
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

  const columnChooserCols = allColumns
    .filter(col => col.accessor !== 'actions')
    .map(col => ({ accessor: col.accessor as string, title: typeof col.title === 'string' ? col.title : 'Actions' }));

  return (
    <div className="panel mt-5  border-white-light dark:border-[#1b2e4b]">
      <div className="pl-1 datatables pagination-padding">


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
            <ColumnChooser cols={columnChooserCols} />
          </div>

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
