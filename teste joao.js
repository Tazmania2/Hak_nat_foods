// App.js
import React, { useState } from 'react';
import './App.css';
import { 
  Home, 
  Award, 
  Calendar, 
  PieChart, 
  BookOpen, 
  Users, 
  ShoppingBag, 
  Leaf, 
  Bell, 
  MessageCircle, 
  User,
  CheckCircle,
  FileText,
  Star,
  Coffee,
  HelpCircle,
  Settings,
  LogOut
} from 'lucide-react';

function App() {
  const [activeScreen, setActiveScreen] = useState('onboarding1');
  
  // Color palette from the spec
  const colors = {
    leafGreen: '#4CAF50',
    lightGreen: '#A5D6A7',
    beigeLight: '#F5F5DC',
    earthBrown: '#8D6E63',
    calmBlue: '#81D4FA',
    softGray: '#EEEEEE',
  };

  // Function to navigate between screens
  const navigateTo = (screen) => {
    setActiveScreen(screen);
  };

  // Content for each screen
  const renderScreen = () => {
    switch (activeScreen) {
      case 'onboarding1':
        return <OnboardingScreen1 navigateTo={navigateTo} colors={colors} />;
      case 'onboarding2':
        return <OnboardingScreen2 navigateTo={navigateTo} colors={colors} />;
      case 'onboarding3':
        return <OnboardingScreen3 navigateTo={navigateTo} colors={colors} />;
      case 'login':
        return <LoginScreen navigateTo={navigateTo} colors={colors} />;
      case 'dashboard':
        return <DashboardScreen navigateTo={navigateTo} colors={colors} />;
      case 'missions':
        return <MissionsScreen navigateTo={navigateTo} colors={colors} />;
      case 'community':
        return <CommunityScreen navigateTo={navigateTo} colors={colors} />;
      case 'profile':
        return <ProfileScreen navigateTo={navigateTo} colors={colors} />;
      case 'rewards':
        return <RewardsScreen navigateTo={navigateTo} colors={colors} />;
      case 'notifications':
        return <NotificationsScreen navigateTo={navigateTo} colors={colors} />;
      default:
        return <OnboardingScreen1 navigateTo={navigateTo} colors={colors} />;
    }
  };

  return (
    <div className="app-container">
      <div className="mobile-device">
        <div className="screen-content">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

// Onboarding Screen 1
const OnboardingScreen1 = ({ navigateTo, colors }) => (
  <div className="screen onboarding">
    <div className="onboarding-logo">
      <div className="logo-circle">
        <Leaf size={64} color={colors.leafGreen} />
      </div>
      <h1>Welcome to INFRA Connect</h1>
      <p>Your gateway to the Natural Food Retailers community</p>
    </div>
    
    <div className="language-selection">
      <p className="language-label">Choose your language / Elige tu idioma</p>
      <button 
        className="btn btn-primary"
        onClick={() => navigateTo('onboarding2')}
      >
        English
      </button>
      <button 
        className="btn btn-outline"
        onClick={() => navigateTo('onboarding2')}
      >
        Español
      </button>
    </div>
    
    <div className="onboarding-dots">
      <div className="dot active"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  </div>
);

// Onboarding Screen 2
const OnboardingScreen2 = ({ navigateTo, colors }) => (
  <div className="screen onboarding">
    <div className="onboarding-content">
      <div className="image-placeholder">
        <img 
          src="https://via.placeholder.com/360x240" 
          alt="Organic store community" 
          className="onboarding-image"
        />
      </div>
      <h1>Join our growing community</h1>
      <p>Connect with over 599 stores and 366 members across the United States and Puerto Rico</p>
    </div>
    
    <div className="onboarding-nav">
      <button 
        className="btn btn-primary"
        onClick={() => navigateTo('onboarding3')}
      >
        Continue
        <svg className="icon-right" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
    
    <div className="onboarding-dots">
      <div className="dot"></div>
      <div className="dot active"></div>
      <div className="dot"></div>
    </div>
  </div>
);

// Onboarding Screen 3
const OnboardingScreen3 = ({ navigateTo, colors }) => (
  <div className="screen onboarding">
    <div className="onboarding-content">
      <div className="features-illustration">
        <div className="feature-icon icon-1">
          <Award size={24} color={colors.leafGreen} />
        </div>
        <div className="feature-icon icon-2">
          <Calendar size={32} color={colors.calmBlue} />
        </div>
        <div className="feature-icon icon-3">
          <PieChart size={40} color={colors.earthBrown} />
        </div>
        <div className="feature-icon icon-4">
          <BookOpen size={28} color={colors.leafGreen} />
        </div>
      </div>
      <h1>Grow with every interaction</h1>
      <p>Complete missions, attend events, take courses, and engage with the community to earn rewards</p>
    </div>
    
    <div className="onboarding-nav">
      <button 
        className="btn btn-primary"
        onClick={() => navigateTo('login')}
      >
        Get Started
      </button>
    </div>
    
    <div className="onboarding-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot active"></div>
    </div>
  </div>
);

// Login Screen
const LoginScreen = ({ navigateTo, colors }) => (
  <div className="screen login">
    <div className="login-content">
      <div className="logo-circle">
        <Leaf size={48} color={colors.leafGreen} />
      </div>
      <h1>Sign in to INFRA Connect</h1>
      
      <div className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
          />
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
    
    <div className="login-actions">
      <button 
        className="btn btn-primary"
        onClick={() => navigateTo('dashboard')}
      >
        Sign In
      </button>
      
      <div className="divider">
        <span>or continue with</span>
      </div>
      
      <div className="social-login">
        <button className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" fill="#db4437"/>
          </svg>
        </button>
        <button className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" fill="#4285f4"/>
          </svg>
        </button>
        <button className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#333"/>
          </svg>
        </button>
      </div>
    </div>
    
    <p className="signup-prompt">
      Don't have an account? <a href="#">Contact your administrator</a>
    </p>
  </div>
);

// Dashboard Screen
const DashboardScreen = ({ navigateTo, colors }) => (
  <div className="screen dashboard">
    <div className="dashboard-header">
      <div className="user-welcome">
        <h1>Welcome, Sarah!</h1>
        <p>Rainbow Organic Foods</p>
      </div>
      <div className="user-avatar" onClick={() => navigateTo('profile')}>
        <User size={24} color={colors.leafGreen} />
      </div>
    </div>
    
    <div className="progress-card">
      <div className="progress-header">
        <h3>Your Progress</h3>
        <span className="level-badge">Level 12</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '65%' }}></div>
      </div>
      <div className="progress-stats">
        <span>3,250 XP</span>
        <span>5,000 XP to Level 13</span>
      </div>
    </div>
    
    <div className="dashboard-content">
      <h2>Active Missions</h2>
      
      <div className="mission-card">
        <div className="mission-info">
          <span className="badge badge-event">Event</span>
          <h3>Spring Leadership Summit</h3>
          <p>Register and attend to earn 500 XP</p>
          <div className="mission-meta">
            <Calendar size={16} />
            <span>May 15-17, 2025</span>
          </div>
        </div>
        <div className="mission-action">
          <button className="btn-small btn-primary">Register</button>
        </div>
      </div>
      
      <div className="mission-card">
        <div className="mission-info">
          <span className="badge badge-survey">Survey</span>
          <h3>Quarterly Feedback</h3>
          <p>Complete by Friday to earn 200 XP</p>
          <div className="mission-meta urgent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>2 days left</span>
          </div>
        </div>
        <div className="mission-action">
          <button className="btn-small btn-outline">Start</button>
        </div>
      </div>
      
      <div className="mission-card">
        <div className="mission-info">
          <span className="badge badge-course">Course</span>
          <h3>Sustainable Merchandising</h3>
          <p>3/8 modules completed</p>
          <div className="mini-progress">
            <div className="mini-progress-fill" style={{ width: '35%' }}></div>
          </div>
        </div>
        <div className="mission-action">
          <button className="btn-small btn-outline">Continue</button>
        </div>
      </div>
      
      <h2>Community Feed</h2>
      
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">
            <Users size={20} color={colors.calmBlue} />
          </div>
          <div className="post-author">
            <h4>Westside Natural Foods</h4>
            <p>2 hours ago</p>
          </div>
        </div>
        <p className="post-content">Just launched our new community garden program! Excited to share updates as we grow 🌱</p>
        <div className="post-actions">
          <div className="post-reactions">
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              24
            </button>
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              8
            </button>
          </div>
          <button className="view-all">View all</button>
        </div>
      </div>
    </div>
    
    <div className="nav-bar">
      <button className="nav-item active" onClick={() => navigateTo('dashboard')}>
        <Home size={24} />
        <span>Home</span>
      </button>
      <button className="nav-item" onClick={() => navigateTo('missions')}>
        <Award size={24} />
        <span>Missions</span>
      </button>
      <button className="nav-item" onClick={() => navigateTo('community')}>
        <MessageCircle size={24} />
        <span>Community</span>
      </button>
      <button className="nav-item" onClick={() => navigateTo('profile')}>
        <User size={24} />
        <span>Profile</span>
      </button>
    </div>
  </div>
);

