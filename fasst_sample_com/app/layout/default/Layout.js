import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  min-height: 100%;
  display : flex;
`;

const Layout = ({
  children
}) => (
  <StyledLayout>
    {children}
  </StyledLayout>
);


export default Layout;
