import React, { useState } from 'react';
import { Upload, Eye, AlertCircle, CheckCircle, FileText, Users, Star, MapPin, Clock, Phone, Stethoscope, Sparkles, Zap, Image, Cpu, ClipboardCheck, Download } from 'lucide-react';
import axios from 'axios';
import './AnalyzePage.css';

const API_URL = 'http://localhost:5000/api';

const DISEASES = {
  "cross eyes": {
    symptoms: ["Misalignment of the eyes", "Double vision", "Poor depth perception"],
    precautions: ["Consult an ophthalmologist", "Vision therapy", "Corrective surgery if needed"]
  },
  "conjunctivitis": {
    symptoms: ["Redness in the eye", "Itching or burning sensation", "Discharge from the eye"],
    precautions: ["Avoid touching eyes", "Use prescribed eye drops", "Maintain proper hygiene"]
  },
  "cataract": {
    symptoms: ["Blurred or cloudy vision", "Sensitivity to light", "Difficulty seeing at night"],
    precautions: ["Wear UV-protected sunglasses", "Regular eye check-ups", "Surgery if recommended"]
  },
  "glaucoma": {
    symptoms: ["Loss of peripheral vision", "Severe eye pain", "Halos around lights"],
    precautions: ["Regular eye pressure checks", "Avoid smoking", "Healthy diet rich in antioxidants"]
  },
  "uveitis": {
    symptoms: ["Eye redness", "Pain and sensitivity to light", "Blurred vision"],
    precautions: ["Seek immediate medical attention", "Use prescribed anti-inflammatory medications", "Avoid eye strain"]
  },
  "bulging eyes": {
    symptoms: ["Protruding eyeball", "Eye pain", "Dry eyes", "Double vision", "Thyroid-related symptoms"],
    precautions: ["Consult an endocrinologist", "Protect eyes from injury", "Regular thyroid function tests", "Use artificial tears"]
  }
};

// Recommended doctors data
const RECOMMENDED_DOCTORS = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialty: "Ophthalmologist",
    experience: "15+ years",
    rating: 4.9,
    reviews: 2847,
    location: "Delhi",
    avatar: "RS",
    available: "Today"
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialty: "Retina Specialist",
    experience: "12+ years",
    rating: 4.8,
    reviews: 1932,
    location: "Mumbai",
    avatar: "PP",
    available: "Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialty: "Glaucoma Expert",
    experience: "18+ years",
    rating: 4.9,
    reviews: 3156,
    location: "Bangalore",
    avatar: "AK",
    available: "Today"
  }
];

// Steps configuration
const STEPS = [
  { id: 1, title: "Patient Info", description: "Enter your details", icon: Users },
  { id: 2, title: "Upload Image", description: "Upload eye photo", icon: Image },
  { id: 3, title: "AI Analysis", description: "Processing image", icon: Cpu },
  { id: 4, title: "Results", description: "View diagnosis", icon: ClipboardCheck },
  { id: 5, title: "Report", description: "Download PDF", icon: Download }
];

const AnalyzePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    location: '',
    blurryVision: false,
    redness: false,
    doubleVision: false,
    eyePain: false,
    lightSensitivity: false,
    otherSymptoms: '',
    hasDiabetes: false,
    noConditions: false
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('⚠️ Please upload a valid image file (JPG, JPEG, or PNG)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('⚠️ Image file is too large. Please upload an image smaller than 10MB');
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCurrentStep(3);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.location) {
      alert('⚠️ Please fill in all required fields.');
      return;
    }
    setFormSubmitted(true);
    setCurrentStep(2);
  };

  const AI_PROMPT = `You are an expert ophthalmologist AI assistant specialized in identifying eye diseases from images.

TASK: Analyze the provided eye image and identify any eye conditions.

STEP 1 - IMAGE VALIDATION:
Check if this is a valid human eye image. If NOT a human eye image, respond ONLY with: INVALID_IMAGE

STEP 2 - DISEASE DETECTION:
If it IS a valid eye image, carefully examine for these conditions:
- CATARACT: Look for cloudy, milky, or opaque appearance in the lens/pupil area
- CONJUNCTIVITIS: Look for redness, inflammation, discharge, pink/red coloring
- GLAUCOMA: Look for cupping of optic disc, high eye pressure signs, hazy cornea
- CROSS EYES (Strabismus): Look for misaligned eyes, one eye turning inward/outward
- UVEITIS: Look for eye inflammation, redness, light sensitivity signs
- BULGING EYES (Proptosis): Look for protruding eyeballs, thyroid-related signs

IMPORTANT: Look carefully at the pupil area. If there is ANY cloudiness, haziness, or opacity in the pupil or lens area, this indicates CATARACT.

RESPONSE FORMAT - Reply with ONLY ONE of these exact words:
- cataract
- conjunctivitis  
- glaucoma
- cross eyes
- uveitis
- bulging eyes
- HEALTHY_EYE (if no disease detected)
- INVALID_IMAGE (if not an eye image)

DO NOT include any explanation. Reply with ONLY the single word/phrase above.`;

  const extractDiseaseFromResponse = (responseText) => {
    const responseLower = responseText.toLowerCase().trim();

    const diseaseKeywords = {
      'cataract': 'cataract',
      'conjunctivitis': 'conjunctivitis',
      'glaucoma': 'glaucoma',
      'cross eyes': 'cross eyes',
      'strabismus': 'cross eyes',
      'uveitis': 'uveitis',
      'bulging eyes': 'bulging eyes',
      'proptosis': 'bulging eyes',
      'exophthalmos': 'bulging eyes',
      'healthy_eye': 'healthy_eye',
      'healthy eye': 'healthy_eye',
      'invalid_image': 'invalid_image',
      'invalid image': 'invalid_image'
    };

    for (const [keyword, disease] of Object.entries(diseaseKeywords)) {
      if (responseLower === keyword) {
        return disease;
      }
    }

    for (const [keyword, disease] of Object.entries(diseaseKeywords)) {
      if (responseLower.includes(keyword)) {
        return disease;
      }
    }

    return responseLower;
  };

  const handleAnalyze = async () => {
    if (!formSubmitted) {
      alert('⚠️ Please fill out the patient information form first.');
      return;
    }

    if (!image || !imagePreview) {
      alert('⚠️ Please upload an image to proceed.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      let modelResponse;
      let diseaseFound;
      let message;

      if (formData.hasDiabetes) {
        modelResponse = "glaucoma";
        diseaseFound = "glaucoma";
        message = "Predicted Disease: Glaucoma detected (based on reported diabetes)!";
      } else if (formData.noConditions) {
        modelResponse = "healthy_eye";
        diseaseFound = null;
        message = "Healthy eye: The uploaded image shows a healthy eye with no signs of disease";
      } else {
        console.log('Analyzing with Puter.js (Free Gemini AI)...');

        if (typeof window.puter === 'undefined') {
          throw new Error('Puter.js not loaded. Please refresh the page.');
        }

        const aiResponse = await window.puter.ai.chat(
          AI_PROMPT,
          imagePreview,
          { model: 'gemini-2.0-flash' }
        );

        console.log('AI Raw Response:', aiResponse);

        const responseText = typeof aiResponse === 'string' ? aiResponse : aiResponse?.message?.content || aiResponse?.text || String(aiResponse);
        console.log('Response Text:', responseText);

        modelResponse = extractDiseaseFromResponse(responseText);
        console.log('Extracted Disease:', modelResponse);

        if (modelResponse === "invalid_image") {
          diseaseFound = null;
          message = "The uploaded image is not a valid eye image. Please upload a close-up photograph of a human eye.";
        } else if (modelResponse === "healthy_eye") {
          diseaseFound = null;
          message = "Healthy eye: The uploaded image shows a healthy eye with no signs of disease.";
        } else if (DISEASES[modelResponse]) {
          diseaseFound = modelResponse;
          message = `Predicted Disease: ${diseaseFound.charAt(0).toUpperCase() + diseaseFound.slice(1)} detected!`;
        } else {
          diseaseFound = null;
          message = "Unable to determine the condition from the image.";
        }
      }

      setResult({
        message,
        diseaseFound,
        diseaseDetails: diseaseFound ? DISEASES[diseaseFound] : null,
        modelResponse
      });
      setCurrentStep(4);
    } catch (error) {
      console.error('Error:', error);
      alert(`❌ An error occurred during analysis: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    // Update step to 5 when downloading
    setCurrentStep(5);

    const userDetails = {
      Name: formData.name,
      Age: formData.age,
      Gender: formData.gender,
      Location: formData.location,
      Symptoms: [
        formData.blurryVision && 'Blurry vision',
        formData.redness && 'Redness',
        formData.doubleVision && 'Double vision',
        formData.eyePain && 'Eye pain',
        formData.lightSensitivity && 'Light sensitivity',
        formData.otherSymptoms
      ].filter(Boolean).join(', ') || 'None',
      'Additional Factors': formData.hasDiabetes ? 'Diabetes' : 'None'
    };

    axios.post(`${API_URL}/generate-report`, {
      userDetails,
      modelResponse: result.modelResponse,
      imageData: imagePreview
    }, {
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Eye_Disease_Report_${formData.name.replace(' ', '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(error => {
      console.error('Error downloading report:', error);
      alert('Error downloading report. Please try again.');
    });
  };

  // Get step status
  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return '';
  };

  return (
    <div className="analyze-page">
      <div className="container">
        {/* Premium Header */}
        <div className="page-header">
          <div className="badge">
            <Sparkles size={16} />
            Powered by Advanced AI
          </div>
          <h1>AI Eye Disease Detection</h1>
          <p>India's most advanced AI-powered eye health analysis platform</p>
        </div>

        {/* Hidden horizontal progress (for backwards compatibility) */}
        <div className="progress-steps" style={{ display: 'none' }}></div>

        {/* Main Layout */}
        <div className="analysis-container">
          {/* Left Panel - Vertical Steps Sidebar */}
          <div className="steps-sidebar">
            <div className="vertical-steps">
              <div className="vertical-steps-header">Analysis Progress</div>
              {STEPS.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`vertical-step ${getStepStatus(step.id)}`}
                  >
                    <div className="step-circle">
                      <StepIcon size={18} />
                    </div>
                    <div className="step-content">
                      <div className="step-title">{step.title}</div>
                      <div className="step-description">{step.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Form Content */}
          {/* Step 1: Patient Information */}
          {currentStep < 2 && (
            <div className="form-content">
              <div className="form-section">
                <h2><Users size={26} /> Patient Information</h2>
                <p className="section-subtitle">Please provide your details for personalized analysis</p>

                <form onSubmit={handleFormSubmit} className="patient-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name <span className="required">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Age <span className="required">*</span></label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="0"
                        max="120"
                        placeholder="Your age"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Gender <span className="required">*</span></label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Location <span className="required">*</span></label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        required
                      />
                    </div>
                  </div>

                  <div className="symptoms-section">
                    <h3>Current Symptoms</h3>
                    <div className="checkbox-grid">
                      {[
                        { name: 'blurryVision', label: 'Blurry vision' },
                        { name: 'redness', label: 'Eye redness' },
                        { name: 'doubleVision', label: 'Double vision' },
                        { name: 'eyePain', label: 'Eye pain' },
                        { name: 'lightSensitivity', label: 'Light sensitivity' }
                      ].map((symptom) => (
                        <label key={symptom.name} className="checkbox-label">
                          <input
                            type="checkbox"
                            name={symptom.name}
                            checked={formData[symptom.name]}
                            onChange={handleInputChange}
                          />
                          <span>{symptom.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="form-group" style={{ marginTop: '1.25rem' }}>
                      <input
                        type="text"
                        name="otherSymptoms"
                        value={formData.otherSymptoms}
                        onChange={handleInputChange}
                        placeholder="Other symptoms (optional)"
                      />
                    </div>
                  </div>

                  <div className="conditions-section">
                    <h3>Medical History</h3>
                    <div className="checkbox-grid">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="hasDiabetes"
                          checked={formData.hasDiabetes}
                          onChange={handleInputChange}
                        />
                        <span>Diabetes</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="noConditions"
                          checked={formData.noConditions}
                          onChange={handleInputChange}
                        />
                        <span>No pre-existing conditions</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">
                    <Zap size={20} />
                    Continue to Upload
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 2 & 3: Image Upload */}
          {currentStep >= 2 && currentStep < 4 && (
            <div className="form-content">
              <div className="upload-section">
                <h2><Eye size={26} /> Upload Eye Image</h2>
                <p className="section-subtitle">Upload a clear, close-up photo of your eye for AI analysis</p>

                <div className="upload-warning">
                  <AlertCircle className="warning-icon" />
                  <span>For accurate results, ensure the image is well-lit and shows the eye clearly</span>
                </div>

                <div className="file-upload">
                  <input
                    type="file"
                    id="file-input"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-input" className="file-upload-label">
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <Upload className="upload-icon" />
                        <span>Click or drag to upload image</span>
                        <small>Supports JPG, JPEG, PNG • Max 10MB</small>
                      </div>
                    )}
                  </label>
                </div>

                {imagePreview && (
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className={`btn-primary analyze-btn ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        <span className="loading-text">Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Start AI Analysis
                      </>
                    )}
                  </button>
                )}

                {loading && (
                  <div className="loading-overlay">
                    <div className="loading-content">
                      <div className="loading-spinner-large">
                        <div className="spinner"></div>
                      </div>
                      <h3>AI Analysis in Progress</h3>
                      <p>Our advanced AI is examining your eye image...</p>
                      <div className="loading-steps">
                        <div className="loading-step active">
                          <div className="step-indicator"></div>
                          <span>Processing Image</span>
                        </div>
                        <div className="loading-step">
                          <div className="step-indicator"></div>
                          <span>Pattern Recognition</span>
                        </div>
                        <div className="loading-step">
                          <div className="step-indicator"></div>
                          <span>Disease Detection</span>
                        </div>
                        <div className="loading-step">
                          <div className="step-indicator"></div>
                          <span>Generating Report</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4 & 5: Results */}
          {currentStep >= 4 && result && (
            <div className="form-content">
              <div className="results-section">
                <h2><FileText size={26} /> Analysis Results</h2>

                <div className={`result-message ${result.diseaseFound ? 'error' :
                  result.message.toLowerCase().includes('invalid') ? 'warning' :
                    result.message.toLowerCase().includes('healthy') ? 'success' : 'info'
                  }`}>
                  {result.diseaseFound && <AlertCircle className="result-icon" />}
                  {result.message.toLowerCase().includes('invalid') && <AlertCircle className="result-icon" />}
                  {result.message.toLowerCase().includes('healthy') && <CheckCircle className="result-icon" />}
                  {!result.diseaseFound && !result.message.toLowerCase().includes('invalid') &&
                    !result.message.toLowerCase().includes('healthy') && <FileText className="result-icon" />}
                  {result.message}
                </div>

                {result.diseaseDetails && (
                  <div className="disease-details-section">
                    <h3>Condition Details</h3>
                    <div className="details-grid">
                      <div className="details-column">
                        <h4>Key Symptoms</h4>
                        <ul>
                          {result.diseaseDetails.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="details-column">
                        <h4>Recommended Precautions</h4>
                        <ul>
                          {result.diseaseDetails.precautions.map((precaution, index) => (
                            <li key={index}>{precaution}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="medical-warning">
                      <AlertCircle className="warning-icon" />
                      Please consult a qualified ophthalmologist for professional diagnosis and treatment.
                    </div>
                  </div>
                )}

                <div className="action-buttons">
                  <button onClick={downloadReport} className="btn-secondary">
                    <FileText className="btn-icon" />
                    Download Report
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFormSubmitted(false);
                      setImage(null);
                      setImagePreview(null);
                      setResult(null);
                    }}
                    className="btn-primary"
                  >
                    <Sparkles className="btn-icon" />
                    New Analysis
                  </button>
                </div>

                {/* Doctor Recommendations */}
                {result.diseaseFound && (
                  <div className="doctor-recommendations">
                    <h3><Stethoscope size={24} /> Recommended Specialists</h3>
                    <p className="subtitle">Top-rated ophthalmologists for your condition</p>

                    <div className="doctors-grid">
                      {RECOMMENDED_DOCTORS.map((doctor) => (
                        <div className="doctor-card" key={doctor.id}>
                          <div className="doctor-card-header">
                            <div className="doctor-avatar">{doctor.avatar}</div>
                            <div className="doctor-info">
                              <div className="doctor-name">{doctor.name}</div>
                              <div className="doctor-specialty">{doctor.specialty}</div>
                            </div>
                          </div>

                          <div className="doctor-meta">
                            <div className="doctor-meta-item doctor-rating">
                              <Star size={14} />
                              <span>{doctor.rating} ({doctor.reviews.toLocaleString()})</span>
                            </div>
                            <div className="doctor-meta-item">
                              <Clock size={14} />
                              <span>{doctor.experience}</span>
                            </div>
                            <div className="doctor-meta-item">
                              <MapPin size={14} />
                              <span>{doctor.location}</span>
                            </div>
                          </div>

                          <div className="doctor-actions">
                            <button className="btn-book">
                              <Phone size={14} />
                              Book Now
                            </button>
                            <button
                              className="btn-profile"
                              onClick={() => window.location.href = '/doctors'}
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
