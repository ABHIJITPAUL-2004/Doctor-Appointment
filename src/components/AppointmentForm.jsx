import React, { useState } from 'react'

const DOCTORS = [
  'Dr. Amelia Hart — Pediatrics',
  'Dr. Raj Patel — General Medicine',
  'Dr. Lina Gomez — Cardiology',
  'Dr. Mark Lee — Orthopedics',
]

export default function AppointmentForm({ onBook }) {
  const initial = {
    patientName: '',
    phone: '',
    email: '',
    doctor: DOCTORS[0],
    date: '',
    time: '',
    visitType: 'New',
    notes: '',
    agreed: false,
  }

  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function validate() {
    const err = {}
    if (!form.patientName.trim()) err.patientName = 'Patient name is required'
    if (!/^\d{10}$/.test(form.phone)) err.phone = 'Enter a valid 10-digit phone number'
    if (!form.doctor) err.doctor = 'Select a doctor'
    if (!form.date) err.date = 'Select a date'
    if (!form.time) err.time = 'Select a time'
    if (!form.agreed) err.agreed = 'You must agree to clinic policies'
    if (form.notes.length > 200) err.notes = 'Notes must be 200 characters or less'
    return err
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      // pass a shallow copy
      onBook({ ...form })
      setForm(initial)
    }
  }

  function handleReset() {
    setForm(initial)
    setErrors({})
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate>
      <h2>Book Appointment</h2>

      <label className="field">
        <span>Patient Name *</span>
        <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Full name" />
        {errors.patientName && <small className="err">{errors.patientName}</small>}
      </label>

      <label className="field">
        <span>Phone Number *</span>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digits" inputMode="numeric" />
        {errors.phone && <small className="err">{errors.phone}</small>}
      </label>

      <label className="field">
        <span>Email</span>
        <input name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
      </label>

      <label className="field">
        <span>Doctor *</span>
        <select name="doctor" value={form.doctor} onChange={handleChange}>
          {DOCTORS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        {errors.doctor && <small className="err">{errors.doctor}</small>}
      </label>

      <div className="row">
        <label className="field half">
          <span>Date *</span>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          {errors.date && <small className="err">{errors.date}</small>}
        </label>

        <label className="field half">
          <span>Time *</span>
          <input type="time" name="time" value={form.time} onChange={handleChange} />
          {errors.time && <small className="err">{errors.time}</small>}
        </label>
      </div>

      <div className="row">
        <div className="field radio-group">
          <span>Visit Type</span>
          <label><input type="radio" name="visitType" value="New" checked={form.visitType === 'New'} onChange={handleChange} /> New</label>
          <label><input type="radio" name="visitType" value="Follow-up" checked={form.visitType === 'Follow-up'} onChange={handleChange} /> Follow-up</label>
        </div>
      </div>

      <label className="field">
        <span>Notes / Symptoms</span>
        <textarea name="notes" value={form.notes} onChange={handleChange} maxLength={200} placeholder="Optional (max 200 chars)"></textarea>
        {errors.notes && <small className="err">{errors.notes}</small>}
      </label>

      <label className="field checkbox">
        <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
        <span>I agree to clinic policies *</span>
        {errors.agreed && <small className="err">{errors.agreed}</small>}
      </label>

      <div className="form-buttons">
        <button type="button" className="btn btn-muted" onClick={handleReset}>Clear Form</button>
        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </div>
    </form>
  )
}
