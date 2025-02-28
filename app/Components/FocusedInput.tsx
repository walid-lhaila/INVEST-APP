import React, { ReactPortal, useState} from "react";
import {StyleSheet, View} from "react-native";


interface Props{
    children?: React.ReactNode
}
const FocusedInput = ({children} : Props) => {
    const [indexOfSelected , setIndexOfSelected] = useState<null | number>(null)
    return <>{children?.map((element : any, index: number) => <View key={index} style={{...styles.input, borderWidth: index === indexOfSelected ? 1 : 0, borderColor: '#77a6f7' }}>{React.cloneElement(element, {handler : ()=> setIndexOfSelected(index) })}</View>)}</>
}

export default FocusedInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        textAlign: "center",
        gap: 5,
        width: '100%',
        paddingVertical: 8,
        borderRadius: 40,
        paddingHorizontal: 20,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20
    }
})
