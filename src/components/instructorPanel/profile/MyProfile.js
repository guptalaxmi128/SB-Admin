import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin, message, Breadcrumb } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faMapMarkerAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { getInstructor } from "../../../actions/instructor/register/register";
import { getIAverageRating } from "../../../actions/instructor/review/Review";
import ReviewStar from "../review/ReviewStar";

const localhost = `http://localhost:${5000}/files`;

const MyProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [experience, setExperience] = useState([]);
  const [review, setReview] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getInstructor());
        setData(result.data);
        setExperience(result.data.experience);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getIAverageRating());
        setReview(result.data.averageRating);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const hasUniversity = data.qualifications?.filter(
    (qualification) => qualification.university_institute_name
  );

  const renderExperience = () => {
    if (!experience) return null;

    const lastExperience = experience[experience.length - 1];
    return lastExperience;
  };

  const lastExperience = renderExperience();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
          Profile
        </h2>
        <Breadcrumb className="font-poppins">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="flex justify-center align-center">
            <Spin />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Card className="w-full">
                <div>
                  <img
                    // src={data.imagePath}
                    src={`${localhost}/${data?.imageFileName}`}
                    alt={data.imageOriginalName}
                    className="rounded-md w-20 h-20 mb-4"
                  />
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold font-poppins">
                      {data.name}
                    </h3>
                    &nbsp;(
                    <ReviewStar reviewStar={review} />)
                    <Link to={`update`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="ml-2 cursor-pointer text-gray-500"
                      />
                    </Link>
                  </div>

                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-3 h-3 text-gray-800 dark:text-white mr-2"
                    />
                    <p className="text-gray-500 text-sm font-poppins">
                      {data.instructorType}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="w-3 h-3 text-gray-800 dark:text-white mr-2"
                    />
                    <p className="text-gray-500 text-sm font-poppins">
                      {data.location}
                    </p>
                  </div>
                  <div className="ml-1 mt-2">
                    <p className="text-gray-500 text-sm font-poppins">
                      Email Address
                    </p>
                    <p className="text-gray-800 text-sm font-poppins">
                      {data.email}
                    </p>
                  </div>

                  <div className="ml-1 mt-2">
                    <p className="text-gray-500 text-sm font-poppins">
                      Mobile Number
                    </p>
                    <p className="text-gray-800 text-sm font-poppins">
                      {data.phoneNumber}
                    </p>
                  </div>
                  <div className="ml-1 mt-2">
                    {data &&
                      (data.linkedIn ||
                        data.instagram ||
                        data.twitter_x ||
                        data.facebook) && (
                        <>
                          <p className="text-gray-500 text-sm font-poppins">
                            Social Media
                          </p>
                          <div className="flex items-center">
                            {data.linkedIn && (
                              <a
                                href={data.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FontAwesomeIcon
                                  icon={faLinkedin}
                                  className="text-blue-600 mx-1"
                                  size="lg"
                                />
                              </a>
                            )}
                            {data.instagram && (
                              <a
                                href={data.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FontAwesomeIcon
                                  icon={faInstagram}
                                  className="text-pink-600 mx-1"
                                  size="lg"
                                />
                              </a>
                            )}
                            {data.twitter_x && (
                              <a
                                href={data.twitter_x}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FontAwesomeIcon
                                  icon={faTwitter}
                                  className="text-blue-400 mx-1"
                                  size="lg"
                                />
                              </a>
                            )}
                            {data.facebook && (
                              <a
                                href={data.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FontAwesomeIcon
                                  icon={faFacebook}
                                  className="text-blue-800 mx-1"
                                  size="lg"
                                />
                              </a>
                            )}
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </Card>

              {lastExperience && lastExperience.skills.length > 0 && (
                <Card className="w-full mt-4">
                  <h3 className="text-xl font-semibold font-poppins">Skills</h3>
                  <>
                    {lastExperience.skills.map((skill, index) => (
                      <p
                        key={index}
                        className="bg-green-100 text-green-800 rounded-md p-2 w-1/3 mt-2 mr-2 font-poppins text-sm"
                      >
                        {skill}
                      </p>
                    ))}
                  </>
                </Card>
              )}
            </Col>

            <Col span={24} md={16}>
              <Card className="w-full">
                <h2
                  className="text-xl font-semibold text-gray-800 mb-4 font-poppins"
                  font-poppins
                >
                  General Information
                </h2>

                {/* About Me */}
                {data.bio && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                      About Me
                    </h3>
                    <p className="text-gray-600 font-poppins text-sm">{data.bio}</p>
                  </div>
                )}

                {/* Education */}
                {hasUniversity ? (
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                        Education
                      </h3>
                      <Link to={`qualification`}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="ml-2 cursor-pointer text-gray-500"
                        />
                      </Link>
                    </div>
                    <p className="text-gray-600 font-poppins text-sm">
                      {hasUniversity?.map((qualification, index) =>
                        qualification.university_institute_name ? (
                          <span key={index}>
                            {qualification.university_institute_name}
                            {index !== hasUniversity.length - 1 ? ", " : ""}
                          </span>
                        ) : null
                      )}
                    </p>
                  </div>
                ) : null}

                {/* Work History */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                      Work History
                    </h3>
                    <Link to={`experience`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="ml-2 cursor-pointer text-gray-500"
                      />
                    </Link>
                  </div>
                  <p className="text-gray-600 font-poppins text-sm">
                    {lastExperience && lastExperience.workHistory}
                  </p>
                </div>

                {/* Join Date, Languages, Organization, Role, Department, Birthday */}
                <div className="grid grid-cols-2 gap-4 font-poppins">
                  {data.languages && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Languages
                      </h3>

                      <>
                        {data.languages?.length > 0 && (
                          <p className="text-gray-600 font-poppins flex text-sm">
                            {data.languages.join(", ")}
                          </p>
                        )}
                      </>
                    </div>
                  )}

                  {lastExperience && (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                          Join Date
                        </h3>
                        <p className="text-gray-600 font-poppins text-sm">
                          {lastExperience &&
                            formatDate(lastExperience.joinDate)}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                          Organization
                        </h3>
                        <p className="text-gray-600 font-poppins text-sm">
                          {" "}
                          {lastExperience && lastExperience.organization}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                          Role
                        </h3>
                        <p className="text-gray-600 font-poppins text-sm">
                          {" "}
                          {lastExperience && lastExperience.role}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                          Department
                        </h3>
                        <p className="text-gray-600 font-poppins text-sm">
                          {lastExperience && lastExperience.department}
                        </p>
                      </div>
                    </>
                  )}
                  {data.dateOfBirth && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 font-poppins">
                        Birthday
                      </h3>
                      <p className="text-gray-600 font-poppins text-sm">
                        {formatDate(data.dateOfBirth)}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
