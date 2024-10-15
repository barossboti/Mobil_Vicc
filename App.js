import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [vicc, setVicc] = useState("")
  const [adatok, setAdatok] = useState([])
  const [szoveg, setSzoveg] = useState("")

  const tomb = [
    {
      "szoveg": "Mi az, piros és lassan megy?  A paradicsomfutár!",
      "tipus": "Szójáték vicc"
    },
    {
      "szoveg": "Miért nem tud a hóember kosarazni? Mert mindig elolvad a meccs közepén!",
      "tipus": "Találós kérdés"
    },
    {
      "szoveg": "Miért vitték be a könyvtárost a rendőrségre? Mert túl sok regényt követett el.",
      "tipus": "Morbid vicc"
    },
    {
      "szoveg": "- Drágám, hol a gyerek? - Ott játszik a szomszédban. - De hát az új szomszédok nincsenek otthon! - Pont ezért.",
      "tipus": "Házasságos vicc"
    },
    {
      "szoveg": "Miért ment át a kacsa az úton? Hogy elkerülje a kacsás vicceket.",
      "tipus": "Abszurd vicc"
    }
  ];

  const sorsol = () => {
    let veletlen = Math.floor(Math.random() * tomb.length);
    setVicc(tomb[veletlen].szoveg);
  };

  const letoltes = async () => {
    let x = await fetch("https://api.chucknorris.io/jokes/random");
    let y = await x.json();
    setAdatok(y);
  };

  useEffect(() => {
    sorsol();
    letoltes();
  }, []);

  const gombnyomas = () => {
    Alert.alert("Üdvözlet", `Helló ${szoveg} !`); // Show greeting in alert
  }

  return (
    <ImageBackground source={require("./1.png")} style={styles.hatterKep}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.viccSzoveg}>{vicc}</Text>
          <TouchableOpacity style={styles.button} onPress={sorsol}>
            <Text style={styles.buttonText}>Új vicc</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#fff' : '#000',
                paddingVertical: 12,
                paddingHorizontal: 25,
                borderRadius: 8,
                marginTop: 15,
                borderWidth: 2,
                borderColor: '#fff', // White border
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
              }
            ]}
            onPress={letoltes}
          >
            <Text style={styles.buttonText}>Új Chuck Norris poén</Text>
          </Pressable>
          <Text style={styles.viccSzoveg}>{adatok.value}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            onChangeText={setSzoveg}
            placeholder="Neved"
            placeholderTextColor="#888"
            value={szoveg}
          />
          <TouchableOpacity style={styles.button} onPress={gombnyomas}>
            <Text style={styles.buttonText}>Üdvözlet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 130,
  },
  hatterKep: {
    resizeMode: "cover",
    justifyContent: "center",
    flex: 1
  },
  viccSzoveg: {
    color: "white",
    fontSize: 17,
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    lineHeight: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#fff', // White border for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "black",
  },
});
