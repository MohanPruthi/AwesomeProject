import React from 'react'
import { View, Text, ScrollView, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';


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
  employeeType: Yup.string()                //radio
    .required('Employee type is required')
    .oneOf(['Intern', 'Manager', 'Lead', 'SDE'], 'Invalid employee type'),

  // Project Details
  projectName: Yup.string()             // drop down
    .required('Project name is required'),

  // Team Collaboration
  teamCollaboration: Yup.string()           //radio
    .required('Team collaboration rating is required')
    .oneOf(['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'], 'Invalid choice'),
  collaborationAspects: Yup.array()             //check box
    .of(Yup.string())
    .min(1, 'At least one aspect of collaboration must be selected'),

  // Challenges Faced
  challengesFaced: Yup.string()             //radio
    .required('This field is required')
    .oneOf(['Yes', 'No'], 'Invalid choice'),
  challengesDescription: Yup.string().when('challengesFaced', {
    is: 'Yes',
    then: Yup.string().required('Please describe the challenges faced'),
    otherwise: Yup.string().notRequired(),
  }),


  // Time Management
  timeManagement: Yup.number()
    .required('Time management rating is required')         //silder
    .min(1, 'Minimum rating is 1')
    .max(10, 'Maximum rating is 10'),

  // Outcome Evaluation
  projectObjectiveAchieved: Yup.string()                //radio
    .required('This field is required')
    .oneOf(['Yes', 'Partially', 'No'], 'Invalid choice'),

    // Overall Project Experience
  overallExperience: Yup.number()           //slider
    .required('Overall experience rating is required')
    .min(1, 'Minimum rating is 1')
    .max(10, 'Maximum rating is 10'),

  // Final Comments
  additionalFeedback: Yup.string().required('This field is required'),
});


const FeedbackFrom = () => {
    return (
        <ScrollView>
            <Text>Form..xx.</Text>

            <Formik
            initialValues={{
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
                toolsSufficient: '',
                usefulTools: [],
                timeManagement: 5,
                delayDescription: '',
                projectObjectiveAchieved: '',
                improvementSuggestions: '',
                overallExperience: 5,
                additionalFeedback: '',
            }}
            validationSchema={FeedbackSchema}
            onSubmit={(values) => {
                console.log("submitted")
                console.log(values);
            }}
            >
            {({ values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleBlur,
                setFieldValue}) => (
                    <View style={styles.container}>
                        {/* Personal Information */}
                        <Text>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('firstName')}
                            // onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                            <Text style={styles.error}>{errors.firstName}</Text>
                        )}

                        <Text>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('lastName')}
                            // onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                            <Text style={styles.error}>{errors.lastName}</Text>
                        )}

                        <Text>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            // onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <Text>Phone Number</Text>
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
                        <Text>Employee Type</Text>
                        {['Intern', 'Manager', 'Lead', 'SDE'].map((type) => (
                            <TouchableOpacity
                            key={type}
                            onPress={() => setFieldValue('employeeType', type)}
                            >
                            <Text style={styles.radioOption}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                        {touched.employeeType && errors.employeeType && (
                            <Text style={styles.error}>{errors.employeeType}</Text>
                        )}

                        {/* Project Name (Dropdown/Select) */}
                        <Text>Project Name</Text>
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
                        <Text>Team Collaboration</Text>
                        {['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'].map(
                            (option) => (
                            <TouchableOpacity
                                key={option}
                                onPress={() => setFieldValue('teamCollaboration', option)}
                            >
                                <Text style={styles.radioOption}>{option}</Text>
                            </TouchableOpacity>
                            )
                        )}
                        {touched.teamCollaboration && errors.teamCollaboration && (
                            <Text style={styles.error}>{errors.teamCollaboration}</Text>
                        )}

                        {/* Collaboration Aspects (Checkboxes) */}
                        <Text>Collaboration Aspects</Text>
                        {['Communication', 'Support', 'Task Distribution'].map((aspect) => (
                            <View key={aspect}>
                            <CheckBox
                                value={values.collaborationAspects.includes(aspect)}
                                onValueChange={(checked) => {
                                const nextValue = checked
                                    ? [...values.collaborationAspects, aspect]
                                    : values.collaborationAspects.filter((item) => item !== aspect);
                                setFieldValue('collaborationAspects', nextValue);
                                }}
                            />
                            <Text>{aspect}</Text>
                            </View>
                        ))}
                        {touched.collaborationAspects && errors.collaborationAspects && (
                            <Text style={styles.error}>{errors.collaborationAspects}</Text>
                        )}

                        {/* Challenges Faced (Radio buttons) */}
                        <Text>Challenges Faced</Text>
                        {['Yes', 'No'].map((choice) => (
                            <TouchableOpacity
                            key={choice}
                            onPress={() => setFieldValue('challengesFaced', choice)}
                            >
                            <Text style={styles.radioOption}>{choice}</Text>
                            </TouchableOpacity>
                        ))}
                        {touched.challengesFaced && errors.challengesFaced && (
                            <Text style={styles.error}>{errors.challengesFaced}</Text>
                        )}

                        {values.challengesFaced === 'Yes' && (
                            <>
                            <Text>Challenges Description</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('challengesDescription')}
                                // onBlur={handleBlur('challengesDescription')}
                                value={values.challengesDescription}
                            />
                            {touched.challengesDescription && errors.challengesDescription && (
                                <Text style={styles.error}>{errors.challengesDescription}</Text>
                            )}
                            </>
                        )}

                        {/* Time Management (Slider) */}
                        <Text>Time Management (Rating 1-10)</Text>
                        <Slider
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            value={values.timeManagement}
                            onValueChange={(value) => setFieldValue('timeManagement', value)}
                            minimumTrackTintColor="#1EB1FC"
                            maximumTrackTintColor="#D3D3D3"
                            thumbTintColor="#1EB1FC"
                        />
                        <Text>Rating: {values.timeManagement}</Text>

                        {/* Project Objective Achieved (Radio buttons) */}
                        <Text>Project Objective Achieved</Text>
                        {['Yes', 'Partially', 'No'].map((choice) => (
                            <TouchableOpacity
                            key={choice}
                            onPress={() => setFieldValue('projectObjectiveAchieved', choice)}
                            >
                            <Text style={styles.radioOption}>{choice}</Text>
                            </TouchableOpacity>
                        ))}

                        {/* Overall Experience (Slider) */}
                        <Text>Overall Experience (Rating 1-10)</Text>
                        <Slider
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            value={values.overallExperience}
                            onValueChange={(value) => setFieldValue('overallExperience', value)}
                        />
                        <Text>Rating: {values.overallExperience}</Text>

                        {/* Final Comments */}
                        <Text>Additional Feedback</Text>
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
                            title="Submit"
                            onPress={()=> {
                                handleSubmit()
                                // onSubmit(values)
                            }}
                            disabled={!isValid}
                        />
                        </View>
            )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
      height: "auto",
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 12,
      paddingLeft: 8,
      fontSize: 26,
    },
    label: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    error: {
      color: 'red',
      fontSize: 12,
      marginBottom: 8,
    },
    radioOption: {
      fontSize: 16,
      marginBottom: 6,
    },
    radioGroup: {
      marginBottom: 12,
    },
    checkbox: {
      marginBottom: 6,
    },
    checkboxText: {
      fontSize: 16,
      marginBottom: 6,
    },
    sliderText: {
      fontSize: 16,
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#2196F3',
      padding: 10,
      borderRadius: 4,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default FeedbackFrom;
