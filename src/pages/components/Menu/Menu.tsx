import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../Redux/Store';

const Menu: React.FC = () => {
    const { data } = useAppSelector((state) => state.loginSlice);

    return (
        <nav style={{ height: '3em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem'}}>       
            <i className="bi bi-list" style={{ fontSize: '1.5rem', cursor: 'pointer' }} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></i>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex={-1} id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel" style={{color:"#0D6EFD"}}>המידע שלי</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <Link 
                                to={'/AddAppointment'} 
                                style={{ 
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    textDecoration: 'none',
                                    color: '#333',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <i className="bi bi-calendar-plus" style={{ marginRight: '0.5rem' }}></i>
                                <span>הוספה פגישה</span>
                            </Link>
                        </li>

                        <li style={{ marginBottom: '1rem' }}>
                            <Link 
                                to={"/GetUserAppointments"} 
                                style={{ 
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    textDecoration: 'none',
                                    color: '#333',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <i className="bi bi-calendar3" style={{ marginRight: '0.5rem' }}></i>
                                <span>הפגישות שלי</span>
                            </Link>
                        </li>

                        <li style={{ marginBottom: '1rem' }}>
                            <Link 
                                to={'/Profile'} 
                                style={{ 
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    textDecoration: 'none',
                                    color: '#333',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <i className="bi bi-person-fill" style={{ marginRight: '0.5rem' }}></i>
                                <span>פרופיל</span>
                            </Link>
                        </li>

                        <li style={{ marginTop: '2rem' }}>
                            <Link 
                                to={`/`} 
                                style={{ 
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    textDecoration: 'none',
                                    color: '#dc3545',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <i className="bi bi-box-arrow-left" style={{ marginRight: '0.5rem' }}></i>
                                <span>התנתיק</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem' }}>{data?.payload.UserName || "YourName"}</span>
                <img 
                    src="images/avatar.png" 
                    alt="Profile" 
                    style={{ 
                        width: '1.8em', 
                        height: '1.8em', 
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} 
                />
            </div>
        </nav>
    )
}

export default Menu