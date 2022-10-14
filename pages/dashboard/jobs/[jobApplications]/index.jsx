import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../FirebaseApp/firebase-config";
import CreateEvent from "../../../../src/Components/Company/CreateEvent";
import CreateInterview from "../../../../src/Components/Company/CreateInterview";
import JobDetails from "../../../../src/Components/Company/JobDetails";
import ViewApplicantData from "../../../../src/Components/Company/ViewApplicantData";
import { userAuthDetail } from "../../../_app";

const JobApplications = () => {
  const router = useRouter();
  const { jobApplications } = router.query;
  const userAuthDetailContext = useContext(userAuthDetail);

  const [applications, setApplications] = useState(null);
  const [ApplicantData, setApplicantData] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [isInterviewModalOpen, setInterviewIsModalOpen] = useState(false);
  const [isViewModalOpen, setViewIsModalOpen] = useState(false);
  useEffect(() => {
    console.log(jobApplications);
    getJobApplications();
    getJobDescription();
    return () => {};
  }, [jobApplications]);
  // console.log(applications.length === 0);
  const getJobDescription = async () => {
    try {
      const { jobApplications } = await router.query;
      if (jobApplications != undefined) {
        const eventRef = await doc(db, "jobEvents", jobApplications);
        const jobSnap = await getDoc(eventRef);
        const jobDescription = await jobSnap.data();
        setJobDesc(jobDescription);
        return jobDescription;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const getJobApplications = async () => {
    const { jobApplications } = await router.query;

    try {
      if (jobApplications) {
        const path = await `/jobEvents/${jobApplications}/jobApplications`;
        const collectionRef = await collection(db, path);
        const applicationsSnapshot = await getDocs(collectionRef);
        const applicationData = await applicationsSnapshot.docs;
        const data = [];
        await applicationData?.forEach((doc) => {
          console.log(1);
          data?.push(doc?.data());
        });
        setApplications(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setInterviewIsModalOpen(false);
  };
  const closeViewModal = () => {
    setViewIsModalOpen(false);
  };
  console.log(jobDesc, "jobDesc");
  console.log(applications, "applications");
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
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
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
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      filters: [
        {
          text: "KU",
          value: "Karachi University",
        },
        {
          text: "IU",
          value: "Iqra University",
        },
        {
          text: "IBA",
          value: "IBA",
        },
        {
          text: "LUMS",
          value: "LUMS",
        },
        {
          text: "FAST",
          value: "Fast",
        },
        {
          text: "FUUAST",
          value: "Fuuast",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.university?.indexOf(value) === 0,
      sorter: (a, b) => a?.university?.length - b?.university?.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      filters: [
        {
          text: "BSSE",
          value: "BSSE",
        },
        {
          text: "Engineering",
          value: "Engineering",
        },
        {
          text: "BSCS",
          value: "BSCS",
        },
        {
          text: "BBA",
          value: "BBA",
        },
        {
          text: "B.Com",
          value: "B.Com",
        },
        {
          text: "BA",
          value: "BA",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.degree?.indexOf(value) === 0,
      sorter: (a, b) => a?.degree?.length - b?.degree?.length,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
    {
      title: "CGPA",
      dataIndex: "CGPA",
      key: "CGPA",
      filters: [
        {
          text: "2",
          value: "2",
        },
        {
          text: "2.5",
          value: "2.5",
        },
        {
          text: "3",
          value: "3",
        },
        {
          text: "3.5",
          value: "3.5",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record?.CGPA >= parseFloat(value) + 0.5,
      sorter: (a, b) => a?.CGPA - b?.CGPA,
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "descend",
    },
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
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (_, { resume }) => {
        return (
          resume && (
            <Button
              href={resume}
              icon={<DownloadOutlined />}
              className="text-center "
            >
              Resume
            </Button>
          )
        );
      },
    },
    {
      title: "Action",
      width: 250,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              if (userAuthDetailContext.profileData?.role !== "Admin") {
                setApplicantData(record);
                setInterviewIsModalOpen(true);
              } else {
                message.warn("Admin Can't Schedule Interviews");
              }
            }}
          >
            Schedule Interview
          </a>
          <a
            onClick={(e) => {
              setApplicantData(record);
              setViewIsModalOpen(true);
            }}
          >
            View Profile
          </a>
        </Space>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <div className="flex gap-3 flex-wrap min-w-full justify-center  ">
        {jobDesc !== null ? (
          jobDesc !== undefined ? (
            <JobDetails data={jobDesc} />
          ) : (
            <div className="flex flex-col items-center justify-center my-5">
              Job Doesn&apos;t Exist Anymore!
              <div className="self-center">
                <InboxOutlined className="text-3xl" />
              </div>
            </div>
          )
        ) : (
          "loading..."
        )}
      </div>
      <Modal
        // footer={null}
        open={isInterviewModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={closeModal}
      >
        <CreateInterview
          student={ApplicantData}
          company={jobDesc}
          closeModal={closeModal}
        ></CreateInterview>
      </Modal>
      <Modal
        title="Applicants Data"
        // footer={null}
        open={isViewModalOpen}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={closeViewModal}
      >
        <ViewApplicantData student={ApplicantData} />
      </Modal>
      {applications ? (
        <div>
          <Table
            scroll={{ x: 1550, y: 300 }}
            columns={adminColumns}
            dataSource={applications}
            onChange={onChange}
            locale={{
              emptyText: (
                <span>
                  No Applicants Found <br />
                  <InboxOutlined className="text-3xl" />
                </span>
              ),
            }}
          />
        </div>
      ) : (
        <div className="text-center mt-8">
          <Button type="primary" loading={true}>
            Loading...
          </Button>
        </div>
      )}
    </>
  );
};

export default JobApplications;
