import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../Providers/Auth";
import { userProps } from "../Interfaces";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { API } from "../Services";
import { APIURLS } from "../Config";
import { AxiosResponse } from "axios";
import { AppAuthProtectedWrapper } from "../Components/Modules/AppAuthProtectedWrapper";
import { PageWrapper } from "../Components/Modules/PageWrapper";
import moment from "moment";

export const AppAdminUserScreen: React.FC = () => {
  const { accessToken } = useAuthContext();
  const [users, setUsers] = useState<userProps[]>([]);
  const [search, setsearch] = useState("");
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const queryString = searchParams.get("searchText");
  const { jobId } = useParams();
  const syncSMS = useCallback(() => {
    if (accessToken) {
      API.get(
        `${APIURLS.users.list}?searchText=${queryString ? queryString : ""}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((res: AxiosResponse) => {
          if (
            res.data &&
            res.data.status &&
            res.data.status === 200 &&
            res.data.users
          ) {
            setUsers(res.data.users);
          }
        })
        .catch((err: AxiosResponse) => {
          console.log(err);
        });
    }
  }, [accessToken, queryString, jobId]);

  useEffect(() => {
    syncSMS();
  }, [syncSMS]);

  const navigate = useNavigate();
  const SearchFn = () => {
    navigate(`${pathname}?searchText=${search}`);
  };
  return (
    <AppAuthProtectedWrapper>
      <PageWrapper>
        <React.Fragment>
          <h4> {`${users.length} Users`} </h4>
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
                      User Name
                    </th>
                    <th className="px-4 py-2 bg-white text-gray-800 border border-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Created At
                    </th>
                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Updated At
                    </th>

                    <th className="px-4 py-2  bg-white text-gray-800 border border-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-600">
                        {row.username}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {row.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {moment(row.createdAt).format("YYYY-MM-DD HH:mm")}
                      </td>
                      <td className="px-4 py-2 border border-gray-600">
                        {moment(row.updatedAt).format("YYYY-MM-DD HH:mm")}
                      </td>

                      <td className="px-4 py-2 border border-gray-600"></td>
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
