import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getFeedback} from '../../db/db';
import { setList } from '../../slices/FormSlice';
import ListCard from '../ListCard/ListCard';

const List = () => {

    const dispatch = useDispatch() 
    const {list} = useSelector(state => state.form);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedData, setSelectedData] = useState(list)


    const getListData = async () => {
        const data = await getFeedback(); 
        dispatch(setList(data))
        setSelectedData(data)
    };

    const roleFilter = (role)=> {
        console.log(role)
        setSelectedFilter(role)

        if (role === 'All') {
            setSelectedData(list);
        } else if (role === 'Rating') {
            const filteredData = list.filter(item => item.overallExperience >= 3);
            setSelectedData(filteredData);
        }
        else {
            const filteredData = list.filter(item => item.employeeType === role);
            setSelectedData(filteredData);
        }
    }


    console.log("rerender")


    useEffect(() => {
        getListData();
    }, []);

    useEffect(()=> {
        setSelectedData(list)
        setSelectedFilter('All')
    }, [list])

    return (
        <View style={styles.containter}>
        
        <View style={styles.filterArea}>

            {/* <Text style={styles.filterHeading}>Filters-</Text> */}
            <TouchableOpacity style={[styles.filter, selectedFilter==='All' && styles.selectedFilter]}
            onPress={() => roleFilter('All')}
            >
                <Text style={styles.filterHeading}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filter, selectedFilter==='Rating' && styles.selectedFilter]}
            onPress={() => roleFilter('Rating')}
            >
                <Text style={styles.filterHeading}>Rating 3+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filter, selectedFilter==='Intern' && styles.selectedFilter]}
            onPress={() => roleFilter('Intern')}
            >
                <Text style={styles.filterHeading}>Intern</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filter, selectedFilter==='Manager' && styles.selectedFilter]}
            onPress={() => roleFilter('Manager')}
            >
                <Text style={styles.filterHeading}>Manager</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filter, selectedFilter==='SDE' && styles.selectedFilter]}
            onPress={() => roleFilter('SDE')}
            >
                <Text style={styles.filterHeading}>SDE</Text>
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


const styles = StyleSheet.create({
    containter: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterArea: {
        backgroundColor: "#1e1e1e",
        flexDirection: 'row',
        height: 50,
        width: '100%',
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    filterHeading:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f1f1f1',       
    },
    filter: {
       borderRadius: 6,
       borderWidth: 2,
       borderColor: '#333',
       marginLeft: 10,
    //    marginRight: 10,
       minWidth: 50,
       width: 'auto',
       height: 40,
       padding: 5,
       alignItems: 'center',
       justifyContent: 'center',
    },
    selectedFilter: {
        backgroundColor: '#007bff', 
        borderColor: '#0056b3', 
    },
    selectedFilterText: {
        color: '#ffffff', 
        fontWeight: 'bold', 
    },
})