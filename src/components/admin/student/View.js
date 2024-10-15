import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Select,
  Input,
  DatePicker,
  message,
  Tooltip,
  Modal,
  Form,
} from "antd";
import {
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  assignCourse,
  deleteStudent,
  getAdminStudent,
} from "../../../actions/admin/adminStudent/adminStudent";
import { getAdminCourse } from "../../../actions/admin/course/course";
import { useDispatch } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;

const View = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [numPeopleFilter, setNumPeopleFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [course, setCourse] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAdminStudent());
        setData(result.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAssign = (id) => {
    setSelectedStudentId(id); // Set the selected student id
    setModalVisible(true); // Open the modal
  };

  const handleAssignCourse = (id) => {
    if (!selectedStudentId) return; // No student selected, exit
    // Dispatch action to update the course for the student
    const data = { studentId: selectedStudentId, id };
    console.log(data)
    dispatch(assignCourse(data)).then((res) => {
      if (res.success) {
        message.success(res.message);

        setModalVisible(false); // Close the modal after successful assignment
      } else {
        message.error("Failed to assign course.");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getAdminCourse("Approved"));
        setCourse(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: "Sno",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      className: "font-poppins",
    },
    // {
    //   title: "Profile Image",
    //   dataIndex: "profileImage",
    //   key: "profileImage",
    //   className: "font-poppins",
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-poppins",
      render: (text, record) => (
        <Link to={`/profile/student/${record.id}`}>{text}</Link>
      ),

      onFilter: (value, record) => {
        if (value === "az") {
          return record.name;
        } else if (value === "za") {
          return -record.name;
        }
        return null;
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "font-poppins",
      onFilter: (value, record) => {
        if (value === "az") {
          return record.email;
        } else if (value === "za") {
          return -record.email;
        }
        return null;
      },
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      className: "font-poppins",
      onFilter: (value, record) => {
        const numericMobileNumber = parseInt(record.phoneNumber, 10);
        if (value === "09") {
          return numericMobileNumber >= 0 && numericMobileNumber <= 9;
        } else if (value === "90") {
          return numericMobileNumber >= 9 && numericMobileNumber <= 0;
        }
        return null;
      },
      sorter: (a, b) =>
        parseInt(a.phoneNumber, 10) - parseInt(b.phoneNumber, 10),
    },
    // {
    //   title: "Course",
    //   dataIndex: "course",
    //   key: "course",
    //   className: "font-poppins",
    //   onFilter: (value, record) => {
    //     return record.course.toLowerCase().includes(value.toLowerCase());
    //   },
    //   filters:
    //     filterType === "course"
    //       ? [
    //           { text: "Yoga", value: "Yoga" },
    //           { text: "Meditation", value: "Meditation" },
    //           // Add more course options as needed
    //         ]
    //       : null,
    //   filteredValue: filterType === "course" ? [searchValue] : null,
    // },
    // {
    //   title: "Instructor",
    //   dataIndex: "instructor",
    //   key: "instructor",
    //   className: "font-poppins",
    //   onFilter: (value, record) => {
    //     return record.instructor.toLowerCase().includes(value.toLowerCase());
    //   },
    //   filters:
    //     filterType === "instructor"
    //       ? [
    //           { text: "Rahul", value: "Rahul" },
    //           { text: "Shivani", value: "Shivani" },
    //           // Add more instructor options as needed
    //         ]
    //       : null,
    //   filteredValue: filterType === "instructor" ? [searchValue] : null,
    // },

    {
      title: "Action",
      key: "action",
      className: "font-poppins",
      render: (text, record) => (
        <Space>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => handleEdit(record)}
              className="text-green-800 text-lg cursor-pointer"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <DeleteOutlined
              onClick={() => handleDelete(record.id)}
              className="text-red-500 text-lg cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Assign Course">
            <AccountBookOutlined
              onClick={() => handleAssign(record.id)}
              className="text-orange-500 text-lg cursor-pointer"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { id } = values; // Extract courseId from form values
        console.log(id)
        handleAssignCourse(id);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleDelete = (id) => {
    console.log(`Student ${id} is clicked as delete`);
    dispatch(deleteStudent(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleEdit = (record) => {
    console.log("edit clicked for record:", record);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleNumPeopleFilterChange = (value) => {
    setNumPeopleFilter(value);
  };

  const handleDateFilterChange = (dates) => {
    setDateRange(dates);
  };

  const clearFilters = () => {
    setFilterType(null);
    setSearchValue("");
    setNumPeopleFilter(null);
    setDateRange(null);
  };

  useEffect(() => {
    if (pdf) {
      pdf.save("exportedData.pdf");
    }
  }, [pdf]);

  const handleExportPdf = () => {
    const doc = new jsPDF();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const tableOptions = {
      headStyles: {
        fillColor: [75, 92, 110],
        textColor: 255,
      },
      styles: {
        cellPadding: 2,
        fontSize: 10,
      },
    };

    const exportData = data
      .filter((record) => {
        if (searchValue && filterType && filterType !== "date") {
          return record[filterType]
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
        return true;
      })
      .filter((record) => {
        if (dateRange && filterType === "date") {
          const recordDate = new Date(record.date);
          return (
            recordDate >= dateRange[0].startOf("day") &&
            recordDate <= dateRange[1].endOf("day")
          );
        }
        return true;
      })
      .map((record) => {
        return {
          Name: record.name,
          Email: record.email,
          "Mobile Number": record.mobileNumber,
        };
      });

    doc.autoTable({
      head: [Object.keys(exportData[0])],
      body: exportData.map((record) => Object.values(record)),
      margin,
      ...tableOptions,
    });

    setPdf(doc);
  };

  const handleExportCSV = () => {
    const exportData = data
      .filter((record) => {
        if (searchValue && filterType && filterType !== "date") {
          return record[filterType]
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
        return true;
      })
      .filter((record) => {
        if (dateRange && filterType === "date") {
          const recordDate = new Date(record.date);
          return (
            recordDate >= dateRange[0].startOf("day") &&
            recordDate <= dateRange[1].endOf("day")
          );
        }
        return true;
      })
      .map((record) => {
        return {
          Name: record.name,
          Email: record.email,
          "Mobile Number": record.mobileNumber,
        };
      });

    const csvData = (arr) => {
      const keys = Object.keys(arr[0]);
      const header = keys.map((key) => `"${key}"`).join(",");
      const rows = arr.map((row) =>
        keys.map((key) => `"${row[key]}"`).join(",")
      );
      return [header, ...rows].join("\n");
    };

    const csvString = csvData(exportData);
    const blob = new Blob([csvString], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `export.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Select
            className="font-poppins"
            placeholder="Filter by..."
            style={{ width: 150, marginRight: 8 }}
            onChange={handleFilterChange}
            value={filterType}
          >
            <Option value="name">Name</Option>
            <Option value="email">Email</Option>
            <Option value="mobileNumber">Mobile Number</Option>
            <Option value="course">Course</Option>
            <Option value="instructor">Instructor</Option>
            <Option value="date">Date</Option>
          </Select>
          {filterType && filterType === "date" ? (
            <RangePicker
              className="font-poppins"
              style={{ marginRight: 8 }}
              onChange={handleDateFilterChange}
              value={dateRange}
            />
          ) : (
            filterType && (
              <Input
                className="font-poppins"
                placeholder={`Search by ${filterType}`}
                style={{ width: 200, marginRight: 8 }}
                onChange={handleSearch}
                value={searchValue}
              />
            )
          )}
          <Button
            type="default"
            className="text-green-800 border-green-800 font-poppins"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
        <div>
          <Space>
            <Button
              className="font-poppins"
              icon={<ExportOutlined />}
              onClick={handleExportPdf}
            >
              Export PDF
            </Button>
            <Button
              className="font-poppins"
              icon={<ExportOutlined />}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>
          </Space>
        </div>
      </div>
      <Table
        dataSource={data
          .filter((record) => {
            if (searchValue && filterType && filterType !== "date") {
              return record[filterType]
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            }
            return true;
          })
          .filter((record) => {
            if (numPeopleFilter) {
              if (numPeopleFilter === "5-10") {
                return record.name.length >= 5 && record.name.length <= 10;
              } else if (numPeopleFilter === "10+") {
                return record.name.length > 10;
              } else if (numPeopleFilter === "100+") {
                return record.name.length > 100;
              }
            }
            return true;
          })
          .filter((record) => {
            if (dateRange && filterType === "date") {
              const recordDate = new Date(record.date);
              return (
                recordDate >= dateRange[0].startOf("day") &&
                recordDate <= dateRange[1].endOf("day")
              );
            }
            return true;
          })
          .filter((record) => {
            if (filterType === "course") {
              return (
                !searchValue ||
                record.course.toLowerCase().includes(searchValue.toLowerCase())
              );
            }
            return true;
          })
          .filter((record) => {
            if (filterType === "instructor") {
              return (
                !searchValue ||
                record.instructor
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              );
            }
            return true;
          })}
        columns={columns}
        loading={loading}
      />
      <Modal
        title="Assign Course"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            className="font-poppins"
            onClick={() => setModalVisible(false)}
          >
            Cancel
          </Button>,
          <Button key="assign" className="custom-btn" onClick={handleOk}>
            Assign
          </Button>,
        ]}
      >
        <Form name="assignCourseForm" form={form} layout="vertical">
          <Form.Item
            label="Course"
            name="id"
            rules={[
              {
                required: true,
                message: "Please select course !",
              },
            ]}
          >
            <Select
              placeholder="Select Course"
              className="font-poppins"
              dropdownClassName="font-poppins"
            >
              {course?.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.courseName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default View;
