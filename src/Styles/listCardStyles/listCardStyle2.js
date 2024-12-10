import { StyleSheet } from 'react-native';

const listCardStyle2 = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff', // Light card background
    borderRadius: 10,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#cccccc', // Subtle light border
    height: 380,
    width: 350,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700', // Bold font for title
    marginBottom: 10,
    color: '#333333', // Darker text for readability
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555555', // Medium gray for text
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#4caf50', // Bright green for edit button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#f44336', // Bright red for delete button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff', // White button text
    fontSize: 16,
    fontWeight: '600', // Slightly bolder text
    textAlign: 'center',
  },
});

export default listCardStyle2;
