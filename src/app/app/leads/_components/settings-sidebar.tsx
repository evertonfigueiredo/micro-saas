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
            href="/app/leads"
            active={isActive('/app/leads')}
          >
            Meus Leads
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/leads/add_leads"
            active={isActive('/app/leads/add_leads')}
          >
            Adicionar Leads
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/leads/settings"
            active={isActive('/app/leads/settings')}
          >
            Configurar Leads
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
