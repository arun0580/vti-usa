export default function AboutAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-4 -mt-6 -mb-8 min-w-0 sm:-mx-6 sm:-mt-8 lg:-mx-8">
      {children}
    </div>
  );
}
