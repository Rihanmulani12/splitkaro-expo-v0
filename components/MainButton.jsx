
import { StyleSheet, Text, View, Pressable,Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const MainButton = (props ) => {
    let backgroundColor = props.inactive ? "#999999" : "black"

    return (
        <>
        
            <Pressable disabled={props.disabled?true:false} onPress={() => { props.clicked() }} style={{marginBottom:20, ...props.btnStyles}}>
                <View style={styles.buttonContainer}>
                    <View style={{backgroundColor:backgroundColor,...styles.buttonStyle}}>
                        {props.children}
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default MainButton

const styles = StyleSheet.create({
    buttonContainer: {
        display: "flex",
        flexDirection: "row"
    },
    buttonStyle: {
        height: 50,
        borderRadius: 25,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
})
