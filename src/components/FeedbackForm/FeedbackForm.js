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
import {addToList, setList} from '../../slices/FormSlice';
import {Slider, CheckBox} from '@rneui/themed';
import {connectToDatabase, createTable, insertFeedback, getFeedback} from '../../db/db';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon set

const FeedbackSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, "Too short"),
  lastName: Yup.string()
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  employeeType: Yup.string() 
    .required('Employee type is required')
    .oneOf(['Intern', 'Manager', 'Lead', 'SDE'], 'Invalid employee type'),

  projectName: Yup.string()
    .required('Project name is required'),

  teamCollaboration: Yup.string()
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
  collaborationAspects: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one aspect of collaboration must be selected'),

    challengesFaced: Yup.string()
  .required('This field is required')
  .oneOf(['Yes', 'No'], 'Invalid choice'),

  challengesDescription: Yup.string().when('challengesFaced', (challengesFaced, schema) => {
    return challengesFaced === 'Yes'
      ? schema.required('Please describe the challenges faced')
      : schema.nullable();
  }),
  
      

  // Time Management
  timeManagement: Yup.number()
    .required('Time management rating is required') //silder
    .min(0, 'Minimum rating is 0')
    .max(5, 'Maximum rating is 5'),

  // Outcome Evaluation
  projectObjectiveAchieved: Yup.string() //radio
    .required('This field is required')
    .oneOf(['Yes', 'Partially', 'No'], 'Invalid choice'),

  // Overall Project Experience
  overallExperience: Yup.number() //slider
    .required('Overall experience rating is required')
    .min(0, 'Minimum rating is 0')
    .max(5, 'Maximum rating is 5'),

  // Final Comments
  additionalFeedback: Yup.string().required('This field is required'),
});

