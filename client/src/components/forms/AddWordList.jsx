import React from "react";
import XLSX from "xlsx";

import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage, Input } from "../../styles/wordLearnPageStyled";
import {
  InputFileWrapper,
  InputFile,
  UploadFileButton,
} from "../../styles/userPageStyled";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  //   words: Yup.mixed().required("This field is required"),
  // .test("fileFormat", "xlsx only", (value) => {
  //   return value && ["application/xlsx"].includes(value.type);
  // }),
});

const initialValues = {
  name: "",
  words: null,
};

const AddWordList = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      //   console.log(values);
    },
  });

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const onUploadFile = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    const reader = new FileReader();

    reader.onload = function async(e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const dataFile = XLSX.utils.sheet_to_json(worksheet);
      setFieldValue("words", dataFile);
      handleSubmit();
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <form style={{ textAlign: "center" }}>
      <h2>Create new wordlist</h2>
      <Input
        name="name"
        placeholder="Enter a name wordlist"
        error={errors.name && touched.name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
      />
      {errors.name && touched.name && (
        <ErrorMessage>{errors.name}</ErrorMessage>
      )}
      <InputFileWrapper>
        <InputFile onChange={onUploadFile} />
        <UploadFileButton>Choose file</UploadFileButton>
      </InputFileWrapper>
    </form>
  );
};

export default AddWordList;
