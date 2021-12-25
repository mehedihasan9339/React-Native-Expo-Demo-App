import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from "react";
import { Permissions, Contacts } from 'expo';

export default function App() {
  const [data, setData] = useState(null);

  const getData = async () => {
    //const resp = await fetch("https://api.sampleapis.com/coffee/hot");
    const resp = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan.json");
    const data = await resp.json();
    console.log(data);
    setData(data.quran);
  };
  //on first mount, fetch data.
  useEffect(() => {
    getData();
  }, []);

  const Item = ({ chapter, verse, description }) => (
    <View style={styles.items}>
      <Text style={styles.title}>
        Chapter: {chapter} | Verse: {verse}
      </Text>
      <Text style={styles.description}> {description} </Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <Item chapter={item.chapter} verse={item.verse} description={item.text} title={item.verse} index={index} />
  );



  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>আল-কুরআন</Text>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'seagreen',
    padding: 5
  },
  description: {
    backgroundColor: 'lightseagreen',
    padding: 5
  },
  items: {
    margin: 5
  },
  heading: {
    backgroundColor: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginTop: 25,
    padding: 5
  },
});
