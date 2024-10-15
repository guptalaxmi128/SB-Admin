import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import team1 from "../../assets/agents/team-1.jpg";
import team2 from "../../assets/agents/team-2.jpg";
import team3 from "../../assets/agents/team-3.jpg";
import team4 from "../../assets/agents/team-4.jpg";
import user1 from "../../assets/reviews/review-image-1.jpg";
import user2 from "../../assets/reviews/review-image-2.jpg";
import user3 from "../../assets/reviews/review-image-3.jpg";
import Accordion from "../accordion/Accordion";

const Team = () => {
  return (
    <>
      <section className="agent-section pad-tb" id="agent">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <div className="common-heading">
                <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                  Meet The Agents
                </h2>
                <p data-aos="fade-up" data-aos-delay="300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
          <div className="row mt30">
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="100"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img src={team1} alt="team" className="img-fluid" />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5 className="font-poppins">Shakita Daoust</h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="_blank" className="facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" target="_blank" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>

                    <a href="#" target="_blank" className="linkedin">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="300"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img src={team2} alt="team" className="img-fluid" />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5 className="font-poppins">Gerard Licari</h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="_blank" className="facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" target="_blank" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>

                    <a href="#" target="_blank" className="linkedin">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="500"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img src={team3} alt="team" className="img-fluid" />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5 className="font-poppins">Cary Montgomery</h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="_blank" className="facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" target="_blank" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>

                    <a href="#" target="_blank" className="linkedin">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-6 mt30"
              data-aos="fade-In"
              data-aos-delay="700"
            >
              <div className="full-image-card hover-scale">
                <div className="image-div">
                  <a href="#">
                    <img src={team4} alt="team" className="img-fluid" />
                  </a>
                </div>
                <div className="info-text-block">
                  <h5 className="font-poppins">Herman Running</h5>
                  <p>Insurance Agent</p>
                  <div className="social-links-">
                    <a href="#" target="_blank" className="facebook">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="#" target="_blank" className="twitter">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>

                    <a href="#" target="_blank" className="linkedin">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
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
            <div className="col-lg-6">
              <div className="common-heading font-poppins">
                <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">
                  Customer's <em>Speak</em>
                </h2>
                <p data-aos="fade-up" data-aos-delay="300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
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
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
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
    </>
  );
};

export default Team;
