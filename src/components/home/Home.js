import React from "react";
import service from "../../assets/icons/customer-services.png";
import happiness from "../../assets/icons/happiness.svg";
import support from "../../assets/icons/support.svg";
import phone from "../../assets/icons/phone-call.svg";
import idSvg from "../../assets/icons/id.svg";
import correct from "../../assets/icons/correct.svg";
import coin from "../../assets/icons/coin.svg";
import yogaGirl from "../../assets/yoga-girl.avif";
import time from "../../assets/icons/fast-time.png";
import family from "../../assets/icons/family.png";
import umbrella from "../../assets/icons/umbrella.png";
import heart from "../../assets/icons/heart.png";
import team from "../../assets/icons/team.png";
import globe from "../../assets/icons/globe.png";
import health from "../../assets/icons/health-care.png";
import old from "../../assets/icons/old.png";
import baby from "../../assets/icons/baby-boy.png";
import girl from "../../assets/icons/beautiful-curly-girl.png";
import bycycle from "../../assets/icons/bycicle.png";
import car from "../../assets/icons/car.png";
import invest from "../../assets/icons/invest.png";
import building from "../../assets/icons/building.png";
import homeloan from "../../assets/icons/homeloan.png";
import partner1 from "../../assets/logo/uilogos-1.png";
import partner2 from "../../assets/logo/uilogos-2.png";
import partner3 from "../../assets/logo/uilogos-3.png";
import partner4 from "../../assets/logo/uilogos-4.png";
import partner5 from "../../assets/logo/uilogos-5.png";
import partner6 from "../../assets/logo/uilogos-6.png";
import partner7 from "../../assets/logo/uilogos-7.png";
import partner8 from "../../assets/logo/uilogos-8.png";
import partner9 from "../../assets/logo/uilogos-9.png";
import partner10 from "../../assets/logo/uilogos-10.png";
import partner11 from "../../assets/logo/uilogos-11.png";
import partner12 from "../../assets/logo/uilogos-12.png";
import partnership from "../../assets/logo/partnership.png";
import saving from "../../assets/icons/piggy-bank.png";
import Team from "./Team";
import Footer from "./Footer";


