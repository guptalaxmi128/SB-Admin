import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { applyCouponCourse, getSCourse } from "../../actions/student/course/course";
import { addPayment } from "../../actions/student/payment/payment";

const PricePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency] = useState("INR");
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getSCourse(id));
        setAmount(res.data.coursePrice);
        setCoupon(res.data?.course_coupon[0]?.coupon?.couponNumber);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  function generateRandomReceipt() {
    return new Date().getTime().toString();
  }

  const initialReceipt = generateRandomReceipt();

  const handleApplyCoupon = async () => {
    if(!id){
      return
    }
    try {
      setLoading(true);
      const data = { courseId:id,couponNumber:coupon };
      const res = await dispatch(applyCouponCourse(data));
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
  
    try {
      let amountToSend = amount * 100;
      const paymentInfo = {
        courseId: id,
        amount: amountToSend.toString(),
        receipt: initialReceipt,
        currency: currency,
        couponCode: coupon,
      };

      console.log(paymentInfo);

      dispatch(addPayment(paymentInfo))
        .then((response) => {
          console.log(response);
          message.success("Payment details added successfully!");

          const options = {
            key: "rzp_test_yuovJjUxz5HmFs",
            name: "Swasti Bharat",
            description: "Some Description",
            order_id: response.data.id,
            handler: async (response) => {
              try {
                const paymentId = response.razorpay_payment_id;
                // const url = `http://localhost:5000/api/student/verifyPayment`;
                const url =`https://swasti.onrender.com/api/student/verifyPayment`
                const captureResponse = await axios.post(url, { response });
                console.log(captureResponse.data);
                console.log(paymentId);
              } catch (err) {
                console.log(err);
              }
            },
            // callback_url: "http://localhost:5000/api/student/verifyPayment",
            callback_url:`https://swasti.onrender.com/api/student/verifyPayment`,
            redirect: true,
            theme: {
              color: "#686CFD",
            },
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error adding payment:", error);
      message.error(error.response?.data?.message || "Failed to add payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!coupon) {
        // If no coupon is present, proceed with payment directly
        await handlePayment();
      } else {
        // If coupon is present, first apply the coupon and then proceed with payment
        await handleApplyCoupon();
        await handlePayment();
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      message.error(error.response?.data?.message || "Failed to process payment");
    }
  };

  return (
    <div>
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
                  , your gateway to a healthier and happier life through yoga!
                  Dive into our courses and embrace the joy of yoga as we
                  journey together towards wellness. Let's create a vibrant
                  community where everyone can find peace, strength, and
                  connection. Join us and start your journey to a better you
                  today!
                </p>
              </div>
            </div>
            <div className="col-lg-6 mt-4">
              <form
                role="form"
                className="get-a-quote"
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="mb-lg-5 mb-3  align-items-center">
                  <div>
                    <h4
                      className="p-0 font-poppins text-center "
                      style={{
                        color: "linear-gradient(to right, cream, lightgreen)",
                      }}
                    >
                      Yoga Volunteer Course
                    </h4>
                  </div>
                </div>
                <div className="font-poppins">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={amount}
                    disabled
                  />
                </div>
                <div className="font-poppins">
                  <input
                    type="text"
                    name="currency"
                    placeholder="Currency"
                    value={currency}
                    disabled
                  />
                </div>
                <div className="font-poppins">
                  <input
                    type="text"
                    name="receipt"
                    placeholder="Receipt"
                    value={initialReceipt}
                    disabled
                  />
                </div>

                <div className="font-poppins flex items-center">
                  <input
                    type="text"
                    name="couponCode"
                    placeholder="Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-green-600 to-green-400 
               rounded-md shadow-md text-white px-4  ml-2 mb-4 py-1"
                    onClick={handleApplyCoupon} // Add your onClick handler here
                  >
                    Apply Coupon
                  </button>
                </div>

                <button
                  type="submit"
                  id="form-submit"
                  className="btn-rd w-100 font-poppins"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePage;
