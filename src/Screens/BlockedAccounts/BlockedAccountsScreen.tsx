import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import LinerGradiantView from '../../Component/LinerGradiantView';
import MyHeader from '../../Component/MyHeader';
import { normalize } from '../../../Normalize';
import CustomButton from '../../Component/CustomButton';
import { Colors, Fonts } from '../../Theme';
import UserNavigationProp from "../../Component/UserNavigationProp"
interface Props{
  navigation:UserNavigationProp<"Settings">
}
type BlockedAccount = {
    id: string;
    name: string;
};

const BlockedAccountsScreen: React.FC<Props> = (props) => {
    const [blockedAccounts, setBlockedAccounts] = useState<BlockedAccount[]>([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Doe' },
        { id: '3', name: 'Bob Smith' },
    ]);

    const handleUnblock = (id: string) => {
        setBlockedAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
    };

    const renderBlockedAccount = ({ item }: { item: BlockedAccount }) => (
        <View style={styles.accountContainer}>
            <Text style={styles.accountName}>{item.name}</Text>
            <CustomButton
                onPress={() => handleUnblock(item.id)}
                buttonStyle={styles.btn2}
                title="Unblock"
                textStyle={styles.btntxt}
                linerColor={['#FF7F00', '#FF0080']}
            />
           
        </View>
    );

    return (
        <LinerGradiantView style={styles.container}>
            <MyHeader
                title={"Blocked Accounts"}
                titlestyle={styles.titlestyle}
                leftPress={() => {
                    props.navigation.goBack()
                }}
                style={{

                }}

            />
            <FlatList
                data={blockedAccounts}
                style={{

                }}
                renderItem={renderBlockedAccount}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => <Text style={styles.emptyList}>No blocked accounts found.</Text>}
            />
        </LinerGradiantView>
    );
};

const styles = StyleSheet.create({
    btntxt: {
        color: Colors.white,
        fontFamily: Fonts.normal,
        fontSize: normalize(13),
        fontWeight: "500",
    },
    btn2: {
        width: "28%",
        height: 44,
        borderRadius: 20,
        backgroundColor: "#488795",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    titlestyle: {
        fontSize: normalize(18),
        fontWeight: "600"
    },
    container: {
        flex: 1,
    },
    listContainer: {
        flexGrow: 1,
        backgroundColor: "rgba(255, 255, 255, 0.45)",

    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingHorizontal: "3%"
    },
    accountName: {
        fontSize: normalize(14),
        color:Colors.black
    },
    unblockButton: {
        backgroundColor: '#007AFF',
        borderRadius: 4,
        padding: 10,
    },
    unblockButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyList: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default BlockedAccountsScreen;