const Home = () => {
  return (
    <>
     {/* <header className="top-header">
         <nav className="navbar navbar-expand-lg justify-content-between navbar-mobile fixed-top">
            <div className="container">
               <a className="navbar-brand" href="./">
               <img src="images/common/white-logo.png" alt="Logo" className="white-logo" />
               <img src="images/common/dark-logo.png" alt="Logo" className="dark-logo" />
               </a>
               <div className="hide-desk"> <a className="mobile-btn btn-call" href="tel:123-456-7890"><i className="fas fa-phone-alt"></i> <span><span className="clltxt">Happy to Help you</span> +91 123-456-7890</span></a></div>
               <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar4" aria-controls="navbar4" aria-expanded="false" aria-label="Toggle navigation">
               <span className="icon-bar top-bar"></span>
               <span className="icon-bar middle-bar"></span>
               <span className="icon-bar bottom-bar"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbar4">
                  <ul className="mr-auto"></ul>
                  <ul className="navbar-nav v-center">
                     <li className="nav-item"> <a className="nav-link" href="#home">Home</a></li>
                     <li className="nav-item"> <a className="nav-link" href="#contact">Contact</a></li>
                     <li className="nav-item"> <a className="nav-link" href="#about">About </a></li>
                     <li className="nav-item"> <a className="nav-link" href="#agent">Agents</a></li>
                     <li className="nav-item"> <a className="nav-link" href="#review">Reviews</a></li>
                     <li className="nav-item"> <a className="nav-link" href="#faq">Faqs</a></li>
                     <li className="nav-item"> <a className="nav-link btn-call hide-mob" href="tel:123-456-7890"><i className="fas fa-phone-alt"></i> <span><span className="clltxt">Happy to Help you</span> +91 123-456-7890 </span></a></li>
                  </ul>
               </div>
            </div>
         </nav>
      </header> */}
      <section className="hero-section-1  agency-bg" id="home">
         <div className="blur-bg-blocks">
            <aside className="blur-bg-set">
               <div className="blur-bg blur-bg-a"></div>
               <div className="blur-bg blur-bg-b"></div>
               <div className="blur-bg blur-bg-c"></div>
            </aside>
         </div>
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-5 v-center">
                  <div className="header-heading-1">
                     <h1 className="mb30" data-aos="zoom-out-up">Buy Insurance, <span className="fw3">The Smart Way.</span></h1>
                     <p data-aos="zoom-out-up" data-aos-delay="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus, risus sit amet auctor sodales, justo erat tempor eros.</p>
                     <a href="#modal" data-toggle="modal" data-target="#modal_aside_right" className="btnpora btn-rd2 mt30" data-aos="zoom-out-up" data-aos-delay="600">Get your Quote</a>
                  </div>
                  <div className="hero-feature" data-aos="zoom-out-up" data-aos-delay="800">
                     <div className="media v-center" >
                        <div className="icon-pora"><img src={time} alt="icon" className="w-100"/></div>
                        <div className="media-body">Quick, Easy &	Hassle Free</div>
                     </div>
                     <div className="media v-center">
                        <div className="icon-pora"><img src={service} alt="icon" className="w-100" /></div>
                        <div className="media-body">100% Claims Support</div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="img-box m-mt60 text-center" data-aos="fade-In" data-aos-delay="400" data-aos-duration="3000"><img src={girl} alt="girl" className="img-fluid" />
                  </div>
               </div>
               </div>

               <div className="row">
                  <div className="col-12">
                     <div className="service-card">
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={family} alt="icon" />
                              <p>Family Health<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={umbrella} alt="icon" />
                              <p>Term Life<br /> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={heart} alt="icon" />
                              <p>Health<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={team} alt="icon" />
                              <p>Group Health<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={globe} alt="icon" />
                              <p>Travel<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={health} alt="icon" />
                              <p>Life<br/> Insurance </p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={old} alt="icon" />
                              <p>Retirement<br/> Plans</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={baby} alt="icon" />
                              <p>Child Savings<br/> Plans</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={bycycle} alt="icon"/>
                              <p>2 Wheeler<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={car} alt="icon" />
                              <p>Car<br/> Insurance</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={invest} alt="icon"/>
                              <p>Investment<br/> Plans</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={saving} alt="icon"/>
                              <p>Saving<br/> Plans</p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={homeloan} alt="icon"/>
                              <p>Home<br/> Loan </p>
                           </a>
                        </div>
                        <div className="servicecard up-hor">
                           <a href="#">
                              <img src={building} alt="icon" />
                              <p>Commercial<br/> Loan </p>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
      </section>
      <div className="enquire-form pad-tb" id="contact">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="cta-heading m-text-c">
                     <h2 className="mb10" data-aos="fade-up" data-aos-delay="100">Key Features :-</h2>
                     <p data-aos="fade-up" data-aos-delay="300">Special features only with our company</p>
                  </div>
                  <div className="key-features itm-media-object mt60">
                     <div className="media" data-aos="fade-In" data-aos-delay="100">
                        <div className="img-ab-"><img src={service} alt="icon" className="layer" /></div>
                        <div className="media-body">
                           <h4><em>5 Minutes </em> Policy Issuance</h4>
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet ligula nec leo elementum semper. Mauris aliquet egestas metus.</p>
                        </div>
                     </div>
                     <div className="media mt30" data-aos="fade-In" data-aos-delay="300">
                        <div className="img-ab-"><img src={happiness} alt="icon" className="layer" /></div>
                        <div className="media-body">
                           <h4><em>Over 11.5 lac </em> Happy Customers</h4>
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet ligula nec leo elementum semper. Mauris aliquet egestas metus.</p>
                        </div>
                     </div>
                     <div className="media mt30" data-aos="fade-In" data-aos-delay="500">
                        <div className="img-ab-"><img src={support} alt="icon" className="layer" /></div>
                        <div className="media-body">
                           <h4><em>Dedicated </em> Support Team</h4>
                           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet ligula nec leo elementum semper. Mauris aliquet egestas metus.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 p-4 m-mt30" id="form" >
                  <div className="form-block">
                     <div className="form-header">
                        <h2><span>Contact Form</span></h2>
                        <p>Sample Flat is Ready for You</p>
                     </div>
                     <form role="form" id="contactForm" data-toggle="validator" className="shake">
                        <div className="row">
                           <div className="form-group col-sm-12">
                              <input type="text" className="form-control" id="name" placeholder="Enter name" required data-error="Please fill Out" />
                              <div className="help-block with-errors"></div>
                           </div>
                           <div className="form-group col-sm-12">
                              <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                              <div className="help-block with-errors"></div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="form-group col-sm-12">
                              <input type="text" className="form-control" id="mobile" placeholder="Enter mobile" required data-error="Please fill Out" />
                              <div className="help-block with-errors"></div>
                           </div>
                           <div className="form-group col-sm-12">
                              <select name="Dtype" id="Dtype" className="form-control" required>
                                 <option value="">Select Requirement</option>
                                 <option value="op1">Option 1</option>
                                 <option value="op2">Option 2</option>
                                 <option value="op3">Option 3</option>
                              </select>
                              <div className="help-block with-errors"></div>
                           </div>
                        </div>
                        <div className="form-group">
                           <textarea id="message" className="form-control" rows="5" placeholder="Enter your message" required></textarea>
                           <div className="help-block with-errors"></div>
                        </div>
                        <button type="submit" id="form-submit" className="btn-rd w-100">Submit</button>
                        <p className="trm"><i className="fas fa-lock"></i>We hate spam, and we respect your privacy.</p>
                        <div id="msgSubmit" className="h3 text-center hidden"></div>
                        <div className="clearfix"></div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <section className="about-bg pad-tb" id="about">
         <div className="container">
            <div className="row m-text-c">
               <div className="col-lg-6 v-center">
                  <div className="about-company">
                     <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">Save <em>Upto 90%</em> with Best Insurance Plans offered by insurers</h2>
                     <p data-aos="fade-up" data-aos-delay="300">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                     <a href="#form" className="btn-rd mt40" data-aos="fade-up" data-aos-delay="500">Get your Quote</a>
                  </div>
               </div>
               <div className="col-lg-6 v-center">
                  <div className="img-box1 m-mt30"><img src="https://images.unsplash.com/photo-1513097847644-f00cfe868607?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="feature-image" className="img-fluid" /></div>
               </div>
            </div>
         </div>
      </section>
    
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
          <section className="about-bg pad-tb" id="partners">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-lg-6 v-center">
                  <div className="partner-company">
                     <h2 className="mb20" data-aos="fade-up" data-aos-delay="100">Our <em>Partners</em></h2>
                     <p data-aos="fade-up" data-aos-delay="100">We collaborate with the best and biggest in the banking & financial Lorem Ipsum has been the industry's standard dummy text.</p>
                  </div>
                  <div className="partnerlogo mt40"  data-aos="fade-In" data-aos-delay="500">
                     <a href="#"><img src={partner1} alt="brand logo" /> </a>
                     <a href="#"><img src={partner2} alt="brand logo" /> </a>
                     <a href="#"><img src={partner3} alt="brand logo" /> </a>
                     <a href="#"><img src={partner4} alt="brand logo" /> </a>
                     <a href="#"><img src={partner5} alt="brand logo" /> </a>
                     <a href="#"><img src={partner6} alt="brand logo" /> </a>
                     <a href="#"><img src={partner7} alt="brand logo" /> </a>
                     <a href="#"><img src={partner8} alt="brand logo" /> </a>
                     <a href="#"><img src={partner9} alt="brand logo" /> </a>
                     <a href="#"><img src={partner10} alt="brand logo" /> </a>
                     <a href="#"><img src={partner11} alt="brand logo" /> </a>
                     <a href="#"><img src={partner12} alt="brand logo" /> </a>
                  </div>
               </div>
               <div className="col-lg-5 v-center">
                  <div className="img-box1 m-mt60"  data-aos="fade-In" data-aos-delay="100"><img src={partnership} alt="partner" className="img-fluid" /></div>
               </div>
            </div>
         </div>
      </section>
      <div className="cta-section pad-tb bg-fixed-img" data-parallax="scroll" data-speed="0.5" data-image-src={yogaGirl}>
         <div className="container">
            <div className="row justify-content-center text-center">
               <div className="col-lg-8">
                  <div className="cta-heading">
                     <h2 className="mb20 text-w" data-aos="fade-up" data-aos-delay="100">Request a Free Consultation!</h2>
                     <p className="text-w" data-aos="fade-up" data-aos-delay="300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet ligula nec leo elementum semper Nunc aliquet.</p>
                     <a href="#form" className="btn-rd mt40" data-aos="fade-up" data-aos-delay="500">Get your Quote →</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Team />
      <Footer />
    </>
  );
};

export default Home;
