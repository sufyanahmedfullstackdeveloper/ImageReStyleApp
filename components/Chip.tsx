import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={isSelected ? ["#C90083", "#FF0080"] : ["#C9008320", "#FF008010"]}
        className="px-4 py-2 rounded-full"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text
          className={`text-sm ${
            isSelected ? "text-foreground font-footspringBold" : "text-foreground dark:text-dark-foreground font-footspringRegular"
          }`}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Chip;
