import { ReactComponent as EditIcon } from './edit.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export default function EditUserButton() {

  return (
    <>
      <Link to="/edit">
      <span
          className="edit-icon"
          style={{ cursor: 'pointer' }}
        >
          <EditIcon width="25" height="25" />
        </span>
      </Link>
    </>
  );
}