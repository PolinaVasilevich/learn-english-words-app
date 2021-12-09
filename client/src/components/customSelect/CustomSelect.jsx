import React from "react";
import Select from "react-select";
import styled from "styled-components";

export const CustomSelect = styled(Select).attrs({})`
  width: 150px;
  /* margin: 0 auto; */
  border-radius: var(--radii);
  font-family: var(--family);
  border: none;

  & > div {
    background-color: ${(props) => props.theme.backgroudColor};
    cursor: pointer;
  }

  .react-select {
    &__single-value {
      color: ${(props) => props.theme.textColor};
    }
    &__option {
      cursor: pointer;
    }
  }
`;
