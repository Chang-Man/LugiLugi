import React, { useState } from 'react';

type OptionType = {
  value: string;
  label: string;
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MakeLugi = () => {
  return (
    <div>
      <button>하이</button>
      <input />
      <input />
    </div>
  );
};

export default MakeLugi;
