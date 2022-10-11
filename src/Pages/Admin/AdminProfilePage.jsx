import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../FirebaseApp/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { Button, message } from "antd";
import UpdateCompanyProfile from "../../Components/Company/UpdateCompanyProfile";
import UpdateUserProfile from "../../Components/User/UpdateUserProfile";

const AdminProfilePage = () => {
  const [profilesData, setProfilesData] = useState(null);
  const [user, setUser] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <>{text}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
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
        console.log(
          _,
          "________________________________________________________________"
        );
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

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
        setProfilesData(res);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);
  onAuthStateChanged(auth, (status) => {
    if (user !== status) {
      setUser(status);
    }
  });
  console.log(profilesData);
  // console.log(user, "user object");
  return (
    <>
      {"hello from the other Side"}
      <div className="top-3">
        {profilesData == null ? (
          <div>loading</div>
        ) : (
          <>
            {profilesData?.map((elem, index) => {
              return (
                <div key={index}>
                  <h1 className="  ">{elem?.userName}</h1>
                  <h1>{elem?.email}</h1>
                </div>
              );
            })}
            <Table columns={columns} dataSource={profilesData} />
          </>
        )}
      </div>
    </>
  );
};

export default AdminProfilePage;
