import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { DOTS, LogApp, usePagination } from '@/utils';
import { MAIN_THEME_DATA } from '@/configs';
import { NextIcon, PrevIcon } from '@/components';

export const Pagination = (props: any) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  LogApp(paginationRange, 'paginationRange');
  if (currentPage === 0 || (paginationRange && paginationRange.length < 1)) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  LogApp(paginationRange, 'pagination last page');
  return (
    <StyledPagination
      className="pagination-contain"
      leftDisabled={currentPage === 1}
      rightDisabled={currentPage === paginationRange?.length}
      $mainColor={MAIN_THEME_DATA.mainColor}
    >
      <ul className={classnames('pagination-container', { [className]: className })}>
        <li
          className={classnames('pagination-item  arrow-left', {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <PrevIcon size={18} strokeWidth={1.5} color={currentPage === 1 ? '#d9d9d9' : '#184d63'} />
        </li>
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={classnames('pagination-item  arrow-right', {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <NextIcon
            size={18}
            strokeWidth={1.5}
            color={currentPage === paginationRange?.length ? '#d9d9d9' : '#184d63'}
          />
        </li>
      </ul>
    </StyledPagination>
  );
};
const StyledPagination = styled.div<{
  leftDisabled: boolean;
  rightDisabled: boolean;
  $mainColor: string;
}>`
  .pagination-container {
    display: flex;
    list-style-type: none;
    .pagination-item {
      height: 3.6rem;
      text-align: center;
      margin: auto 4px;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      align-items: center;
      letter-spacing: 0.01071em;
      /* border: 1px solid #184d63; */
      /* border-radius: 16px; */
      line-height: 1.43;
      font-size: 1.3rem;
      min-width: 3.6rem;

      &.dots:hover {
        background-color: transparent;
        cursor: default;
      }
      &:hover {
        cursor: pointer;
      }

      &.selected {
        font-weight: bold;
        color: #f1f5f9;
        background-color: ${(p) => p.$mainColor};
        border-radius: 0.5rem;
        /* border-width: 2px; */
      }

      &.disabled {
        pointer-events: none;

        .arrow::before {
          border-right: 0.12em solid rgba(0, 0, 0, 0.43);
          border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }

        &:hover {
          background-color: transparent;
          cursor: default;
        }
      }
    }
    .arrow-left {
      /* border-color: ${(p) => (p.leftDisabled ? '#d9d9d9' : MAIN_THEME_DATA.mainColor)}; */
    }
    .arrow-right {
      /* border-color: ${(p) => (p.rightDisabled ? '#d9d9d9' : MAIN_THEME_DATA.mainColor)}; */
    }
  }
`;
export default Pagination;
