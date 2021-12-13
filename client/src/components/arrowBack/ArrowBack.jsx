import React from "react";
import { ArrowButton } from "../../styles/wordLearnPageStyled";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ArrowBack = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <ArrowButton onClick={goBack}>
      <IoArrowBack /> Back
    </ArrowButton>
  );
};

export default ArrowBack;