const FeedbackFrom = () => {

  const dispatch = useDispatch();
  const {editing} = useSelector(state => state.form);


  const onSubmit = (values) => {

    console.log(values, 'value');

    const saveFeedback = async () => {          //push to sql lite
      const db = await connectToDatabase();

      await createTable(db);

      await insertFeedback(db, values);
    };

    saveFeedback().catch(error => {
      console.error('Error saving feedback:', error);
    });

    dispatch(addToList(values));        // push to redux array

    setList({                       // reset the form
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
      overallExperience: 0,
      additionalFeedback: '',
    });
  };

  return (
    <ScrollView>
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
          overallExperience: 0,
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

            <View style={styles.sections}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                />
                {touched.firstName && errors.firstName && (
                <Text style={styles.error}>{errors.firstName}</Text>
                )}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.error}>{errors.lastName}</Text>
              )}
            </View>
            
            <View style={styles.sections}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
           
            <View style={styles.sections}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Employee Type</Text>
              {['Intern', 'Manager', 'Lead', 'SDE'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFieldValue('employeeType', type)}>
                    <View style={styles.radioContainer}>
                      <View style={styles.radioCircle}>
                        {values.employeeType === type && <View style={styles.radioCircleFilled} />}
                      </View>
                      <Text style={styles.radioOption}>{type}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.employeeType && errors.employeeType && (
                <Text style={styles.error}>{errors.employeeType}</Text>
              )}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Project Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('projectName')}
                value={values.projectName}
              />
              {touched.projectName && errors.projectName && (
                <Text style={styles.error}>{errors.projectName}</Text>
              )}
            </View>

            <View style={styles.sections}>
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
                    <View style={styles.radioContainer}>
                      <View style={styles.radioCircle}>
                        {values.teamCollaboration === option && <View style={styles.radioCircleFilled} />}
                      </View>
                      <Text style={styles.radioOption}>{option}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.teamCollaboration && errors.teamCollaboration && (
                <Text style={styles.error}>{errors.teamCollaboration}</Text>
              )}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Collaboration Aspects</Text>
              {['Communication', 'Support', 'Task Distribution'].map(aspect => (
                <CheckBox
                  key={aspect}
                  center
                  title={aspect}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checkedColor="#FFC107"
                  uncheckedColor="#bbb" // Optional: Customize unchecked color
                  checked={values.collaborationAspects.includes(aspect)}
                  containerStyle={styles.checkboxContainter}
                  textStyle={{ fontSize: 18, color: '#333' }} // Adjust font size and color
                  onPress={() => {
                    const isChecked = values.collaborationAspects.includes(aspect);
                    const nextValue = isChecked
                      ? values.collaborationAspects.filter(item => item !== aspect)
                      : [...values.collaborationAspects, aspect];
                    setFieldValue('collaborationAspects', nextValue);
                  }}
                />
              ))}


              {touched.collaborationAspects && errors.collaborationAspects && (
                <Text style={styles.error}>{errors.collaborationAspects}</Text>
              )}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Challenges Faced</Text>
              {['Yes', 'No'].map(choice => (
                <TouchableOpacity
                  key={choice}
                  onPress={() => setFieldValue('challengesFaced', choice)}>
                    <View style={styles.radioContainer}>
                      <View style={styles.radioCircle}>
                        {values.challengesFaced === choice && <View style={styles.radioCircleFilled} />}
                      </View>
                      <Text style={styles.radioOption}>{choice}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.challengesFaced && errors.challengesFaced && (
                <Text style={styles.error}>{errors.challengesFaced}</Text>
              )} 
            </View>
            
            {
              values.challengesFaced === 'Yes' && (
                <View style={styles.sections}>
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
                </View>
              )
            }
            
            <View style={styles.sections}>
              <Text style={styles.label}>Project Objective Achieved</Text>
              {['Yes', 'Partially', 'No'].map(choice => (
                <TouchableOpacity
                  key={choice}
                  onPress={() =>
                    setFieldValue('projectObjectiveAchieved', choice)
                  }>
                    <View style={styles.radioContainer}>
                      <View style={styles.radioCircle}>
                        {values.projectObjectiveAchieved === choice && <View style={styles.radioCircleFilled} />}
                      </View>
                      <Text style={styles.radioOption}>{choice}</Text>
                    </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sections}>
              <Text style={styles.label}>Time Management</Text>
              <Slider
                minimumValue={0}
                maximumValue={5}
                step={1}
                value={values.timeManagement}
                minimumTrackTintColor="#FFD700"
                maximumTrackTintColor="#FFF0D5"
                onValueChange={value => setFieldValue('timeManagement', value)}
                allowTouchTrack
                trackStyle={{height: 8}}
                thumbStyle={{
                  height: 18,
                  width: 18,
                  backgroundColor: '#FFE135',
                }}
              />
              <Text style={{color: 'white'}}>Rating: {values.timeManagement}</Text>
            </View>
            
            <View style={styles.sections}>
              <Text style={styles.label}>Overall Experience</Text>
              <Slider
                minimumValue={0}
                maximumValue={5}
                step={1}
                value={values.overallExperience}
                minimumTrackTintColor="#FFD700"
                maximumTrackTintColor="#FFF0D5"
                onValueChange={value => setFieldValue('overallExperience', value)}
                allowTouchTrack
                trackStyle={{height: 8}}
                thumbStyle={{
                  height: 18,
                  width: 18,
                  backgroundColor: '#FFE135',
                }}
              />
              <Text style={{color: 'white'}}>Rating: {values.overallExperience}</Text>
            </View>
            
            <View style={styles.sections}>
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
            </View>

            <View >
              <TouchableOpacity
                style={ isValid? styles.button : styles.disabledButton}
                onPress={()=> {
                  onSubmit(values);
                  handleSubmit();
                  handleReset();
                }}
                disabled={!isValid}
              >
                <Text style={ isValid? styles.buttonText : styles.disabledButtonText}>SUBMIT</Text>
              </TouchableOpacity>
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
      backgroundColor: '#121212', 
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sections: {
      marginTop: 10,
      marginBottom: 20,
      borderBottomColor: "#8B8000",
      borderBottomWidth: 1,
      width: 350
    },
    input: {
      width: 350, 
      height: 48, 
      borderColor: '#333', 
      borderWidth: 1,
      borderRadius: 8, 
      marginBottom: 16, 
      paddingHorizontal: 12, 
      fontSize: 16, 
      backgroundColor: '#1e1e1e', 
      color: '#fff', 
    },
    label: {
      fontSize: 18, 
      fontWeight: '600', 
      marginBottom: 8, 
      color: '#ffffff', 
    },
    error: {
      color: '#ff6b6b', 
      fontSize: 14, 
      marginBottom: 12,
      textAlign: 'center', 
    },
    radioOption: {
      fontSize: 16,
      color: '#bbb', 
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#FFC107', // Yellow border
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    radioCircleFilled: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: '#FFC107', // Yellow fill for selected
    },
    checkboxContainter: {
      backgroundColor: 'transparent',
      alignItems: 'flex-start',
    },
    
    button: {
      backgroundColor: '#FFC107',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      // marginTop: ,
      width: 200,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
  },
  buttonText: {
      color: '#121212',
      fontSize: 18,
      fontWeight: 'bold',
  },
  disabledButton: {
      backgroundColor: '#555555',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      width: 200,
      shadowColor: 'transparent',
      elevation: 0,
  },
  disabledButtonText: {
      color: '#a1a1a1',
      fontSize: 18,
      fontWeight: 'bold',
  },
});


export default FeedbackFrom;
