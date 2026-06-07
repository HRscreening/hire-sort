export default function ToolsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-1">{children}</main>;
}
