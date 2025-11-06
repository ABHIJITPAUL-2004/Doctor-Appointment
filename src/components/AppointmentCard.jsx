import React from 'react'
import { getDoctorColor } from '../utils/doctorColors'

function Badge({ type }) {
  return <span className={`badge ${type === 'New' ? 'badge-new' : 'badge-follow'}`}>{type}</span>
}

function DoctorAvatar({ specialty }) {
  const color = getDoctorColor(specialty);
  return (
    <div className="doc-avatar" style={{'--doctor-color': color}}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="currentColor" opacity="0.1"/>
        <circle cx="20" cy="15" r="6" fill="currentColor"/>
        <path d="M8 32c3-6 7-9 12-9s9 3 12 9H8z" fill="currentColor"/>
      </svg>
    </div>
  );
}

export default function AppointmentCard({ appointment }) {
  const { patientName, phone, email, doctor, date, time, visitType, notes } = appointment

  return (
    <article className="card-item">
      <header className="card-head">
        <div className="doc-info">
          <DoctorAvatar specialty={doctor} />
          <div className="doc">{doctor}</div>
        </div>
        <div className="when">{date} • {time}</div>
      </header>

      <div className="card-body">
        <div className="patient">{patientName}</div>
        <div className="contact">{phone}{email ? ` • ${email}` : ''}</div>
        <div className="meta"><Badge type={visitType} /></div>
        {notes && <p className="notes">{notes}</p>}
      </div>
    </article>
  )
}
