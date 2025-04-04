import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatButtonProps {
  title?: string;
  iconName?: string;
  onPress?: () => any;
  className?: any;
}
const FloatButton = ({
  title,
  iconName,
  onPress,
  className,
}: FloatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`absolute bottom-6 right-6 bg-primary px-6 py-3 rounded-full flex-row items-center shadow-lg ${className}`}
      style={{
        shadowColor: "#C90083",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Text className="text-white font-semibold text-lg mr-2">{title}</Text>
      <Ionicons name={iconName as any} size={20} color="white" />
    </TouchableOpacity>
  );
};

export default FloatButton;
