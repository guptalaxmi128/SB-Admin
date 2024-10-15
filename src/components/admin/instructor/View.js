import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Select,
  Input,
  DatePicker,
  Tooltip,
  Modal,
  message,
} from "antd";
import {
  ExportOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Link ,useNavigate} from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  deleteInstructor,
  getAdminInstructor,
} from "../../../actions/admin/adminInstructor/adminInstructor";
import { useDispatch } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;
const View = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [filterType, setFilterType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [numPeopleFilter, setNumPeopleFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [commentData, setCommentData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: pageSize,
       
        };
        const result = await dispatch(getAdminInstructor(params));
        setData(result.data);
        setTotalPage(result.totalPage);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch,pageSize,currentPage]);

  const formatCreatedAtDate = (createdAt) => {
    // Create a new Date object from the createdAt string
    const date = new Date(createdAt);

    // Get the day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, "0"); // Ensures two digits
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    // Return the formatted date string in the format DD-MM-YYYY
    return `${day}-${month}-${year}`;
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
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "font-poppins",
      render: (text) => formatCreatedAtDate(text),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "font-poppins",
      render: (text, record) => (
        <div className="flex">
          <Link to={`/profile/instructor/${record.id}`}>{text}</Link>
          <Tooltip title="Add/View Comments">
            <Button
              type="link"
              onClick={() => openCommentPopup(record, "name")}
              icon={<CommentOutlined />}
            />
          </Tooltip>
        </div>
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
    //   title: "Bio",
    //   dataIndex: "bio",
    //   key: "bio",
    //   className: "font-poppins",
    // },
    // {
    //   title: "Social Media",
    //   dataIndex: "socialMedia",
    //   key: "socialMedia",
    //   className: "font-poppins",
    //   render: (socialMedia) => (
    //     <Space>
    //       <a
    //         href={socialMedia.twitter}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Twitter
    //       </a>
    //       <a
    //         href={socialMedia.linkedin}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         LinkedIn
    //       </a>
    //     </Space>
    //   ),
    // },
    {
      title: "Instructor Type",
      dataIndex: "instructorType",
      key: "instructorType",
      className: "font-poppins",
    },
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
          <Tooltip title="View Review">
            <EyeOutlined
              onClick={() => handleReview(record.id)}
              className="text-blue-500 text-lg cursor-pointer"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = () => {
    console.log("Handle Edit");
  };

  const handleReview = (id) => {
    console.log(`To see the review ${id}`);
   navigate(`review/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteInstructor(id));
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("An error occurred while deleting the course");
    }
  };

  const openCommentPopup = (record, fieldName) => {
    Modal.info({
      title: `${fieldName} Comments for ${record.name}`,
      content: (
        <div>
          {commentData[record.key] && commentData[record.key][fieldName] ? (
            <p>{commentData[record.key][fieldName]}</p>
          ) : (
            <Input.TextArea
              placeholder="Add a comment..."
              onPressEnter={(e) =>
                saveComment(record.key, fieldName, e.target.value)
              }
            />
          )}
        </div>
      ),
      okText: "Save",
      okButtonProps: { className: "custom-btn" },
      onOk: () => {
        // If the user has not pressed Enter and added a comment,
        // you can handle the save operation here
        const value = document.querySelector(".ant-input").value;
        if (value.trim() !== "") {
          saveComment(record.key, fieldName, value);
        }

        Modal.destroyAll();
      },
      onCancel: () => {
        // Handle cancel operation here
        Modal.destroyAll();
      },
    });
  };

  const saveComment = (recordKey, fieldName, comment) => {
    // Update the commentData state with the new comment
    setCommentData((prevData) => ({
      ...prevData,
      [recordKey]: {
        ...prevData[recordKey],
        [fieldName]: comment,
      },
    }));
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
      // Automatically download the PDF when it's available
      pdf.save("exportedData.pdf");
    }
  }, [pdf]);

  const handleExportPdf = () => {
    const doc = new jsPDF();

    // Adjust these values based on your needs
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const tableOptions = {
      headStyles: {
        fillColor: [75, 92, 110], // Header background color
        textColor: 255, // Header text color
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
          const recordDate = new Date(record.date); // Adjust this based on your actual date property
          return (
            recordDate >= dateRange[0].startOf("day") &&
            recordDate <= dateRange[1].endOf("day")
          );
        }
        return true;
      })
      .map((record) => {
        // Map your data to the format needed for autotable
        return {
          Name: record.name,
          Email: record.email,
          "Mobile Number": record.mobileNumber,
          Bio: record.bio,
          // Add more columns as needed
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
  console.log(dateRange);


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
          const recordDate = new Date(record.createdAt);

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
          "Mobile Number": record.phoneNumber,
          Bio: record.bio,
          // Add more columns as needed
        };
      });

    const csvData = (arr) => {
      // Extracting the keys from the first object to use as CSV header
      const keys = Object.keys(arr[0]);
      const header = keys.map((key) => `"${key}"`).join(",");
      const rows = arr.map((row) =>
        keys.map((key) => `"${row[key]}"`).join(",")
      );
      return [header, ...rows].join("\n");
    };

    const csvString = csvData(exportData);
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `export.csv`;

    // Append the link to the document
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div style={{ overflowX: "auto" }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Select
            className="font-poppins"
            dropdownClassName="font-poppins"
            placeholder="Filter by..."
            style={{ width: 150, marginRight: 8 }}
            onChange={handleFilterChange}
            value={filterType}
          >
            <Option value="name">Name</Option>
            <Option value="email">Email</Option>
            <Option value="mobileNumber">Mobile Number</Option>
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
          {/* <Select
          placeholder="Number of People"
          style={{ width: 150, marginRight: 8 }}
          onChange={handleNumPeopleFilterChange}
          value={numPeopleFilter}
        >
          <Option value="5-10">5-10 people</Option>
          <Option value="10+">10+ people</Option>
          <Option value="100+">100+ people</Option>
        </Select> */}
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
              const recordDate = new Date(record.createdAt);
              return (
                recordDate >= dateRange[0].startOf("day") &&
                recordDate <= dateRange[1].endOf("day")
              );
            }
            return true;
          })}
        columns={columns}
        loading={loading}
        pagination={{
              pageSize: pageSize,
              current: currentPage,
              onChange: handlePageChange,
              total: totalPage * pageSize,
           
            }}
      />
    </div>
  );
};

export default View;
