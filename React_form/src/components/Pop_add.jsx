import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function Pop_add() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Edit page"
        centered
      >
        <h6> JavaTpoint </h6>
        <h5> JavaTpoint </h5>
        <h4> JavaTpoint </h4>
        <h3> JavaTpoint </h3>
        <h2> JavaTpoint </h2>
        <h1> JavaTpoint </h1>{" "}
      </Modal>
      <Button color="blue " onClick={open}>
        Add new peport
      </Button>
    </>
  );
}

export default Pop_add;
