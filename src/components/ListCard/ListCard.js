import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {removeFromList} from '../../slices/FormSlice'
import { useDispatch } from 'react-redux';
import {removeItemFromTable, connectToDatabase} from '../../db/db'

const ListCard = ({item, index}) => {

  const dispatch = useDispatch();

  const handleEdit = id => {                    //todo
    console.log(`Editing idex: ${id}`);  
  };

  const handleDelete = async(id) => {
    console.log(`Deleting idex: ${id}`)
    // delete from sqlite                   //todo (not working)
    const db = await connectToDatabase();
    await removeItemFromTable(db, id)

    dispatch(removeFromList({id}))           // delete from redux
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.cardText}>Project Name: {item.projectName}</Text>
      <Text style={styles.cardText}>Email: {item.email}</Text>
      <Text style={styles.cardText}>Phone: {item.phoneNumber}</Text>
      <Text style={styles.cardText}>
        Overall Experience: {item.overallExperience}
      </Text>
      <Text style={styles.cardText}>
        Team Collaboration: {item.teamCollaboration}
      </Text>
      <Text style={styles.cardText}>
        Time Management: {item.timeManagement}
      </Text>
      <Text style={styles.cardText}>
        Challenges Faced: {item.challengesFaced}
      </Text>
      <Text style={styles.cardText}>
        Project Objective Achieved: {item.projectObjectiveAchieved}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(index)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#333',
    height: 350,
    width: 350,
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#f1f1f1', // Light text for readability
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#d3d3d3', // Softer light gray for text
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#27ae60', // Muted green for edit button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#c0392b', // Muted red for delete button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#c0392b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#f1f1f1', // Consistent light color for button text
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
