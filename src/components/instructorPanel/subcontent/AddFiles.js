import React, { useState } from "react";
import { Button, Upload, Row, Col, Dropdown, message, Breadcrumb } from "antd";
import { EllipsisOutlined, InboxOutlined } from "@ant-design/icons";
import { addInstructorFile } from "../../../actions/instructor/content/content";
import { useDispatch } from "react-redux";

const AddFiles = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const [showNames, setShowNames] = useState([]);
  const [fileList, setFileList] = useState([]);

  const checkFileType = (file) => {
    const allowedExtensions = [
      // ".ppt",
      // ".pptx",
      // ".doc",
      // ".docx",
      // ".zip",
      ".pdf",
      ".png",
      ".jpg",
      ".jpeg",
    ];

    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValidExtension) {
      message.error(
        // "You can only upload PPT, PPTX, DOC, DOCX, ZIP, PDF, PNG, JPG, or JPEG files!"
        "You can only upload  PDF, PNG, JPG, or JPEG files!"
      );
    }

    return isValidExtension;
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
    const fileNames = fileList.map((file) => file.name);
    setShowNames(fileNames);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);

      if (fileList.length === 0) {
        message.error("Please select file.");
        return;
      }

      for (const file of fileList) {
        formData.append("ContentFile", file.originFileObj);
      }

      const res = await dispatch(addInstructorFile(formData));

      if (res.success) {
        message.success(res.message);
        setFileList([]);
      } else {
        message.error("Failed to upload files. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      console.log(error.response.data.message);
      message.error("An error occurred while uploading the files.");
    }
  };
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold  text-lg text-gray-800 font-poppins">
            Add Files
          </h2>
          <Breadcrumb className="font-poppins">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Add Files</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div>
          <div className="flex align-center justify-between">
            <div className="bg-white rounded-lg p-6 shadow-md mt-3 w-full lg:w-8/12 flex flex-col justify-center items-center">
              <h2 className="font-bold text-sm font-poppins">
                Add Files( PDF, PNG, JPG, or JPEG files)
              </h2>
              <p className="font-poppins text-sm">
                {" "}
                Upload files into your lesson.
              </p>
              <div className="m-10">
                <Upload
                  customRequest={customRequest}
                  beforeUpload={checkFileType}
                  fileList={fileList}
                  onChange={handleFileListChange}
                  multiple
                >
                  <div style={{ textAlign: "center" }}>
                    <InboxOutlined
                      style={{ color: "#ddb42c", fontSize: "32px" }}
                    />
                    <p className="font-poppins">Select files to upload</p>
                  </div>
                </Upload>
                {fileList.length > 0 && (
                  <Button
                    className="custom-btn"
                    onClick={handleUpload}
                    style={{ marginTop: "20px" }}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md mt-3 w-full lg:w-4/12 lg:ml-1" >
              <h2 className="font-poppins font-bold text-base">File Settings</h2>
              <div>
                {showNames.length > 0 && (
                  <div>
                    <h2 className="font-poppins mt-5">File Name</h2>
                    {showNames.map((name, index) => (
                      <p key={index} className="font-poppins">{name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFiles;
