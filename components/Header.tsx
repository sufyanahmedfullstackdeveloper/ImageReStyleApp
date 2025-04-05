import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  title?: string;
  iconName?: string;
  backButton?: boolean;
}
const Header = ({ title, iconName, backButton }: HeaderProps) => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between items-center pb-4 mb-4 border-b border-border dark:border-dark-border ">
      {backButton ? (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name={"arrow-back"} size={24} color="#C90083" />
        </TouchableOpacity>
      ) : null}

      <Text className="text-4xl text-primary dark:text-dark-primary font-footspringBold">
        {title}
      </Text>

      <Ionicons name={iconName as any} size={24} color="#C90083" />
    </View>
  );
};

export default Header;
