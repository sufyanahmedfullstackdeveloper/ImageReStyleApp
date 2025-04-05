import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import Header from "@/components/Header";
import FloatButton from "@/components/FloatButton";
import Chip from "@/components/Chip";
import {
  useUploadPhotoMutation,
  useGetJobStatusQuery,
} from "@/services/image/image.service";

interface ImageAsset {
  uri: string;
  fileName?: string | null;
  type?: string | null;
}

interface JobStatus {
  status: "processing" | "completed";
  url?: string;
}

const stylesList = ["Anime"];

const HomeScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const [image, setImage] = useState<ImageAsset | null>(null);
  const [imageStyle, setImageStyle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [jobId, setJobId] = useState<any>(null);
  const [isJobCompleted, setIsJobCompleted] = useState(false);

  // RTK Query hooks
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();
  const { data: jobStatus, isLoading: isPolling } = useGetJobStatusQuery(
    jobId,
    {
      skip: !jobId || isJobCompleted,
      pollingInterval: 1000,
    }
  );

  const getMimeType = (uri: string): string => {
    const extension = uri.split(".").pop()?.toLowerCase();
    return extension === "png" ? "image/png" : "image/jpeg";
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      toast.show("Permission to access photos is required", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage({
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName ?? null,
        type: result.assets[0].type ?? null,
      });
      setJobId(null);
      setIsJobCompleted(false);
    }
  };

  const handleStyleSelect = (style: string) => {
    setImageStyle(style);
  };

  const handleMagicAI = async () => {
    if (!image) {
      toast.show("Please select an image first", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
      return;
    }

    if (!imageStyle) {
      toast.show("Please select a style first", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();

      const mimeType = getMimeType(image.uri);
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || `image_${Date.now()}.${mimeType.split("/")[1]}`,
        type: mimeType,
      } as any);

      formData.append("styleType", imageStyle);

      const { jobId, message } = await uploadPhoto(formData).unwrap();
      setJobId(jobId as any);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.show("Upload failed. Please try again.", {
        type: "danger",
        placement: "top",
        duration: 4000,
      });
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (jobStatus?.status === "completed" && jobStatus.resultUrl) {
      setIsUploading(false);
      setIsJobCompleted(true);
      router.push({
        pathname: "/result",
        params: {
          imageUri: jobStatus.resultUrl,
          style: imageStyle,
        },
      });
    }
  }, [jobStatus, imageStyle, router]);

  return (
    <View className="flex-1 bg-background dark:bg-dark-background">
      <ScrollView className="flex-1 p-4">
        <Header title="Image ReStyle" iconName="sparkles" />

        <TouchableOpacity
          onPress={pickImage}
          className={`mb-8 w-full aspect-square rounded-3xl ${
            image
              ? ""
              : "border-4 border-dashed border-border dark:border-dark-border"
          } overflow-hidden bg-card dark:bg-dark-card`}
        >
          {image ? (
            <Image
              source={{ uri: image.uri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center space-y-4">
              <Text className="text-primary dark:text-dark-primary text-lg font-semibold">
                Tap to Upload Photo
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="mb-24">
          <Text className="text-3xl text-primary dark:text-dark-primary font-footspringBold mb-6 text-center">
            Choose Your Style
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2"
          >
            {stylesList.map((style) => (
              <Chip
                key={style}
                label={style}
                isSelected={imageStyle === style}
                onPress={() => handleStyleSelect(style)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal visible={isUploading} transparent>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white dark:bg-dark-card p-6 rounded-2xl w-80">
            <Text className="text-lg font-bold mb-4 text-center text-foreground dark:text-dark-foreground">
              Applying {imageStyle} Magic...
            </Text>
            <ActivityIndicator size="small" color="#C90083" />
            <TouchableOpacity
              onPress={() => setIsUploading(false)}
              className="mt-4 self-center"
            >
              <Text className="text-primary">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FloatButton
        title="Magic AI"
        iconName="sparkles"
        onPress={handleMagicAI}
      />
    </View>
  );
};

export default HomeScreen;
