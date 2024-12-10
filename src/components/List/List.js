import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getFeedback} from '../../db/db';
import {setList} from '../../slices/FormSlice';
import ListCard from '../ListCard/ListCard';

const List = () => {
  const dispatch = useDispatch();
  const {list} = useSelector(state => state.form);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedData, setSelectedData] = useState(list);
  const [loading, setLoading] = useState(false);
  const {listStyles} = useSelector(state => state.theme);

  const getListData = async () => {
    setLoading(true);
    const data = await getFeedback();
    dispatch(setList(data));
    setSelectedData(data);
    setLoading(false);
  };

  const roleFilter = role => {
    setSelectedFilter(role);

    if (role === 'All') {
      setSelectedData(list);
    } else if (role === 'Rating') {
      const filteredData = list.filter(item => item.overallExperience >= 3);
      setSelectedData(filteredData);
    } else {
      const filteredData = list.filter(item => item.employeeType === role);
      setSelectedData(filteredData);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    setSelectedData(list);
    setSelectedFilter('All');
  }, [list]);

  return loading ? (
    <ActivityIndicator
      size="large"
      style={{
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  ) : (
    <View style={listStyles.containter}>
      <View style={listStyles.filterArea}>
        <TouchableOpacity
          style={[
            listStyles.filter,
            selectedFilter === 'All' && listStyles.selectedFilter,
          ]}
          onPress={() => roleFilter('All')}>
          <Text style={listStyles.filterHeading}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            listStyles.filter,
            selectedFilter === 'Rating' && listStyles.selectedFilter,
          ]}
          onPress={() => roleFilter('Rating')}>
          <Text style={listStyles.filterHeading}>Rating 3+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            listStyles.filter,
            selectedFilter === 'Intern' && listStyles.selectedFilter,
          ]}
          onPress={() => roleFilter('Intern')}>
          <Text style={listStyles.filterHeading}>Intern</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            listStyles.filter,
            selectedFilter === 'Manager' && listStyles.selectedFilter,
          ]}
          onPress={() => roleFilter('Manager')}>
          <Text style={listStyles.filterHeading}>Manager</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            listStyles.filter,
            selectedFilter === 'SDE' && listStyles.selectedFilter,
          ]}
          onPress={() => roleFilter('SDE')}>
          <Text style={listStyles.filterHeading}>SDE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedData}
        renderItem={({item, index}) => {
          return <ListCard item={item} index={index} />;
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
        scrollEnabled
        initialNumToRender={15}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={15}
        keyExtractor={(item, index) => `${index} + ${item.firstName}`}
      />
    </View>
  );
};

export default List;
