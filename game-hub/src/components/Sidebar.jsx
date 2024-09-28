import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-light p-4" >
      <h2 className="text-center">Categories</h2>
      <ul className="list-group">
        <li className="list-group-item">Action</li>
        <li className="list-group-item">Adventure</li>
        <li className="list-group-item">RPG</li>
        <li className="list-group-item">Sports</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
