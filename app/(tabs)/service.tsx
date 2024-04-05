import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator, FlatList, Image, TouchableOpacity, Modal } from "react-native";
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

const service = () => {
  const [service, setService] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [nameSV, setnameSV] = useState('');
  const [note, setnote] = useState('');
  const [price, setprice] = useState('');
  const [VlnameSV, setVLnameSV] = useState('');
  const [VLnote, setVLnote] = useState('');
  const [VLprice, setVLprice] = useState('');
  const [addVisitable, setaddVisitable] = useState(false);

  const getDataLocal = async () => {
    try {
      let employee = await AsyncStorage.getItem("employee");
      employee = JSON.parse(employee!!);
      setuser(employee);

      let token = await AsyncStorage.getItem("token");
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const getService = async () => {
    console.log(`${process.env.REACT_APP_API_URL}/service`);
    console.log(token);

    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).finally(() => setLoading(false));
      setService(response.data);
      console.log(response.data);


    } catch (error) {
      console.log(error);
    }


  };

  const getServiceById = async (id) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

    } catch (error) {
      console.log(error);
    }
  };

  const createService = async (data) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/service/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      getService();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataLocal();

  }, []);

  useEffect(() => {
    getService();

  }, [token, user]);



  // const renderService = ({ item }) => {
  //   return (
  //     <View>
  //       <View style={styles.containerItem}>
  //       <Image source={require('../../assets/images/logo.png')} style={styles.image} />
  //       <Text style={styles.name}>{item.name}</Text>

  //       </View>
  //  <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-between",padding:10}}>
  //  <View style={{flexDirection:'row',alignItems:'center'}}>
  //     <Text style={{fontSize:18,fontWeight:'500',marginRight:5}}>Trạng thái:</Text>
  //       {(item.status) ? (<Text>còn hoạt động</Text>):(<Text>tạm ngừng hoạt động</Text>)}
  //     </View>
  //       <Text style={{fontSize:18,fontWeight:'700',color:'red'}} >{item.price}</Text>
  //  </View>
  //     </View>
  //   );


  // };

  //....Box item service
  const listItems = service.map((item, index) => (
    
    <TouchableOpacity style={styles.container} key={index}   onPress={() => {
      console.log(item._id);
      router.navigate({
          pathname: "screens/DetailService",
          params: { id: item._id },
      });
  }}>
      <View style={styles.containerItem}>
        <Image source={require('../../assets/images/logo.png')} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={{  alignItems: 'center', justifyContent: "space-between", padding: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 5 }}>Trạng thái:</Text>
          {(item.status) ? (<Text>còn hoạt động</Text>) : (<Text>tạm ngừng hoạt động</Text>)}
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: 'red',marginTop:10 }}>{item.price} VND</Text>
      </View>
    </TouchableOpacity>
  ));




  return (
    <SafeAreaView>
      <GestureHandlerRootView>
    
        <ScrollView style={{backgroundColor:'#ffffff'}}>


        <View style={{padding:10}}>
        <FormSearch hint={"Dịch vụ bạn muốn tìm"} size={24} coLor={'black'} st={{  marginBottom:10}} />
         

          <ButtonAdd title={'Thêm dịch vụ mới'} st={{ marginTop: 30,marginBottom:20 }}
            onPress={() => {
             setaddVisitable(true);

              
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
           <Modal visible={addVisitable}>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 20
              
              }}>Thêm dịch vụ mới</Text>
              <TextInput placeholder="Nhập tên dịch vụ" style={styles.edittext} onChangeText={setnameSV}/>
              <Text style={{color:'red',marginLeft:10}}>{VlnameSV}</Text>
              <TextInput placeholder="Nhập mô tả dịch vụ" style={styles.edittext} onChangeText={setnote} />
              <Text style={{color:'red',marginLeft:10}}>{VLnote}</Text>
              <TextInput placeholder="Nhập giá dịch vụ" style={styles.edittext} onChangeText={setprice} />
              <Text style={{color:'red',marginLeft:10}}>{VLprice}</Text>
              <ButtonAdd title={'Thêm dịch vụ mới'} st={{ marginTop: 30,marginBottom:20 }}
            onPress={() => {

              let check = true;
              if(nameSV.trim() === '') {
                setVLnameSV('Tên dịch vụ không được để trống');
                check = false;

              }else{
                setVLnameSV('');
              }


              if(note.trim() === '') {
                setVLnote('mô tả dịch vụ không được để trống');
                check = false;

              }else{
                setVLnote('');
              }



              if(price.trim() === '') {
                setVLprice('giá dịch vụ không được để trống');
                check = false;

              }else if(isNaN(Number(price))||Number(price)<=0){
                setVLprice('giá dịch vụ phải là số và > 0');
                check = false;
              }else{
                setVLprice('');
              }



             if(check==true){
              const newTaskData = {
                "name": nameSV,
                "description": note,
                "status": true,
                "price": price,
                
              };
              console.log(newTaskData);

              createService(newTaskData);
              setaddVisitable(false);
             }
            }}
          />
            <Text onPress={()=>setaddVisitable(false)} style={{
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
  );
};

export default service;

const styles = StyleSheet.create({
  containerItem: {
    flexDirection:'row',
    
    backgroundColor:'#FCA311',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:12,
    borderTopRightRadius:12,

    

  },
  name:{
    color:'#ffffff',
    fontSize:18,
    marginLeft:10,
    fontWeight:'bold'
  },
  image:{
    width: 50,
   height: 50,
   
  },
  container:{
    backgroundColor:'#FCFCFC',
   margin:15,
    borderRadius:12,
  
  }
  ,
  edittext:{
    height:50,
    borderWidth:1,
    borderColor:'#000000',
    borderRadius:12,
    margin:10
  }
});
