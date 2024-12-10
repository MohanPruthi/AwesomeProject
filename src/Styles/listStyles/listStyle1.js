import { StyleSheet } from 'react-native';

const listStyle1 = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterArea: {
    backgroundColor: "#1e1e1e",
    flexDirection: 'row',
    height: 50,
    width: '100%',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filterHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  filter: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#333',
    marginLeft: 10,
    minWidth: 50,
    width: 'auto',
    height: 40,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilter: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  selectedFilterText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default listStyle1;
