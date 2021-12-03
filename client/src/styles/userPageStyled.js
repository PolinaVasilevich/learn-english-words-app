import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputFileWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  text-align: center;
`;

export const InputFile = styled.input.attrs({
  type: "file",
  id: "file",
})`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

export const InputText = styled.input.attrs({
  type: "text",
})`
  margin-top: 1.2rem;
  width: 100%;
  padding: 0.3rem 1rem;

  outline: none;
  border: 1px solid var(--grey);
  border-radius: var(--radii);
  background-color: ${(props) => props.theme.backgroudColor};
  color: ${(props) => props.theme.textColor};
`;

export const UploadFileButton = styled.label.attrs({
  htmlFor: "file",
})`
  width: 100%;
  max-width: 150px;
  padding: 15px;

  background-color: var(--purple);
  color: ${(props) => props.theme.textColor};

  border-radius: var(--radii);

  cursor: pointer;
`;
