import { StyleSheet } from 'react-native';

const listStyle2 = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#ffffff', // Light background
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterArea: {
    backgroundColor: "#f0f0f0", // Light gray background for the filter area
    flexDirection: 'row',
    height: 50,
    width: '100%',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc', // Subtle border
  },
  filterHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Dark heading text
  },
  filter: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cccccc', // Light gray border
    marginLeft: 10,
    minWidth: 50,
    width: 'auto',
    height: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#28a745', // Green for selected filter
    borderColor: '#1e7e34', // Darker green border
  },
  selectedFilterText: {
    color: '#ffffff', // White text for selected filter
    fontWeight: 'bold',
  },
});

export default listStyle2;
