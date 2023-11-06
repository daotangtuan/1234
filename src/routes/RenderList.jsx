import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Flex,
  Card,
  CardBody,
  Checkbox,
  Select,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

/**
 * @typedef RenderListProps
 *
 * @property {string} stateTodo
 * @property {string} colorTodo
 *
 */

/**
 *
 * @param {RenderListProps} props
 * @returns
 */

const RenderList = ({ stateTodo, colorTodo }) => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const todos = useSelector((state) => {
    const filerStateTodo = state.todos.filter((todo) => {
      if (stateTodo === "completed") {
        return todo.completed;
      } else if (stateTodo === "inCompleted") {
        return !todo.completed;
      } else {
        return true;
      }
    });
    const filerColorTodo = filerStateTodo.filter((todo) => {
      if (colorTodo === "red") {
        return todo.color === "red";
      } else if (colorTodo === "gray") {
        return todo.color === "gray";
      } else if (colorTodo === "blue") {
        return todo.color === "blue";
      } else if (colorTodo === "purple") {
        return todo.color === "purple";
      } else {
        return true;
      }
    });
    return filerColorTodo;
  });

  const handleChangeStateTodo = (id) => {
    toast({
      title: "Success",
      description: `Bạn đã thay đổi status thành công`,
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    dispatch({
      type: "todos/changeState",
      payload: { id: id },
    });
  };

  const handleChangeColor = (id, color) => {
    toast({
      title: "Success",
      description: `Bạn đã thay đổi màu ${color} thành công`,
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    dispatch({ type: "todos/changeColor", payload: { id: id, color: color } });
  };

  const handleDeleteTodo = (id, title) => {
    toast({
      title: "Success",
      description: `Bạn đã xóa ${title} thành công`,
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    dispatch({ type: "todos/deleteTodo", payload: { id: id } });
  };

  return (
    <Container mt={4} height={400} overflowY={"auto"} maxW={"100%"} padding={0}>
      {todos &&
        todos.map((todo, index) => (
          <Card
            key={index}
            mb={2}
            borderRadius={8}
            overflow={"hidden"}
            border={"none"}
          >
            <CardBody
              display={"flex"}
              justifyContent={"space-between"}
              bg={"#262626"}
            >
              <Flex gap={2} alignItems={"center"}>
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => handleChangeStateTodo(todo.id)}
                />
                <Text color={"#fff"}>{todo.title}</Text>
              </Flex>
              <Flex gap={2} align={"center"}>
                <Select
                  value={todo.color}
                  color={"#fff"}
                  onChange={(e) => handleChangeColor(todo.id, e.target.value)}
                >
                  <option value="red">Red</option>
                  <option value="gray">Gray</option>
                  <option value="blue">Blue</option>
                  <option value="purple">purple</option>
                </Select>
                <Button
                  size={"xs"}
                  backgroundColor={"#373737"}
                  _hover={{ background: "#484848" }}
                  onClick={onOpen}
                >
                  <BsTrash color="#fff" />
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Todo
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Bạn chắc chắn muốn xóa {todo.title}
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            handleDeleteTodo(todo.id, todo.title), onClose();
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
            </CardBody>
          </Card>
        ))}
    </Container>
  );
};

RenderList.propTypes = {
  colorTodo: PropTypes.string,
  stateTodo: PropTypes.string,
};

export default RenderList;
