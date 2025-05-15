import React from 'react'
import { useState } from 'react';
import { useAppSelector } from '../../../Redux/Store';
import { CameraIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Profile: React.FC = (): JSX.Element => {
  const [profile, setProfileData] = useState<Record<string, string>>({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });
  const [isEdited, setEdited] = useState<boolean>(false);
  const { data } = useAppSelector((state) => state.loginSlice);

  const handleEdit = () => {
    setEdited(!isEdited);
  }

  const handleSave = () => {
    // Add your save logic here
    setEdited(false);
  }

  const handleCancel = () => {
    setEdited(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-4" dir="rtl">
      <div className="card shadow-sm w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div className="position-relative d-inline-block mb-3">
              <div className="rounded-circle bg-primary bg-opacity-10 p-4">
                <CameraIcon className="text-primary" style={{ width: '48px', height: '48px' }} />
              </div>
              <button className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0">
                <PencilIcon style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <h2 className="h3 mb-2">מידע אישי</h2>
            <p className="text-muted">נהל את פרטי החשבון שלך</p>
          </div>

          <form className="needs-validation" noValidate >
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="username" className="form-label">שם משתמש</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    disabled={!isEdited}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">דואר אלקטרוני</label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEdited}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="phonenumber" className="form-label">מספר טלפון</label>
                <div className="input-group">
                  <input
                    type="tel"
                    className="form-control"
                    id="phonenumber"
                    name="phonenumber"
                    value={profile.phonenumber}
                    onChange={handleChange}
                    disabled={!isEdited}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="password" className="form-label">סיסמה</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    disabled={!isEdited}
                    required
                  />
                </div>
              </div>

              <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                {!isEdited ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEdit}
                  >
                    <PencilIcon style={{ width: '16px', height: '16px' }} className="me-2" />
                    ערוך פרופיל
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      <XMarkIcon style={{ width: '16px', height: '16px' }} className="me-2" />
                      ביטול
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      <CheckIcon style={{ width: '16px', height: '16px' }} className="me-2" />
                      שמור שינויים
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile