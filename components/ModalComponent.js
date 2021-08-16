import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, Center, NativeBaseProvider } from "native-base";

const ModalComponent = ({
  showModal,
  setShowModal,
  children,
  header,
  onPress,
}) => {
  return (
    <NativeBaseProvider>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button onPress={() => setShowModal(false)}>Cancelar</Button>
              <Button style={styles.buttonAccept} onPress={() => onPress()}>
                Aceptar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  buttonAccept: {
    backgroundColor: "#E5697C",
  },
});
