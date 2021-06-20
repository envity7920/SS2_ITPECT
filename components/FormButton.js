// rnfes
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../utils/colors';
import { windowHeight } from '../utils/Dimension';

const FormButton = ({ formButtonText, ...rest }) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={{ color: colors.true_white, fontFamily: 'Montserrat-Bold', fontSize: 16 }}>{formButtonText}</Text>
        </TouchableOpacity>
    )
}

export default FormButton;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
        height: 40,
        height: windowHeight / 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary_blue,
        color: colors.true_white
    }
})
