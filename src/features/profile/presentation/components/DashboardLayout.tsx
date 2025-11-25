import React from 'react'

/**
 * Dashboard layout component providing a three-column structure.
 * Used for the profile page to organize sidebar, main content, and right sidebar.
 */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background">
            {children}
        </div>
    )
}
