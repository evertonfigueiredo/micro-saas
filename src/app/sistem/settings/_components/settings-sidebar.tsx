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
            href="/sistem/settings"
            active={isActive('/sistem/settings')}
          >
            Meu Perfil
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/sistem/settings/theme"
            active={isActive('/sistem/settings/theme')}
          >
            Aparência
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/sistem/settings/billing"
            active={isActive('/sistem/settings/billing')}
          >
            Assinatura
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
