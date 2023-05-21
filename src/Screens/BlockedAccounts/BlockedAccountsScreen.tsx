import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import LinerGradiantView from '../../Component/LinerGradiantView';
import MyHeader from '../../Component/MyHeader';
import { normalize } from '../../../Normalize';
import CustomButton from '../../Component/CustomButton';
import { Colors, Fonts } from '../../Theme';
import UserNavigationProp from "../../Component/UserNavigationProp"
import { blockaccount } from '../../Redux/Sliceinterface';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { BlockedListAsync, unBlockUserAsync } from '../../Redux/Actions/BlockaccountActions';
import { alertmodal_dummy } from '../Home/Home';
import { MyCustomAlert } from '../../Component/MyCustomAlert';
interface Props {
    navigation: UserNavigationProp<"Settings">
}


const BlockedAccountsScreen: React.FC<Props> = (props) => {
  const [alertmodal, setAlertmodal] = useState(alertmodal_dummy);
  const [id, setid] = useState(0);

    const Blockaccountlist = useAppSelector(state => state.blockedAccounts.blockedAccounts)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(BlockedListAsync())
    }, [])
    const handleUnblock = (id: number) => {
        setid(id);
        setAlertmodal({
            isVisible: true,
            error: "Are you sure you want to Unblock this user?",
            errorTitle: "Block User",
            alertImage: "",
            buttonText: "Yes",
            noVisible: true,
            noBtnText: "No",
            isFrom: "unblockuser"
          });
      
        

       

    };
    const onAlertClick = (param: string) => {
        let { isFrom } = alertmodal;
        setAlertmodal(alertmodal_dummy);
        if (isFrom == "unblockuser" && param == "yes") {
    
            let data = {
                blocked_user_id: id
            }
            dispatch(unBlockUserAsync(data))
    
        }
      }
    const renderBlockedAccount = ({ item }: { item: blockaccount }) => (
        <View style={styles.accountContainer}>
            <Text style={styles.accountName}>{item.blocked_user.name}</Text>
            <CustomButton
                onPress={() => handleUnblock(item.blocked_user.id)}
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
                data={Blockaccountlist}
                style={{

                }}
                renderItem={renderBlockedAccount}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => <Text style={styles.emptyList}>No blocked accounts found.</Text>}
            />
             {alertmodal.isVisible == true && (
        <MyCustomAlert
          alertImage={alertmodal.alertImage}
          alertVisible={alertmodal.isVisible}
          noVisible={alertmodal.noVisible}
          onRequestClose={(param) => onAlertClick(param)}
          error={alertmodal.error}
          errorTitle={alertmodal.errorTitle}
          buttonText={alertmodal.buttonText}
          noBtnText={alertmodal.noBtnText}
        />
      )}
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
        color: Colors.black
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
