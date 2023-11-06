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
          <Text fontWeight={700} fontSize={24} color={"#fff"}>
            Actions
          </Text>
          <Flex gap={2} color={"#fff"}>
            <Button
              background={"#191919"}
              _hover={{ background: "#484848" }}
              color={"#fff"}
              onClick={handleCompletedAll}
            >
              All Completed
            </Button>
            <Button
              background={"#191919"}
              _hover={{ background: "#484848" }}
              color={"#fff"}
              onClick={handleInCompletedAll}
            >
              Clear completed
            </Button>
          </Flex>
        </Stack>
        <Stack mt={4}>
          <Text fontWeight={700} fontSize={24} color={"#fff"}>
            Filter by color
          </Text>
          <RadioGroup>
            <Stack direction={"column"} gap={1}>
              <Radio
                value="red"
                colorScheme={"red"}
                color={"red"}
                onChange={() => {
                  onChangeColor("red"),
                    toast({
                      title: "Success",
                      description: `Bạn đã lọc red thành công`,
                      status: "success",
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                    });
                }}
              >
                <Text color={"red"} fontWeight={600}>
                  Red
                </Text>
              </Radio>
              <Radio
                value="gray"
                colorScheme={"gray"}
                onChange={() => {
                  onChangeColor("gray"),
                    toast({
                      title: "Success",
                      description: `Bạn đã lọc gray thành công`,
                      status: "success",
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                    });
                }}
              >
                <Text color={"gray"} fontWeight={600}>
                  Gray
                </Text>
              </Radio>
              <Radio
                value="Blue"
                colorScheme={"blue"}
                onChange={() => {
                  onChangeColor("blue"),
                    toast({
                      title: "Success",
                      description: `Bạn đã lọc blue thành công`,
                      status: "success",
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                    });
                }}
              >
                <Text color={"blue"} fontWeight={600}>
                  Blue
                </Text>
              </Radio>
              <Radio
                value="Purple"
                colorScheme={"purple"}
                onChange={() => {
                  onChangeColor("purple"),
                    toast({
                      title: "Success",
                      description: `Bạn đã lọc purple thành công`,
                      status: "success",
                      position: "top-right",
                      duration: 2000,
                      isClosable: true,
                    });
                }}
              >
                <Text color={"purple"} fontWeight={600}>
                  Purple
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </Stack>
        <Stack>
          <Text mt={2} fontWeight={700} fontSize={24} color={"#fff"}>
            Todo not completed: {todoNotCompleted}
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

Filter.propTypes = {
  onChangeColor: PropTypes.func,
};

export default Filter;
