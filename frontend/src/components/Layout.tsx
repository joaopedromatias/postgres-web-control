interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="font-bold">{children}</div>
}
