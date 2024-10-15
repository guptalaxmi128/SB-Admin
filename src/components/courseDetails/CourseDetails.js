import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faUser,
  faBook,
  faChartBar,
  faLanguage,
  faPalette,
  faAward,
  faCalendarAlt,
  faUserTie,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faLinkedin,
  faPinterest,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import shape1 from "../../assets/shapes/shape-01-02.png";
import shape2 from "../../assets/shapes/shape-03.png";
import shape5 from "../../assets/shapes/shape-36.png";
import shape4 from "../../assets/shapes/shape-13-12.png";
import shape3 from "../../assets/shapes/shape-11-07.png";
import shape6 from "../../assets/shapes/shape-05-07.png";
import course from "../../assets/course-details/course-01.jpg";
import instructor from "../../assets/instructor/instructor-small/instructor-2.jpg";
import instructor1 from "../../assets/instructor/course-details/instructor-2.jpg";
import video from "../../assets/video-bg/course-02.jpg";
import Accordion from "../accordion/Accordion";

const CourseDetails = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionData = [
    {
      title: "The First Steps",
      items: [
        { text: "Introduction" },
        { text: "Course Overview" },
        { text: "Local Development Environment Tools" },
        { text: "Course Exercise" },
        { text: "Embedding PHP in HTML" },
        { text: "Using Dynamic Data" },
      ],
    },
    // Add more accordion items similarly
  ];
  return (
    <>
      <div className="edu-breadcrumb-area breadcrumb-style-1 ptb--60 ptb_md--40 ptb_sm--40 bg-image">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-inner text-start">
                <div className="page-title">
                  <h3 className="title font-poppins">Course Details</h3>
                </div>
                <nav className="edu-breadcrumb-nav">
                  <ol className="edu-breadcrumb d-flex justify-content-start liststyle">
                    <li className="breadcrumb-item font-poppins">
                      <a href="#">Home</a>
                    </li>
                    <li className="separator">
                      <i className="ri-arrow-drop-right-line"></i>
                    </li>
                    <li
                      className="breadcrumb-item active font-poppins"
                      aria-current="page"
                    >
                      Course Details
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
              <div className="shape-image shape-image-1">
                <img src={shape3} alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-2">
                <img src={shape1} alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-3">
                <img src={shape2} alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-4">
                <img src={shape4} alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-5">
                <img src={shape5} alt="Shape Thumb" />
              </div>
              <div className="shape-image shape-image-6">
                <img src={shape6} alt="Shape Thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edu-course-details-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12">
              <div className="main-image thumbnail">
                <img
                  className="radius-small"
                  src={course}
                  alt="Banner Images"
                />
              </div>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-xl-8 col-lg-7">
              <div className="course-details-content">
                <div className="content-top">
                  <div className="author-meta">
                    <div className="author-thumb">
                      <a href="instructor-profile.html">
                        <img src={instructor} alt="Author Images" />
                        <span className="author-title font-poppins">
                          By Leone Xaviona
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="edu-rating rating-default">
                    <div className="star-rate">
                      <ul>
                        <li>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500"
                          />
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500"
                          />
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500"
                          />
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-500"
                          />
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faStar} />
                        </li>
                      </ul>
                    </div>
                    <span className="rating-count font-poppins text-sm mt-1">
                      (25 Review)
                    </span>
                  </div>
                </div>

                <h3 className="title font-poppins">Yoga Volunteer</h3>

                <div className="course-details-card">
                  <div className="course-content">
                    <h5 className="mb-3 font-poppins">Course Overview</h5>
                    <p className="text-base mb-3 font-poppins">
                      For promotion of well being of oneself and society at
                      large; assist in conducting group classes for Yoga
                      Volunteer, Yoga classes in the park, Yoga related IDY
                      programs. Can be part o f Fit India Movement. Can conduct
                      Yoga Break protocol in work places.
                    </p>
                    {/* <p className="mb-3 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.
                    </p> */}
                    <h5 className="font-poppins mb-3">
                      What You’ll Learn From This Course
                    </h5>
                    <ul class="list-disc font-poppins">
                      <li className="mb-1">
                        Understanding the significance of prayer in yoga
                        practice. Learning traditional chants and hymns,
                        including the recitation of Pranava (Om).
                      </li>
                      <li className="mb-1">
                        Exploring cleansing techniques (kriyas) for purification
                        of the body and mind, including Neti, Trataka, and
                        Kapalabhati.
                      </li>
                      <li className="mb-1">
                        Cultivating meditation techniques to enhance
                        self-awareness, concentration, and relaxation.
                      </li>
                      <li className="mb-3">
                        Exploring breath control techniques to regulate the flow
                        of prana (life force energy), including Shitali, and
                        Bhramari pranayama.
                      </li>
                    </ul>
                    <h5 className="mb-3 font-poppins">Certification</h5>
                    <p className="text-base font-poppins">
                      The candidate who has 80% attendance in the class shall be
                      eligible for certification. Certificate to the candidate
                      shall be issued after getting the report from the
                      institution about the attendance of the candidate and the
                      program conducted.
                    </p>
                  </div>
                </div>

                <div className="course-details-card mt--40">
                  <div className="course-content">
                    <div className="edu-accordion-01" id="accordionExample1">
                      <div className="edu-accordion-item">
                        <Accordion
                          title={
                            <>
                              <div className="edu-accordion-item">
                                <div
                                  className="edu-accordion-header"
                                  id="headingOne"
                                >
                                  The First Steps
                                </div>
                              </div>
                            </>
                          }
                          answer={
                            <>
                              <div
                                id="collapseOne"
                                className="accordion-collapse "
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample1"
                              >
                                <div className="edu-accordion-body">
                                  <ul>
                                    <li>
                                      <div className="text">
                                        <FontAwesomeIcon
                                          icon={faBook}
                                          className="icon-draft-line"
                                          style={{ marginRight: "5px" }}
                                        />
                                        Meaning, History and Development of
                                        Yoga. 
                                        </div>
                                        <div className="icon">
                                        <FontAwesomeIcon icon={faLock} />
                                        </div>
                                    
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </>
                          }
                        />
                      </div>

                      {/* <div className="edu-accordion-item">
                        <div className="edu-accordion-header" id="headingTwo">
                          <button
                            className="edu-accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Data Types and More
                          </button>
                        </div>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample1"
                        >
                          <div className="edu-accordion-body">
                            <ul>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Introduction
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Course Overview
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Local Development Environment Tools
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Course Excercise
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Embedding PHP in HTML
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Using Dynamic Data
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="edu-accordion-item">
                        <div className="edu-accordion-header" id="headingThree">
                          <button
                            className="edu-accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Control Structure
                          </button>
                        </div>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample1"
                        >
                          <div className="edu-accordion-body">
                            <ul>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Introduction
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Course Overview
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Local Development Environment Tools
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Course Excercise
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Embedding PHP in HTML
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                              <li>
                                <div className="text">
                                  <FontAwesomeIcon
                                  icon={faBook}
                                    className="icon-draft-line"
                                  />{" "}
                                  Using Dynamic Data
                                </div>
                                <div className="icon">
                                  <FontAwesomeIcon icon={faLock} />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="course-details-card mt--40">
                  <div className="course-content">
                    <div className="course-author-wrapper">
                      <div className="thumbnail">
                        <img src={instructor1} alt="Author Images" />
                      </div>
                      <div className="author-content">
                        <h6 className="title">
                          <a href="#">Leone Xaviona</a>
                        </h6>
                        <span className="subtitle">Digital Marketer</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when...
                        </p>
                        <ul className="social-share border-style">
                          <li>
                            <a href="#">
                              <FontAwesomeIcon icon={faFacebookSquare} />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FontAwesomeIcon icon={faPinterest} />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <FontAwesomeIcon icon={faTwitterSquare} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course-details-card mt--40">
                  <div className="course-content">
                    <h5 className="mb--20">Review</h5>
                    <div className="row row--30">
                      <div className="col-lg-4">
                        <div className="rating-box">
                          <div className="rating-number">5.0</div>
                          <div className="star-rate">
                            <ul>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-yellow-500"
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-yellow-500"
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-yellow-500"
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="text-yellow-500"
                                />
                              </li>
                              <li>
                                <FontAwesomeIcon icon={faStar} />
                              </li>
                            </ul>
                          </div>
                          <span>(25 Review)</span>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="review-wrapper">
                          <div className="single-progress-bar">
                            <div className="rating-text">
                              5{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "100%" }}
                                aria-valuenow="100"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="rating-value">1</span>
                          </div>

                          <div className="single-progress-bar">
                            <div className="rating-text">
                              4{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "0%" }}
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="rating-value">0</span>
                          </div>

                          <div className="single-progress-bar">
                            <div className="rating-text">
                              3{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "0%" }}
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="rating-value">0</span>
                          </div>

                          <div className="single-progress-bar">
                            <div className="rating-text">
                              2{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "0%" }}
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="rating-value">0</span>
                          </div>

                          <div className="single-progress-bar">
                            <div className="rating-text">
                              1{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            </div>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "0%" }}
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <span className="rating-value">0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="comment-wrapper pt--40">
                      <div className="section-title">
                        <h5 className="mb--25">Reviews</h5>
                      </div>
                      <div className="edu-comment">
                        <div className="thumbnail">
                          <img
                            src="assets/images/course/student-review/student-1.png"
                            alt="Comment Images"
                          />
                        </div>
                        <div className="comment-content">
                          <div className="comment-top">
                            <h6 className="title">Elen Saspita</h6>
                            <div className="star-rate">
                              <ul>
                                <li>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-yellow-500"
                                  />
                                </li>
                                <li>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-yellow-500"
                                  />
                                </li>
                                <li>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-yellow-500"
                                  />
                                </li>
                                <li>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    className="text-yellow-500"
                                  />
                                </li>
                                <li>
                                  <FontAwesomeIcon icon={faStar} />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <span className="subtitle">
                            “ Outstanding Course ”
                          </span>
                          <p>
                            As Thomas pointed out, Chegg’s survey appears more
                            like a scorecard that details obstacles and
                            challenges that the current university undergraduate
                            student population is going through in their
                            universities and countries.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="eduvibe-sidebar course-details-sidebar">
                <div className="inner">
                  <div className="eduvibe-widget">
                    <div className="video-area">
                      <div className="thumbnail video-popup-wrapper">
                        <img
                          className="radius-small w-100"
                          src={video}
                          alt="Course Images"
                        />
                        <a
                          href="https://www.youtube.com/watch?v=pNje3bWz7V8"
                          className="video-play-btn position-to-top video-popup-activation"
                        >
                          <span className="play-icon course-details-video-popup"></span>
                        </a>
                      </div>
                    </div>
                    <div className="eduvibe-widget-details mt--35">
                      <div className="widget-content">
                        <ul>
                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faClock}
                                className="mr-2"
                              />
                              Start Date
                            </span>
                            <span>6 Hrs 40 Min</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon icon={faUser} className="mr-2" />
                              Enrolled
                            </span>
                            <span>89</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon icon={faBook} className="mr-2" />{" "}
                              Lectures
                            </span>
                            <span>23</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faChartBar}
                                className="mr-2"
                              />{" "}
                              Skill Level
                            </span>
                            <span>Intermediate</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faLanguage}
                                className="mr-2"
                              />{" "}
                              Language
                            </span>
                            <span>English</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faPalette}
                                className="mr-2"
                              />{" "}
                              Quizzes
                            </span>
                            <span>25</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faAward}
                                className="mr-2"
                              />{" "}
                              Certificate
                            </span>
                            <span>Yes</span>
                          </li>

                          <li>
                            <span>
                              <img
                                className="eduvibe-course-sidebar-img-icon"
                                src="assets/images/icons/percent.svg"
                                alt="icon Thumb"
                              />{" "}
                              Pass Percentage
                            </span>
                            <span>90%</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="mr-2"
                              />
                              Deadline
                            </span>
                            <span>25 Dec, 2023</span>
                          </li>

                          <li>
                            <span>
                              <FontAwesomeIcon
                                icon={faUserTie}
                                className="mr-2"
                              />
                              Instructor
                            </span>
                            <span>Daniel Stiva</span>
                          </li>
                        </ul>

                        <div className="read-more-btn mt--45">
                          <a
                            className="edu-btn btn-bg-alt w-100 text-center"
                            href="#"
                          >
                            Price: $79.00
                          </a>
                        </div>

                        <div className="read-more-btn mt--15">
                          <a className="edu-btn w-100 text-center" href="#">
                            Buy Now
                          </a>
                        </div>

                        <div className="read-more-btn mt--30 text-center">
                          <div className="eduvibe-post-share">
                            <span>Share: </span>
                            <a className="linkedin" href="#">
                              <i className="icon-linkedin"></i>
                            </a>
                            <a className="facebook" href="#">
                              <i className="icon-Fb"></i>
                            </a>
                            <a className="twitter" href="#">
                              <i className="icon-Twitter"></i>
                            </a>
                            <a className="youtube" href="#">
                              <i className="icon-youtube"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
