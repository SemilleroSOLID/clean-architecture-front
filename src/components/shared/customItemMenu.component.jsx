import React from 'react';

const CustomItemMenu = ({ title, link }) => {
  return (
    <li className="option">
      <a className="option__text" href={link}>{title}</a>
    </li>
  );
};

export { CustomItemMenu };