/* eslint-disable react/prop-types, jsx-a11y/interactive-supports-focus */

export const Link = ({ onClick, children }) => <div role="button" onClick={onClick}>{children}</div>;

export const Element = ({ children }) => <div>{children}</div>;
