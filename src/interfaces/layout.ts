export interface IInnerAppProps {
  children?: string | JSX.Element | JSX.Element[];
  sidebar?: boolean;
  breadcrumbs?: boolean;
}

export interface IBreadcrumbItem {
  label: string;
  path: string;
}
