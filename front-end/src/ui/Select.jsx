import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const Select = React.forwardRef(({ id, options, ...props }, ref) => {
  return (
    <StyledSelect id={id} ref={ref} {...props}>
      <option value="">Sélectionnez une option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label.toUpperCase()}
        </option>
      ))}
    </StyledSelect>
  );
});

Select.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Select.displayName = "Select";

export default Select;
