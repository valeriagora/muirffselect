import Select from "./Select";

import { Form, Field } from "react-final-form";
const SelectInput = ({
  input,
  meta,
  options,
  setFieldTouched,
  placeholder,
  // label,
  // helperText,
  id,
  selectType,
  ...props
}) => {
  const onChange = (e, value) => {
     input.onChange(value);
  };
  // console.log("touched", meta.touched);
  // console.log("error", meta.error);
  console.log("meta", meta);

  const onFocus = (e) => {
    console.log("focus");
    // typeof setFieldTouched === "function" && setFieldTouched("select", false);

    input.onFocus(e);
  };
  const onBlur = (e) => {
    console.log("blur");
    // typeof setFieldTouched === "function" && setFieldTouched("select", false);

    input.onBlur(e);
  };
  return (
    <Select
      id={id}
      type={selectType}
      options={options}
      value={input.value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      setFieldTouched={setFieldTouched}
      name={input.name}
      error={meta.touched && meta.error ? meta.error : undefined}
      {...props}
      // label={label}
      // helperText={helperText}
    />
  );
};

const options = [
  { value: 10, label: "Documentation" },
  { value: 20, label: "Components" },
  { value: 30, label: "Features" },
  { value: 40, label: "Documentation 2" },
  { value: 50, label: "Components 2" },
  { value: 60, label: "Features 2" },
  { value: 70, label: "Documentation 3" },
  { value: 80, label: "Components 3" },
  { value: 90, label: "Features 3" },
  { value: 100, label: "Documentation 4" },
  { value: 110, label: "Components 4" },
  { value: 120, label: "Features 4" },
  { value: 130, label: "Documentation 5" },
  { value: 140, label: "Components 5" },
  { value: 150, label: "Features 5" },
];

export const setFieldTouched = (args, state) => {
  const [name, touched] = args;
  // console.log("name,touched", name, touched);
  const field = state.fields[name];
  if (field) {
    field.touched = !!touched;
  }
};
const required = (value) => {
  return value ? undefined : "Requried";
};
export default function App() {
  const handleSubmit = (v) => {
    console.log("v", v);
  };

  const onListboxOpenChange = (open) => {};

  return (
    <Form onSubmit={handleSubmit} mutators={{ setFieldTouched }}>
      {({ handleSubmit, form }) => (
        <form
          style={{
            width: "500px",
          }}
          className="form"
          onSubmit={handleSubmit}
        >
          <Field
            name="select"
            component={SelectInput}
            options={options}
            validate={required}
            setFieldTouched={form.mutators.setFieldTouched}
            selectType={types.secondary}
            // onListboxOpenChange={onListboxOpenChange}
          ></Field>
          <br />
          <button>Submit</button>
        </form>
      )}
    </Form>
    // <Select options={options} value={value} onChange={onChange} />
  );
}

export const types = {
  primary: "primary",
  secondary: "secondary",
};
