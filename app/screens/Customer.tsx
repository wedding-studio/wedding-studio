import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import FormSearch from "../FormSearch"
import ButtonAdd from "../ButtonAdd";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { isLoading } from "expo-font";
import { router } from "expo-router";

const Customer = () => {
    const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [task, setTask] = useState(null);
  const [task_id, setTask_id] = useState(null);
  const [addVisiable, setAddVisiable] = useState(false);
  const [nameSV, setnameSV] = useState('');
  const [note, setnote] = useState('');
  const [price, setprice] = useState('');
  const [VlnameSV, setVLnameSV] = useState('');
  const [VLnote, setVLnote] = useState('');
  const [VLprice, setVLprice] = useState('');

  const getDataLocal = async () => {
    try {
      let employee = await AsyncStorage.getItem("employee");
      employee = JSON.parse(employee!!);
      setUser(employee);

      let token = await AsyncStorage.getItem("token");
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async () => {
    console.log(`${process.env.REACT_APP_API_URL}/customer`);
    console.log(token);

    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer`, // get and delete no have params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomer(response.data);
      console.log(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerById = async (id) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/customer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data);
      getCustomer();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (newCustomerData) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/create`, // post, patch, put have params
        newCustomerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        console.log("Task created successfully");
        getCustomer();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataLocal();
  }, []);

  useEffect(() => {
    if (user && token) {
      getCustomer();
    }
  }, [user, token]);


  const confirmDelete = () => {
  
  }


  const listItems = customer.map((item, index) => (
    
    <TouchableOpacity style={{margin:5,backgroundColor:'#F0F8FF',padding:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} key={index}   onPress={() => {
      console.log(item._id);
    //   router.navigate({
    //       pathname: "screens/DetailService",
    //       params: { id: item._id },
    //   });
  }}>
      
        
       <View>
       <Text style={{fontSize: 19, fontWeight: '700', color: '#000',marginTop:10}}>Tên: {item.fullName}</Text>
        <Text style={{fontSize: 12,marginTop:10}}>Địa chỉ: {item.address}</Text>
     
      
        
          
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'red',marginTop:10 }}>SDT: {item.phone} </Text>
       </View>
        
        
       <TouchableOpacity onPress={()=>{
         Alert.alert(
            "Delete Service",
            "Are you sure you want to delete this service?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () =>deleteCustomer(item._id) }
            ],
            { cancelable: false }
          );
         
       }}>
       <Ionicons name="trash-outline" size={24} color={'red'} />

       </TouchableOpacity>
       
  
    </TouchableOpacity>
  ));





  return (
    <SafeAreaView>
    <GestureHandlerRootView>
  
      <ScrollView style={{backgroundColor:'#ffffff'}}>


      <View style={{padding:10}}>
      <FormSearch hint={"Dịch vụ bạn muốn tìm"} size={24} coLor={'black'} st={{  marginBottom:10}} />
       

        <ButtonAdd title={'Thêm khách hàng mới'} st={{ marginTop: 30,marginBottom:20 }}
          onPress={() => {
           setAddVisiable(true);
              
         

            
          }}
        />

        {
          (loading) ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ScrollView>
            {listItems}
          </ScrollView>
         
            // Rest of the code
          )


        }
         <Modal visible={addVisiable}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 20
            
            }}>Thêm khách hàng mới</Text>
            <TextInput placeholder="Nhập tên khách hàng" style={styles.edittext} onChangeText={setnameSV}/>
            <Text style={{color:'red',marginLeft:10}}>{VlnameSV}</Text>
            <TextInput placeholder="Nhập địa chỉ" style={styles.edittext} onChangeText={setnote} />
            <Text style={{color:'red',marginLeft:10}}>{VLnote}</Text>
            <TextInput placeholder="Nhập số điện thoại" style={styles.edittext} onChangeText={setprice} />
            <Text style={{color:'red',marginLeft:10}}>{VLprice}</Text>
            <ButtonAdd title={'Thêm khách hàng mới'} st={{ marginTop: 30,marginBottom:20 }}
          onPress={() => {

            let check = true;
            if(nameSV.trim() === '') {
              setVLnameSV('Tên khách hàng không được để trống');
              check = false;

            }else{
              setVLnameSV('');
            }


            if(note.trim() === '') {
              setVLnote('địa chỉ không được để trống');
              check = false;

            }else{
              setVLnote('');
            }



            if(price.trim() === '') {
              setVLprice('SDT không được để trống');
              check = false;

            }else if(isNaN(Number(price))||price.trim().length<10){
              setVLprice('sdt phải là số và > 10 số');
              check = false;
            }else{
              setVLprice('');
            }



           if(check==true){
            const newTaskData = {
              "fullName": nameSV,
              "address": note,
              
              "phone": price,
              
            };
            console.log(newTaskData);
            setnameSV('');
            setnote('');
            setprice('');

            createTask(newTaskData);
            setAddVisiable(false);
           }
          }}
        />
          <Text onPress={()=>setAddVisiable(false)} style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 20
            
            }}>Quay lại</Text>

          </Modal>




      </View>
      </ScrollView>

    </GestureHandlerRootView>
  </SafeAreaView>
  )
}

export default Customer

const styles = StyleSheet.create({
    edittext:{
        height:50,
        borderWidth:1,
        borderColor:'#000000',
        borderRadius:12,
        margin:10
      }
})