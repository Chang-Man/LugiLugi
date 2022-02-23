import React, { useState } from 'react';
import Select from 'react-select';
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
      <Select options={options} />
      <button>하이</button>
      <input />
      <input />
    </div>
  );
};

export default MakeLugi;
