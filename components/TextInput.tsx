import React, { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-72 p-2">
      <label htmlFor={id} className="bodytext mb-1 text-sm font-semibold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-yacht bodytext border-2 px-3 py-2 rounded"
      />
    </div>
  );
};

export default TextInput;
