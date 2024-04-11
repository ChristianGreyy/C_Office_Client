export interface IRoute {
  path?: string
  element?: any
}

export interface ILayout extends IRoute {
  children?: string | JSX.Element | JSX.Element[]
}
