import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import {
  Container,
  Text,
  Stack,
  RadioGroup,
  Radio,
  Flex,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import RenderList from "./RenderList";
import { useDispatch, useSelector } from "react-redux";

/**
 * @typedef ListProps
 *
 * @property {string} colorTodo
 *
 */

/**
 *
 * @param {ListProps} props
 * @returns
 */

const List = ({ colorTodo }) => {
  const todos = useSelector((state) => state.todos);
  const [stateTodo, setStateTodo] = useState("all");

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const dispatch = useDispatch();

  const handleDeleteAllTodo = (todo) => {
    if (todo === 0) {
      toast({
        title: "Error",
        description: `Không có công việc nào cần xóa cả`,
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: `Bạn đã thay xóa tất cả todos thành công`,
        status: "success",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: "todos/deleteAll" });
    }
  };

  const handleChangeState = (value) => {
    toast({
      title: "Success",
      description: `Bạn đã thay đổi state ${value} thành công`,
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    setStateTodo(value);
  };

  return (
    <Container maxW={748} background={"#191919"} pt={6} zIndex={1}>
      <RadioGroup maxW={810} pt={8} defaultValue="all">
        <Stack>
          <Flex
            direction={"row"}
            justifyContent={"end"}
            gap={10}
            color={"#fff"}
          >
            <Radio value="all" onChange={() => handleChangeState("all")}>
              All
            </Radio>
            <Radio
              value="inCompleted"
              onChange={() => handleChangeState("inCompleted")}
            >
              InCompleted
            </Radio>
            <Radio
              value="completed"
              onChange={() => handleChangeState("completed")}
            >
              Completed
            </Radio>
          </Flex>
        </Stack>
      </RadioGroup>
      <Flex justifyContent={"space-between"} pt={6} color={"#fff"}>
        <Text>Bạn có {todos.length} công việc</Text>
        <Text
          cursor={"pointer"}
          _hover={{ color: "#BDADAD" }}
          onClick={() => {
            onOpen();
          }}
        >
          Xóa tất cả
        </Text>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete All Todos
              </AlertDialogHeader>

              <AlertDialogBody>
                Bạn chắc chắc muốn xóa tất cả {todos.length} công việc
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleDeleteAllTodo(todos.length), onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
      <RenderList stateTodo={stateTodo} colorTodo={colorTodo} />
    </Container>
  );
};

List.propTypes = {
  colorTodo: PropTypes.string,
};

export default List;
