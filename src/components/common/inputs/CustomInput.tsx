import {
 Platform,
 StyleSheet,
 Text,
 TextInput,
 TextStyle,
 View,
} from "react-native";
import React, { useState } from "react";
import { FONTS } from "../../../utils/constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../../utils/constants/Colors";
import { useScheme, useTheme } from "../../../theme/useTheme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";

interface CustomInputProps {
 label?: string;
 placeholder?: string;
 iconName?: string;
 error?: string;
 leftIcon?: JSX.Element;
 rightIcon?: JSX.Element;
 rightText?: JSX.Element;
 disabled?: boolean;
 disabledBackground?: boolean;
 password?: boolean;
 textTop?: boolean;
 required?: boolean;
 mainContainerStyle?: TextStyle;
 containerStyle?: TextStyle;
 textInputStyle?: TextStyle;
 onFocus?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
 label,
 placeholder,
 iconName,
 error,
 rightIcon,
 leftIcon,
 disabled,
 disabledBackground,
 password,
 rightText,
 textTop,
 required,
 mainContainerStyle,
 containerStyle,
 textInputStyle,
 onFocus = () => {},
 ...props
}) => {
 const [isFocused, setIsFocused] = useState(false);
 const [hideEyeIcon, setHideEyeIcon] = useState(true);
 const { colors } = useTheme();
 const theme = useScheme();

 return (
  <View style={[styles.inputMainContainer, mainContainerStyle]}>
   {label && (
    <View style={styles.labelContainer}>
     <Text
      style={[
       styles.label,
       { color: colors.text, opacity: theme == "dark" ? 1 : 0.4 },
      ]}
     >
      {label} {required && "*"}
     </Text>
     {rightText}
    </View>
   )}

   <View
    style={[
     styles.inputContainer,
     {
      borderColor: error
       ? Colors.errorColor
       : isFocused
       ? Colors.profit
       : Colors.dark_border,
      borderBottomWidth: isFocused ? 2 : 1,
     },
     containerStyle,
    ]}
   >
    {leftIcon}
    <TextInput
     placeholderTextColor={theme == "dark" ? "#dadbde" : "#cfd0d3"}
     placeholder={placeholder}
     style={[
      styles.textInput,
      {
       textAlignVertical: textTop ? "top" : "center",
       color: colors.text,
      },
      textInputStyle,
     ]}
     secureTextEntry={password ? hideEyeIcon : false}
     autoCorrect={false}
     onFocus={() => {
      onFocus();
      setIsFocused(true);
     }}
     maxLength={256}
     editable={!disabled}
     onBlur={() => {
      setIsFocused(false);
     }}
     {...props}
    />
    {rightIcon}
    {password && (
     <Icon
      size={RFValue(12)}
      onPress={() => {
       setHideEyeIcon(!hideEyeIcon);
      }}
      name={!hideEyeIcon ? "eye" : "eye-off"}
      style={styles.password}
      color={colors.text}
     />
    )}
   </View>
   {error && (
    <View style={styles.errorContainer}>
     <Icon2
      size={RFValue(13)}
      name="information-circle"
      style={styles.errorText}
     />
     <Text style={styles.errorText}>{error}</Text>
    </View>
   )}
  </View>
 );
};

export default CustomInput;

const styles = StyleSheet.create({
 inputMainContainer: {
  marginVertical: 8,
 },
 errorContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 3,
  gap: 5,
 },
 errorText: {
  color: Colors.errorColor,
  fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(11),
  fontFamily: FONTS.Medium,
 },
 label: {
  fontSize: Platform.OS === "ios" ? RFValue(9) : RFValue(14),
  fontFamily: FONTS.Regular,
 },
 labelContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 2,
 },
 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 4,
  justifyContent: "space-between",
 },
 textInput: {
  fontFamily: FONTS.Regular,
  fontSize: Platform.OS === "ios" ? RFValue(11) : RFValue(13),
  alignItems: "flex-start",
  height: 28,
  width: "82%",
  paddingVertical: 5,
 },
 password: {
  textAlignVertical: "center",
  opacity: 0.8,
 },
});
