# Google Analytics Setup Guide

This guide explains how to set up and configure Google Analytics for LearnStackHub.

## Overview

Google Analytics has been integrated into the application to track:
- Page views (automatic)
- Tutorial views
- Course selections
- Search queries
- Button clicks (Run Code, Copy Code, Edit Tutorial, etc.)

## Setup Instructions

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" → "Create Account"
4. Fill in your account details:
   - Account name: `LearnStackHub`
   - Property name: `LearnStackHub Website`
   - Time zone: Your timezone
   - Currency: Your currency

### Step 2: Create a Data Stream

1. In your Google Analytics property, go to **Admin** → **Data Streams**
2. Click **Add stream** → **Web**
3. Enter your website details:
   - Website URL: `https://learnstackhub.com`
   - Stream name: `LearnStackHub Web`
4. Click **Create stream**

### Step 3: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. It will look like: `G-XXXXXXXXXX`
3. Copy this ID

### Step 4: Configure the Application

1. Open `src/config/analytics.js`
2. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:

```javascript
export const GA_CONFIG = {
  measurementId: 'G-YOUR-ACTUAL-ID-HERE', // Replace with your ID
  enabled: true,
  debug: false // Set to true during development to see tracking in console
};
```

### Step 5: Test the Integration

1. Set `debug: true` in `analytics.js` temporarily
2. Run the application: `npm run dev`
3. Open the browser console
4. Navigate through the site - you should see tracking logs like:
   - `Google Analytics: Initialized with ID G-XXXXXXXXXX`
   - `Google Analytics: Page view tracked /`
   - `Google Analytics: Event tracked tutorial_view {...}`

### Step 6: Verify in Google Analytics

1. Go to your Google Analytics dashboard
2. Navigate to **Reports** → **Realtime**
3. Visit your website
4. You should see your visit appear in real-time (may take a few minutes)

## Tracked Events

The following events are automatically tracked:

### Page Views
- **Automatic**: All page navigations are tracked
- **Location**: `src/hooks/usePageTracking.js`

### Tutorial Views
- **Event**: `tutorial_view`
- **Parameters**: `tutorial_id`, `tutorial_title`
- **Location**: `src/pages/Tutorial.jsx`

### Course Selection
- **Event**: `course_select`
- **Parameters**: `course_name`
- **Location**: `src/components/Layout.jsx`

### Search Queries
- **Event**: `search`
- **Parameters**: `search_term`
- **Location**: `src/components/Layout.jsx`
- **Note**: Only tracks searches with 3+ characters, debounced by 1 second

### Button Clicks
- **Event**: `button_click`
- **Parameters**: `button_name`, `location`
- **Tracked buttons**:
  - `run_code` - When user runs code in tutorial
  - `copy_code` - When user copies code
  - `reset_code` - When user resets code editor
  - `edit_tutorial` - When user clicks edit tutorial
  - `add_tutorial` - When user clicks add tutorial
  - `edit_tutorial_login_required` - When edit requires login
  - `add_tutorial_login_required` - When add requires login

## Customization

### Adding Custom Events

To add custom event tracking, import the tracking functions:

```javascript
import { trackEvent } from '../config/analytics';

// Track a custom event
trackEvent('custom_event_name', {
  custom_parameter: 'value',
  another_param: 123
});
```

### Disabling Analytics

To disable analytics (e.g., for development):

```javascript
export const GA_CONFIG = {
  measurementId: 'G-XXXXXXXXXX',
  enabled: false, // Set to false to disable
  debug: false
};
```

### Debug Mode

Enable debug mode to see tracking logs in the console:

```javascript
export const GA_CONFIG = {
  measurementId: 'G-XXXXXXXXXX',
  enabled: true,
  debug: true // Enable console logging
};
```

## Privacy Considerations

- Google Analytics collects anonymous usage data
- No personally identifiable information (PII) is tracked
- Consider adding a privacy policy notice about analytics usage
- Users can opt-out using browser extensions or Google's opt-out tool

## Troubleshooting

### Analytics Not Working

1. **Check Measurement ID**: Ensure it's correctly set in `src/config/analytics.js`
2. **Check Console**: Enable debug mode and check for errors
3. **Ad Blockers**: Some ad blockers block Google Analytics - test in incognito mode
4. **Network Tab**: Check if `gtag/js` requests are being made
5. **Real-time Reports**: Wait a few minutes for data to appear in GA dashboard

### Events Not Showing

1. **Debug Mode**: Enable debug mode to see if events are being sent
2. **Event Names**: Check event names match in GA dashboard
3. **Real-time Reports**: Use Real-time reports to verify events immediately
4. **Custom Events**: Custom events may take 24-48 hours to appear in standard reports

## Next Steps

1. Set up custom reports in Google Analytics
2. Create goals for important user actions
3. Set up conversion tracking
4. Configure audience segments
5. Set up email reports for weekly/monthly summaries

## Resources

- [Google Analytics Documentation](https://support.google.com/analytics)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [React Router Integration](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
