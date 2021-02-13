import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReusableForm from "./ReusableForm/ReusableForm";
import { editList } from "../store/actions/list";

const EditList = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [newRank, setNewRank] = useState("");
  const rankOptions = ["", "1", "2", "3", "4", "5"];

  const [editListForm, setEditListForm] = useState({
    listTitle: {
      label: "List title",
      placeholder: "Enter list title",
      type: "text",
      value: props.listTitle,
      errorMsg: "Your list title cannot be empty!",
      isValid: true,
    },
    listType: {
      label: "List type",
      placeholder: "Enter a list type",
      value: props.listType,
      errorMsg: "Please provide a list type",
      isValid: true,
    },
    rank: {
      //label: "Rank",
      type: "rankswap",
      options: props.entries.map((entry) => {
        return {
          label: entry.name,
          type: "text",
          value: entry.rank,
          placeholder: "Enter a rank from 1 to 5",
        };
      }),
      errorMsg: "All ranks must have a unique value between 1 and 5",
      isValid: true,
    },
  });
  const formTitle = "Edit List";
  const formLayout = ["listTitle", "listType", "rank"];

  const inputChangedHandler = (event, inputEl, name) => {
    let updatedEditListForm;
    if (inputEl === "rank") {
      updatedEditListForm = {
        ...editListForm,
        [inputEl]: {
          ...editListForm[inputEl],
          options: editListForm[inputEl].options.map((option) => {
            // console.log(option);
            if (option.label === name) {
              if (
                event.target.value.length <= 1 &&
                rankOptions.includes(event.target.value)
              ) {
                option.value = event.target.value;
              }
            }
            return {
              ...option,
            };
          }),
        },
      };
    } else {
      updatedEditListForm = {
        ...editListForm,
        [inputEl]: {
          ...editListForm[inputEl],
          value: event.target.value,
        },
      };
    }

    // console.log(updatedEditListForm.rank);
    setEditListForm(updatedEditListForm);
  };

  const validateInputs = () => {
    let inputErrors = {};
    let valid = true;
    let rankCounts = {};

    let newConfig = {
      ...editListForm,
      listTitle: {
        ...editListForm.listTitle,
      },
      listType: {
        ...editListForm.listType,
      },
      rank: {
        ...editListForm.rank,
      },
    };
    if (!editListForm.listTitle.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        listTitle: editListForm.listTitle.errorMsg,
      };
      newConfig = {
        ...newConfig,
        listTitle: {
          ...newConfig.listTitle,
          isValid: false,
        },
      };
    }
    if (!editListForm.listType.value) {
      valid = false;
      inputErrors = {
        ...inputErrors,
        listType: editListForm.listType.errorMsg,
      };
      newConfig = {
        ...newConfig,
        listType: {
          ...newConfig.listType,
          isValid: false,
        },
      };
    }
    editListForm.rank.options.forEach((option) => {
      console.log(option.value);
      if (!option.value) {
        valid = false;
        inputErrors = {
          ...inputErrors,
          rank: editListForm.rank.errorMsg,
        };
        newConfig = {
          ...newConfig,
          rank: {
            ...newConfig.rank,
            isValid: false,
          },
        };
        return;
      } else {
        rankCounts[option.value] = rankCounts[option.value]
          ? rankCounts[option.value] + 1
          : 1;
      }
    });
    for (let rank in rankCounts) {
      if (rankCounts[rank] > 1) {
        console.log("false");
        valid = false;
        inputErrors = {
          ...inputErrors,
          rank: editListForm.rank.errorMsg,
        };
        newConfig = {
          ...newConfig,
          rank: {
            ...newConfig.rank,
            isValid: false,
          },
        };
        break;
      }
    }
    setErrors(inputErrors);
    setEditListForm(newConfig);
    return valid;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(editListForm);
    if (validateInputs()) {
      console.log(
        editListForm.listTitle.value,
        editListForm.listType.value,
        editListForm.rank
      );
      props.closeHandler();
      dispatch(
        editList(
          editListForm.listTitle.value,
          editListForm.listType.value,
          editListForm.rank.options,
          props.listId
        )
      );
      window.parent.location = window.parent.location.href;
    }
  };

  let modalBody = (
    <ReusableForm
      closeHandler={props.closeHandler}
      show={props.show}
      type="edit"
      config={editListForm}
      title={formTitle}
      changed={inputChangedHandler}
      validate={validateInputs}
      errors={errors}
      submit={submitHandler}
      layout={formLayout}
    />
  );
  return modalBody;
};

export default EditList;
