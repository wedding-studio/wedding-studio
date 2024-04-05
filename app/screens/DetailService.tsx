import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { router, useGlobalSearchParams } from 'expo-router';
import axios from 'axios';
import { Icon } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


const DetailService = () => {
    const navigation = useNavigation();

    const goBack = () => {
      router.push('/(tabs)/service');
    };
  
    const [service, setservice] = useState([]);
    const global = useGlobalSearchParams();
    const [token, settoken] = useState(null);
    const { id } = global;
    const getServiceById = async (id: string) => {
        try {
            const token = await AsyncStorage.getItem("token");
            settoken(token);
            const service = await axios.get(
                `${process.env.REACT_APP_API_URL}/service/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setservice(service.data);

        } catch (error) {
            console.log(error);
        }
    }

    const confirmDelete = () => {
        Alert.alert(
          "Delete Service",
          "Are you sure you want to delete this service?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => removeFromWishlist() }
          ],
          { cancelable: false }
        );
      };
    const removeFromWishlist = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const response = axios.delete(
            `${process.env.REACT_APP_API_URL}/service/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          goBack();
          
          
        } catch (error) {
          console.log(error);
        }
      };
      const updateTaskStatus = async (status) => {
        try {
            const token = await AsyncStorage.getItem("token");
          let response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/service/${id}`,
            { status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data) {
            console.log("Task status updated successfully");
            goBack();
          }
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getServiceById(id);

    }, [updateTaskStatus]);



    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <ScrollView>
                    <View>
                        <View>
                            <Image source={require('../../assets/images/logo.png')} style={{ width: 70, height: 70, alignSelf: 'center' }} />
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#000000'

                            }}>Wedding Studio</Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#2051E5',
                            margin: 10,
                            gap:20,
                            padding:20,
                            borderRadius: 10,
                            backgroundColor: '#ffffff',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',

                                color: '#000000'

                            }}>
                                Dịch vụ: {service.name}


                            </Text>

                            <Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>Mô tả: </Text> {service.description}
                            </Text>
                            <Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    
                                }}>Trạng thái:</Text>
                                {
                                    service.status ? <Text style={{ color: 'green' }}>Đang hoạt động</Text> : <Text style={{ color: 'red' }}>Ngừng hoạt động</Text>
                                }
                            </Text>
                            <Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                }}>Giá: </Text>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: 'red'
                                
                                }}>
                                {service.price} VND
                                </Text>
                            </Text>
                            

                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: '#2051E5',
                            padding: 10,
                            borderRadius: 10,
                            width: '50%',
                            alignSelf: 'center',
                            alignItems: 'center'

                        }}
                        onPress={()=>updateTaskStatus((service.status)?false:true)}
                          >
                            {(service.status==true) ? 
                          (  <Text style={{
                                color: '#ffffff',
                                fontSize: 18,
                                fontWeight: 'bold',

                            }} >Ngừng hoạt động</Text>) : 
                            (  <Text style={{
                                color: '#ffffff',
                                fontSize: 18,
                                fontWeight: 'bold',

                            }} >Bật dịch vụ</Text>)}
                            </TouchableOpacity>
                        
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 40
                        
                        }}>
                            
                            <TouchableOpacity style={{
                                backgroundColor: 'red',
                                padding: 10,
                                borderRadius: 10,
                                width: '30%',
                                
                                alignItems: 'center'
                            }} 
                            onPress={confirmDelete}>
                               
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                          
                            backgroundColor: '#2051E5',
                                padding: 10,
                                borderRadius: 10,
                                width: '30%',
                                
                                alignItems: 'center'
                            }}>
                               
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>Sửa</Text>
                            </TouchableOpacity>
                                
                            </View>
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default DetailService

const styles = StyleSheet.create({})