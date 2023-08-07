import React from "react"
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'

export type SchoolTable = {
  schoolName: string;
  yoe: number;
  studentCount: number;
  revenue: number;
  marketShare: string;
  isSearchedSchool: boolean;
}

import { ArrowUp, ArrowDown } from 'lucide-react'
import useDotStore from "../store"
import { convertToWord, dashZero, getRevenue } from "../utils"
import percentRound from "../utils/roundPercent"

const SortingIcon = ({ sortType } : { sortType: string })  => {
  if (sortType === "asc") {
    return <ArrowUp className="ml-2 h-4 w-4" />
  }
  if (sortType === "desc") {
    return <ArrowDown className="ml-2 h-4 w-4" />
  }
  return null
}

export const schoolTableColumn: ColumnDef<SchoolTable>[] = [
  {
    accessorKey: 'schoolName',
    header: ({ column }) => { 
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          School Name
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'yoe',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          YOE
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }

  },
  {
    accessorKey: 'studentCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Count
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ cell: { getValue } }) => <span>{dashZero(Number(getValue()))}</span>
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    },
    cell: ({ cell: { getValue } }) => <span>{convertToWord(dashZero(Number(getValue())))}</span>
  },
  {
    accessorKey: 'marketShare',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='w-full flex flex-row justify-center'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Share
          <SortingIcon sortType={column.getIsSorted()} />
        </Button>
      )
    }
  },
]


const columnHelper = createColumnHelper<SchoolTable>()

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
 
function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })
 
  return (
    <div className="border-y">
      <Table className='text-center'>
        <TableHeader className='bg-gray-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell key={cell.id} className={i === 0 ? "text-left" : "text-center"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {console.log(row.getAllCells())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const SchoolTable = () => {
  let schools = useDotStore((state) => state.schools)
  const radius = useDotStore((state) => state.radius)


  
  schools = schools.map((school) => ({
    ...school,
    revenue: getRevenue(school)
  }))

  const marketShare = percentRound(schools.map((school) => school.revenue), 0)

  schools = schools.map((school, index) => ({
    ...school,
    marketShare: marketShare[index]
  }))
  
  return (
  <div className="w-full bg-white mt-3 rounded-md shadow border border-slate-200 relative border-opacity-60 py-5 pb-0">
      <div className="bg-blue-200 rounded-tl-md z-10 py-1 px-2 absolute top-0 left-0">
        <div className="text-black text-opacity-70 text-sm font-bold uppercase leading-tight">School Table</div>
      </div>
      <div className='ml-6 mt-3 mb-3'>
        <span className="text-fuchsia-800 text-base font-bold underline leading-7">{schools.length} Schools</span>
        <span className="text-slate-700 text-base font-medium leading-7">{' '}found in {radius}km radius</span>
      </div>
      <DataTable 
        columns={schoolTableColumn}
        data={schools.map((school) => ({
          schoolName: school.name,
          yoe: school.establishmentYear,
          studentCount: Number(school.studentCount),
          revenue: school.revenue,
          marketShare: school.marketShare + '%',
          isSearchedSchool: school.isSearchedSchool
        }))}
      />
    </div>
  )
}

export default SchoolTable