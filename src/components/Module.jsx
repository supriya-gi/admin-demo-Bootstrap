import React from "react";

const Module = () => {
  return (
    <>
      {/* <div className="w-full lg:w-12/12 px-4">
        <div
          className="relative justify-center w-full item-center  flex my-4"
          // name="gender"
          onChange={(e) => handleQuery(e)}
          value={querys}
        >
          <div className="flex items-center mr-6  ">
            <input
              id="default-radio-1"
              type="radio"
              value="1"
              // name="gender"
              className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dept.HR with Max salary
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="2"
              name="gender"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dept.IT with Min salary
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-3"
              type="radio"
              value="3"
              // name="gender"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-3"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dept.IT & location is Surat city
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-4"
              type="radio"
              value="4"
              // name="gender"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-4"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dept.IT & city starting from A
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-5"
              type="radio"
              value="5"
              // name="gender"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-5"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dept.Sales & descending order of employee name
            </label>
          </div>
        </div>
      </div> */}
      {/* <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Firstname
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Lastname
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Gender
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Hobbies
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    City
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Salary
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Department
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.fname}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.lname}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.email}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.gender}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.hobbies}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.city}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.salary}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <DropDown data={row} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Module;
