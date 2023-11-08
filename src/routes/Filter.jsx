import React from "react";
import PropTypes from "prop-types";

import {
  Container,
  Text,
  Stack,
  Button,
  RadioGroup,
  Radio,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

/**
 * @typedef FilterProps
 *
 * @property {func} onChangeColor
 *
 */

/**
 *
 * @param {FilterProps} props
 * @returns
 */

const Filter = ({ onChangeColor }) => {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const toast = useToast();

  const todoNotCompleted = todos.filter((todo) => !todo.completed).length;

  const handleCompletedAll = () => {
    if (todos.length === 0) {
      toast({
        title: "Error",
        description: `Không có công việc nào cả `,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: `Bạn đã completed all `,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: "todos/completedAll" });
    }
  };

  const handleInCompletedAll = () => {
    if (todos.length === 0) {
      toast({
        title: "Error",
        description: `Không có công việc nào cả `,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: `Bạn đã inCompleted all `,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: "todos/inCompletedAll" });
    }
  };

  return (
    <Container
      w={"fit-content"}
      padding={4}
      h={"fit-content"}
      background={"#262626"}
      position={"fixed"}
      borderRadius={10}
      overflow={"hidden"}
      top={274}
      left={14}
      zIndex={0}
    >
      <Stack>
        <Stack>
       
        </Stack>
        <Stack mt={4}>
         
        </Stack>
      </Stack>
    </Container>
  );
};

Filter.propTypes = {
  onChangeColor: PropTypes.func,
};

export default Filter;
