const DOCTOR_COLORS = {
  Pediatrics: '#DC143C',     // Crimson
  'General Medicine': '#2E8B57',  // Sea Green
  Cardiology: '#4169E1',     // Royal Blue
  Orthopedics: '#BA55D3',    // Medium Orchid
  Neurology: '#FF8C00',      // Dark Orange
  Dentistry: '#20B2AA',      // Light Sea Green
  Dermatology: '#FF69B4',    // Hot Pink
  'ENT': '#6A5ACD',         // Slate Blue
  Ophthalmology: '#48D1CC',  // Medium Turquoise
  Psychiatry: '#9370DB',     // Medium Purple
  'Family Medicine': '#3CB371', // Medium Sea Green
  Gynecology: '#FF1493',     // Deep Pink
};

export function getDoctorColor(specialty) {
  const specialtyName = Object.keys(DOCTOR_COLORS).find(key => specialty.includes(key));
  return DOCTOR_COLORS[specialtyName] || '#666666';
}