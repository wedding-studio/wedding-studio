import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const ButtonAdd = ({title,st,onPress}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.container,st]} 
      onPress={onPress}>
        <Ionicons name="add-circle-outline" size={30} color="#ffffff" />
        <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ButtonAdd

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,width:'90%',
        alignSelf:'center',
        height:50,
        backgroundColor:'#2051E5',
        borderRadius:10

    },
    title:{
        color:'#ffffff',
        fontSize:20
    }
})