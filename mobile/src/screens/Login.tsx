import React, {useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import {FirebaseError} from 'firebase/app';
import {useAuthContext} from '../context/AuthContext';
import {View, Text, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DataSnapshot, onValue} from 'firebase/database';
import {TextInput, Pressable, SafeAreaView} from 'react-native';

const Login = () => {
  const navigate = useNavigation();
  const {signin, getUser, updateStatus} = useAuth();
  const {setCredential, setUserId} = useAuthContext();
  const [userData, setUserData] = useState<LoginArgs>({
    email: '',
    password: '',
  });
  const handleChanges = (val: string, name: string) => {
    setUserData({...userData, [name]: val});
  };
  const handleSubmit = async () => {
    try {
      if (!userData.email || !userData.password) {
        return Alert.alert('Имэйл болон нууц үгээ оруулна уу!');
      }
      const res = await signin(userData.email, userData.password);
      const driverRef = getUser(res.user.uid);
      onValue(driverRef, (snapshot: DataSnapshot) => {
        const driversDetail = snapshot.val();
        setCredential(driversDetail);
        setUserId(res.user.uid);
      });
      updateStatus(res.user.uid, true);
      navigate.navigate('Home' as never);
      setUserData({
        email: '',
        password: '',
      });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Нууц үг буруу байна.');
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <View className="pt-[192px] px-10 w-full">
        <Image
          alt="logo"
          style={{width: 180, height: 54}}
          source={require('../../assets/logo.png')}
        />
        <TextInput
          placeholder="И-мэйл"
          value={userData.email}
          onChangeText={val => handleChanges(val, 'email')}
          className="mt-12 mb-6 border border-[#cecccc] py-3 pl-5 rounded-md"
        />
        <TextInput
          secureTextEntry
          placeholder="Нууц үг"
          value={userData.password}
          onChangeText={val => handleChanges(val, 'password')}
          className="mb-16 border border-[#cecccc] py-3 pl-5 rounded-md"
        />
        <Pressable
          onPress={handleSubmit}
          className="bg-[#0c1219] active:bg-black/60 py-3 rounded-md">
          <Text className="text-white text-center font-semibold">НЭВТРЭХ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
