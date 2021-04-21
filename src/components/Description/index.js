import { StyledDescription } from "./description.styles";

const Description = ({ description }) => {
  const htmlDescription = () => {
    return { __html: `${description}` };
  };

  return (
    <StyledDescription
      dangerouslySetInnerHTML={htmlDescription()}
    ></StyledDescription>
  );
};

export default Description;
