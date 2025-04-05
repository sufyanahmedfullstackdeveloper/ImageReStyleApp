import React, { useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useToast } from "react-native-toast-notifications";

import Header from "@/components/Header";
import FloatButton from "@/components/FloatButton";

const ResultScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const params = useLocalSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);

  const { imageUri, style } = params as {
    imageUri: string;
    style: string;
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
    
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Storage permission required');
      }


      const fileUri = FileSystem.cacheDirectory + `restyled_${Date.now()}.jpg`;
      const { uri } = await FileSystem.downloadAsync(imageUri, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Restyled', asset, false);

      toast.show('Image saved to gallery!', {
        type: 'success',
        placement: 'top',
        duration: 3000,
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast.show('Failed to save image', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (!imageUri) {
    return (
      <View className="flex-1 bg-background dark:bg-dark-background items-center justify-center">
        <Header title="Error" iconName="warning" />
        <Text className="text-primary dark:text-dark-primary text-lg mt-4">
          No image found
        </Text>
        <FloatButton
          title="Go Back"
          iconName="arrow-back"
          onPress={() => router.back()}
          className="mt-8"
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <ScrollView className="flex-1 p-4">
        <Header title="Result" iconName="sparkles" backButton/>

        <View className="my-8">
          <Text className="text-primary dark:text-dark-primary text-center text-xl mb-4">
            {style} Style
          </Text>
          
          <View className="aspect-square rounded-3xl overflow-hidden bg-card dark:bg-dark-card">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>

      {isDownloading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-dark-card p-6 rounded-2xl items-center">
            <ActivityIndicator size="large" color="#C90083" />
            <Text className="text-primary dark:text-dark-primary mt-4">
              Saving to Gallery...
            </Text>
          </View>
        </View>
      )}

      <FloatButton
        title="Download"
        iconName="download"
        onPress={handleDownload}
     
      />
    </View>
  );
};

export default ResultScreen;