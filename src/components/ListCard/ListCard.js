import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {removeFromList} from '../../slices/FormSlice';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromTable, connectToDatabase} from '../../db/db';
import {useNavigation} from '@react-navigation/native';
import {setEditing, setIndex} from '../../slices/FormSlice';

const ListCard = ({item, index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {listCardStyles} = useSelector(state => state.theme);
  const [loading, setLoading] = useState(false);

  const handleEdit = id => {
    dispatch(setEditing(true));
    dispatch(setIndex(id));
    navigation.jumpTo('FeedbackForm');
  };

  const handleDelete = async id => {
    const db = await connectToDatabase();
    await removeItemFromTable(db, item.id);
    dispatch(removeFromList({id}));
  };

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
    <View style={listCardStyles.card}>
      <Text style={listCardStyles.cardTitle}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={listCardStyles.cardText}>
        Project Name: {item.projectName}
      </Text>
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
