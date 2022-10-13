import { ReloadOutlined } from "@ant-design/icons";
import { Button, message, Space, Tag, Tooltip } from "antd";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../../FirebaseApp/firebase-config";

export const adminColumns = [
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
    onFilter: (value, record) => record.city.indexOf(value) === 0,
    sorter: (a, b) => a.city.length - b.city.length,
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
    onFilter: (value, record) => record.role.indexOf(value) === 0,
    sorter: (a, b) => a.role.length - b.role.length,
    sortDirections: ["descend", "ascend"],
    defaultSortOrder: "descend",
  },
  {
    title: (
      <>
        <div className="relative">
          {"Action"}
          <span className="absolute right-1 w-5 ml-auto mr-2">
            <Tooltip title="Reload">
              <Button
                type="primary"
                shape="circle"
                icon={<ReloadOutlined />}
              ></Button>
            </Tooltip>
          </span>
        </div>
      </>
    ),
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
        <Link href="">Edit profile</Link>
      </Space>
    ),
  },
];
const activate = async (profile) => {
  if (profile.isActive !== true) {
    try {
      await setDoc(
        doc(db, "users", profile.email),
        { isActive: true },
        { merge: true }
      );
      console.log("Document updated with ID: ", profile.email);
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
    try {
      await setDoc(
        doc(db, "users", profile.email),
        { isActive: false },
        { merge: true }
      );
      console.log("Document updated with ID: ", profile.email);
      message.success("Profile Successfully Deactivated !");
    } catch (e) {
      console.error("Error updating document: ", e);
      message.error("Error updating Profile !");
    }
  } else {
    message.warn("Profile Already Deactivated !");
  }
};
