import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, listStylesheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getFeedback} from '../../db/db';
import { setList } from '../../slices/FormSlice';
import ListCard from '../ListCard/ListCard';

const List = () => {

    const dispatch = useDispatch() 
    const {list} = useSelector(state => state.form);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedData, setSelectedData] = useState(list)
    const {listStyles} = useSelector((state)=>state.theme)


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
        <View style={listStyles.containter}>
        
        <View style={listStyles.filterArea}>
            <TouchableOpacity style={[listStyles.filter, selectedFilter==='All' && listStyles.selectedFilter]}
            onPress={() => roleFilter('All')}
            >
                <Text style={listStyles.filterHeading}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[listStyles.filter, selectedFilter==='Rating' && listStyles.selectedFilter]}
            onPress={() => roleFilter('Rating')}
            >
                <Text style={listStyles.filterHeading}>Rating 3+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[listStyles.filter, selectedFilter==='Intern' && listStyles.selectedFilter]}
            onPress={() => roleFilter('Intern')}
            >
                <Text style={listStyles.filterHeading}>Intern</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[listStyles.filter, selectedFilter==='Manager' && listStyles.selectedFilter]}
            onPress={() => roleFilter('Manager')}
            >
                <Text style={listStyles.filterHeading}>Manager</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[listStyles.filter, selectedFilter==='SDE' && listStyles.selectedFilter]}
            onPress={() => roleFilter('SDE')}
            >
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


// const listStyles = listStylesheet.create({
//     containter: {
//         flex: 1,
//         backgroundColor: '#121212',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     filterArea: {
//         backgroundColor: "#1e1e1e",
//         flexDirection: 'row',
//         height: 50,
//         width: '100%',
//         padding: 6,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: '#333',
//     },
//     filterHeading:{
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#f1f1f1',       
//     },
//     filter: {
//        borderRadius: 6,
//        borderWidth: 2,
//        borderColor: '#333',
//        marginLeft: 10,
//     //    marginRight: 10,
//        minWidth: 50,
//        width: 'auto',
//        height: 40,
//        padding: 5,
//        alignItems: 'center',
//        justifyContent: 'center',
//     },
//     selectedFilter: {
//         backgroundColor: '#007bff', 
//         borderColor: '#0056b3', 
//     },
//     selectedFilterText: {
//         color: '#ffffff', 
//         fontWeight: 'bold', 
//     },
// })