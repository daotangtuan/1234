import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Heading,
  Text,
  Stack,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

/**
 * @typedef HeaderProps
 *
 * @property {func} onChangeColor
 *
 */

/**
 *
 * @param {HeaderProps} props
 * @returns
 */

const Header = ({ colorTodo }) => {
  const [inputTodo, setInputTodo] = useState("");

  const toast = useToast();

  const dispatch = useDispatch();

  const inputRef = useRef();

  const handleAddTodo = () => {
    if (inputTodo.length === 0) {
      toast({
        title: "added false",
        description: `Chưa thêm được công việc`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "added success",
        description: `Bạn đã thêm công việc ${inputTodo} thành công`,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });

      setInputTodo("");
      inputRef.current.focus();
      if (colorTodo) {
        dispatch({
          type: "todos/added",
          payload: { title: inputTodo, color: colorTodo },
        });
      } else {
        dispatch({
          type: "todos/added",
          payload: { title: inputTodo },
        });
      }
    }
  };

  const handleAddTodoByEnter = (e) => {
    if (e.key === "Enter") {
      if (inputTodo.trim().length === 0) {
        toast({
          title: "added false",
          description: `Chưa thêm được công việc`,
          status: "error",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "added success",
        description: `Bạn đã thêm công việc ${inputTodo} thành công`,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      if (colorTodo) {
        setInputTodo("");
        inputRef.current.focus();
        dispatch({
          type: "todos/added",
          payload: { title: inputTodo, color: colorTodo },
        });
      } else {
        setInputTodo("");
        inputRef.current.focus();
        dispatch({
          type: "todos/added",
          payload: { title: inputTodo },
        });
      }
    }
  };

  return (
    <Flex
      maxW={"100vw"}
      background={"#0D0D0D"}
      height={200}
      direction={"column"}
    >
      <Heading
        height={200}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          bgGradient={"linear(to-r, #3884F6, #DA0D19)"}
          bgClip="text"
          fontSize={60}
        >
          Todo
        </Text>
      </Heading>
      <Stack
        spacing={1}
        display={"flex"}
        justifyContent={"center"}
        mb={-5}
        flexDirection={"row"}
      >
        <Input
          background={"#262626"}
          placeholder="Nhập công việc ..."
          w={650}
          border={"1px solid #494949"}
          value={inputTodo}
          ref={inputRef}
          color={"#fff"}
          onKeyDown={handleAddTodoByEnter}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <Button
          _hover={{ background: "#2E88B1" }}
          background="#1E6F9F"
          transition="background 0.3s ease"
          color={"#fff"}
          onClick={handleAddTodo}
        >
          add
        </Button>
      </Stack>
    </Flex>
  );
};

Header.propTypes = {
  colorTodo: PropTypes.string,
};

export default Header;
