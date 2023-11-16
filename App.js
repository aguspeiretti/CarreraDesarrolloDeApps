import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coder App</Text>
      <Text style={styles.title}>Primera app</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:40,
    fontStyle:"italic",
    
  },
  title:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:20,
    fontStyle:"italic",
    
  }
});
