import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  formStylesheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {addToList, setList, setEditing} from '../../slices/FormSlice';
import {Slider, CheckBox} from '@rneui/themed';
import {connectToDatabase, createTable, insertFeedback, getFeedback} from '../../db/db';

const FeedbackSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required').min(2, "Too short"),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  employeeType: Yup.string().required('Employee type is required').oneOf(['Intern', 'Manager', 'Lead', 'SDE'], 'Invalid employee type'),
  projectName: Yup.string().required('Project name is required'),
  teamCollaboration: Yup.string().required('Team collaboration rating is required').oneOf(['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'], 'Invalid choice'),
  collaborationAspects: Yup.array().of(Yup.string()).min(1, 'At least one aspect of collaboration must be selected'),
  challengesFaced: Yup.string().required('This field is required').oneOf(['Yes', 'No'], 'Invalid choice'),
  challengesDescription: Yup.string().when('challengesFaced', (challengesFaced, schema) => {
    return challengesFaced === 'Yes' ? schema.required('Please describe the challenges faced') : schema.nullable();
  }),
  timeManagement: Yup.number().required('Time management rating is required').min(0, 'Minimum rating is 0').max(5, 'Maximum rating is 5'),
  projectObjectiveAchieved: Yup.string().required('This field is required').oneOf(['Yes', 'Partially', 'No'], 'Invalid choice'),
  overallExperience: Yup.number().required('Overall experience rating is required').min(0, 'Minimum rating is 0').max(5, 'Maximum rating is 5'),
  additionalFeedback: Yup.string().required('This field is required'),
});

