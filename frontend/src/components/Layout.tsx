interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="text-center font-mono">{children}</div>
}
