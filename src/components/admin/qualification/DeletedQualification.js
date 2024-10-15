import React,{useState,useEffect} from "react";
import { Table,Space,Button,message } from "antd";
import { getDeletedQualification, restoreAdminQualification } from "../../../actions/admin/adminInstructor/adminInstructor";
import { useDispatch } from "react-redux";

const DeletedQualification = (props) => {
  const { id } = props;
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getDeletedQualification(id));
        setData(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  console.log(data);

  const handleRestore = (id) => {
    console.log(`Qualification ${id} is clicked for restore`);
    dispatch(restoreAdminQualification(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    {
      title: "Document",
      dataIndex: "documentPath",
      key: "documentPath",
      className: "font-poppins",
      render: (text, record) => (
        <div>
          <img
            src={record.documentPath}
            alt={record.documentOriginalName}
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />

          {!record.documentPath && (
            <img
              // src={avtar}
              alt="Document"
              style={{ maxWidth: "50px", maxHeight: "50px" }}
            />
          )}
        </div>
      ),
    },

    {
      title: "Course Type",
      dataIndex: "courseType",
      key: "courseType",
      className: "font-poppins",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      className: "font-poppins",
    },
    {
      title: "University / Institute",
      dataIndex: "university_institute_name",
      key: "university_institute_name",
      className: "font-poppins",
    },

    {
      title: "Certification Number",
      dataIndex: "certificationNumber",
      key: "certificationNumber",
      className: "font-poppins",
    },
    {
      title: "Format",
      dataIndex: "marksType",
      key: "marksType",
      className: "font-poppins",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
      className: "font-poppins",
    },
    {
      title: "Status",
      dataIndex: "approvalStatusByAdmin",
      key: "approvalStatusByAdmin",
      className: "font-poppins",
      render: (text) => (
        <span
          style={{
            color:
              text === "pending"
                ? "red"
                : text === "approved"
                ? "green"
                : "red",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Button
            className="font-poppins"
            onClick={() => handleRestore(record.id)}
          >
            Restore
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <Table dataSource={data} columns={columns} loading={loading} />
    </div>
  );
};

export default DeletedQualification;
