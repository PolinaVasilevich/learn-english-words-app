import React from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Wrapper = styled.div`
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;

  z-index: 1;
`;

const Modal = styled.div`
  min-height: 50px;
  min-width: 400px;
  padding: 1.5rem;
  margin: auto;

  background-color: ${(props) => props.theme.backgroudColor};
  border-radius: var(--radii);

  position: relative;
`;

const CloseButton = styled.button`
  outline: none;
  border: none;
  background: none;

  position: absolute;
  top: 5px;
  right: 5px;

  color: ${(props) => props.theme.textColor};
`;

const ModalComponent = ({ children, modal, toggleModal }) => {
  return modal ? (
    <Wrapper>
      <Modal>
        <CloseButton onClick={toggleModal}>
          <IoClose size="1.2rem" />
        </CloseButton>
        {children}
      </Modal>
    </Wrapper>
  ) : null;
};

export default ModalComponent;
