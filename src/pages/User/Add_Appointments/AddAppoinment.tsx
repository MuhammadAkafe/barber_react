import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, DocumentTextIcon, ScissorsIcon } from '@heroicons/react/24/outline';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AppointmentForm {
  barbers: [];
  service: string;
  date: string;
  time: string;
  notes: string;
}

function AddAppointment(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AppointmentForm>({
    barbers: [],
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const services = [
    'Haircut',
    'Beard Trim',
    'Hair Styling',
    'Full Service'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your API call here
      console.log('Submitting appointment:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Appointment booked successfully!');
      setFormData({
        barbers:[],
        service: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="card-title fw-bold text-primary mb-2">
                  Book an Appointment
                </h2>
                <p className="text-muted">Schedule your next grooming session with us</p>
              </div>
              
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-4">
                  <label htmlFor="barber" className="form-label fw-medium">
                  barber
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <ScissorsIcon className="h-5 w-5 text-primary" />
                    </span>
                    <select
                      id="barber"
                      name="barber"
                      value={formData.barbers}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select a barber</option>
                      {formData.barbers?.map((barber:string,index:number) => (
                        <option key={index} value={barber}>
                          {barber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="service" className="form-label fw-medium">
                    Select Service
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <ScissorsIcon className="h-5 w-5 text-primary" />
                    </span>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="date" className="form-label fw-medium">
                      Date
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </span>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="time" className="form-label fw-medium">
                      Time
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <ClockIcon className="h-5 w-5 text-primary" />
                      </span>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="notes" className="form-label fw-medium">
                    Additional Notes
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <DocumentTextIcon className="h-5 w-5 text-primary" />
                    </span>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-control"
                      placeholder="Any special requests or requirements?"
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Booking...
                      </>
                    ) : (
                      <>
                        Book Appointment
                        <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAppointment;
