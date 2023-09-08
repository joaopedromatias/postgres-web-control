interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/3 text-center font-mono">
      {children}
    </div>
  )
}
