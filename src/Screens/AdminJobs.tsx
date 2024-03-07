import React, { useCallback, useEffect, useState } from "react";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";
import { useAuthContext } from "../Providers/Auth";
import { jobProps } from "../Interfaces";
import { API } from "../Services";
import { APIURLS } from "../Config";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";

export const AppAdminJobsRootScreen: React.FC = () => {
  const { accessToken } = useAuthContext();
  const [jobs, setjobs] = useState<jobProps[]>([]);
  const [search, setsearch] = useState("");
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const queryString = searchParams.get("searchText");

  const syncJobs = useCallback(() => {
    if (accessToken) {
      API.get(`${APIURLS.jobs.list}${queryString ? queryString : ""}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res: AxiosResponse) => {
          if (
            res.data &&
            res.data.status &&
            res.data.status === 200 &&
            res.data.jobs
          ) {
            setjobs(res.data.jobs);
          }
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    }
  }, [accessToken, queryString]);

  useEffect(() => {
    syncJobs();
  }, [syncJobs]);

  const navigate = useNavigate();
  const SearchFn = () => {
    navigate(`${pathname}?searchText=${search}`);
  };
  return (
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
          <h4>{jobs.length} Corn Jobs </h4>
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-6">
              <input
                type="text"
                value={search}
                className="form-input w-full"
                placeholder="Search any words."
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <button
                onClick={() => SearchFn()}
                className="px-2 py-2 bg-red-600 hover:bg-red-900 text-white "
                type="button"
              >
                Search
              </button>
            </div>
          </div>
          <div className="w-full my-4 relative ">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-white text-gray-800 border border-gray-600">
                      Title
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Created At
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Updated At
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Is Sent
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-600">
                        {row.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {moment(row.createdAt).format("YYYY-MM-DD HH:mm")}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {moment(row.updatedAt).format("YYYY-MM-DD HH:mm")}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {row.isSent ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        <Link
                          to={`/dashbaord-sms-list-by-cron-job/${row._id}`}
                          className="px-4 py-1 bg-blue-500 text-white rounded"
                        >
                          See Detials
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      </PageWrapper>
    </AppAuthProtectedWrapper>
  );
};
