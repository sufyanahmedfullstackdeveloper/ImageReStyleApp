import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title?: string;
  iconName?: string;
}
const Header = ({ title, iconName }: HeaderProps) => {
  return (
    <View className="flex-row justify-between items-center pb-4 mb-4 border-b border-border dark:border-dark-border ">
      <Text className="text-4xl text-primary dark:text-dark-primary font-footspringBold">
        {title}
      </Text>

      <Ionicons name={iconName as any} size={24} color="#C90083" />
    </View>
  );
};

export default Header;
