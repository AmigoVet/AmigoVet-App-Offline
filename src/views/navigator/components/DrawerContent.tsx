import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import LabelLogo from "../../../assets/svgs/LabelLogo";
import { newColors } from "../../../assets/styles/colors";
import { CustomIcon } from "../../../components/Customs";

export const DrawerContent = (props: any) => {
  const { width } = Dimensions.get("window");
  const styles = createStyles(width);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.container]}>
      <View style={styles.logoContainer}>
        <LabelLogo
          viewBox="60 340 930 360" 
          width={250}
          height={80}
          fill={newColors.fondo_secundario}
        />
      </View>
      <View style={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.footer}>
          <Text style={styles.minitext}>Echo con </Text>
          <CustomIcon name="heart" size={20} color={newColors.verde} />
          <Text style={styles.minitext}> por Juan Mera</Text>

      </View>
    </DrawerContentScrollView>
  );
};

const createStyles = (width: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    logoContainer: {
      alignItems: "center", // 
    },
    footer: {
      height: 50,
      alignItems: "center",
      alignSelf: "stretch",
      flexDirection: "row",
      marginBottom: 60,
    },
    minitext: {
      color: newColors.fondo_secundario,
      fontSize: width * 0.04,
      textAlign: 'center',
      fontWeight: '200',
    },
  });