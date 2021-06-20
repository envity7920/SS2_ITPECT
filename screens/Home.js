import React, { useContext } from 'react'
import { Alert, FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, TouchableWithoutFeedback, View, ImageBackground, Image } from 'react-native'
import { AuthContext } from '../components/context'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { exams } from '../utils/exams';
import { colors } from '../utils/colors';
import ExamItem from '../components/ExamItem';
import SearchBar from '../components/SearchBar';
import LogoIn4 from '../components/LogoIn4';
const Home = ({ navigation }) => {

    const { signOut } = useContext(AuthContext);



    const handleSignOut = () => {
        Alert.alert(
            "Confirmation",
            "Do you really want to sign out",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => signOut()
                }
            ]);

    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/images/login-bg.png')}
        >
            <View style={styles.container}>
                <LogoIn4></LogoIn4>
                <SearchBar />
                <View>
                    <Text style={{
                        fontFamily: 'Montserrat-Bold',
                        color: colors.secondary_dark_blue,
                    }}>
                        All Tests</Text>
                </View>
                <View style={styles.list} >
                    <FlatList
                        data={exams.list} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                            <ExamItem
                                item={item}
                                pressHandler={() => {
                                    navigation.navigate('Start', {

                                        abbr: item.abbr,
                                        fullname: item.fullname,
                                    });
                                }}
                            />
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={styles.logout}
                    onPress={handleSignOut}>
                    <FontAwesome name='sign-out' size={30} color={colors.secondary_dark_blue} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        resizeMode: 'center',
        width: '100%',
        height: '100%',
    },
    logo: {
        width: 100,
        height: 100,
    },
    container: {
        padding: 20,
    },
    list: {
        marginTop: 10,
        marginBottom: 20,
        height: 360,
    },
    logout: {
        alignItems: 'flex-end',
    }
})
