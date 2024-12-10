import { StyleSheet } from 'react-native';

const formStyle1 = StyleSheet.create({
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
    width: 350,
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
    borderColor: '#FFC107',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleFilled: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFC107',
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

export default formStyle1;
