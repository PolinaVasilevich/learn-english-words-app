import React, { useState } from "react";
import styled from "styled-components";

import { CustomSelect } from "../customSelect/CustomSelect";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Controls = () => {
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <input />
      <CustomSelect />
    </Wrapper>
  );
};

export default Controls;
