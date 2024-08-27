import React, { createContext, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 1.4rem;
  align-items: start;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const StyledCell = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
  padding: 0.2rem 0;

  @media (max-width: 1366px) {
    font-size: 1.2rem;
`;

const StyledHeaderCell = styled(StyledCell)`
  font-size: 1.4rem; /* Taille de police de base */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1366px) {
    font-size: 1.2rem;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.propTypes = {
  columns: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} as="header">
      {React.Children.map(children, (child) => (
        <StyledHeaderCell>{child}</StyledHeaderCell>
      ))}
    </StyledHeader>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {React.Children.map(children, (child) => (
        <StyledCell>{child}</StyledCell>
      ))}
    </StyledRow>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

function Body({ data, render }) {
  if (!data.length) return <Empty>Aucun utilisateur à afficher</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
