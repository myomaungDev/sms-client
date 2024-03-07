import React from 'react';
import { AppNavBar } from './AppNav';
interface props {
    children: React.ReactNode
}
export const PageWrapper: React.FC<props> = ({ children }) => {
    return (
        <React.Fragment>
            <div className="w-full bg-slate-100 min-h-screen">
                <AppNavBar />
                <div className="w-full max-w-screen-lg mx-auto px-2 py-2">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}