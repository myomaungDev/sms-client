import React from "react";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";

export const AppAdminJobsRootScreen: React.FC = () => {
  return (
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
          <h4>Corn Jobs </h4>
        </React.Fragment>
      </PageWrapper>
    </AppAuthProtectedWrapper>
  );
};