// Missions Screen
const MissionsScreen = ({ navigateTo, colors }) => (
  <div className="screen missions">
    <div className="missions-header">
      <h1>Missions</h1>
      <div className="notifications-icon" onClick={() => navigateTo('notifications')}>
        <Bell size={20} color={colors.leafGreen} />
      </div>
    </div>
    
    <div className="category-tabs">
      <button className="tab-active">All</button>
      <button>Events</button>
      <button>Surveys</button>
      <button>Courses</button>
      <button>Community</button>
    </div>
    
    <div className="missions-content">
      <div className="section-header">
        <h2>Upcoming Events</h2>
        <button className="view-all">View All</button>
      </div>
      
      <div className="event-card">
        <div className="event-date">
          <span className="month">MAY</span>
          <span className="day">15</span>
        </div>
        <div className="event-details">
          <h3>Spring Leadership Summit</h3>
          <p>San Francisco, CA</p>
          <div className="event-meta">
            <span className="xp-badge">500 XP</span>
            <span className="event-duration">3-day event</span>
          </div>
        </div>
        <div className="event-action">
          <button className="btn-small btn-primary">Register</button>
        </div>
      </div>
      
      <div className="event-card">
        <div className="event-date blue">
          <span className="month">JUN</span>
          <span className="day">08</span>
        </div>
        <div className="event-details">
          <h3>Organic Farming Workshop</h3>
          <p>Virtual Event</p>
          <div className="event-meta">
            <span className="xp-badge">300 XP</span>
            <span className="event-duration">2-hour workshop</span>
          </div>
        </div>
        <div className="event-action">
          <button className="btn-small btn-outline">Details</button>
        </div>
      </div>
      
      <div className="event-card">
        <div className="event-date purple">
          <span className="month">JUL</span>
          <span className="day">22</span>
        </div>
        <div className="event-details">
          <h3>Regional Meetup: West Coast</h3>
          <p>Portland, OR</p>
          <div className="event-meta">
            <span className="xp-badge">350 XP</span>
            <span className="event-duration">1-day event</span>
          </div>
        </div>
        <div className="event-action">
          <button className="btn-small btn-outline">Details</button>
        </div>
      </div>
      
      <div className="section-header">
        <h2>Open Surveys</h2>
        <button className="view-all">View All</button>
      </div>
      
      <div className="survey-card">
        <div className="survey-icon">
          <FileText size={24} color="#3F51B5" />
        </div>
        <div className="survey-details">
          <h3>Quarterly Feedback</h3>
          <div className="survey-meta">
            <span className="xp-badge">200 XP</span>
            <span className="deadline urgent">Closes in 2 days</span>
          </div>
          <div className="survey-time">
            <span>Estimated time: 10 min</span>
          </div>
        </div>
        <div className="survey-action">
          <button className="btn-small btn-primary">Start</button>
        </div>
      </div>
      
      <div className="survey-card">
        <div className="survey-icon">
          <FileText size={24} color="#3F51B5" />
        </div>
        <div className="survey-details">
          <h3>Sustainable Packaging Preferences</h3>
          <div className="survey-meta">
            <span className="xp-badge">150 XP</span>
            <span className="deadline">Closes in 14 days</span>
          </div>
          <div className="survey-time">
            <span>Estimated time: 5 min</span>
          </div>
        </div>
        <div className="survey-action">
          <button className="btn-small btn-primary">Start</button>
        </div>
      </div>
    </div>
    
    <div className="nav-bar">
      <button className="nav-item" onClick={() => navigateTo('dashboard')}>
        <Home size={24} />
        <span>Home</span>
      </button>
      <button className="nav-item active" onClick={() => navigateTo('missions')}>
        <Award size={24} />
        <span>Missions</span>
      </button>
      <button className="nav-item" onClick={() => navigateTo('community')}>
        <MessageCircle size={24} />
        <span>Community</span>
      </button>
      <button className="nav-item" onClick={() => navigateTo('profile')}>
        <User size={24} />
        <span>Profile</span>
      </button>
    </div>
  </div>
);

