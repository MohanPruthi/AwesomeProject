import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {setList} from '../../slices/FormSlice';
import {Slider, CheckBox} from '@rneui/themed';
import {connectToDatabase, createTable, insertFeedback} from '../../db/db';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon set

const FeedbackSchema = Yup.object().shape({
  // Personal Information
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name must only contain letters'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Last name must only contain letters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

  // Employee Type
  employeeType: Yup.string() //radio
    .required('Employee type is required')
    .oneOf(['Intern', 'Manager', 'Lead', 'SDE'], 'Invalid employee type'),

  // Project Details
  projectName: Yup.string() // drop down
    .required('Project name is required'),

  // Team Collaboration
  teamCollaboration: Yup.string() //radio
    .required('Team collaboration rating is required')
    .oneOf(
      [
        'Very Satisfied',
        'Satisfied',
        'Neutral',
        'Dissatisfied',
        'Very Dissatisfied',
      ],
      'Invalid choice',
    ),
  collaborationAspects: Yup.array() //check box
    .of(Yup.string())
    .min(1, 'At least one aspect of collaboration must be selected'),

  // Challenges Faced
  challengesFaced: Yup.string() //radio
    .required('This field is required')
    .oneOf(['Yes', 'No'], 'Invalid choice'),
  challengesDescription: Yup.string().when('challengesFaced', {
    is: 'Yes',
    then: Yup.string().required('Please describe the challenges faced'),
    otherwise: Yup.string().notRequired(),
  }),

  // Time Management
  timeManagement: Yup.number()
    .required('Time management rating is required') //silder
    .min(1, 'Minimum rating is 1')
    .max(10, 'Maximum rating is 10'),

  // Outcome Evaluation
  projectObjectiveAchieved: Yup.string() //radio
    .required('This field is required')
    .oneOf(['Yes', 'Partially', 'No'], 'Invalid choice'),

  // Overall Project Experience
  overallExperience: Yup.number() //slider
    .required('Overall experience rating is required')
    .min(1, 'Minimum rating is 1')
    .max(10, 'Maximum rating is 10'),

  // Final Comments
  additionalFeedback: Yup.string().required('This field is required'),
});

