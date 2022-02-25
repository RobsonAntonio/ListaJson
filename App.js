import React, { useState, useEffect, useCallback } from 'react';
import api from './src/service/api';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';


import Cadastros from './src/Cadastros';
const initialState = {
  name: '',
  gender: '',
  email: '',
  status: '',
}
function App() {
  const [usuarios, setUsuarios] = useState([])


  const [user, setUser] = useState(initialState);

  const onChangeName = (value) => {
    setUser({ ...user, name: value });
  }

  const onChangeGender = (value) => {
    setUser({ ...user, gender: value });
  }

  const onChangeEmail = (value) => {
    setUser({ ...user, email: value });
  }

  const onChangeStatus = (value) => {
    setUser({ ...user, status: value });
  }

  const getUser = async () => {
    try {
      let response = await api.get('public-api/users?page=1');
      setUsuarios(response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    getUser()

  }, []);


  const salvarCadastro = async () => {
    try {
      await api.post('public-api/users', {
        name: user.name,
        gender: user.gender,
        email: user.email,
        status: user.status

      })
      alert('Salvo com Sucesso!')
      setUser(initialState)
      getUser()

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitulo}>Cadastro Usuário</Text>
        <Text style={styles.text} >Nome</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(value) => onChangeName(value)}
        />
        <Text style={styles.text} >Gênero</Text>
        <TextInput
          value={user.gender}
          style={styles.input}
          onChangeText={(value) => onChangeGender(value)}
        />
        <Text style={styles.text} >E-mail</Text>
        <TextInput
          value={user.email}
          style={styles.input}
          onChangeText={(value) => onChangeEmail(value)}
        />
        <Text style={styles.text} >Status</Text>
        <TextInput
          value={user.status}
          style={styles.input}
          onChangeText={(value) => onChangeStatus(value)}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity onPress={salvarCadastro} style={styles.botao}>
          <Text style={styles.botaoText}>Salvar</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Cadastros data={item} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD'
  },
  textTitulo: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    marginLeft: 10,
    fontWeight: 'bold',

  }, text: {
    marginTop: 5,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '95%',
    padding: 5,
    marginLeft: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10

  },
  botao: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F1e5d2'
  },
  botaoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,

  },
  textResultado: {
    fontWeight: 'bold',
    paddingLeft: 5,
    fontSize: 18
  }

})

export default App;