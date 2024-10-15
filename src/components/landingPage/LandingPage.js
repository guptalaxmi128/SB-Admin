import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import dots from "../../assets/img/dots.png";
// import google from "../../assets/img/google.png";
import time from "../../assets/img/fast-time.png";
import customer from "../../assets/img/customer-services.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faStar,
  faUser,
  faStopwatch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import yogaImg1 from "../../assets/Yoga-loss.avif";
import yogaImg2 from "../../assets/10.avif";
import idSvg from "../../assets/icons/id.svg";
import coin from "../../assets/icons/coin.svg";
import correct from "../../assets/icons/correct.svg";
import phone from "../../assets/icons/phone-call.svg";
import user1 from "../../assets/reviews/review-image-1.jpg";
import user2 from "../../assets/reviews/review-image-2.jpg";
import user3 from "../../assets/reviews/review-image-3.jpg";
import certificate from "../../assets/certificate.jpg";
import YVC from "../../assets/YVC.png";
import syllabus from "../../assets/syllabus.avif";
import course1 from "../../assets/course-yvc.png";
import courseImg from "../../assets/1911.png";
import Accordion from "../accordion/Accordion";
import { registerStudent, verifyRStudent } from "../../actions/student/student";
import { getCourse } from "../../actions/student/course/course";
import Gallery from "./Gallery";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState({});

  const toggleVideo = (index) => {
    setShowVideo((prevShowVideo) => ({
      ...prevShowVideo,
      [index]: !prevShowVideo[index], // Toggle the state for the clicked video
    }));
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState("");

  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getCourse());
        // console.log(res)
        const yogaVolunteerCourse = res.data.find(
          (course) => course.courseName == "Yoga Vounteer Course"
        );
        setCourse(yogaVolunteerCourse);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleGetOTP = async () => {
    try {
      setNameErr("");
      setEmailErr("");
      setPhoneNumberErr("");

      if (!name) {
        setNameErr("Name is required");
      }
      if (!email) {
        setEmailErr("Email is required");
      }
      if (!phoneNumber) {
        setPhoneNumberErr("Phone Number is required");
      }
      if (name && email && phoneNumber) {
        const data = {
          name,
          phoneNumber,
          email,
        };

        const res = await dispatch(registerStudent(data));

        if (res.success) {
          toast.success(res.message);
          setIsEmailEntered(true);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error("Error in handleGetOTP:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    // Clear the name error if the user enters a name
    if (value.trim() !== "") {
      setNameErr("");
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailErr("Invalid email format");
    } else {
      setEmailErr("");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setPhoneNumber(value);

    // Validate phone number length
    if (value.trim().length !== 10) {
      setPhoneNumberErr("Phone number must be 10 digits");
    } else {
      setPhoneNumberErr("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailEntered) {
      toast.error("Please enter OTP to submit the form");
      return;
    }

    try {
      setNameErr("");
      setEmailErr("");
      setPhoneNumberErr("");
      setOtpErr("");
      setLocationErr("");

      if (!name) {
        setNameErr("Name is required");
      }
      if (!email) {
        setEmailErr("Email is required");
      }
      if (!phoneNumber) {
        setPhoneNumberErr("Phone Number is required");
      }
      if (!otp) {
        setOtpErr("OTP is required");
      }
      if (!location) {
        setLocationErr("Location is required");
      }

      if (name && email && phoneNumber && otp && location) {
        const data = {
          name,
          phoneNumber,
          email,
          otp,
          location,
        };
        // Dispatch your action here
        const res = await dispatch(verifyRStudent(data));
        if (res.success) {
          toast.success(res.message);
          setIsEmailEntered(false);
          navigate(`/price/${course.id}`);
          setName("");
          setEmail("");
          setPhoneNumber("");
          setOtp("");
          setLocation("");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    }
  };

  const slides = [
    {
      imgSrc: yogaImg1,
      videoUrl: "https://www.youtube.com/embed/FdyhENXyIQ4",
    },
    {
      imgSrc: yogaImg2,
      videoUrl: "https://www.youtube.com/embed/FdyhENXyIQ4",
    },
    {
      imgSrc: yogaImg1,
      videoUrl: "https://www.youtube.com/embed/FdyhENXyIQ4",
    },
    {
      imgSrc: yogaImg2,
      videoUrl: "https://www.youtube.com/embed/FdyhENXyIQ4",
    },
    {
      imgSrc: yogaImg1,
      videoUrl: "https://www.youtube.com/embed/FdyhENXyIQ4",
    },
  ];
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <div className="hero-section">
          <div className="landing-page">
            {" "}
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-6 v-center">
                  <div className="header-heading-1">
                    <h1 className="mb30" data-aos="zoom-out-up">
                      Join Swasti Bharat's{" "}
                      <span className="fw3">Journey to Wellness.</span>
                    </h1>
                    <p
                      data-aos="zoom-out-up"
                      data-aos-delay="400"
                      className="font-poppins mb-4"
                    >
                      "Welcome to{" "}
                      <span className="text-green-800 font-bold">
                        {" "}
                        Swasti Bharat
                      </span>
                      , your gateway to a healthier and happier life through
                      yoga! Dive into our courses and embrace the joy of yoga as
                      we journey together towards wellness. Let's create a
                      vibrant community where everyone can find peace, strength,
                      and connection. Join us and start your journey to a better
                      you today!
                    </p>
                    <div className="video">
                      <div className="play-button">
                        <a data-fancybox="" href={course.introVideoLink}>
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              //   xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="35"
                              height="56"
                              viewBox="0 0 35 56"
                            >
                              {" "}
                              <defs>
                                {" "}
                                <clipPath id="clip-video_arrow">
                                  {" "}
                                  <rect width="35" height="56"></rect>{" "}
                                </clipPath>{" "}
                              </defs>{" "}
                              <g
                                id="video_arrow"
                                data-name="video arrow"
                                clip-path="url(#clip-video_arrow)"
                              >
                                {" "}
                                <path
                                  data-name="Shape 1"
                                  d="M1362,5000.8,1327,4972V5027Z"
                                  transform="translate(-1326.998 -4971.996)"
                                  fill="rgba(0,0,0,0)"
                                ></path>{" "}
                                <path
                                  id="Shape_1_-_Outline"
                                  data-name="Shape 1 - Outline"
                                  d="M1333,5015.017l19.29-14.437L1333,4984.7v30.313M1327,5027V4972l35,28.807Z"
                                  transform="translate(-1326.998 -4971.996)"
                                ></path>{" "}
                              </g>{" "}
                            </svg>
                          </i>
                          <span className="text-green-800 font-poppins">
                            Watch Overview
                          </span>
                        </a>
                      </div>
                      {/* <div className="review font-poppins">
                    <h2>
                      4.9 <span>out of 5</span>
                    </h2>
                    <ul className="star">
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faStar} />
                      </li>
                    </ul>
                    <img alt="google" src={google} />
                  </div> */}
                    </div>
                    {/* <img alt="dots" className="dots" src={dots} /> */}
                  </div>
                  <div
                    className="hero-feature"
                    data-aos="zoom-out-up"
                    data-aos-delay="800"
                  >
                    <div className="media v-center">
                      <div className="icon-pora">
                        <img src={time} alt="icon" className="w-100" />
                      </div>
                      <div className="media-body font-poppins">
                        Quick, Easy & Hassle Free
                      </div>
                    </div>
                    <div className="media v-center">
                      <div className="icon-pora">
                        <img src={customer} alt="icon" className="w-100" />
                      </div>
                      <div className="media-body font-poppins">
                        100% Claims Support
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-4" id="contact-form">
                  <ToastContainer />
                  <form
                    role="form"
                    className="get-a-quote"
                    id="contact-form"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-lg-5 mb-3  align-items-center">
                      {/* <i>
                        <svg
                          enable-background="new 0 0 124 124"
                          height="52"
                          viewBox="0 0 124 124"
                          width="52"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m82.899 50.646c-6.059 0-10.988-4.918-10.988-10.963s4.929-10.963 10.988-10.963 10.988 4.918 10.988 10.963-4.929 10.963-10.988 10.963zm0-17.979c-3.877 0-7.031 3.147-7.031 7.015s3.154 7.015 7.031 7.015 7.031-3.147 7.031-7.015-3.154-7.015-7.031-7.015z" />
                          <path d="m122.558 2.183c-.069-.986-.853-1.773-1.841-1.848-14.728-1.125-41.975-.347-58.941 17.482-.002.002-.005.004-.007.007-2.3 2.441-4.418 5.209-6.382 8.136-24.65 8.882-35.589 25.07-38.168 33.298-.376 1.202.496 2.487 1.756 2.582l17.94 1.359c-1.478 3.901-2.824 7.823-4.017 11.748-.215.706-.02 1.472.504 1.992l11.995 11.891c.513.508 1.288.703 1.98.495 4-1.194 7.996-2.545 11.97-4.027l1.381 17.923c.097 1.253 1.377 2.122 2.581 1.752 7.562-2.328 24.216-13.247 33.545-37.919 2.953-1.954 5.73-4.064 8.153-6.359 17.668-16.682 18.58-43.82 17.551-58.512-.07-.987 1.029 14.692 0 0zm-3.878 2.008c.413 7.551.219 17.908-2.38 28.202l-26.124-25.897c10.42-2.625 20.888-2.767 28.504-2.305zm-96.722 53.877c3.21-7.053 12.265-18.732 29.892-26.418-2.945 5.084-5.502 10.331-7.777 15.002-2.04 4.172-3.917 8.403-5.638 12.665zm42.549 42.183-1.267-16.452c4.264-1.695 8.496-3.541 12.668-5.545 4.732-2.244 10.045-4.763 15.169-7.669-7.959 17.563-19.588 26.513-26.57 29.666zm37.752-42.448c-7.489 7.094-18.422 12.277-28.076 16.854-8.762 4.212-17.778 7.744-26.816 10.507l-10.293-10.205c2.785-8.95 6.346-17.879 10.592-26.562 4.394-9.022 9.862-20.251 17.01-27.839 5.992-6.295 13.426-10.299 21.11-12.794l29.252 28.998c-2.497 7.687-6.497 15.108-12.779 21.041z" />
                          <path d="m4.185 122.808c-1.728 0-2.631-2.145-1.437-3.378l27.357-28.26c1.788-1.841 4.666.918 2.874 2.77l-27.357 28.259c-.392.405-.914.609-1.437.609z" />
                          <path d="m23.435 124c-1.688 0-2.609-2.063-1.493-3.318l17.73-19.91c1.71-1.913 4.7.723 2.987 2.648l-17.73 19.91c-.394.444-.943.67-1.494.67z" />
                          <path d="m2.982 104.917c-1.688 0-2.609-2.063-1.493-3.318l17.731-19.91c1.709-1.914 4.7.724 2.987 2.648l-17.731 19.91c-.395.444-.943.67-1.494.67z" />
                        </svg>
                      </i> */}
                      <div>
                        <h4 className="p-0 font-poppins text-2xl text-center ">
                          Yoga Volunteer Course
                        </h4>
                        {/* <h4 className="font-poppins text-center">
                          Registration Form
                        </h4> */}
                      </div>
                    </div>
                    <div className="font-poppins">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleNameChange}
                        value={name}
                        required
                      />
                      {nameErr && (
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "Poppins",
                            color: "red",
                            display: "block",
                          }}
                        >
                          {nameErr}
                        </span>
                      )}
                    </div>
                    <div className="font-poppins">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Mobile No"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                      />
                      {phoneNumberErr && (
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "Poppins",
                            color: "red",
                            display: "block",
                          }}
                        >
                          {phoneNumberErr}
                        </span>
                      )}
                    </div>
                    <div
                      className="font-poppins"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      {emailErr && (
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "Poppins",
                            color: "red",
                            display: "block",
                          }}
                        >
                          {emailErr}
                        </span>
                      )}
                      {!isEmailEntered && (
                        <span
                          className="text-green-500 cursor-pointer"
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "20px",
                            top: "40%",
                            transform: "translateY(-50%)",
                          }}
                          onClick={handleGetOTP}
                        >
                          Get OTP
                        </span>
                      )}
                    </div>
                    {isEmailEntered && (
                      <div className="font-poppins">
                        <input
                          type="number"
                          name="otp"
                          className="font-poppins"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        {otpErr && (
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "Poppins",
                              color: "red",
                              display: "block",
                            }}
                          >
                            {otpErr}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="font-poppins">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      {locationErr && (
                        <span
                          style={{
                            fontSize: "15px",
                            fontFamily: "Poppins",
                            color: "red",
                            display: "block",
                          }}
                        >
                          {locationErr}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      id="form-submit"
                      className="btn-rd w-100 font-poppins"
                    >
                      Submit
                    </button>
                    <div className="font-poppins text-xs">
                      {" "}
                      <FontAwesomeIcon icon={faLock} className="mr-2" />
                      We hate spam, and we respect your privacy.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <section className="step-bg pt50 pb80">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 v-center">
                  <div className="common-heading m-text-c lg:pr50">
                    <h2
                      className="mb20 font-poppins"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      How <em>Swasti Bharat</em> Works?
                    </h2>
                    <p
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="font-poppins"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <div className="col-lg-7 v-center m-mt30">
                  <div className="row">
                    <div className="col-lg-6">
                      <div
                        className="steps-div sd1 mt30"
                        data-aos="fade-up"
                        data-aos-delay="100"
                      >
                        <div className="steps-icons">
                          {" "}
                          <img src={phone} alt="steps" />{" "}
                        </div>
                        <p className="mb10 mt-20 font-poppins">Step 1</p>
                        <h4 className="mb10 font-poppins">Contact Us</h4>
                        <p className="font-poppins">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc aliquet ligula nec leo elementum semper.
                          Mauris aliquet egestas metus.
                        </p>
                      </div>
                      <div
                        className="steps-div sd2 mt30"
                        data-aos="fade-up"
                        data-aos-delay="500"
                      >
                        <div className="steps-icons">
                          {" "}
                          <img src={idSvg} alt="steps" />{" "}
                        </div>
                        <p className="mb10 mt-20 font-poppins">Step 2</p>
                        <h4 className="mb10 font-poppins">Bring ID</h4>
                        <p className="font-poppins">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc aliquet ligula nec leo elementum semper.
                          Mauris aliquet egestas metus.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 mt60 m-m0">
                      <div
                        className="steps-div sd3 mt30"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <div className="steps-icons">
                          {" "}
                          <img src={correct} alt="steps" />{" "}
                        </div>
                        <p className="mb10 mt-20 font-poppins">Step 3</p>
                        <h4 className="mb10 font-poppins">Verification</h4>
                        <p className="font-poppins">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc aliquet ligula nec leo elementum semper.
                          Mauris aliquet egestas metus.
                        </p>
                      </div>
                      <div
                        className="steps-div sd4 mt30"
                        data-aos="fade-up"
                        data-aos-delay="700"
                      >
                        <div className="steps-icons">
                          {" "}
                          <img src={coin} alt="steps" />{" "}
                        </div>
                        <p className="mb10 mt-20 font-poppins">Step 4</p>
                        <h4 className="mb10 font-poppins">Collect Your $$</h4>
                        <p className="font-poppins">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc aliquet ligula nec leo elementum semper.
                          Mauris aliquet egestas metus.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="reviews-section pad-tb review-bg2" id="review">
            <div className="container">
              <div className="row justify-content-center text-center">
                <Gallery />
              </div>
            </div>
          </section>
          <div className="edu-section-gap landing-page">
            {/* Top Section with Image */}
            <div className="flex justify-center items-center py-3 rounded-lg">
              <img
                src={course1}
                alt="Description of Image"
                className="w-full max-w-lg rounded-lg"
              />
            </div>

            <div className="flex justify-center items-center">
              <div className="container">
                <div className="row g-5">
                  <div className="flex flex-col md:flex-row ">
                    {/* Left Part with Image */}
                    <div
                      className="md:w-1/2 v-center sm:mb-10"
                      style={{
                        transition:
                          "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
                        margin: "10px",
                        backgroundColor: "#353535",
                        padding: "22px",
                        borderRadius: "20px",
                      }}
                    >
                      <img
                        src={courseImg}
                        alt="Description of Image 2"
                        className="w-full"
                      />
                    </div>

                    {/* Right Part with Text */}
                    <div
                      className="md:w-1/2 v-center"
                      style={{
                        transition:
                          "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
                        // margin: "0px 10px 0px 0px",
                        backgroundColor: "#353535",
                        padding: "22px",
                        borderRadius: "20px",
                      }}
                    >
                      {/* First Div with Image and Text */}
                      <div
                        className="flex items-center mb-4"
                        style={{
                          margin: "0px 15px 0px 15px",
                          padding: "20px",
                          backgroundColor: "#202020",
                          borderRadius: "20px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(236.24999999999997, 181.80978260869566, 0, 0.48)",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#FF7E21",
                            borderRadius: "6px",
                            padding: "5px",
                            className: "mr-4",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className="w-5 h-5"
                            style={{ fill: "#000000", color: "#000000" }}
                          />
                        </span>

                        <p
                          style={{
                            color: "#C7C7C7",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontWeight: 300,
                            marginLeft: "20px",
                          }}
                        >
                          42000+ Students
                        </p>
                      </div>

                      {/* Second Div with Image and Text */}
                      <div
                        className="flex items-center mb-4"
                        style={{
                          margin: "0px 15px 0px 15px",
                          padding: "20px",
                          backgroundColor: "#202020",
                          borderRadius: "20px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(236.24999999999997, 181.80978260869566, 0, 0.48)",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#FF7E21",
                            borderRadius: "6px",
                            padding: "5px",
                            className: "mr-4",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="w-5 h-5"
                            style={{ fill: "#000000", color: "#000000" }}
                          />
                        </span>
                        <p
                          style={{
                            color: "#C7C7C7",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontWeight: 300,
                            marginLeft: "20px",
                          }}
                        >
                          15 days live classes
                        </p>
                      </div>

                      {/* Third Div with Image and Text */}
                      <div
                        className="flex items-center"
                        style={{
                          margin: "0px 15px 0px 15px",
                          padding: "20px",
                          backgroundColor: "#202020",
                          borderRadius: "20px",
                          boxShadow:
                            "0px 0px 10px 0px rgba(236.24999999999997, 181.80978260869566, 0, 0.48)",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#FF7E21",
                            borderRadius: "6px",
                            padding: "5px",
                            className: "mr-4",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faStopwatch}
                            className="w-5 h-5"
                            style={{ fill: "#000000", color: "#000000" }}
                          />
                        </span>
                        <p
                          style={{
                            color: "#C7C7C7",
                            fontFamily: "Poppins",
                            fontSize: "18px",
                            fontWeight: 300,
                            marginLeft: "20px",
                          }}
                        >
                          Recorded videos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 sm:mt-10">
              <div
                className="font-poppins text-base font-semibold 
             bg-gradient-to-r from-green-600 to-green-400 
             rounded-md shadow-md 
             text-white
            lg:w-1/2 
             text-center 
             cursor-pointer"
                style={{
                  fontSize: "26px",
                  fontWeight: 500,
                  textShadow: "0px 0px 10px rgba(0,0,0,0.3)",
                  borderRadius: "6px",
                  // boxShadow: "0px 0px 10px 0px #E46001",
                  padding: "16px",
                }}
                onClick={() => (window.location.href = "#contact-form")}
              >
                Click Here Enroll Now
              </div>
            </div>
          </div>
          <div className="edu-course-details-area edu-section-gap bg-color-white">
            <div className="container">
              <div className="row g-5">
                <div className="col-xl-8 col-lg-7">
                  <div className="course-details-content">
                    <h3 className="title font-poppins text-lg text-center">
                      Yoga Volunteer Course
                    </h3>
                    <div className="course-details-card mt--40">
                      <div className="course-details-card mt-2">
                        <div className="course-content">
                          <div
                            className="edu-accordion-01"
                            id="accordionExample1"
                          >
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
                                      className="accordion-collapse"
                                      aria-labelledby="headingOne"
                                      data-bs-parent="#accordionExample1"
                                    >
                                      <div className="edu-accordion-body">
                                        <ul>
                                          <li>
                                            Meaning, History and Development of
                                            Yoga.
                                          </li>
                                          <li>
                                            Schools of Yoga{" "}
                                            <p style={{ visibility: "hidden" }}>
                                              Yoga Volunteer Course Yoga
                                              Volunteer Course Yoga Volunteer
                                              Course
                                            </p>
                                          </li>
                                          <li>The fundamentals of Yoga</li>
                                          <li>
                                            Yogic Practices for Health and
                                            Wellness
                                          </li>
                                          <li>
                                            General guidelines for Yogic
                                            Practice
                                          </li>
                                          <li>Yogic principles of Food</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="course-details-card mt-2">
                        <div className="course-content">
                          <div
                            className="edu-accordion-02"
                            id="accordionExample2"
                          >
                            <div className="edu-accordion-item">
                              <Accordion
                                title={
                                  <>
                                    <div className="edu-accordion-item">
                                      <div
                                        className="edu-accordion-header"
                                        id="headingTwo"
                                      >
                                        Pratical
                                      </div>
                                    </div>
                                  </>
                                }
                                answer={
                                  <div
                                    id="collapseTwo"
                                    className="accordion-collapse "
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample2"
                                  >
                                    <div className="edu-accordion-body">
                                      <>
                                        <ul>
                                          <li>
                                            1) Prayer : Concept and recitation
                                            of Pranava and hymns.
                                          </li>
                                        </ul>

                                        <ul>
                                          <li>
                                            2) Cleansing Practice (Technique,
                                            Contraindications and Benefits)
                                          </li>
                                          <li>a) Neti</li>
                                          <li>b) Trataka</li>
                                          <li>c) Kapalabhati</li>
                                        </ul>

                                        <ul>
                                          <li>
                                            3) Chalana Kriya/Loosening Practice
                                            (Technique, Contraindications and
                                            Benefits)
                                          </li>
                                          <li>
                                            a) Neck Movement (Griva Shakti
                                            Vikasaka I, II, III, IV)
                                          </li>

                                          <li>b) Shoulder Movement</li>
                                          <li>
                                            c) Bhuja Valli Shakti Vikasaka
                                          </li>
                                          <li>d) PurnaBhuja Shakti Vikasaka</li>
                                          <li>
                                            e) Trunk Movement (Kati Shakti
                                            Vikasaka I, II, III, IV, V)
                                          </li>
                                          <li>
                                            f) Knee Movement (Janu Shakti
                                            Vikasaka)
                                          </li>
                                        </ul>

                                        <ul>
                                          <li>
                                            4) Yogasana (Technique,
                                            Contraindications and Benefits)
                                          </li>
                                          <li>
                                            a) Standing Posture: Tadasana,
                                            Vrikshasana, ArdhaChakrasana,
                                            Padahastasana, Trikonasana.
                                          </li>
                                          <li>
                                            b) Sitting Posture: Bhadrasana,
                                            Vajrasana, Ardha-Ushtrasana,
                                            Ushtrasana, Shashankasana,
                                            Mandukasana, UttanaMandukasana,
                                            Vakrasana.
                                          </li>
                                          <li>
                                            c) Prone Posture: Makarasana,
                                            Bhujangasana, Shalabhasana.
                                          </li>
                                          <li>
                                            d) Supine Posture: Uttanapadasana,
                                            Ardhahalasana, Setubandhasana,
                                            Markatasana, Pawanamuktasana,
                                            Shavasana.
                                          </li>
                                        </ul>

                                        <ul>
                                          <li>
                                            5) Pranayama (Technique,
                                            Contraindications and Benefits):
                                          </li>
                                          <li>a) AnulmoaViloma/NadiShodhana</li>
                                          <li>b) Ujjaye (without Kumbhaka)</li>
                                          <li>c) Shitali (without Kumbhaka)</li>
                                          <li>
                                            d) Bhramari (without Kumbhaka)
                                          </li>
                                        </ul>

                                        <ul>
                                          <li>
                                            6) Dhyana (Technique and Benefits):
                                          </li>
                                          <li>a) Body Awareness</li>
                                          <li>b) Breath Awareness</li>
                                          <li>c) Yoga Nidra</li>
                                        </ul>
                                        <ul>
                                          <li>
                                            7) Classes related to life
                                            management and preventive health
                                          </li>
                                        </ul>
                                      </>
                                    </div>
                                  </div>
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-5 col-sm-6">
                  <img
                    src={syllabus}
                    alt="Description of Image"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <section className="step-bg pt50 pb80 ">
            <div className="container p-4">
              <div className="row">
                <div className="lg:w-1/2 lg:pr-12  v-center">
                  <div className="common-heading m-text-c lg:pr50">
                    <div className="mb-4">
                      <img src={YVC} alt="YVC" className="w-full rounded-lg" />
                    </div>
                    <h2
                      className="mb20 text-2xl font-poppins text-center"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      “Yoga Certification Board Accreditation”
                    </h2>
                    <p
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="font-poppins text-base text-center"
                    >
                      You will get a Certificate on completion of 15 day Live{" "}
                      <br />
                      <span className="text-green-800">
                        {" "}
                        “Yoga Volunteer course”
                      </span>{" "}
                      from{" "}
                      <span className="text-orange-500">
                        Yoga Certification Board
                      </span>
                      ,<br />
                      Ministry of AYUSH, Govt, of India
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-12 v-center m-mt30">
                  <img
                    src={certificate}
                    alt="certificate"
                    className="w-full rounded-lg mb-4"
                  />{" "}
                </div>
              </div>
            </div>
          </section>
          <section className="reviews-section pad-tb review-bg2" id="review">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-6">
                  <div className="common-heading font-poppins">
                    <h2
                      className="mb20"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Customer's <em>Speak</em>
                    </h2>
                    <p data-aos="fade-up" data-aos-delay="300">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt60">
                <div className="col-lg-12 md:col-md-10 sm:col-sm-12">
                  <div className="owl-review owl-carousel mt45">
                    <Swiper
                      modules={[Navigation, Pagination, A11y]}
                      spaceBetween={30}
                      slidesPerView={3}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                      }}
                      autoplay={{
                        delay: 50,
                        disableOnInteraction: false,
                      }}
                      speed={8000}
                      loop={true}
                    >
                      <SwiperSlide>
                        <div className="reviews-card up-hor">
                          <div className="review-text">
                            <p className="font-poppins">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <div className="-client-details-">
                            <div className="-reviewr">
                              <img
                                src={user1}
                                alt="Good Review"
                                className="img-fluid"
                              />
                            </div>

                            <div className="reviewer-text font-poppins">
                              <h5>Mario Speedwagon</h5>
                              <p>Business Owner</p>
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
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="reviews-card up-hor">
                          <div className="review-text">
                            <p className="font-poppins">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <div className="-client-details-">
                            <div className="-reviewr">
                              <img
                                src={user2}
                                alt="Good Review"
                                className="img-fluid"
                              />
                            </div>
                            <div className="reviewer-text font-poppins">
                              <h5>Mike Barboa</h5>
                              <p>Business Owner</p>
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
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="reviews-card up-hor">
                          <div className="review-text">
                            <p className="font-poppins">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <div className="-client-details-">
                            <div className="-reviewr">
                              <img
                                src={user3}
                                alt="Good Review"
                                // className="img-fluid"
                              />
                            </div>
                            <div className="reviewer-text font-poppins">
                              <h5>Natasha Chavez</h5>
                              <p>Business Owner</p>
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
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="reviews-card up-hor">
                          <div className="review-text">
                            <p className="font-poppins">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <div className="-client-details-">
                            <div className="-reviewr">
                              <img
                                src={user2}
                                alt="Good Review"
                                className="img-fluid"
                              />
                            </div>
                            <div className="reviewer-text font-poppins">
                              <h5>Mike Barboa</h5>
                              <p>Business Owner</p>
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
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                  <div className="owl-review owl-carousel mt45">
                    <Swiper
                      modules={[Navigation, Pagination, A11y]}
                      spaceBetween={30}
                      slidesPerView={4}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                      autoplay={{
                        delay: 50,
                        disableOnInteraction: false,
                      }}
                      speed={8000}
                      loop={true}
                    >
                      {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className="bg-white mt-5"
                            onClick={() => toggleVideo(index)}
                          >
                            {showVideo[index] ? (
                              <iframe
                                title={`video-${index}`}
                                src={slide.videoUrl}
                                className="w-full rounded-lg"
                                height="150px"
                                allowFullScreen
                              />
                            ) : (
                              <img
                                src={slide.imgSrc}
                                alt="Video thumbnail"
                                className="w-full rounded-lg"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="owl-review owl-carousel mt45">
                    <Swiper
                      modules={[Navigation, Pagination, A11y]}
                      spaceBetween={30}
                      slidesPerView={4}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 4,
                        },
                      }}
                      autoplay={{
                        delay: 50,
                        disableOnInteraction: false,
                      }}
                      speed={8000}
                      loop={true}
                    >
                      {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className="bg-white mt-5"
                            onClick={() => toggleVideo(index)}
                          >
                            {showVideo[index] ? (
                              <iframe
                                title={`video-${index}`}
                                src={slide.videoUrl}
                                className="w-full rounded-lg"
                                height="150px"
                                allowFullScreen
                              />
                            ) : (
                              <img
                                src={slide.imgSrc}
                                alt="Video thumbnail"
                                className="w-full rounded-lg"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="faq-section pad-tb" id="faq">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                  <div className="common-heading font-poppins">
                    <h2 data-aos="fade-up" data-aos-delay="100">
                      Frequently Asked Questions
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt60">
                <div className="col-lg-8">
                  <div className="card-2">
                    <Accordion
                      title="What is the duration of the yoga course?"
                      answer=" The course spans over 15 days, providing an immersive and comprehensive experience in yoga practice and instruction"
                    />
                  </div>
                  <div className="card-2 mt2">
                    <Accordion
                      title="Is there any prior experience required to enroll in the course?"
                      answer="No, the course is open to individuals of all experience levels. Whether you're a beginner or have some prior exposure to yoga, our program is designed to cater to a diverse range of participants."
                    />
                  </div>

                  <Accordion
                    title="Will I receive a certification upon completion?"
                    answer="Yes, participants who successfully complete the course will receive a certification from the Yoga Certification Board (YCB), recognizing your proficiency in yoga instruction."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default LandingPage;