const FeedbackFrom = () => {
  const dispatch = useDispatch();
  const {editing, list} = useSelector(state => state.form);

  const onSubmit = values => {
    console.log(values, 'value');
    dispatch(setList(values));
    // navigate to list
    const saveFeedback = async () => {
      const db = await connectToDatabase();

      // Create table if not exists
      await createTable(db);

      // Insert feedback into the table
      await insertFeedback(db, values);
    };

    // Call the saveFeedback function
    saveFeedback().catch(error => {
      console.error('Error saving feedback:', error);
    });

    setList({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      employeeType: '',
      projectName: '',
      teamCollaboration: '',
      collaborationAspects: [],
      challengesFaced: '',
      challengesDescription: '',
      timeManagement: 0,
      delayDescription: '',
      projectObjectiveAchieved: '',
      improvementSuggestions: '',
      overallExperience: 5,
      additionalFeedback: '',
    });
  };

  return (
    <ScrollView>
      <Text>Form...</Text>
      <Formik
        initialValues={{
          // firstName: editing ? list[index].firstName : '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          employeeType: '',
          projectName: '',
          teamCollaboration: '',
          collaborationAspects: [],
          challengesFaced: '',
          challengesDescription: '',
          timeManagement: 0,
          delayDescription: '',
          projectObjectiveAchieved: '',
          improvementSuggestions: '',
          overallExperience: 5,
          additionalFeedback: '',
        }}
        validationSchema={FeedbackSchema}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          handleReset,
        }) => (
          <View style={styles.container}>
            {/* Personal Information */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('firstName')}
              // onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('lastName')}
              // onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              // onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange('phoneNumber')}
              // onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            {/* Employee Type (Radio buttons) */}
            <Text style={styles.label}>Employee Type</Text>
            {['Intern', 'Manager', 'Lead', 'SDE'].map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setFieldValue('employeeType', type)}>
                <Text style={styles.radioOption}>{type}</Text>
              </TouchableOpacity>
            ))}
            {touched.employeeType && errors.employeeType && (
              <Text style={styles.error}>{errors.employeeType}</Text>
            )}

            {/* Project Name (Dropdown/Select) */}
            <Text style={styles.label}>Project Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('projectName')}
              // onBlur={handleBlur('projectName')}
              value={values.projectName}
            />
            {touched.projectName && errors.projectName && (
              <Text style={styles.error}>{errors.projectName}</Text>
            )}

            {/* Team Collaboration (Radio buttons) */}
            <Text style={styles.label}>Team Collaboration</Text>
            {[
              'Very Satisfied',
              'Satisfied',
              'Neutral',
              'Dissatisfied',
              'Very Dissatisfied',
            ].map(option => (
              <TouchableOpacity
                key={option}
                onPress={() => setFieldValue('teamCollaboration', option)}>
                <Text style={styles.radioOption}>{option}</Text>
              </TouchableOpacity>
            ))}
            {touched.teamCollaboration && errors.teamCollaboration && (
              <Text style={styles.error}>{errors.teamCollaboration}</Text>
            )}

            {/* Collaboration Aspects (Checkboxes) */}
            <Text style={styles.label}>Collaboration Aspects</Text>
            {['Communication', 'Support', 'Task Distribution'].map(aspect => (
              <CheckBox
                center
                title={`${aspect}`}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                checked={values.collaborationAspects.includes(aspect)}
                onPress={checked => {
                  const nextValue = checked
                    ? [...values.collaborationAspects, aspect]
                    : values.collaborationAspects.filter(
                        item => item !== aspect,
                      );
                  setFieldValue('collaborationAspects', nextValue);
                }}
              />
            ))}
            {touched.collaborationAspects && errors.collaborationAspects && (
              <Text style={styles.error}>{errors.collaborationAspects}</Text>
            )}

            {/* Challenges Faced (Radio buttons) */}
            <Text style={styles.label}>Challenges Faced</Text>
            {['Yes', 'No'].map(choice => (
              <TouchableOpacity
                key={choice}
                onPress={() => setFieldValue('challengesFaced', choice)}>
                <Text style={styles.radioOption}>{choice}</Text>
              </TouchableOpacity>
            ))}
            {touched.challengesFaced && errors.challengesFaced && (
              <Text style={styles.error}>{errors.challengesFaced}</Text>
            )}

            {values.challengesFaced === 'Yes' && (
              <>
                <Text style={styles.label}>Challenges Description</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('challengesDescription')}
                  // onBlur={handleBlur('challengesDescription')}
                  value={values.challengesDescription}
                />
                {touched.challengesDescription &&
                  errors.challengesDescription && (
                    <Text style={styles.error}>
                      {errors.challengesDescription}
                    </Text>
                  )}
              </>
            )}

            {/* Time Management (Slider) */}
            <Text style={styles.label}>Time Management (Rating 1-10)</Text>
            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={values.timeManagement}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#D3D3D3"
              onValueChange={value => setFieldValue('timeManagement', value)}
              allowTouchTrack
              trackStyle={{height: 5, backgroundColor: 'transparent'}}
              thumbStyle={{
                height: 15,
                width: 15,
                backgroundColor: 'blue',
              }}
            />
            <Text>Rating: {values.timeManagement}</Text>

            {/* Project Objective Achieved (Radio buttons) */}
            <Text style={styles.label}>Project Objective Achieved</Text>
            {['Yes', 'Partially', 'No'].map(choice => (
              <TouchableOpacity
                key={choice}
                onPress={() =>
                  setFieldValue('projectObjectiveAchieved', choice)
                }>
                <Text style={styles.radioOption}>{choice}</Text>
              </TouchableOpacity>
            ))}

            {/* Overall Experience (Slider) */}
            <Text style={styles.label}>Overall Experience (Rating 1-10)</Text>
            <Slider
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={values.overallExperience}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#D3D3D3"
              onValueChange={value => setFieldValue('overallExperience', value)}
              allowTouchTrack
              trackStyle={{height: 5, backgroundColor: 'transparent'}}
              thumbStyle={{
                height: 15,
                width: 15,
                backgroundColor: 'blue',
              }}
            />
            <Text>Rating: {values.overallExperience}</Text>

            {/* Final Comments */}
            <Text style={styles.label}>Additional Feedback</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('additionalFeedback')}
              // onBlur={handleBlur('additionalFeedback')}
              value={values.additionalFeedback}
            />
            {touched.additionalFeedback && errors.additionalFeedback && (
              <Text style={styles.error}>{errors.additionalFeedback}</Text>
            )}

            {/* Submit Button */}
            <Button
              style={styles.button}
              title="Submit"
              onPress={() => {
                handleSubmit();
                onSubmit(values);
                handleReset();
              }}
              disabled={!isValid}
            />
            <View>
              <Ionicons name="home" size={30} color="green" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Softer background color for better contrast
    padding: 16, // Add padding for better spacing
  },
  input: {
    height: 48, // Consistent height for inputs
    borderColor: '#ddd', // Subtle border color
    borderWidth: 1,
    borderRadius: 8, // Slightly rounded corners for modern design
    marginBottom: 16, // Uniform spacing between inputs
    paddingHorizontal: 12, // Comfortable padding inside the input
    fontSize: 16, // Standard font size for readability
    backgroundColor: 'white', // White background for input fields
  },
  label: {
    fontSize: 18, // Larger font size for clear labeling
    fontWeight: '600', // Slightly less bold for a cleaner look
    marginBottom: 8, // Proper spacing below labels
    color: '#333', // Darker text for better readability
  },
  error: {
    color: '#e74c3c', // Slightly darker red for better visibility
    fontSize: 14, // Readable font size for error messages
    marginBottom: 12, // Clear separation below error messages
  },
  radioOption: {
    fontSize: 16,
    color: '#555', // Softer text color for secondary options
    marginBottom: 8, // Better spacing for radio options
  },
  radioGroup: {
    marginBottom: 16, // Proper spacing below radio groups
  },
  checkbox: {
    flexDirection: 'row', // Align checkbox and text horizontally
    alignItems: 'center',
    marginBottom: 8, // Consistent spacing between checkboxes
  },
  checkboxText: {
    fontSize: 16,
    color: '#555', // Consistent text color with other secondary text
    marginLeft: 8, // Space between checkbox and text
  },
  sliderText: {
    fontSize: 16,
    color: '#555', // Consistent secondary text color
    marginBottom: 12, // Spacing below slider labels
  },
  button: {
    backgroundColor: '#007BFF', // More vibrant blue for primary action
    paddingVertical: 14, // Larger padding for better touch target
    borderRadius: 8, // Rounded corners for modern design
    alignItems: 'center',
    marginTop: 16, // Spacing above the button
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Slightly larger font size for emphasis
    fontWeight: 'bold',
  },
});

export default FeedbackFrom;
