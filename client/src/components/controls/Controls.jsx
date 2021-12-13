import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { CustomSelect } from "../customSelect/CustomSelect.js";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Controls = ({ getFilteredWords }) => {
  const { id } = useParams();

  const allFilters = useMemo(() => {
    return JSON.parse(localStorage.getItem("selectedFilters")) || [];
  }, []);

  const activeFilters = useMemo(() => {
    if (allFilters.length) {
      return allFilters.filter((f) => f.id === id);
    }
    return [];
  }, [allFilters, id]);

  const [filter, setFilter] = useState(() => {
    return activeFilters.length ? activeFilters[0].filter : options[0];
  });

  const options = [
    { value: "all", label: "All" },
    { value: "learned", label: "Learned" },
    { value: "new", label: "New" },
  ];

  useEffect(() => {
    const filters = allFilters.filter((f) => f.id !== id);

    localStorage.setItem(
      "selectedFilters",
      JSON.stringify([...filters, { id, filter }])
    );
    getFilteredWords(filter);
  }, [filter, id, allFilters, getFilteredWords]);

  return (
    <Wrapper>
      <CustomSelect
        options={options}
        classNamePrefix="react-select"
        value={filter}
        onChange={setFilter}
      />
    </Wrapper>
  );
};

export default Controls;
