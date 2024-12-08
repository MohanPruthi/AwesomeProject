import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {getFeedback} from '../../db/db';
import ListCard from '../ListCard/ListCard';

const List = () => {
  const {list} = useSelector(state => state.form);
  const [listData, setListData] = useState([]);

  const getListData = async () => {
    const data = await getFeedback();
    setListData(data);
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>List</Text>
      <Text>{list?.firstName}</Text>
      <FlatList
        data={listData}
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
