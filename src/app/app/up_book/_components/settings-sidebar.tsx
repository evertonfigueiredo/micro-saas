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
            href="/app/up_book"
            active={isActive('/app/up_book')}
          >
            Upload de E-book
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/up_book/my_books"
            active={isActive('/app/up_book/my_books')}
          >
            Meus E-books
          </DashboardSidebarNavLink>
          <DashboardSidebarNavLink
            href="/app/up_book/send_book"
            active={isActive('/app/up_book/send_book')}
          >
            Enviar E-book
          </DashboardSidebarNavLink>
        </DashboardSidebarNavMain>
      </DashboardSidebarNav>
    </aside>
  )
}
