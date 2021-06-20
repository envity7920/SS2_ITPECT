import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const AnswerItem = ({ answer, answerChecked, onAnswerPress, keyProp, disabled, isCorrectAnswerChosen, isWrongAnswerChosen, isCorrectAnswerNotChosen }) => {
    const letter = ['A', 'B', 'C', 'D'];

    return (
        <TouchableOpacity
            disabled={disabled}
            style={answerChecked == keyProp ?
                [styles.answerContainer, { backgroundColor: colors.secondary_dark_blue }]
                : styles.answerContainer}
            onPress={() => onAnswerPress(keyProp)}>
            
            {isCorrectAnswerChosen == true ?
                <View
                    style={[styles.letterContainer, { backgroundColor: colors.primary_green }]}>
                    <FontAwesome name='check' size={15} color='white' />
                </View>
                : (isWrongAnswerChosen == true ?
                    <View
                        style={[styles.letterContainer, { backgroundColor: 'red' }]}>
                        <FontAwesome name='times' size={15} color='white' />
                    </View>
                    : (isCorrectAnswerNotChosen == true ?
                        <View
                            style={[styles.letterContainer, { backgroundColor: colors.primary_green }]}>
                            <Text style={styles.letter} >{letter[keyProp]}</Text>
                        </View>
                        : <View
                            style={answerChecked == keyProp ? styles.letterContainerChecked : styles.letterContainer}>
                            <Text style={answerChecked == keyProp ? styles.letterChecked : styles.letter} >{letter[keyProp]}</Text>
                        </View>
                    ))
            }
            <Text style={answerChecked == keyProp ? [styles.text, { color: 'white' }] : styles.text}>{answer}</Text>
        </TouchableOpacity>
    )
}

export default AnswerItem

const styles = StyleSheet.create({

    answerContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.secondary_dark_blue
    },
    letterContainer: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,.2)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    letter: {
        fontFamily: 'Montserrat-Bold',
        color: colors.secondary_dark_blue
    },
    letterContainerChecked: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: colors.primary_pink,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letterChecked: {
        fontFamily: 'Montserrat-Bold',
        color: colors.secondary_dark_blue
    }
    ,
    text: {
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        paddingLeft: 10,
        color: colors.secondary_dark_blue
    }
})