// Community Screen
const CommunityScreen = ({ navigateTo, colors }) => (
  <div className="screen community">
    <div className="community-header">
      <h1>Community</h1>
      <div className="notifications-icon" onClick={() => navigateTo('notifications')}>
        <Bell size={20} color={colors.leafGreen} />
      </div>
    </div>
    
    <div className="community-actions">
      <button className="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        New Post
      </button>
      <button className="btn-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
      </button>
    </div>
    
    <div className="community-content">
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">
            <Users size={20} color={colors.calmBlue} />
          </div>
          <div className="post-author">
            <h4>Westside Natural Foods</h4>
            <p>2 hours ago</p>
          </div>
        </div>
        <p className="post-content">Just launched our new community garden program! Excited to share updates as we grow 🌱</p>
        <div className="post-image">
          <img src="https://via.placeholder.com/400x200" alt="Community garden" />
        </div>
        <div className="post-actions">
          <div className="post-reactions">
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              24
            </button>
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              8
            </button>
          </div>
          <button className="view-all">View all comments</button>
        </div>
      </div>
      
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">
            <Coffee size={20} color="#795548" />
          </div>
          <div className="post-author">
            <h4>Green Earth Market</h4>
            <p>Yesterday</p>
          </div>
        </div>
        <p className="post-content">We're excited to announce our upcoming Sustainability Workshop on June 15th! Who's planning to join us? Registration is open now. #SustainabilityMatters</p>
        <div className="post-actions">
          <div className="post-reactions">
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              42
            </button>
            <button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              15
            </button>
          </div>
          <button className="view-all">View all comments</button>
        </div>
      </div>
      
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">
            <ShoppingBag size={20} color="#FF9800" />
          </div>
          <div className="post-author">
            <h4>Sunrise Organics</h4>
            <p>2 days ago</p>
          </div>
        </div>
        <p className="post-content">Looking for recommendations on new organic snack suppliers with sustainable packaging. Any suggestions from fellow retailers