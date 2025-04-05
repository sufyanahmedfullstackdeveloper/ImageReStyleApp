import React from "react";
import { TouchableOpacity, Text, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected, onPress }) => {
  const colorScheme = useColorScheme();

  const gradientColors = isSelected
    ? ["#C90083", "#FF0080"]
    : colorScheme === "dark"
    ? ["#2A2A2A", "#1F1F1F"] 
    : ["#D3D3D3", "#D3D3D3"]; 
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="rounded-full overflow-hidden"
    >
      <LinearGradient
        colors={gradientColors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-4 py-2 rounded-full"
      >
        <Text
          className={`text-sm ${
            isSelected
              ? "text-white font-footspringBold"
              : "text-black dark:text-white font-footspringRegular"
          }`}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Chip;
