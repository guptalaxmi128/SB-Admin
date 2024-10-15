import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  message,
  Spin,
  Modal,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  addInstructorCourseContent,
  courseSubmit,
  getInstructorCourseById,
  instructorContentPublish,
  instructorCoursePublish,
  deleteInstructorContent,
} from "../../../actions/instructor/course/course";
import { contentSubmit } from "../../../actions/instructor/content/content";
import { getICourseAverageRating } from "../../../actions/instructor/courseReview/courseReview";
import ReviewStar from "../review/ReviewStar";

const MainCurriculum = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [contentInputs, setContentInputs] = useState([]);
  const [submittedContent, setSubmittedContent] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [rating, setRating] = useState("");

  const course = useSelector((state) => state.addInstructorCourse.courseById);
  //  for course approval button start
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (id) => {
    if (!id) {
      return;
    }

    console.log(id);
    try {
      const res = await dispatch(courseSubmit(id));
      if (res.success) {
        message.success(res.message);
        setIsModalVisible(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error occurred during course review:", error);
      message.error(
        error.response.data.message ||
          "Failed to submit course for review. Please try again later."
      );
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //  for course approval button end

  const showContent = (contentId) => {
    setSelectedLectureId(contentId);
    setIsContent(true);
  };

  const handleContentOk = async () => {
    if (!selectedLectureId) {
      return;
    }
    if (data.approvalStatusByAdmin === null) {
      // If approvalStatusByAdmin is not null, show error message
      message.error("First submit course for admin review!");
      return;
    }
    try {
      const res = await dispatch(contentSubmit(selectedLectureId));
      if (res.success) {
        message.success(res.message);
        setIsContent(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error occurred during lecture review:", error);
      message.error(
        error.response.data.message ||
          "Failed to submit lecture for review. Please try again later."
      );
    }
  };

  const handleCancelContent = () => {
    setIsContent(false);
  };

  // console.log(id)
  const handleAddContentClick = () => {
    setContentInputs([...contentInputs, ""]);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...contentInputs];
    newInputs[index] = value;
    setContentInputs(newInputs);
  };

  const handleSaveContent = async (title) => {
    try {
      const newSubmittedContent = [...submittedContent, title];
      setSubmittedContent(newSubmittedContent);
      setContentInputs([]);

      setAddLoading(true);
      const data = { courseId: id, title };
      const res = await dispatch(addInstructorCourseContent(data));
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getInstructorCourseById(id));
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
        const res = await dispatch(getICourseAverageRating(id));
        setRating(res.data.averageRating);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (course.data) setData(course.data);
    setContentData(course.data?.contents);
  }, [course]);
  //   console.log(course.data.contents);

  const handleCoursePublish = async (courseId, isPublish) => {
    try {
      const res = await dispatch(
        instructorCoursePublish({ id: courseId, isPublish: isPublish })
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
        instructorContentPublish({ id: contentId, isPublish: isPublish })
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
      const res = await dispatch(deleteInstructorContent(id));
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
      {loading ? (
        <div className="flex justify-center align-center">
          <Spin />
        </div>
      ) : (
        <div className="main-curriculum bg-white p-4 rounded-lg border border-gray-400 mt-3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mr-2">{data.courseName}</h2>
              <span>
               <ReviewStar reviewStar={rating} />
              </span>
            </div>
            <div>
              <Button
                type="default"
                className="mr-2 font-poppins"
                onClick={handleAddContentClick}
              >
                Add New Lecture
              </Button>
              {data.approvalStatusByAdmin === null ? (
                <Button
                  type="default"
                  className="mr-2 font-poppins"
                  onClick={showModal}
                >
                  Course Review
                </Button>
              ) : null}

              <Modal
                title="Course Review"
                visible={isModalVisible}
                onOk={() => handleOk(id)}
                onCancel={handleCancel}
                okButtonProps={{ className: "custom-btn" }}
                cancelButtonProps={{ className: "font-poppins" }}
              >
                {/* Content of the modal */}
                <p className="font-poppins text-sm">
                  Are you sure you want to submit this course for admin review?
                </p>
                {/* You can add more content here */}
              </Modal>
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
          </div>
          {contentInputs.map((content, index) => (
            <div
              key={index}
              className="flex border border-gray-400 p-4 border-dashed rounded"
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
                  <Link to={`/subcontent/${content.id}`}>
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
          {contentData?.map((content, index) => (
            <div
              key={index}
              className="submitted-item border border-gray-400 p-4 rounded m-2 border-dashed"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={{
                    pathname: `/subcontent/${content.id}`,
                  }}
                >
                  <h2 className="text-base font-poppins">{content.title}</h2>
                </Link>

                <div>
                  {content.approvalStatusByAdmin === null ? (
                    <Button
                      type="default"
                      className="mr-2 font-poppins"
                      onClick={() => showContent(content.id)}
                    >
                      Lecture Review
                    </Button>
                  ) : null}
                  <Modal
                    title="Lecture Review"
                    visible={isContent}
                    onOk={handleContentOk}
                    onCancel={handleCancelContent}
                    okButtonProps={{ className: "custom-btn" }}
                    cancelButtonProps={{ className: "font-poppins" }}
                  >
                    {/* Content of the modal */}
                    <p className="font-poppins text-sm">
                      Are you sure you want to submit this lecture for admin
                      review?
                    </p>
                    {/* You can add more content here */}
                  </Modal>
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
                  <Dropdown
                    overlay={() => menu1(content.id)}
                    trigger={["click"]}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      className="text-red-800"
                    />
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainCurriculum;
