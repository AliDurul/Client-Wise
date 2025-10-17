'use client';
import { capitalize, formatDate } from '@/lib/utility/functions';
import { Customer, Pagination } from '@/types';
import { LuMousePointerClick } from "react-icons/lu";
import Image from 'next/image';
import { DeleteIcon, EditIcon, PreviewIcon } from '@/icons';
import { use, useState } from 'react';
import type { DataTableColumn, DataTableProps } from 'mantine-datatable';
import { DataTable } from 'mantine-datatable';
import SearchInput from '@/components/shared/SearchInput';
import { delMultiCustomer } from '@/lib/features/customer/customerActions';
import { useDataTable } from '@/hooks/useDataTable';
import { delData, delMultiData } from '@/lib/features/shared/actionUtils';
import Dropdown from '@/components/layout/Dropdown';
import { useUrlParams } from '@/hooks/useUrlParams';
import Link from 'next/link';

interface CustomerMainProps {
  customerPromise: Promise<Pagination<Customer>>;
}

export default function CustomerTable({ customerPromise }: CustomerMainProps) {
  const customers = use(customerPromise);
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
  } = useDataTable<Customer>({
    deleteAction: delData,
    deleteMultiAction: delMultiData,
  });


  // Data table 

  const renderActions: DataTableColumn<Customer>['render'] = (record) => (
    <div className="mx-auto flex w-max items-center gap-4">
      <button
        className="flex hover:text-primary"
        onClick={(e) => { handlePreview(`/customers/action/?s=r&id=${record._id}`, e); }}
      >
        <PreviewIcon />
      </button>
      {
        userInfo?.role !== 'admin' && (
          <>
            <button
              className="flex hover:text-info"
              onClick={(e) => { handleEdit(`/customers/action/?s=e&id=${record._id}`, e); }}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="flex hover:text-danger"
              disabled={isPendingSingle}
              onClick={(e) => { handleDelete({ url: 'customers', id: record._id }, e); }}>
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

  const rowExpansion: DataTableProps<Customer>['rowExpansion'] = {
    ...getRowExpansionProps(),
    content: ({ record: { full_name, assigned_agent, address, profile_pic, phone_number } }) => (
      <div className='flex items-center gap-4'>
        <Image
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
          src={profile_pic ? profile_pic : '/assets/images/profile-pic.png'} alt="profile picture" />
        <p>
          {full_name}, phone number is {phone_number} and assigned agent is {assigned_agent}.
          <br />
          His office address is {address?.street}, {address?.city}, {address?.state}.
        </p>
      </div>
    ),
  };

  const columns: DataTableProps<Customer>['columns'] = [
    {
      accessor: 'name',
      title: 'Name',
      sortable: true,
      render: (record) =>
        record.customer_type === 'corporate'
          ? record.company_name
          : `${record.first_name} ${record.last_name}`,
    },
    ...(getParam('ct', 'individual') === 'corporate'
      ? [
        {
          accessor: 'contact_person',
          title: 'Contact Person',
          sortable: true,
        },
        {
          accessor: 'registration_number',
          title: 'Registration No.',
          sortable: true,
        },
      ]
      : [
        {
          accessor: 'dob',
          title: 'Date of Birth',
          render: (record: Customer) => <span>{formatDate(record.dob ?? null)}</span>,
          sortable: true,
        },
      ]),
    {
      accessor: 'email',
      sortable: true,
    },
    {
      accessor: 'address.country',
      title: 'Country',
      sortable: true,
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


  return (
    <div className="pl-1 datatables pagination-padding">
      <div className='flex justify-between items-center md:flex-row md:items-center mb-3'>
        <div className="flex flex-wrap items-center justify-around gap-2 pl-3">
          {
            selectedRecords.length >= 1 &&
            <button
              type="button"
              className="btn btn-danger gap-2"
              onClick={() => handleMultiDelete('customers')} disabled={isPendingMulti}
            >
              <DeleteIcon />
              Delete
            </button>
          }

          <Link
            href={`/customers/action/?s=c`}
            className="btn btn-primary btn-sm  gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New KYC
          </Link>

          <div className="inline-flex">
            <button className="btn btn-sm btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none">{capitalize(getParam('ct', 'Individual'))}</button>
            <div className="dropdown">
              <Dropdown
                placement='bottom-end'
                btnClassName="btn btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                button={<span className="sr-only">Toggle dropdown</span>}
              >
                <ul className="!min-w-[100px]">
                  <li>
                    <button type="button" onClick={() => updateUrlParams({ ct: 'individual' })}>
                      Individual
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => updateUrlParams({ ct: 'corporate' })}>
                      Corporate
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
          {/* <TicketModal ticketModal={ticketModal} setTicketModal={setTicketModal} /> */}
        </div>


        <SearchInput />

      </div>
      <DataTable
        {...getTableProps()}
        rowExpansion={rowExpansion}
        records={customers?.result || []}
        columns={columns}
        totalRecords={customers?.details.totalRecords || 0}
        idAccessor="_id"
      />
    </div>
  )
}

// screen cover loading 
{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
<p className="text-gray-700 dark:text-gray-300 font-medium">Processing...</p>
</div>
</div> */}