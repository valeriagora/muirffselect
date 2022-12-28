import * as React from "react";
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { ReactComponent as IconDown } from "./icon.svg";
import { types } from "./App";

export const SelectContainer = styled("div")({
  position: "relative",
  width: "100%",
});

const isPrimary = (type) => type === types.primary;

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  console.log("buttonprops", props);
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <IconDown />
    </button>
  );
});

const StyledButton = styled(Button, {
  shouldForwardProp: () => true,
})(
  ({ theme, error, selectType }) => `
  width: 100%;
  box-sizing: border-box;
  height: ${isPrimary(selectType) ? "48" : "40"}px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  background: #2F313B; // x4
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border: 2px solid ${error ? "#FF5252" : "#474A59"}; // x6
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* Secondary/X2 */
  color: #C8CAD0;
  position:relative;

  &:hover {
    background:#3B3E4A;//x5
    border-color:#6C7080; //x3
    & > svg {
      color: #fff;
    }
  }
  &.${selectUnstyledClasses.focusVisible} {
    border-color: ${error ? "#FF5252" : "#fff"};
    & > svg {
      color: #fff;
    }
  }
  &:active {
    background: #3B3E4A;//x5

    border-color: #6C7080; //x3
    & > svg {
      color: #fff;
    }
  }
  & > svg {
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  &.Mui-expanded {
    & > svg {
      transform: rotate(180deg);
    }
  }
  outline: none !important;
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  margin: 0 0 0 8px;
  padding:0;
  overflow: auto;
  background: #3B3E4A;// x5
  // background: slateblue; // x5

  max-height:240px;
  height:240px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  outline:none;
  overflow-y: scroll;

  scrollbar-color: #C8CAD0 #6C7080;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    transform: translateX(20px);
    margin:10px;
    margin-right:10px;
    width: 2px;
    background-color: #6C7080;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #C8CAD0;
    border-radius: 12px;
  }
  ::-webkit-scrollbar-track {
    padding:10px;
    background-color: #6C7080;
  }
  box-shadow:none;
  // position:relative; 
 
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
// font-family: 'Manrope';
// font-weight: 600;
// font-size: 16px;
// line-height: 24px;

  list-style: none;
  padding: 12px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: default;
  background:#3B3E4A; // x5
  &:last-of-type {
    border-bottom: none;
  }
  &.${optionUnstyledClasses.selected} {
    background-color:#2F313B; // x4
  }
  &.${optionUnstyledClasses.highlighted} {
    background:#292A33;//x3
  }
  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color:#2F313B; // x4
  }
  &:hover {
    background:#292A33;//x3
  }
  margin:0;
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  // position: relative;
  background: #3b3e4a; // x5
  // background: slateblue; // x5
  padding: 8px 8px 8px 0;
  box-sizing: border-box;
  width: 100%;
  border-radius: 12px;
  overflow-x: hidden;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   left: 300px;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   z-index: 999;
  //   background: pink;
  //   pointer-events: none;
  // }
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };
  return <SelectUnstyled {...props} ref={ref} slots={slots} />;
});

export default function UnstyledSelectIntroduction({
  // opened,
  setFieldTouched,
  ...props
}) {
  const [opened, setOpened] = React.useState(false);
  const onListboxOpenChange = (open) => {
    // setFieldTouched("select", false);
    setOpened(open);
  };
  const { onBlur, onFocus, onChange, ...restProps } = props;
  return (
    <SelectContainer>
      <CustomSelect
        onChange={onChange}
        value={props.value}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        // open={props.open}
        onListboxOpenChange={onListboxOpenChange}
      >
        {props.options.map((option, idx) => (
          <StyledOption key={idx} value={option.value}>
            {option.label}
          </StyledOption>
        ))}
      </CustomSelect>
      {props.error && <div>{props.error}</div>}
    </SelectContainer>
    // <>
    //   <select onChange={props.onChange} value={props.value} {...props}>
    //     {props.options.map((option) => (
    //       <option value={option.value} key={option.value}>
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>
    //   {props.error && <p>{props.error}</p>}
    // </>
  );
}
