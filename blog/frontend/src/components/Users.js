import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { intitializeUsers } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(intitializeUsers());
  }, [dispatch]);

  console.log(users);

  if (!users) {
    return null;
  }

  const rows = users.map((user) => (
    <tr
      className="bg-white dark:bg-neutral-700 cursor-pointer"
      onClick={() => {
        navigate(`/users/${user.id}`);
      }}
      key={user.id}
    >
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.user}
      </th>
      <td className="py-4 px-6">{user.blogs}</td>
    </tr>
  ));

  return (
    <>
      <div className=" flex justify-center w-full mt-8 text-white">
        <h4 className=" container lg:mx-80 text-3xl">Users</h4>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-2xl text-white container w-full mt-20 bg-neutral-600 rounded-md p-4">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-300 dark:text-gray-100 rounded-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    User
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Blogs Created
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
