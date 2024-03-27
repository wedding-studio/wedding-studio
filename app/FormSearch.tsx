import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const FormSearch = ({hint,size,coLor,st}) => {
  return (
    <View style={[{flexDirection:'row',width:"90%",height:50,backgroundColor:'#F2E1E1',alignItems:'center',alignSelf:'center',borderRadius:15,padding:5},st]}>
      <Ionicons name="search" size={size} color={coLor} />
      <TextInput placeholder={hint} />
    </View>
  )
}

export default FormSearch

const styles = StyleSheet.create({})