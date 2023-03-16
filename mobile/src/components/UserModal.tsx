import {useAuth} from '../hooks/useAuth';
import React, {Dispatch, SetStateAction} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAuthContext, useMainContext} from '../context';
import {View, Text, Image, Modal, Pressable} from 'react-native';

type UserModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const UserModal = ({openModal, setOpenModal}: UserModalProps) => {
  const navigate = useNavigation();
  const {signout, updateStatus} = useAuth();
  const {credential, userId} = useAuthContext();
  const {updatePosition, setSharePosition} = useMainContext();

  const handleLogout = () => {
    updateStatus(userId, false);
    setSharePosition(false);
    setOpenModal(false);
    navigate.goBack();
    signout();
  };

  const shareMyLocation = () => {
    setOpenModal(false);
    updatePosition(userId);
  };

  return (
    <View>
      <Modal visible={openModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="relative flex flex-col items-center bg-white p-6 rounded-t-2xl">
            <Image
              source={{
                uri: credential?.avatar,
              }}
              className="w-14 h-14 rounded-full mb-1"
            />
            <Pressable
              className="absolute top-2 right-5"
              onPress={() => setOpenModal(false)}
              hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}>
              <Text className="text-3xl">-</Text>
            </Pressable>
            <View className="flex flex-col items-center space-y-3">
              <Text className="text-xl font-medium">
                {credential?.firstname} {credential?.lastname}
              </Text>
              <Pressable
                onPress={shareMyLocation}
                className="py-3 bg-[#0c1219] w-64 rounded-md active:bg-gray-700">
                <Text className="text-center text-white">
                  Байршил хуваалцах
                </Text>
              </Pressable>
              <Pressable
                onPress={handleLogout}
                className="py-3 border border-gray-300 w-64 rounded-md active:bg-gray-100">
                <Text className="text-center">Гарах</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
