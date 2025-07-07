function NodeTextInput({
  value,
  setValue,
  placeholder = "Enter text",
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="border border border-bg-200 dark:border-bg-800 component-bg-lighter rounded-md h-10 flex items-center px-3 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent"
      />
    </div>
  );
}

export default NodeTextInput;
