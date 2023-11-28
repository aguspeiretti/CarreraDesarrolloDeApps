import { StatusBar } from "expo-status-bar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function App() {
  const [textItem, setTextItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemSelectedToDelete, setItemSelectedToDelete] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeTextHandler = (text) => {
    setTextItem(text);
  };

  const addItemToList = () => {
    if (!textItem) {
      alert("Please enter an item");
      return;
    }
    setItemList((prevItemList) => [
      ...prevItemList,
      { id: itemList.length + 1, value: textItem },
    ]);
    setTextItem("");
  };

  const onSelectItemHandler = (id) => {
    setModalVisible(!modalVisible);
    setItemSelectedToDelete(itemList.find((item) => item.id == id));
    console.log("item selected:", itemSelectedToDelete);
  };
  const onDeleteHandler = () => {
    setItemList(itemList.filter((item) => item.id !== itemSelectedToDelete.id));
    setItemSelectedToDelete({});
    setModalVisible(!modalVisible);
  };

  const renderListItem = ({ item }) => {
    return (
      <View style={styles.contenedorTarea}>
        <View style={styles.tarea} key={item.id}>
          <Text style={styles.textTarea}>{item.value}</Text>
        </View>
        <Pressable
          onPress={() => onSelectItemHandler(item.id)}
          style={styles.botonEliminar}
        >
          <FontAwesome name="trash-o" style={styles.trash} />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lista de tareas</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ingresa la tarea"
            placeholderTextColor={"#fff"}
            onChangeText={onChangeTextHandler}
            value={textItem}
            style={styles.input}
          />
          <Pressable style={styles.inputButton} onPress={addItemToList}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={itemList}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Se eliminará: {itemSelectedToDelete.value}
            </Text>

            <View style={styles.modalButtonContainer}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Cancelar"
                color="#f79193"
              />
              <Button
                title="Sí, eliminar"
                onPress={onDeleteHandler}
                color="#d4494c"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#191025",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  contenedorTarea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    paddingTop: 20,
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    paddingTop: 30,
    position: "absolute",
    bottom: 30,
    right: 15,
    left: 15,
  },
  input: {
    backgroundColor: "#332941",
    flexGrow: 1,
    marginRight: 20,
    borderRadius: 15,
    padding: 10,
    color: "#fff",
  },

  listContainer: {
    marginTop: 20,
    paddingBottom: 160,
  },

  tarea: {
    flexGrow: 1,
    backgroundColor: "#332941",
    borderRadius: 10,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    padding: 10,
  },
  inputButton: {
    backgroundColor: "#f79193",
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
  },
  textTarea: {
    color: "#fff",
  },
  botonEliminar: {
    backgroundColor: "#f79193",
    width: 40,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  trash: {
    fontSize: 22,
    color: "#332941",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#291f3734",
  },
  modalContent: {
    backgroundColor: "#433852",
    padding: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