const FeedbackForm = () => {

  const dispatch = useDispatch();
  const {editing, index, list} = useSelector(state => state.form);
  const {formStyles} = useSelector((state)=>state.theme)

  console.log(editing + " " + index)

  const onSubmit = (values) => {
    console.log(values, 'value');
  
    if (editing) {
      // Update Redux
      const updatedList = [...list];
      updatedList[index] = values; // Replace the item at the specified index
      dispatch(setList(updatedList)); // Update the Redux list
      dispatch(setEditing(false)); // Exit editing mode
  
      // Update SQLite
      const updateFeedback = async () => {
        const db = await connectToDatabase();
  
        // Assume an `id` field exists for identifying rows in the database
        const feedbackId = list[index]?.id;
        if (!feedbackId) {
          console.error('Error: Feedback ID is missing.');
          return;
        }
  
        const query = `
          UPDATE feedback 
          SET 
            firstName = ?, lastName = ?, email = ?, phoneNumber = ?, 
            employeeType = ?, projectName = ?, teamCollaboration = ?, 
            collaborationAspects = ?, challengesFaced = ?, challengesDescription = ?, 
            timeManagement = ?, delayDescription = ?, projectObjectiveAchieved = ?, 
            improvementSuggestions = ?, overallExperience = ?, additionalFeedback = ?
          WHERE id = ?`;
  
        const params = [
          values.firstName,
          values.lastName,
          values.email,
          values.phoneNumber,
          values.employeeType,
          values.projectName,
          values.teamCollaboration,
          JSON.stringify(values.collaborationAspects), // Convert array to string
          values.challengesFaced,
          values.challengesDescription,
          values.timeManagement,
          values.delayDescription,
          values.projectObjectiveAchieved,
          values.improvementSuggestions,
          values.overallExperience,
          values.additionalFeedback,
          feedbackId, // Bind the ID for the WHERE clause
        ];
  
        await db.executeSql(query, params);
      };
  
      updateFeedback().catch((error) => {
        console.error('Error updating feedback:', error);
      });
    } else {
      // New Entry Logic (Already Implemented)
      const saveFeedback = async () => {
        const db = await connectToDatabase();
        await createTable(db);
        await insertFeedback(db, values);
      };
  
      saveFeedback().catch((error) => {
        console.error('Error saving feedback:', error);
      });
  
      dispatch(addToList(values)); // Add the new feedback to Redux
    }
  };
  
  console.log("rerender from")
  useEffect(() => {
    // write logic to rerender the page based on editing
  }, [editing, index])

  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: editing && list[index]?.firstName ? list[index].firstName : '',
          lastName: editing && list[index]?.lastName ? list[index].lastName : '',
          email: editing && list[index]?.email ? list[index].email : '',
          phoneNumber: editing && list[index]?.phoneNumber ? list[index].phoneNumber : '',
          employeeType: editing && list[index]?.employeeType ? list[index].employeeType : '',
          projectName: editing && list[index]?.projectName ? list[index].projectName : '',
          teamCollaboration: editing && list[index]?.teamCollaboration ? list[index].teamCollaboration : '',
          collaborationAspects: editing && list[index]?.collaborationAspects ? list[index].collaborationAspects : [],
          challengesFaced: editing && list[index]?.challengesFaced ? list[index].challengesFaced : '',
          challengesDescription: editing && list[index]?.challengesDescription ? list[index].challengesDescription : '',
          timeManagement: editing && list[index]?.timeManagement ? list[index].timeManagement : 0,
          delayDescription: editing && list[index]?.delayDescription ? list[index].delayDescription : '',
          projectObjectiveAchieved: editing && list[index]?.projectObjectiveAchieved ? list[index].projectObjectiveAchieved : '',
          improvementSuggestions: editing && list[index]?.improvementSuggestions ? list[index].improvementSuggestions : '',
          overallExperience: editing && list[index]?.overallExperience ? list[index].overallExperience : 0,
          additionalFeedback: editing && list[index]?.additionalFeedback ? list[index].additionalFeedback : '',
        }}
        validationSchema={FeedbackSchema}
        validateOnChange={true}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values); // Your custom submit logic
          resetForm(); // Reset the form fields
        }}
        >
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
          <View style={formStyles.container}>

            <View style={formStyles.sections}>
                <Text style={formStyles.label}>First Name</Text>
                <TextInput
                style={formStyles.input}
                onChangeText={handleChange('firstName')}
                value={values.firstName}
                />
                {touched.firstName && errors.firstName && (
                <Text style={formStyles.error}>{errors.firstName}</Text>
                )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Last Name</Text>
              <TextInput
                style={formStyles.input}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <Text style={formStyles.error}>{errors.lastName}</Text>
              )}
            </View>
            
            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Email</Text>
              <TextInput
                style={formStyles.input}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={formStyles.error}>{errors.email}</Text>
              )}
            </View>
           
            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Phone Number</Text>
              <TextInput
                style={formStyles.input}
                keyboardType="numeric"
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={formStyles.error}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Employee Type</Text>
              {['Intern', 'Manager', 'Lead', 'SDE'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFieldValue('employeeType', type)}>
                    <View style={formStyles.radioContainer}>
                      <View style={formStyles.radioCircle}>
                        {values.employeeType === type && <View style={formStyles.radioCircleFilled} />}
                      </View>
                      <Text style={formStyles.radioOption}>{type}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.employeeType && errors.employeeType && (
                <Text style={formStyles.error}>{errors.employeeType}</Text>
              )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Project Name</Text>
              <TextInput
                style={formStyles.input}
                onChangeText={handleChange('projectName')}
                value={values.projectName}
              />
              {touched.projectName && errors.projectName && (
                <Text style={formStyles.error}>{errors.projectName}</Text>
              )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Team Collaboration</Text>
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
                    <View style={formStyles.radioContainer}>
                      <View style={formStyles.radioCircle}>
                        {values.teamCollaboration === option && <View style={formStyles.radioCircleFilled} />}
                      </View>
                      <Text style={formStyles.radioOption}>{option}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.teamCollaboration && errors.teamCollaboration && (
                <Text style={formStyles.error}>{errors.teamCollaboration}</Text>
              )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Collaboration Aspects</Text>
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
                  containerStyle={formStyles.checkboxContainter}
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
                <Text style={formStyles.error}>{errors.collaborationAspects}</Text>
              )}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Challenges Faced</Text>
              {['Yes', 'No'].map(choice => (
                <TouchableOpacity
                  key={choice}
                  onPress={() => setFieldValue('challengesFaced', choice)}>
                    <View style={formStyles.radioContainer}>
                      <View style={formStyles.radioCircle}>
                        {values.challengesFaced === choice && <View style={formStyles.radioCircleFilled} />}
                      </View>
                      <Text style={formStyles.radioOption}>{choice}</Text>
                    </View>
                </TouchableOpacity>
              ))}
              {touched.challengesFaced && errors.challengesFaced && (
                <Text style={formStyles.error}>{errors.challengesFaced}</Text>
              )} 
            </View>
            
            {
              values.challengesFaced === 'Yes' && (
                <View style={formStyles.sections}>
                  <Text style={formStyles.label}>Challenges Description</Text>
                  <TextInput
                    style={formStyles.input}
                    onChangeText={handleChange('challengesDescription')}
                    // onBlur={handleBlur('challengesDescription')}
                    value={values.challengesDescription}
                  />
                  {touched.challengesDescription &&
                    errors.challengesDescription && (
                      <Text style={formStyles.error}>
                        {errors.challengesDescription}
                      </Text>
                    )}
                </View>
              )
            }
            
            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Project Objective Achieved</Text>
              {['Yes', 'Partially', 'No'].map(choice => (
                <TouchableOpacity
                  key={choice}
                  onPress={() =>
                    setFieldValue('projectObjectiveAchieved', choice)
                  }>
                    <View style={formStyles.radioContainer}>
                      <View style={formStyles.radioCircle}>
                        {values.projectObjectiveAchieved === choice && <View style={formStyles.radioCircleFilled} />}
                      </View>
                      <Text style={formStyles.radioOption}>{choice}</Text>
                    </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Time Management</Text>
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
            
            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Overall Experience</Text>
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
            
            <View style={formStyles.sections}>
              <Text style={formStyles.label}>Additional Feedback</Text>
              <TextInput
                style={formStyles.input}
                onChangeText={handleChange('additionalFeedback')}
                // onBlur={handleBlur('additionalFeedback')}
                value={values.additionalFeedback}
              />
              {touched.additionalFeedback && errors.additionalFeedback && (
                <Text style={formStyles.error}>{errors.additionalFeedback}</Text>
              )}
            </View>

            <View >
              <TouchableOpacity
                style={ isValid? formStyles.button : formStyles.disabledButton}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={isValid ? formStyles.buttonText : formStyles.disabledButtonText}>
                  {editing ? "UPDATE" : "SUBMIT"}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik>
    </ScrollView>
  );
};


// const formStyles = formStylesheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#121212', 
//       padding: 16,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     sections: {
//       marginTop: 10,
//       marginBottom: 20,
//       borderBottomColor: "#8B8000",
//       borderBottomWidth: 1,
//       width: 350
//     },
//     input: {
//       width: 350, 
//       height: 48, 
//       borderColor: '#333', 
//       borderWidth: 1,
//       borderRadius: 8, 
//       marginBottom: 16, 
//       paddingHorizontal: 12, 
//       fontSize: 16, 
//       backgroundColor: '#1e1e1e', 
//       color: '#fff', 
//     },
//     label: {
//       fontSize: 18, 
//       fontWeight: '600', 
//       marginBottom: 8, 
//       color: '#ffffff', 
//     },
//     error: {
//       color: '#ff6b6b', 
//       fontSize: 14, 
//       marginBottom: 12,
//       textAlign: 'center', 
//     },
//     radioOption: {
//       fontSize: 16,
//       color: '#bbb', 
//     },
//     radioContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     radioCircle: {
//       height: 24,
//       width: 24,
//       borderRadius: 12,
//       borderWidth: 2,
//       borderColor: '#FFC107', // Yellow border
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginRight: 10,
//     },
//     radioCircleFilled: {
//       height: 12,
//       width: 12,
//       borderRadius: 6,
//       backgroundColor: '#FFC107', // Yellow fill for selected
//     },
//     checkboxContainter: {
//       backgroundColor: 'transparent',
//       alignItems: 'flex-start',
//     },
    
//     button: {
//       backgroundColor: '#FFC107',
//       paddingVertical: 12,
//       borderRadius: 8,
//       alignItems: 'center',
//       // marginTop: ,
//       width: 200,
//       shadowColor: '#000',
//       shadowOpacity: 0.2,
//       shadowOffset: { width: 0, height: 2 },
//       shadowRadius: 4,
//       elevation: 3,
//   },
//   buttonText: {
//       color: '#121212',
//       fontSize: 18,
//       fontWeight: 'bold',
//   },
//   disabledButton: {
//       backgroundColor: '#555555',
//       paddingVertical: 12,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 16,
//       width: 200,
//       shadowColor: 'transparent',
//       elevation: 0,
//   },
//   disabledButtonText: {
//       color: '#a1a1a1',
//       fontSize: 18,
//       fontWeight: 'bold',
//   },
// });


export default FeedbackForm;
