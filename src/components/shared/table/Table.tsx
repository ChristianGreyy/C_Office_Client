import { MAIN_THEME_DATA } from '@/configs'
import { selectApp, useAppSelector } from '@/redux'
import { Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import React from 'react'
import styled from 'styled-components'

interface ITableProps {
  columns: ColumnsType<any>
  dataSource: any
  pagination?: false | TablePaginationConfig
  key?: number | string
  rowKey?: string
}

export const SharedTable = ({
  columns,
  dataSource,
  pagination = false,
  key,
  rowKey,
}: ITableProps) => {
  const { tableLoading } = useAppSelector(selectApp)
  return (
    <StyledTableWrapper $appTheme={MAIN_THEME_DATA.mainColor}>
      <Table
        key={key}
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={tableLoading}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />
    </StyledTableWrapper>
  )
}
const StyledTableWrapper = styled.div<{
  $appTheme: string
}>`
  .ant-pagination-item-active a {
    border-color: ${(p) => p.$appTheme};
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: ${(p) => p.$appTheme};
  }
  .ant-table-thead > tr > th {
    position: relative;
    color: white;
    font-weight: 500;
    text-align: center;
    background: ${(p) => p.$appTheme};
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
  }
  .ant-table-tbody > tr > td {
    transition: background 0.3s;
    text-align: center;
  }
`
