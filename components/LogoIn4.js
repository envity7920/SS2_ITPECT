
import React, { useContext } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { colors } from '../utils/colors';

const LogoIn4 = ({ }) => {
    return (
        <View style={styles.headingForm}>
            <Image
                style={styles.logo}
                source={require('../assets/images/app_logo.png')}
            />
            <View style={styles.headingFormText}>
                <Text style={styles.heading}>ITPECT</Text>
                <Text style={styles.infoLine1}>Information Technology</Text>
                <Text style={styles.infoLine2}>Professional Examination Council</Text>
            </View>
        </View>
    )
}

export default LogoIn4

const styles = StyleSheet.create({
    headingForm: {
        flexDirection: 'row',
        marginHorizontal: 25,

    },
    headingFormText: {
        // marginTop: 100,
        marginLeft: 5,
        marginBottom: 45
    },
    heading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'red',
        
    },
    infoLine1: {
        fontSize: 20,
        fontWeight: 'normal',
        color: colors.secondary_black_blue,

    },
    infoLine2: {
        fontSize: 14,
        fontWeight: 'normal',
        color: colors.secondary_black_blue
    },
})