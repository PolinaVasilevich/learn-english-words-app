import React from "react";
import styled from "styled-components";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Wrapper = styled.div`
  border-radius: var(--radii);
  background-color: ${(props) => props.theme.baseColor};
  box-shadow: ${(props) => props.theme.shadow};

  text-align: center;

  width: max-content;
  margin: 0 auto;
  padding: 0.5rem 1rem;
`;

const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
`;

const PaginationItem = styled.li`
  color: ${(props) => props.theme.textColor};

  cursor: pointer;

  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
  }

  padding: 0 0.5rem;
  border-radius: 3px;
`;

const PaginationButton = styled.button`
  outline: none;
  border: none;
  background: none;
`;

const PrevButton = styled(IoChevronBack)`
  color: ${(props) => props.theme.textColor};
`;

const NextButton = styled(IoChevronForward)`
  color: ${(props) => props.theme.textColor};
`;

const Pagination = ({
  totalWords,
  wordsPerPage,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const limitpageNumbers = 3;

  for (let i = 1; i <= Math.floor(totalWords / wordsPerPage); i++) {
    pageNumbers.push(i);
  }

  //   for (let i = 1; i <= currentPage + limitpageNumbers; i++) {
  //     pageNumbers.push(i);
  //   }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        localStorage.setItem("currentPage", prev - 1);
        return prev - 1;
      });
    }
  };

  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage((prev) => {
        localStorage.setItem("currentPage", prev + 1);
        return prev + 1;
      });
    }
  };

  return (
    <Wrapper>
      <PaginationList>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <PrevButton />
        </PaginationButton>
        {pageNumbers.map((n) => (
          <PaginationItem
            key={n}
            onClick={() => paginate(n)}
            style={
              currentPage === n ? { backgroundColor: "var(--purple)" } : {}
            }
          >
            {n}
          </PaginationItem>
        ))}
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage >= pageNumbers.length}
        >
          <NextButton />
        </PaginationButton>
      </PaginationList>
    </Wrapper>
  );
};

export default Pagination;
