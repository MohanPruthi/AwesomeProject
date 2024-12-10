import { StyleSheet } from 'react-native';

const listCardStyle1 = StyleSheet.create({
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
    height: 380,
    width: 350,
    justifyContent: 'center',
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

export default listCardStyle1;
