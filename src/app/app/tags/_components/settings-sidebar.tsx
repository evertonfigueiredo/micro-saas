'use client'

import {
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
} from '@/components/dashboard/siderbar'
import { usePathname } from 'next/navigation'

export function SettingsSidebar() {
  const pathName = usePathname()

  const isActive = (path: string) => {
    return pathName === path
  }
  return (
    <aside>
      <DashboardSidebarNav>
        <DashboardSidebarNavMain>
          <DashboardSidebarNavLink
            href="/app/tags"
            active={isActive('/app/tags')}
          >
            Minhas Tags
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/tags/add_tag"
            active={isActive('/app/tags/add_tag')}
          >
            Adicionar Tags
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
