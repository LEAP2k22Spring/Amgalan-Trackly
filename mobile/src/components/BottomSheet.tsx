import {UserModal} from './UserModal';
import React, {useState} from 'react';
import {useAuthContext, useMainContext} from '../context';
import {View, Text, Image, Pressable} from 'react-native';

export const BottomSheet = () => {
  const {credential} = useAuthContext();
  const {sharePosition} = useMainContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Pressable
        onPress={() => setOpenModal(true)}
        className="absolute bottom-0 inset-x-0 flex flex-row justify-between p-3 z-10 bg-white active:bg-gray-100">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: credential?.avatar,
            }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-4">
            <Text className="font-semibold">{credential?.firstname}</Text>
            <Text className="text-sm text-gray-400">
              {sharePosition
                ? 'Та байршлаа хуваалцаж байна.'
                : 'Та байршлаа хуваалцаагүй байна.'}
            </Text>
          </View>
        </View>
        <Text className="text-2xl">+</Text>
      </Pressable>
      <UserModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
