import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Mail, Send, Filter, Award, Clock, Users } from 'lucide-react';
import './DoctorsPage.css';

// Dummy doctor data
const DOCTORS_DATA = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Ophthalmologist',
    experience: '15+ years',
    rating: 4.9,
    reviews: 324,
    location: 'Delhi, India',
    hospital: 'AIIMS Delhi',
    consultationFee: '₹800',
    availability: 'Available Today',
    languages: ['Hindi', 'English'],
    qualifications: ['MBBS', 'MS Ophthalmology', 'Fellowship in Retina'],
    specialties: ['Cataract Surgery', 'Glaucoma Treatment', 'Retinal Disorders'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43210',
    email: 'priya.sharma@example.com',
    isOnline: true
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Pediatric Ophthalmologist',
    experience: '12+ years',
    rating: 4.8,
    reviews: 289,
    location: 'Mumbai, India',
    hospital: 'Tata Memorial Hospital',
    consultationFee: '₹1,200',
    availability: 'Available Tomorrow',
    languages: ['Hindi', 'English', 'Marathi'],
    qualifications: ['MBBS', 'DCH', 'MS Ophthalmology', 'Pediatric Fellowship'],
    specialties: ['Child Eye Care', 'Strabismus', 'Congenital Cataracts'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43211',
    email: 'rajesh.kumar@example.com',
    isOnline: false
  },
  {
    id: 3,
    name: 'Dr. Anjali Patel',
    specialization: 'Glaucoma Specialist',
    experience: '18+ years',
    rating: 4.9,
    reviews: 456,
    location: 'Bangalore, India',
    hospital: 'Narayana Nethralaya',
    consultationFee: '₹1,500',
    availability: 'Available Today',
    languages: ['Hindi', 'English', 'Kannada'],
    qualifications: ['MBBS', 'MS Ophthalmology', 'Glaucoma Fellowship'],
    specialties: ['Glaucoma Surgery', 'Laser Treatment', 'Advanced Glaucoma Care'],
    image: 'https://images.unsplash.com/photo-1594824375938-d1b0c1a0a2a0?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43212',
    email: 'anjali.patel@example.com',
    isOnline: true
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    specialization: 'Retina Specialist',
    experience: '20+ years',
    rating: 4.9,
    reviews: 567,
    location: 'Chennai, India',
    hospital: 'Sankara Nethralaya',
    consultationFee: '₹2,000',
    availability: 'Available This Week',
    languages: ['Hindi', 'English', 'Tamil'],
    qualifications: ['MBBS', 'MS Ophthalmology', 'Vitreo-Retinal Fellowship'],
    specialties: ['Retinal Surgery', 'Macular Disorders', 'Diabetic Retinopathy'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43213',
    email: 'vikram.singh@example.com',
    isOnline: false
  },
  {
    id: 5,
    name: 'Dr. Meera Reddy',
    specialization: 'Cornea Specialist',
    experience: '14+ years',
    rating: 4.8,
    reviews: 234,
    location: 'Hyderabad, India',
    hospital: 'LV Prasad Eye Institute',
    consultationFee: '₹1,300',
    availability: 'Available Today',
    languages: ['Hindi', 'English', 'Telugu'],
    qualifications: ['MBBS', 'MS Ophthalmology', 'Cornea Fellowship'],
    specialties: ['Corneal Transplant', 'Dry Eye Treatment', 'Contact Lens Fitting'],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43214',
    email: 'meera.reddy@example.com',
    isOnline: true
  },
  {
    id: 6,
    name: 'Dr. Arjun Malhotra',
    specialization: 'Oculoplasty Specialist',
    experience: '16+ years',
    rating: 4.7,
    reviews: 189,
    location: 'Pune, India',
    hospital: 'Ruby Hall Clinic',
    consultationFee: '₹1,800',
    availability: 'Available Tomorrow',
    languages: ['Hindi', 'English', 'Marathi'],
    qualifications: ['MBBS', 'MS Ophthalmology', 'Oculoplasty Fellowship'],
    specialties: ['Eyelid Surgery', 'Orbital Tumors', 'Cosmetic Eye Surgery'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    phone: '+91 98765 43215',
    email: 'arjun.malhotra@example.com',
    isOnline: false
  }
];

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showSendReportModal, setShowSendReportModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialties = ['All', 'Ophthalmologist', 'Pediatric Ophthalmologist', 'Glaucoma Specialist', 'Retina Specialist', 'Cornea Specialist', 'Oculoplasty Specialist'];
  const locations = ['All', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];

  const filteredDoctors = DOCTORS_DATA.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialization === selectedSpecialty;
    const matchesLocation = selectedLocation === 'All' || doctor.location.includes(selectedLocation);

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleSendReport = (doctor) => {
    setSelectedDoctor(doctor);
    setShowSendReportModal(true);
  };

  const handleSendReportSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your backend to send the report
    alert(`Report sent successfully to Dr. ${selectedDoctor.name}!`);
    setShowSendReportModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="doctors-page">
      <div className="container">
        <div className="page-header">
          <h1>Find Expert Ophthalmologists</h1>
          <p>Connect with qualified eye specialists for professional consultation</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search doctors, hospitals, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <Filter className="filter-icon" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <MapPin className="filter-icon" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <span>{filteredDoctors.length} doctors found</span>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-header">
                <div className="doctor-avatar">
                  <img src={doctor.image} alt={doctor.name} />
                  {doctor.isOnline && <div className="online-indicator"></div>}
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <div className="rating">
                    <Star className="star-icon filled" />
                    <span>{doctor.rating}</span>
                    <span className="reviews">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="doctor-details">
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <span>{doctor.location}</span>
                </div>
                <div className="detail-item">
                  <Award className="detail-icon" />
                  <span>{doctor.hospital}</span>
                </div>
                <div className="detail-item">
                  <Clock className="detail-icon" />
                  <span>{doctor.availability}</span>
                </div>
              </div>

              <div className="doctor-specialties">
                <h4>Specialties:</h4>
                <div className="specialty-tags">
                  {doctor.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                  {doctor.specialties.length > 3 && (
                    <span className="specialty-tag more">+{doctor.specialties.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="doctor-actions">
                <div className="consultation-fee">
                  <span className="fee-label">Consultation Fee:</span>
                  <span className="fee-amount">{doctor.consultationFee}</span>
                </div>
                <button
                  onClick={() => handleSendReport(doctor)}
                  className="btn-send-report"
                >
                  <Send className="btn-icon" />
                  Send Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="no-results">
            <Users className="no-results-icon" />
            <h3>No doctors found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Send Report Modal */}
      {showSendReportModal && selectedDoctor && (
        <div className="modal-overlay" onClick={() => setShowSendReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send Report to Dr. {selectedDoctor.name}</h2>
              <button
                className="modal-close"
                onClick={() => setShowSendReportModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendReportSubmit} className="send-report-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" required placeholder="Enter your full name" />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input type="email" required placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label>Your Phone Number *</label>
                <input type="tel" required placeholder="Enter your phone number" />
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  placeholder="Add any additional information or questions..."
                  rows="4"
                ></textarea>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowSendReportModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send className="btn-icon" />
                  Send Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;

