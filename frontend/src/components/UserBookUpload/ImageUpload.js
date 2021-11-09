import React, { useState, useEffect } from "react";
import "./imageUpload.scss";

import { useDropzone } from "react-dropzone";
import { MdClose } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import { post } from "../../utils/requests";
import { bookUploadApi } from "../../utils/endpoints";

const ImageUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const previewSize = Math.max(Math.floor(12 / props.maxImages), 4);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: props.maxImages || 10,
    onDrop: (acceptedFiles) => {
      onDropFiles(acceptedFiles);
    },
  });

  async function onDropFiles(acceptedFiles) {
    setFiles(acceptedFiles);
    const promises = acceptedFiles.map(
      (file, idx) =>
        new Promise(async (resolve, reject) => {
          try {
            const payload = {
              tag: props.tag + "_" + (idx + 1),
              fileType: file.type,
            };
            const [{ signedRequest, url }] = await post(
              bookUploadApi.uploadImage,
              true,
              payload
            );
            await fetch(signedRequest, { method: "PUT", body: file });
            resolve(url);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        })
    );
    props.onLoad(true);
    const urls = await Promise.all(promises);
    setUrls(urls);
    props.onLoad(false);
  }

  useEffect(() => {
    props.onChange(urls);
  }, [urls]);

  const removeImage = (idx) =>
    setUrls(urls.filter((_, fileidx) => fileidx !== idx));
  const images = urls.map((url, idx) => (
    <Col md={previewSize} className="img mb-2 mx-auto">
      <MdClose
        onClick={() => removeImage(idx)}
        size={20}
        className="close-button"
      />
      <img style={{ width: "100%" }} src={url} />
    </Col>
  ));
  //   console.log(files);
  return urls.length > 0 ? (
    <Row className="img-container">{images}</Row>
  ) : (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p className=" text text-center">{props.tag}</p>
    </div>
  );
};

export default ImageUpload;
