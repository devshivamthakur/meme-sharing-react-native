import { StyleSheet } from "react-native"
import { normalize } from "../../../Normalize"
import { Colors, Fonts } from "../../Theme"

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    h1: {
        fontSize: normalize(35),
        fontWeight: "bold",
        fontFamily: Fonts.bold,
        color: Colors.white
    },
    roundView: {
        borderRadius: 40 / 2,
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"

    },
    header:{
        width:"90%",
        alignSelf:"center",
        marginTop:"5%"
      }
})