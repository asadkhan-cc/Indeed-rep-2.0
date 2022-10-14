import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Tooltip } from "antd";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../../FirebaseApp/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { message } from "antd";
import Link from "next/link";
const AdminProfilePage = () => {
  const [profilesData, setProfilesData] = useState(null);
  const [user, setUser] = useState(null);
  const [reRender, setReRender] = useState(0);
  const callReRender = () => {
    setReRender((prev) => {
      return prev + 1;
    });
  };
  const gettingCollectionFromFireStore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const queryData = await querySnapshot.docs;
      const arrQueryData = [];
      const arr = await queryData.map((e) => {
        arrQueryData.push(e.data());
      });
      return arrQueryData;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    gettingCollectionFromFireStore()
      .then((res) => {
        // const data = filterProfileData(res);
        console.log(res.length);

        const data = res.filter((elem) => {
          if (elem?.role == "admin" || elem?.role == "Admin") {
            return;
          } else {
            return elem;
          }
        });
        console.log(data.length);
        setProfilesData(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, [reRender]);

  onAuthStateChanged(auth, (status) => {
    if (user !== status) {
      setUser(status);
    }
  });
  const filterProfileData = (param) => {
    const filteredData = param?.map((elem) => {
      console.log(elem);
      if (elem?.role == "admin" || elem?.role == "Admin") {
      } else {
        return elem;
      }
    });
    return filteredData;
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const adminColumns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <>{text}</>,
      sorter: (a, b) => a?.userName?.length - b?.userName?.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Mobile",
    //   dataIndex: "mobileNumber",
    //   key: "mobileNumber",
    // },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      filters: [
        {
          text: "Karachi",
          value: "Karachi",
        },
        {
          text: "Hyderabad",
          value: "Hyderabad",
        },
        {
          text: "Lahore",
          value: "Lahore",
        },
        {
          text: "Islamabad",
          value: "Islamabad",
        },
        {
          text: "Quetta",
          value: "Quetta",
        },
        {
          text: "Peshawar",
          value: "Peshawar",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.city?.indexOf(value) === 0,
      sorter: (a, b) => a?.city?.length - b?.city?.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    // {
    //   title: "Resume",
    //   dataIndex: "resume",
    //   key: "resume",
    //   render: (_, { resume }) => {
    //     return resume && <a href={resume}>Download Resume</a>;
    //   },
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Profile Status",
      key: "isActive",
      dataIndex: "isActive",

      render: (_, { isActive }) => {
        return (
          <>
            {
              <Tag
                color={
                  isActive == null || isActive == undefined
                    ? "yellow"
                    : isActive == true
                    ? "green"
                    : "red"
                }
                key={Math.floor(Math.random() * 100) + 1}
              >
                {isActive == null || isActive == undefined
                  ? "Pending.."
                  : isActive == true
                  ? "Active"
                  : "InActive"}
              </Tag>
            }
          </>
        );
      },
      filters: [
        {
          text: "Pending",
          value: null,
        },
        {
          text: "Active",
          value: true,
        },
        {
          text: "InActive",
          value: false,
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.isActive === value,
      sorter: (a, b) => a?.isActive?.length - b?.isActive?.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "role",
      key: "role",
      dataIndex: "role",
      render: (_, { role }) => (
        <>
          {role !== undefined && (
            <Tag
              color={role == "Company" ? "green" : "blue"}
              key={Math.floor(Math.random() * 100) + 1}
            >
              {role?.toUpperCase()}
            </Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Company",
          value: "Company",
        },
        {
          text: "User",
          value: "User",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.role.indexOf(value) === 0,
      sorter: (a, b) => a?.role.length - b?.role.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Action",
      fixed: "right sm:none",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              activate(record);
            }}
          >
            Activate
          </a>
          <a
            onClick={(e) => {
              deactivate(record);
            }}
          >
            deactivate
          </a>
          <Link
            href={`/profile/edit/${record.email}?${Object.keys(record)
              .map((key) => {
                return `${key}=${encodeURIComponent(record[key])}`;
              })
              .join("&")}`}
          >
            Edit profile
          </Link>
        </Space>
      ),
    },
  ];

  const activate = async (profile) => {
    if (profile.isActive !== true) {
      message.info("Processing");

      try {
        await setDoc(
          doc(db, "users", profile.email),
          { isActive: true },
          { merge: true }
        );
        console.log("Document updated with ID: ", profile.email.toLowerCase());
        callReRender();
        message.success("Profile Successfully Activated !");
      } catch (e) {
        console.error("Error updating document: ", e);
        message.error("Error updating Profile !");
      }
    } else {
      message.warn("Profile Already Active !");
    }
  };
  const deactivate = async (profile) => {
    if (profile.isActive !== false) {
      message.info("Processing...");
      try {
        await setDoc(
          doc(db, "users", profile.email),
          { isActive: false },
          { merge: true }
        );
        console.log("Document updated with ID: ", profile.email);
        callReRender();
        message.success("Profile Successfully Deactivated !");
      } catch (e) {
        console.error("Error updating document: ", e);
        message.error("Error updating Profile !");
      }
    } else {
      message.warn("Profile Already Deactivated !");
    }
  };

  // console.log(user, "user object");
  return (
    <>
      <div className="top-3">
        {profilesData == null ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1 className="text-2xl text-teal-800 text-center font-bold ">
              Welcome Admin
            </h1>
            <Table
              scroll={{ x: 1500, y: 800 }}
              columns={adminColumns}
              dataSource={profilesData}
              onChange={onChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AdminProfilePage;
