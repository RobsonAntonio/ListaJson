import React, { useState, useEffect } from 'react';
import api from './src/service/api';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Cadastros from './src/Cadastros';
function App() {
  const [usuarios, setUsuarios] = useState([])
  const [user, setUser] = useState({
    name: '',
    gender: '',
    email: '',
    status: '',
  });

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

  useEffect(() => {
    async function dados() {
      const response = await api.get('public/v2/users/')
      console.log(response.data)
      setUsuarios(response.data)

    }

    dados()

  }, []);

  const salvarCadastro = () => {
    var myHeader = new Headers();
    myHeader.append(
      'Authorization', 'Bearer c9e04ab0405c46aef5453243d4e1080f35f7ea90be2b71ba98f34a4c93be9a46'
    );
    myHeader.append('Content-Type', 'application/json')
    fetch('https://gorest.co.in/public-api/users', {
      method: 'POST',
      headers: myHeader,
      body: JSON.stringify({
        name: user.name,
        gender: user.gender,
        email: user.email,
        status: user.status
      })
    })
      .then((response) => {
        response.text()
      })

      .then((result) => console.log(result))
      .catch((error) => console.log(error))

    alert('Salvo com Sucesso!')

  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitulo}>Cadastro Usuário</Text>
        <Text style={styles.text} >Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => onChangeName(value)}
        />
        <Text style={styles.text} >Gênero</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => onChangeGender(value)}
        />
        <Text style={styles.text} >E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => onChangeEmail(value)}
        />
        <Text style={styles.text} >Status</Text>
        <TextInput
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
        keyExtractor={item => String(item.id)}
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