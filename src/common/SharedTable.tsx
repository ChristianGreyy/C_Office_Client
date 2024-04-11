import { Pagination, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

import { themes } from '@/theme';

interface ITableProps {
  columns: ColumnsType<any>;
  dataSource: any;
  key?: number | string;
  rowKey?: string;
  paginationProps?: PaginationProps;
}

export const SharedTable = ({
  columns,
  dataSource,
  key,
  rowKey,
  paginationProps,
}: ITableProps) => {
  return (
    <StyledTableWrapper $appTheme={themes.theme.light.colors.primary}>
      <Table
        className="mt-3 bg-gray-100 md:ml-3"
        key={key}
        rowKey={rowKey}
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />
      <div className="mt-3 flex justify-end px-[0.5rem]">
        {paginationProps?.total && <Pagination {...paginationProps} />}
      </div>
    </StyledTableWrapper>
  );
};

const StyledTableWrapper = styled.div<{
  $appTheme: string;
}>`
  .ant-pagination-item-active a {
    border-color: ${(p) => p.$appTheme};
  }
  .ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: ${(p) => p.$appTheme};
    a {
      color: ${(p) => p.$appTheme};
    }
  }

  .ant-table-thead > tr > th {
    position: relative;
    color: white;
    font-weight: 500;
    text-align: left;
    background: ${(p) => p.$appTheme};
    border-bottom: 2px solid #f0f0f0;
    transition: background 0.3s ease;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
  .ant-table-tbody > tr > td {
    transition: background 0.3s;
    text-align: left;
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
  }
  .ant-table-wrapper {
    overflow: auto;
    width: 100%;
  }
  .ant-table-wrapper .ant-table {
    width: 100%;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    width: auto;
    white-space: nowrap;
  }
  .ant-table-content > table {
    width: 100%;
    border-left: 2px solid #f0f0f0;
  }
  .ant-table-content {
    margin-right: 1.25rem;
  }

  .ant-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-pagination-prev {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover,
      &:focus-visible {
        .ant-pagination-item-link {
          border-color: ${(p) => p.$appTheme};
          color: ${(p) => p.$appTheme};
        }
      }
    }
    .ant-pagination-next {
      button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover,
      &:focus-visible {
        .ant-pagination-item-link {
          border-color: ${(p) => p.$appTheme};
          color: ${(p) => p.$appTheme};
        }
      }
    }

    .ant-pagination-disabled {
      .ant-pagination-item-link {
        color: rgba(0, 0, 0, 0.25);
        border-color: #d9d9d9;
        cursor: not-allowed;
      }

      &:hover {
        .ant-pagination-item-link {
          color: rgba(0, 0, 0, 0.25);
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }
    }

    .ant-pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-pagination-item:hover {
      border-color: ${(p) => p.$appTheme};
      a {
        color: ${(p) => p.$appTheme};
      }
    }
  }
`;
