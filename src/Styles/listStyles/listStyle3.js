import { StyleSheet } from 'react-native';

const listStyle3 = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#FFE4CC', // Warm pastel orange background
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterArea: {
    backgroundColor: '#FFD1B3', // Subtle peach for the filter area
    flexDirection: 'row',
    height: 50,
    width: '100%',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F4845F', // Warm orange border
  },
  filterHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5A1A00', // Deep brown text
  },
  filter: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FF9E5F', // Soft orange border
    marginLeft: 10,
    minWidth: 50,
    width: 'auto',
    height: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#FF6700', // Vibrant orange for selected filter
    borderColor: '#C35C25', // Warm darker orange border
  },
  selectedFilterText: {
    color: '#ffffff', // White text for selected filter
    fontWeight: 'bold',
  },
});

export default listStyle3;
