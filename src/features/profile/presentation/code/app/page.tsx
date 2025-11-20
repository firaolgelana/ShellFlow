import { DashboardLayout } from '@/presentation/components/layout/DashboardLayout'
import { Sidebar } from '@/presentation/components/sidebar/Sidebar'
import { MainContent } from '@/presentation/components/main-content/MainContent'
import { RightSidebar } from '@/presentation/components/right-sidebar/RightSidebar'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Sidebar />
      <MainContent />
      <RightSidebar />
    </DashboardLayout>
  )
}
