

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    Image,
    StatusBar,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import Contacts from 'react-native-contacts';
import Contact from './EditContact';

import React from 'react';

import Colors from '../../components/Colors';
import AuthHeader from '../../components/header/AuthHeader';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../../constants/Fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useState } from 'react';
import Loading from '../../components/Loader/Loading';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const EditContactList = ({ route }) => {
    const { setNumber } = route.params
    return (
        <LinearGradient
            colors={['#302DDE', '#3633CA', '#EC42A0']}
            style={styles.container}>
            <StatusBar backgroundColor={Colors.trayColor} barStyle="light-content" />
            <Image
                source={require('../../components/images/shade.png')}
                style={{
                    width: '100%',
                    height: verticalScale(300),
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />

            <AddLeadUI setNumber={setNumber} />
        </LinearGradient>
    );
};
const AddLeadUI = ({ setNumber }) => {
    const [contacts, setContacts] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [loading, setLoading] = useState(false);


    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            Contacts.getAll().then(contacts => {
                setContacts(contacts);
                setFilteredDataSource(contacts);
            });
            setLoading(false)

        }, []),
    );


    const searchFilterFunction = text => {
        if (text) {
            const newData = contacts.filter(function (item) {
                const itemData = item.contact?.givenName?.[0]
                    ? item.contact?.givenName?.[0].toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
        } else {
            setFilteredDataSource(contacts);
        }
    };

    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
    };
    const renderItem = ({ item, index }) => {
        return <Contact setNumber={setNumber} contact={item} />;
    };

    return loading ? <Loading />: (
        <View style={styles.whole}>
            <View style={styles.card}>
                <AuthHeader title="All Contacts" />
                {/* <View>
                    <TextInput
                        placeholder="Search Here.."
                        placeholderTextColor={Colors.btnColor1}
                        style={styles.input}
                        onChangeText={text => searchFilterFunction(text)}
                    // secureTextEntry={secureTextEntry}
                    />

                    <EvilIcons
                        name="search"
                        size={35}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 22,
                            color: Colors.btnColor1,
                        }}
                    />
                </View> */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 30 }}
                    data={filteredDataSource}

                    ListEmptyComponent={() => {
                        return <Text style={styles.notFound}>No Data Found!</Text>;
                    }}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />

                <View style={{ height: verticalScale(50) }}></View>
            </View>
        </View>
    );
};

export default EditContactList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderColor: Colors.btnColor1,
        // borderWidth: 2,
    },
    listcontainer: {
        borderTopColor: '#D91A21',
        borderRightColor: '#D91A21',
        borderLefrColor: '#D91A21',
        borderBottomColor: '#327BCD',
        borderWidth: 2,
        marginBottom: verticalScale(20),
        borderRadius: moderateScale(15),
        paddingBottom: verticalScale(10),
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

    whole: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'flex-end',
    },

    card: {
        width: '100%',
        height:
            Platform.OS === 'android' ? windowHeight * 0.96 : windowHeight * 0.92,
        marginTop: scale(20),

        backgroundColor: Colors.white,
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20),
        paddingLeft: scale(20),
        paddingRight: scale(20),
        paddingTop: scale(5),
        paddingBottom: scale(30),
    },

    valuetext: {
        fontSize: moderateScale(15),
        color: Colors.btnColor1,
        fontFamily: Font.Lato400,
        // fontWeight: '500',
        paddingLeft: scale(20),
    },

    input: {
        borderWidth: 2,
        marginTop: verticalScale(10),
        paddingLeft: scale(20),
        borderRadius: moderateScale(15),
        borderColor: Colors.btnColor1,
        paddingVertical: Platform.OS == 'ios' ? 13 : 10,
    },

    client: {
        fontSize: moderateScale(20),
        paddingLeft: scale(20),
        color: Colors.black,
        // fontWeight: '700',
        fontFamily: Font.Lato700,
        paddingVertical: verticalScale(5),
    },
    notFound: {
        fontFamily: Font.Lato700Italic,
        textAlign: 'center',
        fontSize: moderateScale(20),
        marginTop: '60%',
    },
});
