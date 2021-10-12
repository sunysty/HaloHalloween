import React from "react";
import styled from "styled-components";

const Container = (props) => {
  const { height, margin, children } = props;
  const styles = {
    height: height,
    margin: margin,
  };
  return (
    <>
      <ContainerWrap {...styles}>{children}</ContainerWrap>
    </>
  );
};
Container.defaultProps = {
  height: "auto",
  margin: "0 auto",
};
const ContainerWrap = styled.div`
  width: 1080px;
  ${(props) => (props.height ? `height:${props.height}` : "auto")};
  ${(props) => (props.margin ? `margin:${props.margin}` : "0 auto")};
`;
export default Container;
