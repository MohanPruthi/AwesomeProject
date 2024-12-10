import { StyleSheet } from 'react-native';

const listCardStyle3 = StyleSheet.create({
  card: {
    backgroundColor: '#FFE4CC', // Warm pastel orange background
    borderRadius: 10,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#C35C25', // Warm shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#F4845F', // Muted orange border
    height: 380,
    width: 350,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700', // Bold font for title
    marginBottom: 10,
    color: '#5A1A00', // Deep brown text
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#804000', // Medium warm brown for text
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#FF6700', // Vibrant orange for edit button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#FF6700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#D84315', // Dark orange-red for delete button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#D84315',
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

export default listCardStyle3;
