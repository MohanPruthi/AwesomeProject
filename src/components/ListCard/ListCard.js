import {View, Text, TouchableOpacity, listCardStylesheet} from 'react-native';
import React from 'react';
import {removeFromList} from '../../slices/FormSlice'
import { useDispatch, useSelector } from 'react-redux';
import {removeItemFromTable, connectToDatabase} from '../../db/db'
import { useNavigation } from '@react-navigation/native';
import { setEditing, setIndex } from '../../slices/FormSlice'
// import FeedbackForm from '../FeedbackForm/FeedbackForm';

const ListCard = ({item, index}) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { editing } = useSelector((state) => state.form);
  const {listCardStyles} = useSelector((state)=>state.theme)


  const handleEdit = (id) => {                    //todo
    console.log(`Editing idex: ${id}`);

    dispatch(setEditing(true));
    dispatch(setIndex(id));
    navigation.jumpTo('FeedbackForm');
  };

  const handleDelete = async(id) => {
    console.log(`Deleting idex: ${id}`)
    // delete from sqlite                   //todo (not working)
    const db = await connectToDatabase();
    await removeItemFromTable(db, item.id)

    dispatch(removeFromList({id}))          // delete from redux
  };

  return (
    <View style={listCardStyles.card}>
      <Text style={listCardStyles.cardTitle}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={listCardStyles.cardText}>Project Name: {item.projectName}</Text>
      <Text style={listCardStyles.cardText}>Email: {item.email}</Text>
      <Text style={listCardStyles.cardText}>Phone: {item.phoneNumber}</Text>
      <Text style={listCardStyles.cardText}>
        Overall Experience: {item.overallExperience}
      </Text>
      <Text style={listCardStyles.cardText}>
        Team Collaboration: {item.teamCollaboration}
      </Text>
      <Text style={listCardStyles.cardText}>
        Time Management: {item.timeManagement}
      </Text>
      <Text style={listCardStyles.cardText}>
        Challenges Faced: {item.challengesFaced}
      </Text>
      <Text style={listCardStyles.cardText}>
        Project Objective Achieved: {item.projectObjectiveAchieved}
      </Text>
      <Text style={listCardStyles.cardText}>
        Employee Type: {item.employeeType}
      </Text>

      <View style={listCardStyles.buttonsContainer}>
        <TouchableOpacity
          style={listCardStyles.editButton}
          onPress={() => handleEdit(index)}>
          <Text style={listCardStyles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listCardStyles.deleteButton}
          onPress={() => handleDelete(index)}>
          <Text style={listCardStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCard;

// const listCardStyles = listCardStylesheet.create({
//   card: {
//     backgroundColor: '#1e1e1e',
//     borderRadius: 10,
//     padding: 20,
//     marginVertical: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 4,
//     borderWidth: 2,
//     borderColor: '#333',
//     height: 380,
//     width: 350,
//     justifyContent: 'center'
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#f1f1f1', // Light text for readability
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#d3d3d3', // Softer light gray for text
//     lineHeight: 20,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },
//   editButton: {
//     backgroundColor: '#27ae60', // Muted green for edit button
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     shadowColor: '#27ae60',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   deleteButton: {
//     backgroundColor: '#c0392b', // Muted red for delete button
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     shadowColor: '#c0392b',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   buttonText: {
//     color: '#f1f1f1', // Consistent light color for button text
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });
