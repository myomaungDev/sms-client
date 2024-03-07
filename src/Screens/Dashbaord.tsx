import React from 'react';
import { AppAuthProtectedWrapper } from '../Components/Modules/AppAuthProtectedWrapper';
import { PageWrapper } from '../Components/Modules/PageWrapper';

export const AppDashbaordRootScreen:React.FC =()=>{
    return(
        <AppAuthProtectedWrapper>
            <PageWrapper>
                  <React.Fragment>
                      Dashboard
                  </React.Fragment>
            </PageWrapper>
        </AppAuthProtectedWrapper>
    )
}