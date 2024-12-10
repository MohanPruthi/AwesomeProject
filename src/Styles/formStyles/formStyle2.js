import { StyleSheet } from 'react-native';

const formStyle2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Light background
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sections: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: "#007BFF", // Blue underline
    borderBottomWidth: 1,
    width: 350,
  },
  input: {
    width: 350,
    height: 48,
    borderColor: '#cccccc', // Light gray border
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9', // Subtle gray background
    color: '#333333', // Dark text
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333', // Darker label
  },
  error: {
    color: '#D32F2F', // Bright red error
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  radioOption: {
    fontSize: 16,
    color: '#666666', // Medium gray
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
    borderColor: '#007BFF', // Blue border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleFilled: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF', // Blue fill for selected
  },
  checkboxContainter: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#007BFF', // Bright blue button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
    shadowColor: '#333333', // Darker shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Light gray for disabled
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
    shadowColor: 'transparent',
    elevation: 0,
  },
  disabledButtonText: {
    color: '#999999', // Medium gray for disabled text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default formStyle2;
