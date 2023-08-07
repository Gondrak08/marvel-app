
import AdminProvider from "@/components/AdminLayout"
export default async function PrivateRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <AdminProvider>
            {children} 
        </AdminProvider>
    </>
  )
}
