import React from 'react';

import classNames from 'classnames';

type CustomButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  styles: {
    base: string; // Base class name
    conditionals?: Record<string, boolean>; // Object for conditional classes
  };
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  disabled = false,
  styles,
}) => {
  const { base, conditionals = {} } = styles;

  return (
    <div
      className={classNames(base, conditionals)}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {label}
    </div>
  );
};

export default CustomButton;
