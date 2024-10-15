import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  message,
  Space,
  Tooltip,
  Menu,
  Dropdown,
} from "antd";
import {
  contentPublish,
  coursePublish,
  getCourseById,
  contentStatus,
  deleteContent,
  restoreContent,
} from "../../../actions/admin/course/course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUndo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addAdminCourseContent } from "../../../actions/admin/content/content";
import { getACourseAverageRating } from "../../../actions/admin/courseReview/courseReview";
import ReviewStar from "../../instructorPanel/review/ReviewStar";

const MainCurriculum = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentInputs, setContentInputs] = useState([]);
  const [submittedContent, setSubmittedContent] = useState([]);
  const [content, setContent] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [review,setReview]=useState('');

  const handleAddContentClick = () => {
    setContentInputs([...contentInputs, ""]);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...contentInputs];
    newInputs[index] = value;
    setContentInputs(newInputs);
  };

  const course = useSelector((state) => state.adminCourse.courseById);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([dispatch(getCourseById(id))]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
       const res= await dispatch(getACourseAverageRating(id));
       setReview(res.data.averageRating);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (course.data) setData(course.data);
    setContent(course.data?.contents);
  }, [course]);

  const handleSaveContent = async (title) => {
    try {
      const newSubmittedContent = [...submittedContent, title];
      setSubmittedContent(newSubmittedContent);
      setContentInputs([]);

      setAddLoading(true);
      const data = { courseId: id, title };
      console.log(data);
      const res = await dispatch(addAdminCourseContent(data));
      if (res.success) {
        message.success(res.message);
        window.location.reload();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      message.error(error.response.data.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleCoursePublish = async (courseId, isPublish) => {
    try {
      const res = await dispatch(
        coursePublish({ id: courseId, isPublish: isPublish })
      );
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  const handleContentPublish = async (contentId, isPublish) => {
    try {
      const res = await dispatch(
        contentPublish({ id: contentId, isPublish: isPublish })
      );
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  const handleApprove = (id) => {
    console.log(`Course ${id} is clicked as approve`);
    const data = { id, approvalStatusByAdmin: "Approved" };
    dispatch(contentStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleDecline = (id) => {
    console.log(`Course ${id} is clicked as decline`);
    const data = { id, approvalStatusByAdmin: "Rejected" };
    dispatch(contentStatus(data)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const handleRestore = (id) => {
    console.log(`Content ${id} is clicked as restore`);
    dispatch(restoreContent(id)).then((res) => {
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    });
  };

  const menu1 = (id) => (
    <Menu onClick={() => handleDelete(id)}>
      <Menu.Item key="delete">
        <span className="text-red-500 font-poppins">Delete</span>
      </Menu.Item>
    </Menu>
  );

  const handleDelete = async (id) => {
    console.log("contentId", id);
    try {
      const res = await dispatch(deleteContent(id));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg text-gray-800 font-poppins">
          Content
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
          <Breadcrumb.Item>Content</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="main-curriculum bg-white p-4 rounded-lg border border-gray-400 mt-3">
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-2">{data.courseName}</h2>
              <span>
               <ReviewStar reviewStar={review} />
              </span>
            </div>
          {data.creater === "Admin" && (
            <div>
              <Button
                type="default"
                className="mr-2 font-poppins"
                onClick={handleAddContentClick}
              >
                Add New Lecture
              </Button>
              {data.approvalStatusByAdmin === "Pending" ||
              data.approvalStatusByAdmin === "Rejected" ? (
                <Button
                  type="default"
                  className="mr-2 font-poppins border-red-800 text-red-800"
                >
                  {data.approvalStatusByAdmin}
                </Button>
              ) : data.approvalStatusByAdmin === "Approved" ? (
                <Button
                  type="default"
                  className="mr-2 font-poppins border-green-800 text-green-800"
                >
                  {data.approvalStatusByAdmin}
                </Button>
              ) : null}
              {!data.isPublish && (
                <Tooltip title="Click to publish this course">
                  <Button
                    type="default"
                    className="mr-2 font-poppins border-red-800 text-red-800"
                    onClick={() => handleCoursePublish(data.id, true)}
                  >
                    Publish
                  </Button>
                </Tooltip>
              )}
              {data.isPublish && (
                <Tooltip title="Click to mark this course as unpublished">
                  <Button
                    type="default"
                    className="mr-2 font-poppins border-green-800 text-green-800"
                    onClick={() => handleCoursePublish(data.id, false)}
                  >
                    Published
                  </Button>
                </Tooltip>
              )}
            </div>
          )}
        </div>
        {contentInputs.map((content, index) => (
          <div
            key={index}
            className="flex border border-gray-400 p-4 border-dashed rounded m-2"
          >
            <Input
              placeholder="Enter Lecture"
              value={content}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="mr-2"
            />
            <Button
              className="bg-green-700 text-white  focus:text-white active:text-white font-poppins"
              onClick={() => handleSaveContent(content)}
              loading={addLoading}
            >
              Submit
            </Button>
          </div>
        ))}
        <div className="submitted-content">
          {submittedContent.map((content, index) => (
            <div
              key={index}
              className="submitted-item  border-gray-400 p-4 border rounded border-dashed "
            >
              <div className="flex justify-between items-center">
                <Link to={`/lecture/${content.id}`}>
                  <h2 className="text-base font-poppins">{content}</h2>
                </Link>
                <div>
                  <Button
                    type="default"
                    className="mr-2 font-poppins border-green-800 text-green-800"
                  >
                    Add Content
                  </Button>
                  <Button type="default" className="font-poppins">
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {content?.map((content, index) => (
          <div
            key={index}
            className="submitted-item border border-gray-400 p-4 rounded m-2 border-dashed"
          >
            <div className="flex justify-between items-center">
              {content.deletedAt === null ? (
                <Link
                  to={{
                    pathname: `/lecture/${content.id}`,
                  }}
                >
                  <h2 className="text-sm font-poppins">{content.title}</h2>
                </Link>
              ) : (
                <h2 className="text-sm font-poppins">
                  {content.title} (deletedBy: {content.deletedThrough})
                </h2>
              )}

              <div>
                {content.deletedThrough === null ? (
                  <Space>
                    {content.approvalStatusByAdmin && !content.isPublish ? (
                      content.approvalStatusByAdmin === "Pending" ||
                      content.approvalStatusByAdmin === "Rejected" ? (
                        <Button
                          type="default"
                          className="mr-2 font-poppins border-red-800 text-red-800"
                        >
                          {content.approvalStatusByAdmin}
                        </Button>
                      ) : content.approvalStatusByAdmin === "Approved" ? (
                        <Button
                          type="default"
                          className="mr-2 font-poppins border-green-800 text-green-800"
                        >
                          {content.approvalStatusByAdmin}
                        </Button>
                      ) : null
                    ) : null}
                    {content.approvalStatusByAdmin && !content.isPublish ? (
                      content.approvalStatusByAdmin === "Pending" ? (
                        <>
                          <Button
                            type="default"
                            className="mr-2 font-poppins border-green-800 text-green-800"
                            onClick={() => handleApprove(content.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            type="default"
                            className="mr-2 font-poppins border-red-800 text-red-800"
                            onClick={() => handleDecline(content.id)}
                          >
                            Decline
                          </Button>
                        </>
                      ) : content.creater === "Instructor" &&
                        content.approvalStatusByAdmin === "Approved" ? (
                        <Button
                          type="default"
                          className="mr-2 font-poppins border-red-800 text-red-800"
                          onClick={() => handleDecline(content.id)}
                        >
                          Decline
                        </Button>
                      ) : content.approvalStatusByAdmin === "Rejected" ? (
                        <Button
                          type="default"
                          className="mr-2 font-poppins border-green-800 text-green-800"
                          onClick={() => handleApprove(content.id)}
                        >
                          Approve
                        </Button>
                      ) : null
                    ) : null}
                  </Space>
                ) : null}

                {content.creater === "Admin" &&  content.deletedThrough === null && (
                  <>
                    {" "}
                    {content.approvalStatusByAdmin !== "Pending" &&
                      !content.isPublish && (
                        <Button
                          type="default"
                          className="mr-2 font-poppins border-red-800 text-red-800"
                          onClick={() => handleContentPublish(content.id, true)}
                        >
                          Publish
                        </Button>
                      )}
                    {content.isPublish && (
                      <Button
                        type="default"
                        className="mr-2 font-poppins border-green-800 text-green-800"
                        onClick={() => handleContentPublish(content.id, false)}
                      >
                        Published
                      </Button>
                    )}
                  </>
                )}
                {content.deletedAt === null ? (
                  <Dropdown
                    overlay={() => menu1(content.id)}
                    trigger={["click"]}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="text-red-800"
                    />
                  </Dropdown>
                ) : null}
                {content.deletedThrough === "Admin" ? (
                  <Tooltip title="Click here to restore this content">
                  <FontAwesomeIcon
                    icon={faUndo}
                    className="mr-2 cursor-pointer"
                    onClick={() => handleRestore(content.id)}
                  />
                  </Tooltip>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCurriculum;
