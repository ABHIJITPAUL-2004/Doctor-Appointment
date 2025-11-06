import React, { useEffect, useState } from 'react'
import './App.css'
import AppointmentForm from './components/AppointmentForm'
import AppointmentCard from './components/AppointmentCard'
import Navbar from './components/Navbar'

function App() {
  const sampleAppointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      phone: "1234567890",
      email: "sarah@example.com",
      doctor: "Dr. Amelia Hart — Pediatrics",
      date: "2025-11-10",
      time: "09:30",
      visitType: "New",
      notes: "First consultation for seasonal allergies"
    },
    {
      id: 2,
      patientName: "Michael Chen",
      phone: "9876543210",
      email: "michael@example.com",
      doctor: "Dr. Raj Patel — General Medicine",
      date: "2025-11-12",
      time: "14:15",
      visitType: "Follow-up",
      notes: "Monthly blood pressure check"
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      phone: "5556667777",
      email: "emily.r@example.com",
      doctor: "Dr. David Kim — Cardiology",
      date: "2025-11-15",
      time: "11:00",
      visitType: "New",
      notes: "Cardiovascular assessment and ECG"
    },
    {
      id: 4,
      patientName: "Sofia Garcia",
      phone: "7778889999",
      email: "sofia.g@example.com",
      doctor: "Dr. Lisa Chen — Dermatology",
      date: "2025-11-16",
      time: "13:45",
      visitType: "New",
      notes: "Skin consultation and mole check"
    },
    {
      id: 5,
      patientName: "James Wilson",
      phone: "4443332222",
      email: "jwilson@example.com",
      doctor: "Dr. Maria Santos — Neurology",
      date: "2025-11-18",
      time: "15:45",
      visitType: "Follow-up",
      notes: "Headache treatment follow-up"
    },
    {
      id: 6,
      patientName: "Oliver Brown",
      phone: "2223334444",
      email: "oliver.b@example.com",
      doctor: "Dr. Sarah Lee — ENT",
      date: "2025-11-19",
      time: "10:15",
      visitType: "New",
      notes: "Chronic sinusitis evaluation"
    },
    {
      id: 7,
      patientName: "Anna Smith",
      phone: "8889990000",
      email: "anna.smith@example.com",
      doctor: "Dr. John Miller — Orthopedics",
      date: "2025-11-20",
      time: "10:30",
      visitType: "New",
      notes: "Knee pain evaluation"
    }
  ];

  const [appointments, setAppointments] = useState(() => {
    try {
      const raw = localStorage.getItem('appointments_v1')
      return raw ? JSON.parse(raw) : sampleAppointments
    } catch (e) {
      return sampleAppointments
    }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('appointments_v1', JSON.stringify(appointments))
    } catch (e) {
      // ignore write errors
    }
  }, [appointments])

  function handleBook(appointment) {
    // add id and timestamp
    const withId = { id: Date.now(), ...appointment }
    setAppointments(prev => [withId, ...prev])
    setToast('Appointment booked successfully')
    setTimeout(() => setToast(null), 3000)
  }

  function handleResetAll() {
    setAppointments([])
    localStorage.removeItem('appointments_v1')
  }

  return (
    <div className="app-root">
      <Navbar />

      <header className="app-header">
        <h1 className="app-title">Medical Appointments</h1>
        <p className="app-sub">Book and manage your upcoming clinic visits</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <AppointmentForm onBook={handleBook} />
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={handleResetAll}>Clear All Appointments</button>
          </div>
        </section>

        <section className="list-section below">
          <h2>Upcoming Appointments</h2>
          {appointments.length === 0 && (
            <div className="cards">
              <AppointmentCard
                appointment={{
                  id: 'sample-1',
                  patientName: 'Sample Patient',
                  phone: '0000000000',
                  email: 'sample@clinic.com',
                  doctor: 'Dr. Example — General Medicine',
                  date: new Date().toISOString().slice(0,10),
                  time: '09:00',
                  visitType: 'New',
                  notes: 'This is a sample appointment card to show how bookings will appear.'
                }}
                isSample={true}
              />
            </div>
          )}
          <div className="cards">
            {appointments.map((a) => (
              <AppointmentCard key={a.id} appointment={a} />
            ))}
          </div>
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}

      <footer className="app-footer">© {new Date().getFullYear()} Clinic</footer>
    </div>
  )
}

export default App
