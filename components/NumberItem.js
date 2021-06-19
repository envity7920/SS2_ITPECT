import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils/colors';

const NumberItem = ({ number, pressHandler, isAnswered, isCorrect, isWrong }) => {
    return (
        <TouchableOpacity
            style={isCorrect == true ?
                [styles.roundContainer, { borderColor: colors.primary_green }] :
                (isWrong == true ?
                    [styles.roundContainer, { borderColor: 'red' }] :
                    (isAnswered ?
                        [styles.roundContainer, {
                            borderColor:
                                colors.primary_pink
                        }] : styles.roundContainer))}
            onPress={pressHandler}
        >
            <Text style={styles.text}>{number}</Text>
        </TouchableOpacity>
    )
}

export default NumberItem;

const styles = StyleSheet.create({
    roundContainer: {

        borderRadius: 100,
        width: 50,
        height: 50,
        borderWidth: 5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },

    text: {

        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.secondary_dark_blue

    }





})
