import { StyleSheet } from 'react-native';

const formStyle3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDD5', // Warm pastel background
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sections: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: "#FF6700", // Vibrant orange underline
    borderBottomWidth: 1,
    width: 350,
  },
  input: {
    width: 350,
    height: 48,
    borderColor: '#F4845F', // Soft orange border
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFE4CC', // Lighter orange background
    color: '#5A1A00', // Deep brown text
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#5A1A00', // Darker label text
  },
  error: {
    color: '#FF4500', // Bright orange-red error
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  radioOption: {
    fontSize: 16,
    color: '#C35C25', // Medium warm tone
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
    borderColor: '#FF6700', // Orange border
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleFilled: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FF6700', // Orange fill for selected
  },
  checkboxContainter: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#FF6700', // Vibrant orange button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
    shadowColor: '#5A1A00', // Warm shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#F4845F', // Muted orange for disabled
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
    shadowColor: 'transparent',
    elevation: 0,
  },
  disabledButtonText: {
    color: '#C35C25', // Medium muted tone for disabled text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default formStyle3;
