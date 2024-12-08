import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getFeedback} from '../../db/db';
import { setList } from '../../slices/FormSlice';
import ListCard from '../ListCard/ListCard';

const List = () => {

    const dispatch = useDispatch() 
    const {list} = useSelector(state => state.form);

    const getListData = async () => {
        const data = await getFeedback(); 
        dispatch(setList(data))
    };


    console.log("rerender")


    useEffect(() => {
        getListData();
    }, []);

    return (
        <View style={styles.containter}>
        {/* <Text>List</Text> */}

        <FlatList
            data={list}
            renderItem={({item, index}) => {
            return <ListCard item={item} index={index} />;
            }}
            showsVerticalScrollIndicator={false}
            // style={styles.transactionListStyle}
            onEndReachedThreshold={0}
            scrollEnabled
            initialNumToRender={15}
            maxToRenderPerBatch={15}
            updateCellsBatchingPeriod={15}
            // onEndReached={onEndReachedHandler}
            // ListEmptyComponent={<EmptyScreenComponent />}
            // ListFooterComponent={listFooter}
            keyExtractor={(item, index) => `${index} + ${item.firstName}`}
        />
        </View>
  );
};

export default List;


const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center'
    }
})