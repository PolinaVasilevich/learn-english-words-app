import React from "react";
import { Input, ErrorMessage } from "../../styles/wordLearnPageStyled";
import { Button } from "../MainButton";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  word: Yup.string().required("This field is required"),
  pronunciation: Yup.string().required("This field is required"),
  translate: Yup.string().required("This field is required"),
  definition: Yup.string().required("This field is required"),
});

const AddWordForm = ({ onSubmit }) => {
  const fieldsForm = ["word", "pronunciation", "translate", "definition"];

  return (
    <div>
      <h1>Add new word in this list</h1>
      <Formik
        initialValues={{
          word: "",
          pronunciation: "",
          translate: "",
          definition: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            {fieldsForm?.map((field) => (
              <div key={field}>
                <Input
                  name={field}
                  placeholder={`Enter a ${field}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[field]}
                  error={errors[field] && touched[field]}
                />
                {errors[field] && touched[field] && (
                  <ErrorMessage>{errors[field]}</ErrorMessage>
                )}
              </div>
            ))}

            <Button type="submit">Add word</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddWordForm;
