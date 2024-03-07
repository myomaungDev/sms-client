import React from "react";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";

export const AppAdminUserScreen: React.FC = () => {
  return (
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment> 
           <h4>Admin Users </h4>
        </React.Fragment>
      </PageWrapper>
    </AppAuthProtectedWrapper>
  );
};
