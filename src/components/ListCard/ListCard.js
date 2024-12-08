import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const ListCard = ({item}) => {
  const handleEdit = id => {
    console.log(`Editing item with id: ${id}`);
    // Implement the edit functionality here
  };

  const handleDelete = id => {
    console.log(`Deleting item with id: ${id}`);
    // Implement the delete functionality here
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
          onPress={() => handleEdit(item.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
