import styled from "styled-components";

export const Spinner = styled.div`
  border: 10px solid ${(props) => props.theme.baseColor};

  border-top: 10px solid var(--purple);
  border-radius: 50%;
  width: 100px;
  height: 100px;

  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);

  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
