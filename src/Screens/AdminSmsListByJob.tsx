import React from "react";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";

export const AppAdminSMSListByScreen: React.FC = () => {
  return (
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
            <h4>SMS List By Corn Job </h4>
        </React.Fragment>
      </PageWrapper>
    </AppAuthProtectedWrapper>
  );
};
