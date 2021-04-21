import { StyledDescription } from "./description.styles";

const Description = ({ description }) => {
  return (
    <StyledDescription
      dangerouslySetInnerHTML={{ __html: description }}
    ></StyledDescription>
  );
};

export default Description;
