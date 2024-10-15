import React, { useState, useEffect } from "react";
import { Spin, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getINotification } from "../../../actions/instructor/notification/notification";

const MyNotification = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getINotification());
        setData(res.data);
      } catch (error) {
        // Handle the error
        console.error("Error fetching notification:", error);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  function formatCreatedAt(createdAtString) {
    const createdAtDate = new Date(createdAtString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return createdAtDate.toLocaleDateString("en-US", options);
  }
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <section className="section-50 p-2 mt-3">
          <div className="container">
            <h3 className="m-b-50 heading-line text-lg">
              My Notifications{" "}
              <FontAwesomeIcon icon={faBell} className="user-icon" />
            </h3>
            {data.map((user) => (
              <div className="notification-ui_dd-content">
                <div className="notification-list notification-list--unread">
                  <div className="notification-list_content">
                    <div className="notification-list_img">
                      <img src="https://unsplash.it/900/?random" alt="user" />
                    </div>
                    <div className="notification-list_detail">
                      <p className="text-base">
                        <b>{user.creater}</b> send message to you
                      </p>
                      <p className="text-muted text-sm">{user.notification}</p>
                      <p className="text-muted text-sm">
                        <small>{`${formatCreatedAt(user.createdAt)}`}</small>
                      </p>
                    </div>
                  </div>
                  <div className="notification-list_feature-img">
                    <img
                      src="https://unsplash.it/974/?random"
                      alt="Feature image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MyNotification;
